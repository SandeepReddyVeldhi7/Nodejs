const express=require("express")
const connentDB=require("./config/databse.js")
const app=express()


app.use(express.json())
app.get("/",(req,res)=>{
    console.log("req.body",req.body)
    // res.end("hello")
    
},

)

 connentDB().then(()=>{
    console.log("data base connected")
    app.listen(3000,()=>{
        console.log("server running")
    })
 }).catch(()=>{
    console.log("failed to connect DB")
 })

