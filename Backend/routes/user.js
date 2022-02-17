const express = require("express");
const { registerUser, login, logout } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
module.exports = router;