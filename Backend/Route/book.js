require("dotenv").config();
const router = require("express").Router();
const User = require("../Models/user.js");
const { authenticationtoken } = require("./userAuthentication.js");
const Book = require("../Models/books.js");





//--------------add book ------admin
router.post("/add-book",async (req , res)=>{
   try{
       const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res
            .status(400)
            .json({message: "you are not having access to perform admin work "});
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,


        });
        await book.save();
        return res.json({ status: "success", message: "Book Added Successfully" });

    }catch(err){
        console.log(err);
        return res.json({ status: "Error", message: "Internal Server Error" });
    }

    
        
});


//----------------update book ---admin
router.put("/update-book",authenticationtoken,async (req, res)=>{
    try{
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            category: req.body.category,

        });
        return res.json({ status: "success", message: "Updated Book Successfully" });
    }catch(err){
        return res.json({ status: "error", message: "An Error Occurred" });

    }

});






//--------------------delete book ---admin
router.delete("/delete-book", authenticationtoken , async (req, res)=>{
    try{
        const { bookid } = req.headers;
        //console.log("bookid",bookid);
        await Book.findByIdAndDelete(bookid);
       
        return res.json({ status: "success", message: "Book Delete Successfully" });
    }catch(err){
        console.log(err);
        return res.json({ status: "success", message: "An Error Occurred" });

    }

});




//---------------------get all books
router.get("/all-book",async (req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({status : "success",data: books,});
    }catch(err){
        console.log(err);
       return  res.status(500).json({message:"An error occurred"});
    }
});





//-------------get recently book limit 9
router.get("/recent-book",async (req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(9);
        return res.json({status : "success", data: books,});

    }catch(err){
        console.log(err);
       return  res.status(500).json({message:"An error occurred"});
    }

});




//------------------get book by id-------only one book 
router.get("/book-id/:id",async (req, res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({status : "success", data: book,});

    }catch(err){
        console.log(err);
       return res.status(500).json({message:"An error occurred"});
    }

});

module.exports = router;