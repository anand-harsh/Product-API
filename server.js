require('dotenv').config()
const express=require("express")
const app=express()
const mongoose=require('mongoose')
const productRoute=require('./routes/ProductRoute')
const errorMiddleware=require('./middleware/ErrorMiddleware')
const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
var cors=require('cors')

const FRONTEND=process.env.FRONTEND

// middleware to use cors
var corsOptions={
    // origin: ['http://127.0.0.1:3000', 'http//example.com'],
    origin: FRONTEND,
    OptionsSuccessStatus: 200
}
app.use(cors())
app.use(express.json())

// add middleware so that data can be updated using form
app.use(express.urlencoded({extended: false}))

// middleware to use productRoute
//  localhost/api/products
app.use('/api', productRoute)
app.use('/api/user', productRoute)

// home route
app.get("/", (req, res)=>{
    // throw new error('fake error')
    res.send("Hi User here")
})

app.use(errorMiddleware)
// connect to db
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("connected to mongodb")
    app.listen(PORT, ()=>{
        console.log(`API app is running on port ${PORT}` )
    })
}).catch((error)=>{
    console.log(error)
})