const catchAsyncError=require('../middlewares/catchAsyncError')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);

// PROCESS STRIPE PAYMENT => /api/v1/payment/process

exports.processPayment=catchAsyncError(async (req,res,next)=>{

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_Secret
    })
})

// send stripe api key => api/v1/stripeapi

exports.sendStripeApi=catchAsyncError(async (req,res,next)=>{
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})