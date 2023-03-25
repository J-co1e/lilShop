const express = require('express')
const app = express()
const parser = require('body-parser')
const path = require('path')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
const { expressjwt } = require('express-jwt')
const secretKey = 'yyds'
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  next()
})
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
  path: [
    /^\/api\/user\/login/,
    /^\/store/, /^\/foods/,
    /^\/users/, /^\/api\/goods\/getGoods/,
    /^\/api\/orders\/searchOrders/,
    /^\/api\/orders\/addOrders/,
    /^\/api\/shop\/getShopInfo/,
    /^\/api\/type\/getAllTypes/,
    /^\/api\/orders\/settleOrder/,
    /^\/api\/orders\/getPaidResult/,
    /^\/api\/orders\/paidOrder/
  ]
}))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', require('express-art-template'))
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
app.set('view engine', 'html')
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      code: '401',
      msg: '无效的token'
    })
  }
  res.send({
    status: 500,
    code: '500',
    msg: '未知的错误'
  })
})
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
  console.log('服务已启动,端口号为88')
})