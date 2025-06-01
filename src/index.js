const express=require("express")
const connentDB=require("./config/databse.js")
const cookieParser=require("cookie-parser")
const app=express()


app.use(express.json())
app.use(cookieParser())
const auth =require("./routes/auth.js")
const profile=require("./routes/profile.js")
const request=require("./routes/request.js")
app.use("/",auth)
app.use("/",profile)
app.use("/",request)










 connentDB().then(()=>{
    console.log("data base connected")
    app.listen(3000,()=>{
        console.log("server running")
    })
 }).catch(()=>{
    console.log("failed to connect DB")
 })

