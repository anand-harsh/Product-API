const express=require("express")
const app=express()
const Product=require("./models/ProductModel")
const mongoose=require('mongoose')

app.use(express.json())

// add middleware so that data can be updated using form
app.use(express.urlencoded({extended: false}))

// home route
app.get("/", (req, res)=>{
    res.send("Hi User here")
})

// fetch al products
app.get("/products", async(req, res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


app.delete('/products/:id', async(req, res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `we cannot find any with ID ${id}`})
        }
            res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// get single product using id
app.get('/products/:id', async(req, res)=>{
    try{
        const {id}=req.params
        const product=await Product.findById(id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


// add data to DB
app.post('/products', async (req, res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// update data in DB
app.put('/products/:id', async(req, res)=>{
    try{    
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `we cannot find any with ID ${id}`})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct) // give back updated product

    }catch(error){
        res.status(500).json({message: error.message})
    }
})
// connect to db
mongoose.connect('mongodb+srv://adminharsh:admin12345@product-api.tjtj9nj.mongodb.net/Product-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to mongodb")
    app.listen(3000, ()=>{
        console.log("API app is running")
    })
}).catch((error)=>{
    console.log(error)
})