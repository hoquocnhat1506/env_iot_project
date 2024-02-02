const authController = require("../controllers/authController");
const middlewaraControler = require("../controllers/middlewareControler");

const router = require("express").Router();

//REGISTER
router.post("/register", authController.registerUser);

//LOGIN
router.post("/login", authController.loginUser);

//REFRESH
router.post("/refresh", authController.requestRefreshToken);

//LOGOUT
router.post(
  "/logout",
  middlewaraControler.verifyToken,
  authController.userLogout
);
module.exports = router;
