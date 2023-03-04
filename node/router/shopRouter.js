const express = require('express')
const shopRouter = express.Router()
const shopHandler = require('../routerHandler/shopHandler')

shopRouter.get('/getShopInfo', shopHandler.getShopInfo)
shopRouter.post('/updateShopInfo', shopHandler.updateShopInfo)

module.exports = shopRouter