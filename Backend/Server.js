const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");

// Config

dotenv.config({ path: "Backend/config/config.env" })

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})
