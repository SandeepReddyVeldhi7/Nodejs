const express = require("express");
const authMiddleware = require("../utils/middleware");
const ConnectionRequest = require("../model/connection");
const User = require("../model/User");
const router = express.Router();

router.get("/user/requests/received", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectRequest = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "pending",
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl"]);

    if (!connectRequest) {
      return res.status(404).json({
        message: "no request present",
      });
    }

    res.status(201).json({
      message: "request founds",
      connectRequest,
    });
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/user/connections", async (req, res) => {
  try {
    const loggedInUserId = req.user;

    const connections = await ConnectionRequest.findOne({
      $or: [
        { toUserId: loggedInUserId._id, status: "accepted" },
        {
          fromUserId: loggedInUserId._id,
          status: "accepted",
        },
      ],
    }).populate("fromUserId", "firstName", "lastName", "PhotoUrl")
    .populate("toUserId", "firstName", "lastName", "PhotoUrl")

    const data = connections.map((row) => {
        if(row.fromUserId.toString() === loggedInUserId.toString()){
            return row.toUserId
        }
        return row.fromUserId
    });

    res.json({
      data,
    });
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/feed",async(req,res)=>{
  const loggedInUser = req.user;


  const connections = await ConnectionRequest.find({
    $or: [
      { toUserId: loggedInUser._id, status: "accepted" },
      { fromUserId: loggedInUser._id, status: "accepted" },
    ],
  }).populate("fromUserId", "firstName lastName photoUrl")
    .populate("toUserId", "firstName lastName photoUrl");
  


const hideUsersFromFeed=new Set();
connections.forEach((req) => {
hideUsersFromFeed.add(req.fromUserId._id.toString());
hideUsersFromFeed.add(req.toUserId._id.toString());
})


  const users = await User.find({
   $and : [{ _id: { $nin: Array.from(hideUsersFromFeed) }},{ _id: { $ne: loggedInUser._id }}]
  }).select("firstName lastName photoUrl");

  res.json({
    users,
    connections,
  });
  

   


})

module.exports = router;
