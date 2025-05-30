const mongoose = require("mongoose");

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
const User = mongoose.model("User", userSchema);

module.exports = User;
