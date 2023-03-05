const express = require('express')
const app = express()
const parser = require('body-parser')
const path = require('path')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
const expressJWT = require('express-jwt')
const secretKey = 'yyds'
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', require('express-art-template'))
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
app.set('view engine', 'html')
const goodsRouter = require('./router/goodsRouter')
const shopRouter = require('./router/shopRouter')
const orderRouter = require('./router/orderRouter')
const userRouter = require('./router/userRouter')
const typeRouter = require('./router/typeRouter')
app.use('/api/goods', goodsRouter)
app.use('/api/shop', shopRouter)
app.use('/api/orders', orderRouter)
app.use('/api/user', userRouter)
app.use('/api/type', typeRouter)
app.listen(88, () => {
  console.log('server running at 88')
})