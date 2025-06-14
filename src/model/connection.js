const mongoose=require("mongoose")

const connectionSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
  required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
           ref:"User",
required:true
    },
    status:{
        type:String,
        enum:["ignore","accepted","rejected", "interested"]
    },




},{timestamps:true,
    
})

connectionSchema.index({fromUserId:1,toUserId:1})

const ConnectionRequest= new mongoose.model("ConnectionRequest",connectionSchema)

module.exports=ConnectionRequest