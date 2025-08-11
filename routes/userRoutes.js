const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const requireAuth = require("../middlewares/auth/requireAuth");
const validateUser = require("../middlewares/auth/validateUser");
const {
  getUser,
  updateUser,
  changePassword,
  deleteUser,
  searchUsers,
} = require("../controllers/userControllers");

router.post("/register", validateUser, userController.register);
router.use(requireAuth);
router.post("/login", validateUser, userController.login);
router.get("/me", getUser);
router.put("/me", updateUser);
router.put("/me/password", changePassword);
router.delete("/me", deleteUser);
router.get("/users", searchUsers);

module.exports = router;
