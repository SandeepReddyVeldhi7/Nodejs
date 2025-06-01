const mongoose=require("mongoose")

const connectionSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
  required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
required:true
    },
    status:{
        type:String,
        enum:["ignore","accepted","rejected", "interested"]
    },




},{timestamps:true,
    
})


const ConnectionRequest= new mongoose.model("ConnectionRequest",connectionSchema)

module.exports=ConnectionRequest