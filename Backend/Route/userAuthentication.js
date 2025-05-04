const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticationtoken = (req, res , next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null ){
        return res.status(401).json({message : "Unauthorized" })
    }
    jwt.verify(token, process.env.JWTSECRET_KEY, (err, user) => {
        if(err){
            return res.status(403).json({message: "Token expired. Please signIn again"});
        }
        req.user = user;
        next();

    });
};

module.exports =  { authenticationtoken };