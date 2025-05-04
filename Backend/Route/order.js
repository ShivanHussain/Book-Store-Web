const router = require("express").Router();
const { authenticationtoken } = require("./userAuthentication.js");
const Book = require("../Models/books.js");
const User = require("../Models/user.js");
const Order = require("../Models/order.js");



//----------------place order

router.post("/place-order", authenticationtoken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            await newOrder.save();
            //console.log(res);
            await User.findByIdAndUpdate(id, { $push: { orders: newOrder._id } });
            await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
        }

        return res.json({ status: "success", message: "Order placed Successfully" });
    } catch (err) {

        //console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "An error occurred" });
    }
});



//----------------get order history of particular user

router.get("/get-order-his", authenticationtoken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({ message: "User  ID is required" });
        }

        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });

        // Check if userData is found
        if (!userData) {
            return res.status(404).json({ message: "User  not found" });
        }

        const orderData = userData.orders.reverse();
        return res.json({ status: "success", data: orderData });

    } catch (err) {
        //console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "An error occurred" });
    }
});



//-----------------get all orders      ----admin
router.get("/get-order-all",authenticationtoken, async (req, res)=>{
    try{
        const userData = await Order.find().populate({
            path: "book"
        }).populate({
            path: "user"
        }).sort({
            createdAt: -1
        });
        return res.json({status: "success", data: userData });

    }catch(err){
        return res.status(500).json({message: "An error occurred"});
    }

});




//---------------------update order by admin
router.put("/update-status/:id",authenticationtoken, async (req, res)=>{
    try{
        const { id } = req.params;
        await Order.findByIdAndUpdate(id,{ status: req.body.status });
        return res.json({status: "success", message: "Status update Successfully" });

    }catch(err){
        return res.status(500).json({message: "An error occurred"});
    }

});



module.exports = router;
