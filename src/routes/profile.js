const express=require("express")
const User = require("../model/User")
const  authMiddleware= require("../utils/middleware")
const router=express.Router()

router.get("/get-user", authMiddleware ,async(req,res)=>{

    const user = req.user; 
     res.status(200).json({
      message: "User profile fetched successfully",
      user, 
    });
   console.log("user",user)
})
router.patch("/update-profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const updates = req.body; // Data to update

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update failed:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});


module.exports=router