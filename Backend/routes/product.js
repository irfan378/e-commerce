const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/product");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);


module.exports = router;