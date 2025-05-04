const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    book:{
        type: mongoose.Types.ObjectId,
        ref: "books",

    },
    status:{
        type: String,
        default: "Order placed",
        enum: ["Order placed","Out for delivery , Delivered , canceled"],
    },
    
},
{Timestamp: true}
);

const order = mongoose.model("order",orderSchema);
module.exports = order;