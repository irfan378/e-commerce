const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxlength: [10, "Price should be less than 10 digits"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxlength: [10, "Stock should be less than 10 characters"],
        default: 1
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Product", productSchema);