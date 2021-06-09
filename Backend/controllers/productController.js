const Product=require("../models/product")

const ErrorHandler=require('../utils/errorHandler')
const  catchAsyncErrors=require('../middlewares/catchAsyncError')
const APIfeatures=require('../utils/apiFeature')


// Create new product => /api/v1/admin/product/new

exports.newProduct=catchAsyncErrors( async(req,res,next)=>{
    req.body.user=req.user.id


    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})
// get all product => /api/v1/products
exports.getProducts= catchAsyncErrors(async (req,res,next)=>{


    const apiFeatures=new APIfeatures(Product.find(),req.query)
                            .search()
                            .filter()

    const  products=await apiFeatures.query;


    res.status(200).json({
        success:true,
        count:products.length,
        products
    })
})

// Get single products details => /api/v1/:id

exports.getSingleProduct= catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404))
        }
    
    res.status(200).json({
        success:true,
        product
    })
})

// Update product /api/v1/admin/product/:id

exports.updateProduct= catchAsyncErrors( async (req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404))
        
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        product
    })
})

// Delete product /api/v1/admin/product/:id
exports.deleteProduct=catchAsyncErrors (async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:'Product is deleted'
    })
})