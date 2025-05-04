const router = require("express").Router();
const User = require("../Models/user.js");
const { authenticationtoken } = require("./userAuthentication.js");




//-----------------add book to cart
router.put("/add-to-card",authenticationtoken,async (req, res)=>{
    try{
        const { bookid , id } = req.headers;
        const userData = await User.findById(id);
        const isbookcart = userData.cart.includes(bookid);
        if(isbookcart){
            return res.json({status: "success", message: "Book is already in cart "});
        }
        
        await User.findByIdAndUpdate(id,{ $push: { cart: bookid}});
        return res.json({status: "success", message : "Book added to cart "});

    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }

});






//-------------------------remove book to cart
router.put("/remove-to-card/:bookid",authenticationtoken,async (req, res)=>{
    try{
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id,{ $pull: { cart: bookid }});
        return res.json({status: "success", message: "Book removed from cart "});
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }

});





//get cart of particular user
router.get("/get-to-card",authenticationtoken,async (req, res)=>{
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartdetails = userData.cart.reverse();
        return res.json({status: "success", data: cartdetails});

    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }

});

module.exports = router;