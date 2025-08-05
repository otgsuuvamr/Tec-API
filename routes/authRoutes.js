const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { userSchema } = require("../validations/userSchema");
const validate = require("../middlewares/validate");

router.post("/register", validate(userSchema, true), authController.register);
router.post("/login", authController.login);

module.exports = router;
