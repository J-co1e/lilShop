const express = require('express')
const orderRouter = express.Router()
const orderHandler = require('../routerHandler/ordersHandler')
orderRouter.get('/getOrders',orderHandler.getOrders)
orderRouter.post('/addOrders',orderHandler.addOrders)

module.exports = orderRouter