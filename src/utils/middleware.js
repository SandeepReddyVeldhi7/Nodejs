const User = require("../model/User");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const  authMiddleware= async(req, res, next) => { 

    const {token}=req.cookies

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
    res.send(404).json({
        message:"no user found"
    })
}
req.user=user

    next();
} 

module.exports= authMiddleware;