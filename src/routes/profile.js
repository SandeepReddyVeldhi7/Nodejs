const express=require("express")
const User = require("../model/User")
const  authMiddleware= require("../utils/middleware")
const router=express.Router()

router.get("/get-user", authMiddleware ,async(req,res)=>{
    const cookies=req.cookies
    console.log("cookies",cookies	)
    const user=await User.find({})
    res.status(201).json({
        message:"user fetch successfully",
        user
    })
})


module.exports=router