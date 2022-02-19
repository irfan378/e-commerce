const express = require("express");
const { registerUser, login, logout, forgotPassword } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);

module.exports = router;