const bookRoute = require("./bookRoute")
const authRoute = require("./authRoute")
const userRoute = require("./userRoute")


const mountRoutes = (app)=>{
app.use('/api/BOOK',bookRoute),
app.use('/api/auth',authRoute),
app.use('/api/users',userRoute)
}


module.exports = mountRoutes