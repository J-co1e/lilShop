const express = require('express')
const userRouter = express.Router()
const userHandler = require('../routerHandler/userHandler')
userRouter.post('/login',userHandler.login)
module.exports = userRouter