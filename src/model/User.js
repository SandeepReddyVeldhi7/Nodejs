const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum:["male","female","other"]
    },
    password: {
      type: String,
   
    },
    photoUrl: {
      type: String,

    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "Im here to use this app",
    },

  },
  {
    timestamps: true,
     collection: "users",
  },
 
);


userSchema.pre("save", function (next) {
 if(this.gender=== "male"){
    this.photoUrl="https://cdn-icons-png.flaticon.com/512/149/149071.png"
 }else{
    this.photoUrl="https://cdn-icons-png.flaticon.com/512/149/149072.png"
 }
   next(); 
})

userSchema.methods.getJwt=async function (){

  const user=this

  const token = await jwt.sign({_id:user._id},"abc", {expiresIn:"7d"})
  return token 
}

userSchema.methods.isPassword= async function(userPassword){
  const  user=this
const verify=await bcrypt.compare(userPassword,user.password)
return verify
}


const User = mongoose.model("User", userSchema);

module.exports = User;
