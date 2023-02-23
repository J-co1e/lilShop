const express = require('express')
const orderRouter = express.Router()
const orderHandler = require('../routerHandler/ordersHandler')
orderRouter.get('/getOrders',orderHandler.getOrders)
orderRouter.post('/addOrders',orderHandler.addOrders)
orderRouter.post('/deleteOrder',orderHandler.deleteOrders)
orderRouter.post('/updateOrder',orderHandler.updateOrders)

module.exports = orderRouter