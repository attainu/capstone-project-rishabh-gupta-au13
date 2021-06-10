const User=require('../models/user');
const ErrorHandler=require('../utils/errorHandler');
const catchAsyncError=require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto');



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
// Forgot password=> /api/v1/password/forgot

exports.forgotPassword=catchAsyncError(async (req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('User Not found with this email',404));
    }
    // Get reset token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    // Reset password url
    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message=`Your password rest token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email,then ignore it`
    try{
        await sendEmail({
            email:user.email,
            subject:'ShopIt password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to: ${user.email}`
        })

    }catch(e){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false})

        return next(new ErrorHandler(error.message,500))
    }

})

// Reset password =>/api/v1/password/rreset/:token
exports.resetPassword=catchAsyncError(async(req,res,next)=>{

    // Hash url token
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Password Reset token is invalid or has been expired',400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password did not match',400))

    }
    // Setup new password
    user.password=req.body.password;
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save();
    sendToken(user,200,res)

})
// get currently logged in user deatils=>/api/v1/me

exports.getUserprofile=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// update /change/ password => /api/v1/password/update

exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    // check previos user password
    const isMatched=await user.comparePassword(req.body.oldpassword)
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect'))
    }
    user.password=req.body.password;
    await user.save()

    sendToken(user,200,res)
    
})
// update userProfile=>/api/v1/me/update

exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    // update avavtar:TODO
    const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        

    })
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

// Admin routes


// Get all user =>/api/v1/admin/users
exports.allUsers=catchAsyncError(async (req,res,next)=>{
    const user=await User.find();
    res.status(200).json({
        success:true,
        user
    })
})

// Get user details => /api/v1/admin/user/:id

exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})
// updatte  user profile => /api/v1/admin/user/:id
exports.updateUser=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user =await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        

    })
})
// Delete user => /api/v1/admin/user/:id

exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    // Remove avatar from cloudinary -Todo

    await user.remove()
    res.status(200).json({
        success:true,
    
    })
})

