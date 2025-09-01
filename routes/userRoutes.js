const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/auth/requireAuth");

const { registerSchema } = require("../validations/registerSchema");
const { loginSchema } = require("../validations/loginSchema");
const { updateUserSchema } = require("../validations/updateNameSchema");
const { updateEmailSchema } = require("../validations/updateEmailSchema");
const { changePasswordSchema } = require("../validations/changePasswordSchema");
const { searchUserSchema } = require("../validations/searchUserSchema");

const validateUser = require("../middlewares/auth/validateUser");

const {
  register,
  login,
  profile,
  updateUser,
  updateEmail,
  changePassword,
  deleteUser,
  searchUsers,
  requestEmailChange,
  requestPasswordChange,
  confirmChange
} = require("../controllers/userControllers");

router.post("/register", validateUser(registerSchema), register);
router.post("/login", validateUser(loginSchema), login);


router.use(requireAuth);
router.get("/me", profile);
router.put("/me", validateUser(updateUserSchema), updateUser);
router.put("/me/email", validateUser(updateEmailSchema), updateEmail);
router.put("/me/password", validateUser(changePasswordSchema), changePassword);
router.delete("/me", deleteUser);
router.get("/users", validateUser(searchUserSchema), searchUsers);

router.put("/me/email/request", requireAuth, requestEmailChange);
router.put("/me/password/request", requireAuth, requestPasswordChange);

router.post("/me/confirm-change", requireAuth, confirmChange);

module.exports = router;
