const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/auth/requireAuth");
const { registerSchema } = require("../validations/registerSchema");
const { loginSchema } = require("../validations/loginSchema");
const { updateUserSchema } = require("../validations/updateUserSchema");
const { changePasswordSchema } = require("../validations/changePasswordSchema");
const { searchUserSchema } = require("../validations/searchUserSchema");
const validateUser = require("../middlewares/auth/validateUser");
const {
  register,
  login,
  profile,
  updateUser,
  changePassword,
  deleteUser,
  searchUsers,
} = require("../controllers/userControllers");

router.post("/register", validateUser(registerSchema), register);
router.post("/login", validateUser(loginSchema), login);

router.use(requireAuth);
router.get("/me", profile);
router.put("/me", validateUser(updateUserSchema), updateUser);
router.put("/me/password", validateUser(changePasswordSchema), changePassword);
router.delete("/me", deleteUser);
router.get("/users", validate(searchUserSchema), searchUsers);

module.exports = router;
