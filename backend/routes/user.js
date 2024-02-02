const middlewaraControler = require("../controllers/middlewareControler");
const userController = require("../controllers/userControler");

const router = require("express").Router();

//GET ALL USERS
router.get("/", middlewaraControler.verifyToken, userController.getAullUsers);

//DELETE USER
router.delete(
  "/:id",
  middlewaraControler.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
