const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","admin"],
    },
    favorates:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books"
       }
    ],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        }
    ],
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref: "order",

        }
    ]
},
{Timestamp: true}
);

const User = mongoose.model("User",userSchema);
module.exports =  User;