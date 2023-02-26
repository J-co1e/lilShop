const express = require('express')
const userRouter = express.Router()
const userHandler = require('../routerHandler/userHandler')
userRouter.post('/login',userHandler.login)
userRouter.get('/getUsers',userHandler.getUsers)
module.exports = userRouter