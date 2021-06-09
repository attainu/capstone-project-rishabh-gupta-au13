const User=require('../models/user');
const ErrorHandler=require('../utils/errorHandler');
const catchAsyncError=require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');


// Register user =>/api/v1/register

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'sample_image',
            url:'sample_url'
        }
    })
    sendToken(user,200,res)
})




// Login user => /api/v1/login

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;

    // checks if email and password is enterd by user

    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400))
    }
    // findin the user in the database
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('Invalid Email or password',401));
    }

    // checks if password is corrrect or not
    const isPasswordMatched=await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or password',401));
    
    }
    sendToken(user,200,res)
})


// logout user => /api/v1/logout 
exports.logout=catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        http:true
    })
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})