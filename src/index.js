const express=require("express")
const connentDB=require("./config/databse.js")
const cookieParser=require("cookie-parser")
const app=express()
const cors=require("cors")
const http=require("http")
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
const auth =require("./routes/auth.js")
const profile=require("./routes/profile.js")
const request=require("./routes/request.js")
const user=require("./routes/user.js")
const chat=require("./routes/chat.js")
const connectionSocket = require("./utils/socket.js")
app.use("/",auth)
app.use("/",profile)
app.use("/",request)
app.use("/",user)
app.use("/",chat)



const server=http.createServer(app)


connectionSocket(server)


 connentDB().then(()=>{
    console.log("data base connected")
    server.listen(3000,()=>{
        console.log("server running")
    })
 }).catch(()=>{
    console.log("failed to connect DB")
 })

