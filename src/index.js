const express=require("express")

const app=express()


app.use("/",(req,res)=>{
    res.end("hello")
})

app.listen(3000,()=>{
    console.log("server running")
})