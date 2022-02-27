const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/product");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), isAuthenticatedUser, createProduct);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"), isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), isAuthenticatedUser, deleteProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)


module.exports = router;