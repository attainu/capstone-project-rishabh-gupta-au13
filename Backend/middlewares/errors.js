const ErrorHandler=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            sucess:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })

    }
    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error={...err}
        error.message=err.message
        //Wrong Mongoose  ID error
        if(err.name === 'CastError'){
            const message=`Resource Not Found. ${err.path}`
            error=new ErrorHandler(message,400)
        }
        // Handling Mongoose Error
        if(err.name=='ValidationError'){
            const message=Object.values(err.errors).map(value=>value.message)
            error=new ErrorHandler(message,400)
        }



        res.status(error.statusCode).json({
            sucess:false,
            message:error.message || 'Internal server error'
        })

    }

    // err.message=err.message || 'Internal server error';
    // res.status(err.statusCode).json({
    //     sucess:false,
    //     error:err
    // })
}