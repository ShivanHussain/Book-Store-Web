const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
require("dotenv").config();



const URL1 =process.env.ATLASDB_URL;            //atlas database
const URL2 =process.env.MONGODBURL;         // local database




//SETUP CLOUDINARY
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINAY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




main().then((res)=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);

})
/*database connectivity */
async function main(){
    await mongoose.connect(URL1);
    
}
