
const express=require("express");
const Chat = require("../model/Chat");
const authMiddleware = require("../utils/middleware");

const router = express.Router();

router.get("/chat/:id", authMiddleware,async(req,res)=>{ 
  try {
      let chat=await Chat.findOne({
          participants:{$all:[req.user?._id,req.params?.id]}
  
      })
  
      
    if (!chat) {
      chat = new Chat({
        participants: [req.user._id, req.params.id],
        messages: []
      });
      await chat.save();
    }

    // ✅ ALWAYS respond, new or existing
    res.status(200).json({ chat });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "something went wrong",
    });
    
  }
    }
)






module.exports=router
