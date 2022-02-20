const express = require("express");
const { route } = require("express/lib/application");
const { registerUser, login, logout, forgotPassword, resetPassword } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports = router;