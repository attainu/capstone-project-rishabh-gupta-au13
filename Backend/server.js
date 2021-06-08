const app=require('./app')
const dotenv=require('dotenv')



// setting up config file
dotenv.config({path:'./config.env'})

// connecting to databse
require('./conn/db')


app.listen(process.env.PORT,()=>{
    console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
// checking git