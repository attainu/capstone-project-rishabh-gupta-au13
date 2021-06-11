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
    const orders=await Order.find({user:req.user.id})
    res.status(200).json({
        success:true,
        orders
    })

})
// Get all orders as /api/v1/admin/orders
exports.allOrders=catchAsyncErrors(async (req,res,next)=>{
    const orders=await Order.find()
    let totalAmount=0
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })

})

// update/ processs  orders as /api/v1/admin/order/:id
exports.updateOrder=catchAsyncErrors(async (req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler("You have already deliverd this order",400))
    }
    order.orderItems.forEach(async item=>{
        await updateStock(item.product,item.quantity)
    })

    order.orderStatus=req.body.status,
    order.deliverdAt=Date.now()

    await order.save()


    res.status(200).json({
        success:true,
        
    })

})
// Delete Order => /api/v1/admin/order/:id
exports.deleteOrder=catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)
    

    if(!order){
        return next(new ErrorHandler('No Order found with this Id',404))

    }
    await order.remove()


    res.status(200).json({
        success:true,
        
    })

})

async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.stock= product.stock -quantity;
    await product.save({validateBeforeSave:false})
}