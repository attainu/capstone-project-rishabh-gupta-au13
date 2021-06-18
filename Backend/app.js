const express=require("express");
const app=express();
const cookieParser=require('cookie-parser')
const errorMiddleware=require('./middlewares/errors')
app.use(express.json());
app.use(cookieParser())

// Import all routes

const products=require('./routes/product');
const auth=require('./routes/auth')
const order=require('./routes/order')
const payment=require('./routes/payment')

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)

// Middleware to haandle the error
app.use(errorMiddleware);

module.exports=app