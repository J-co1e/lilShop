const express = require('express')
const typeRouter = express.Router()
const typeHandler = require('../routerHandler/typeHandler')

typeRouter.get('/getAllTypes', typeHandler.getAllTypes)
typeRouter.post('/addType', typeHandler.addType)
typeRouter.post('/updateType',typeHandler.updateType)
typeRouter.post('/deleteType',typeHandler.deleteType)
module.exports = typeRouter