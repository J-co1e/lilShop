const express = require('express')
const typeRouter = express.Router()
const typeHandler = require('../routerHandler/typeHandler')

typeRouter.get('/getAllTypes', typeHandler.getAllTypes)
typeRouter.post('/addType', typeHandler.addType)
module.exports = typeRouter