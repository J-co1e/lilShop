const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.urlencoded({extended:false}))
// app.use(cors)

const goodsRouter = require('./router/goodsRouter')
const shopRouter = require('./router/shopRouter')
const orderRouter = require('./router/orderRouter')
const userRouter = require('./router/userRouter')
app.use('/api/goods',goodsRouter)
app.use('/api/shop',shopRouter)
app.use('/api/order',orderRouter)
app.use('/api/user',userRouter)
app.listen(88,()=>{
  console.log('server running at 88')
})