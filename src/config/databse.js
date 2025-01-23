
const mongoose=require("mongoose")

const connectDB=async()=>{
await mongoose.connect("mongodb://localhost:27017/Nodejs")
} 


module.exports=connectDB