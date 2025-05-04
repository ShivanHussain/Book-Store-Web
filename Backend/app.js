const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./connection/conn.js");
const userRoute = require("./Route/user.js");
const bookRoute = require("./Route/book.js");
const favorateRoute = require("./Route/favorate.js");
const cartRoute = require("./Route/cart.js");
const orderRoute = require("./Route/order.js");
const fileupload = require("express-fileupload");
const cookieParser  = require('cookie-parser');


const app = express();


//frontend URL to connect backend 
app.use(cors({  
    origin: [process.env.PORTFOLIO_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

const port=process.env.PORT;


app.use(
    fileupload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );


app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/favorate",favorateRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.listen(port,()=>{
    console.log(`server is listen port ${port}`);
});