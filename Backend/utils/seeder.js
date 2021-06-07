const Product=require('../models/product');
require('dotenv').config({ path: '../config.env' });

const products=require("../data/product")
// dotenv.config({path:'../../Backend/config.env'})
require('../conn/db')


const seedProducts=async()=>{
    try{
        await Product.deleteMany();
        console.log('Products are deleted')
        await Product.insertMany(products)
        console.log('All products are added.')
        process.exit();


    }catch(err){
        console.log(err.message)
        process.exit()
    }
}
seedProducts()

