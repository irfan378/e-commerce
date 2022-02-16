const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleWare = require('./middleware/error')

app.use(express.json());
app.use(cookieParser());

// Route imports
const product = require("./routes/product");
const user = require('./routes/user');
app.use("/api/v1", product);
app.use("/api/v1", user)

// middleware for Errors
app.use(errorMiddleWare)

module.exports = app

