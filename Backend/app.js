const express = require("express");
const app = express();

const errorMiddleWare = require('./middleware/error')

app.use(express.json());

// Route imports
const product = require("./routes/product");
app.use("/api/v1", product);

// middleware for Errors
app.use(errorMiddleWare)

module.exports = app

