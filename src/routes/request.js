
const express=require("express")
const authMiddleware = require("../utils/middleware")
const router=express.Router()
const ConnectionRequest = require("../model/connection")
router.post("/request/send/:status/:toUserId",authMiddleware,async(req,res)=>{


    try {
        const toUserId=req.params.toUserId
        const fromUserId=req.user._id
        const status=req.params.status
console.log("toUserId",toUserId)
console.log("fromUserId",fromUserId)
console.log("status",status)
        const connection= new ConnectionRequest ({
            fromUserId,
            toUserId,
            status
        })

       const data= await connection.save()

      
      res.status(201).json({
        message:"Connection send successfully",
        data,
      })



    } catch (error) {
        
    }
})


module.exports=router