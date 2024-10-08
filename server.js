const path =require('path')

const express = require ("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require('cors')
const compression = require('compression')
const rateLimit = require ('express-rate-limit') //#Security 
const mongoSanitize = require('express-mongo-sanitize') //#Security 

dotenv.config({path: "config.env"})



const apiError = require(`./utils/apiError`)
const dbconnection = require("./config/database")
const globaleError = require(`./middlewares/errorMidlleware`)


//mountRoutes
const mountRoutes = require('./routes')



//Express app
const app = express();
app.use(cors())
app.options('*', cors())


// compress responses
app.use(compression())



//Dtaebase Call
dbconnection()


//Midlleware
app.use(express.json({limit:'25kb'}))   //#Security > {limit:'25kb'} > Set request size limits


if(process.env.Node_ENV == "development"){
    app.use(morgan("dev"))
    console.log(`mode:${process.env.Node_ENV} `)
    
}else{
    app.use(morgan("prod"))
    console.log(`mode:${process.env.Node_ENV} `)
}

//#Security > sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(mongoSanitize())

//#Security > Limit each IP to 100 requests per `window` (here, per 15 minutes).
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, 
    message:
    'Too many accounts created from this IP, please try again after an hour',
})
//#Security > Apply the rate limiting middleware to all requests.
app.use('/api',limiter)



// Mount Routse
mountRoutes(app)




//Create Handle Unhandled Routes and Send Error to Error Handling Middleware
app.all('*',(req,res,next)=>{    
next(new apiError(`can not find this route: ${req.originalUrl}`,400))
})

//Globale Error Handling Middleware
app.use(globaleError)

//Unhandled Rejections Errors
process.on('unhandledRejection',(err)=>{
    console.log(`UnhandledRejection Errors: ${err}`)
    server.close(()=>{
        console.error(`APP shut down...`)
        process.exit(1)

    })
    


})

// listen server to port
const PORT = process.env.port || 5000
const server =app.listen (PORT, () => {
    console.log(`server is running on port: ${PORT}`)

})
