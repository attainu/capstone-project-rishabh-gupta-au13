const Order=require('../models/order');
const Product=require('../models/product')
const catchAsyncErrors=require('../middlewares/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler');



// create a new order =>/api/v1/order

exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body;

    const order=await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(200).json({
        success:true,
        order
    })
})
// get single order /api/v1/order/:id

exports.getSingleOrder=catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    console.log('checking routes')

    if(!order){
        return next(new ErrorHandler('No Order found with this Id',404))

    }
    res.status(200).json({
        success:true,
        order
    })

})

// Get logged in user orders => /api/v1/orders/me

exports.myOrders=catchAsyncErrors(async (req,res,next)=>{
    const order=await Order.find({user:req.user.id})
    res.status(200).json({
        success:true,
        order
    })

})