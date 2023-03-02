const expressJoi = require('@escook/express-joi')
const express = require('express')
const shopRouter = express.Router()
const shopHandler = require('../routerHandler/shopHandler')
const { updateShopSchema } = require('../schema/index')

shopRouter.get('/getShopInfo', shopHandler.getShopInfo)
shopRouter.post('/updateShopInfo', expressJoi(updateShopSchema), shopHandler.updateShopInfo)

module.exports = shopRouter