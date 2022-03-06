const mongoose = require("mongoose");


const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`Mongodb connected successfully : ${data.connection.host}`);
    })
}

module.exports = connectDatabase;