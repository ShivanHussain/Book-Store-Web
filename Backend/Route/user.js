const router = require("express").Router();
const User = require("../Models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticationtoken } = require("./userAuthentication.js");
require("dotenv").config();





//-----------------SignUP 
router.post("/signup",async ( req, res)=>{
    
    try{
        const { username, email, password, address } = req.body;
        //console.log(req.body);

        //check username length is more than 3
        if(username.length <= 3)
        {
            
            return res.status(400)
                    .json({message:"Username length should be greater than 3"});
        }
        
        //check user name exists or not
        const existinguser = await User.findOne({ username: username })
        if(existinguser)
        {
            return res.status(400)
                    .json({ message:"Username already exists" });

        }


        //check email exists or not
        const existingemail = await User.findOne({ email: email })
        if(existingemail)
        {
            return res.status(400)
                    .json({ message:"Email already exists" });

        }

        //check password length
        if(password.length <= 5)
        {
            return res.status(400)
                    .json({ message:"Password length should be greater than 5" });

        }

        //hash the password using bcrypt
        const hashpassword = await bcrypt.hash(password,10);


        //new user created
        const newuser = new User(
        {
            username: username,
            email: email,
            password: hashpassword,
            address: address
        });

        await newuser.save();
        //console.log("user data res ",res);
        return res.status(200).json({ message:"Sign Up Succesfully" });


    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
});


//---------------signIn
router.post("/signin",async ( req, res)=>{

    //console.log(req.body);
    
    try{

       const { username , email,  password } = req.body;
       const existinguser = await User.findOne({ email });
       if(!existinguser){
        return res.status(400).json({message:"Invalid credentials"})
       }

       await bcrypt.compare(password, existinguser.password,(err,data)=>{
        if(data){
            const authClaims = [
                { name: existinguser.username },
                { role: existinguser.role },
                ];
            const token = jwt.sign({authClaims},process.env.JWTSECRET_KEY,{expiresIn: "30d"});
            return res.status(200).json({
                    id: existinguser._id, 
                    role: existinguser.role , 
                    token: token,
                    message: "Login Successfully"});
        }
        else{
            return res.status(400).json({message:"Invalid credentials" });
        }
       })

    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
});




//-----------------------------get user infomation
router.get("/user-info",authenticationtoken, async (req, res)=>{
    try{
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
});



//-----------------update the address 
router.put("/update-address", authenticationtoken , async (req, res)=>{
    try{
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address});
        return res
            .status(200)
            .json({message: "Address update Successfully"});

    }catch(err){
       return res
        .status(500)
        .json({message: "Internal server error"});

    }
});


module.exports = router;