const express = require('express')
const shopRouter = express.Router()
const shopHandler = require('../routerHandler/shopHandler')

shopRouter.get('/getShopInfo',shopHandler.getShopInfo)

module.exports = shopRouter