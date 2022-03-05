const express = require("express");
const { createOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, createOrder)

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;