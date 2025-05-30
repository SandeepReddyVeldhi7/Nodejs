const express=require("express")
const connentDB=require("./config/databse.js")
const User = require("./model/User.js")
const validateSignUpData =require("./utils/validation.js")
const bcrypt=require("bcrypt")
const app=express()


app.use(express.json())






app.post("/signup", async (req, res) => {
  try {
  
    validateSignUpData(req.body)


    const {emailId,firstName,lastName,password}=req.body
    console.log("req",req.body)

    const userExist=await User.findOne({emailId:emailId})
        if (userExist){
            throw new Error ("User Already Exist")
        }

         const hashedPassword= await bcrypt.hash(password,10)
         console.log("hashedPassword",hashedPassword)

    
   
    const user = new User({
        emailId,
        firstName,
        lastName,
        password:hashedPassword
    });
    await user.save();

    res.status(201).json({
      message: "user saved successfully"
    });
  } catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).json({
      message: "Failed to save user",
      error: error.message
    });
  }
});


app.post ("/login",async(req,res)=>{
    const {emailId,password}=req.body
const userExist=await User.findOne({emailId:emailId})
        if (!userExist){
            
            throw new Error("User does not exist");

        }

        const comparePassword=await bcrypt.compare(password, userExist.password) // ✅ CORRECT

        if (!comparePassword){
            throw new Error ("Invalid Credentials")
        }
        else{
            res.status(201).json({
                message:"User Login Successfully"
            })
        }

})

app.get("/get-user",async(req,res)=>{
    const user=await User.find({})
    res.status(201).json({
        message:"user fetch successfully",
        user
    })
})

app.patch("/update/:id",async(req,res)=>{
const {id}=req.params
const user =await User.find({_id:id})
if (!user){
    res.status(404).json({
        message :"user not found"
    })
}
const userFound= await User.findByIdAndUpdate(id ,req.body,{new:true})
res.status(201).json({
    message:"user updated successfully",
    userFound
})


})


 connentDB().then(()=>{
    console.log("data base connected")
    app.listen(3000,()=>{
        console.log("server running")
    })
 }).catch(()=>{
    console.log("failed to connect DB")
 })

