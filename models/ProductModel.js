const mongoose=require('mongoose')

const productSchema=mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,

        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true // when data is saved and when modified
    }
)

const Product=mongoose.model('Product', productSchema)

module.exports=Product