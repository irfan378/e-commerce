const express = require("express");
const { createOrder, myOrders } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, createOrder)

router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"));

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

module.exports = router;