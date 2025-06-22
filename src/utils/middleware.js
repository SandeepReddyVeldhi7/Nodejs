const User = require("../model/User");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const  authMiddleware= async(req, res, next) => { 

    const {token}=req.cookies
console.log("token :middleware",token)
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
      
        })
    }


    const decode= await jwt.verify(token,"abc")


if(!decode){
    return res.status(401).json({
        message:"Unauthorized"
  
    })
}


const user=await User.findOne({_id:decode._id})

if (!user){
      return res.status(404).json({
        message: "No user found",
      });
}
req.user=user

    next();
} 

module.exports= authMiddleware;