const express = require("express");
const authMiddleware = require("../utils/middleware");
const router = express.Router();
const ConnectionRequest = require("../model/connection");
const User = require("../model/User");

router.post(
  "/request/send/:status/:toUserId",
  authMiddleware,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id.toString();
      const status = req.params.status;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type" + status });
      }

      if (toUserId === fromUserId) {
        return res.status(400).json({ message: "unable to send request" });
      }
      const userConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (userConnection) {
        return res.status(400).json({
          message: "already sent request ",
        });
      }

      const userIdFound = await User.findById(toUserId);

      if (!userIdFound) {
        return res.status(400).json({
          message: "user not found",
        });
      }

      const connection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connection.save();

      res.status(201).json({
        message: "Connection send successfully",
        data,
      });
    } catch (error) {
          res.status(500).json({
      message: "Failed to send request",
      error: error.message
    }) }
  }
);


router.post("/request/review/:status/:requestId",authMiddleware ,async(req,res)=>{
try {
    const loggedInUser=req.user
    console.log("helloq")
  const {status,requestId}=req.params
  console.log("status",status)
  
  const allowedStatus=["accepted", "rejected"]
  if(!allowedStatus.includes(status)){
    return res.status(400).json({
      message:"request is not allowed"
    })
  }
  
  
  const connectionRequest=await ConnectionRequest.findOne({
  
    _id:requestId,
    toUserId:loggedInUser,
    status:"interested"
  })
if (!connectionRequest) {
  return res.status(404).json({ message: "Connection request not found or already reviewed." });
}


  connectionRequest.status=status


  const data=await connectionRequest.save()


  res.status(201).json({
    message:"Connection request",
    data,
    status
  })
} catch (error) {
  console.log("error",error)
  res.status(400).send("ERROR",error)
}




})

module.exports = router;
