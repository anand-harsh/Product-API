const express=require('express')
const router=express.Router()
const Product=require("../models/ProductModel")
const {getAllProducts, deleteProduct, getSingleProduct, createProduct, updateProduct}=require('../controllers/ProductController')
// fetch al products
router.get("/products", getAllProducts)

router.delete('/products/:id', deleteProduct)

// get single product using id
router.get('/products/:id', getSingleProduct)

// add data to DB
router.post('/products', createProduct)

// update data in DB
router.put('/products/:id', updateProduct)

module.exports=router