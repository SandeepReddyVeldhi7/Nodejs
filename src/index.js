const express=require("express")

const app=express()


app.use("/",(req,res)=>{
    res.end("hello")
})

app.use("/a", (req,res)=>{
    res.end("checking")
})

//  /user?userid=123&name=sandeepreddy  query parameters   req.query

app.get("/user/:name",(req,res)=>{
    res.send("checking dynamic route")
})


app.listen(3000,()=>{
    console.log("server running")
})