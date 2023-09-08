const Product=require('../models/ProductModel')
const asyncHandler=require('express-async-handler')

const getAllProducts=asyncHandler(async(req, res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json(products)
    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteProduct=asyncHandler(async(req, res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `we cannot find any with ID ${id}`})
        }
            res.status(200).json(product)
    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

const getSingleProduct=asyncHandler(async(req, res)=>{
    try{
        const {id}=req.params
        const product=await Product.findById(id)
        res.status(200).json(product)
    }catch(error){
        res.status(500)
        throw new Error({message: error.message})
    }
})

const createProduct=asyncHandler(async (req, res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500)
        throw new Error(error.message)
    }
})

const updateProduct=asyncHandler(async(req, res)=>{
    try{    
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(404)
            throw new Error(`we cannot find any with ID ${id}`)
            // return res.status(404).json({message: `we cannot find any with ID ${id}`})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct) // give back updated product

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
    
})
module.exports={
    getAllProducts,
    deleteProduct,
    getSingleProduct,
    createProduct,
    updateProduct
}