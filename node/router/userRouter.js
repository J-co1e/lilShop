const express = require('express')
const userRouter = express.Router()
const userHandler = require('../routerHandler/userHandler')
userRouter.post('/login',userHandler.login)
userRouter.get('/getUsers',userHandler.getUsers)
userRouter.post('/addUsers',userHandler.addUsers)
userRouter.post('/searchUsers',userHandler.searchUsers)
module.exports = userRouter