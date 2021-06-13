const mongoose=require("mongoose");
const catchAsyncError = require("../middlewares/catchAsyncError");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter product name'],
        trim:true,
        maxLength:[100,'Product name can not exceed 100 characters']
    },
    price:{
        type:Number,
        required:[true, 'Please enter the price'],
        maxLength:[5,'Product name can not exceed 100 characters'],
        default:0.0
    },
    description:{
        type:String,
        required:[true, 'Please enter the decription']
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'Please Select Category for this product'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                "Headphones",
                "Food",
                "Books",
                "Clothes/Shoes",
                "Beauty/Health",
                "Outdoor",
                'Home'
            ],
            message:'Please select correct category for product'

        }
    },
    seller:{
        type:String,
        required:[true,'Please enter seller name']
    },
    stock:{
        type:Number,
        required:[true,'Please enter product stock'],
        maxLength:[5,'Product stock can not excced 5'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
        
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})



module.exports=mongoose.model('Product',productSchema)