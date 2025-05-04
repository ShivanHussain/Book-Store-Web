const router = require("express").Router();
const User = require("../Models/user.js");
const { authenticationtoken } = require("./userAuthentication.js");




//-------------add book to favorates
router.put("/add-book-favorates",authenticationtoken,async (req, res)=>{
    try{
        const { bookid , id } = req.headers;
        const userdata = await User.findById(id);
        const isBookFav = userdata.favorates.includes(bookid);
        if(isBookFav){
            return res.status(200).json({message:"Book is already in favourites "});
        }
        await User.findByIdAndUpdate(id,{ $push: { favorates: bookid }});
        return res.status(200).json({message:"Book added to  favourites "});

    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }

});






//-----------------remove book in favorates
router.put("/delete-book-favorates",authenticationtoken,async (req, res)=>{
    try{
        const { bookid , id } = req.headers;
        const userdata = await User.findById(id);
        const isBookFav = userdata.favorates.includes(bookid);
        if(isBookFav){
            await User.findByIdAndUpdate(id,{ $pull: { favorates: bookid }});
        }
        
        return res.json({ status: "success", message: "Book Removed from Favourites" });

    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }

});






//get favorates book of particular user
router.get("/get-book-favorates",authenticationtoken,async (req, res)=>{
    try{
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("favorates");
        const isBookFav = userdata.favorates;

        return res.json({status: "success", data: isBookFav});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "An  error occured"});
    }

});






module.exports = router;