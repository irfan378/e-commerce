const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const errorMiddleWare = require('./middleware/error')
const dotenv = require('dotenv')

dotenv.config({ path: "Backend/config/config.env" })

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload());

// Route imports
const product = require("./routes/product");
const user = require('./routes/user');
const order = require('./routes/order')
const payment = require('./routes/paymentRoute')
app.use("/api/v1", product);
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)

// middleware for Errors
app.use(errorMiddleWare)

module.exports = app

