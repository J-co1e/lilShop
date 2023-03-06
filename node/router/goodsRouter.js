const express = require('express')
const goodsRouter = express.Router()
const goodsHandler = require('../routerHandler/goodsHandler')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/foods/')
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    )
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
goodsRouter.get('/getGoods',goodsHandler.getGoods)
goodsRouter.post('/addGoods',goodsHandler.addGoods)
goodsRouter.post('/updateGoods',goodsHandler.updateGoods)
goodsRouter.post('/deleteGoods',goodsHandler.deleteGoods)
goodsRouter.post('/searchGoods',goodsHandler.searchGoods)
goodsRouter.post('/uploadFoodPic',upload.array('img', 1),goodsHandler.uploadFoodPic)
module.exports = goodsRouter