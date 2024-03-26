const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshToken = []; // Khai báo biến refreshToken

const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2day" }
    );
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1day" } // Refresh lại token
    );
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password!" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Invalid username or password!" });
      }

      // Generate tokens only if username and password are correct
      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...other } = user._doc;
      res.status(200).json({ ...other, accessToken });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal server error!" });
    }
  },

  // REQUEST REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    // Lấy refresh token từ user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You are not authenticated");
    if (!refreshToken.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshToken = refreshToken.filter((token) => token !== refreshToken);
      //Create new accesstoken, refresh tolen
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshToken.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // USER LOGOUT
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshToken = refreshToken.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logout success");
  },
};

module.exports = authController;
