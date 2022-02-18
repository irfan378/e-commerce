const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/product");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), isAuthenticatedUser, createProduct);
router.route("/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"), isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), isAuthenticatedUser, deleteProduct).get(getProductDetails);


module.exports = router;