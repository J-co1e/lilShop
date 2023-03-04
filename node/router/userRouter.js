const express = require('express')
const userRouter = express.Router()
const userHandler = require('../routerHandler/userHandler')
const multer = require('multer')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/users/')
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    )
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
userRouter.post('/login', userHandler.login)
userRouter.get('/getUsers', userHandler.getUsers)
userRouter.post('/addUsers', multipartMiddleware, userHandler.addUsers,)
userRouter.post('/searchUsers', userHandler.searchUsers)
userRouter.post('/uploadAvatar', upload.array('img', 1), userHandler.uploadAvatar)
userRouter.post('/deleteUser', userHandler.deleteUsers)
userRouter.post('/updateUser', multipartMiddleware, userHandler.updateUsers)
module.exports = userRouter