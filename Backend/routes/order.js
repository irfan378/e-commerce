const express = require("express");
const { createOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, createOrder)

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);



router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router.route("/admin/ord/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)


module.exports = router;