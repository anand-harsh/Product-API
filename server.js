const express=require("express")
const app=express()


app.get("/", (req, res)=>{
    res.send("Hi User here")
})
app.listen(3000, ()=>{
    console.log("API app is running")
})