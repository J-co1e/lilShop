const express = require('express')
const goodsRouter = express.Router()
const goodsHandler = require('../routerHandler/goodsHandler')

goodsRouter.get('/getGoods',goodsHandler.getGoods)
goodsRouter.post('/addGoods',goodsHandler.addGoods)
goodsRouter.post('/updateGoods',goodsHandler.updateGoods)
goodsRouter.post('/deleteGoods',goodsHandler.deleteGoods)

module.exports = goodsRouter