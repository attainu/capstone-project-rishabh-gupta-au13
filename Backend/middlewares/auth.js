// checks if user is authenticated or not
const User=require('../models/user')
const Jwt=require('jsonwebtoken');
const user = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler('Login first to acess the resource',401))
    }
    // console.log(token)
    const decoded =Jwt.verify(token,process.env.JWT_SECRET)
    // console.log(token)
    req.user=await User.findById(decoded.id)
    next()
})

// Handling users roles
exports.authorizedRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role(${req.user.role}) is not allowed to acess it`,403)
            )

        }
        next()
    }
}