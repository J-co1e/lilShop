const express = require('express')
const shopRouter = express.Router()
const multer = require('multer')
const shopHandler = require('../routerHandler/shopHandler')
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/store/')
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    )
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
shopRouter.get('/getShopInfo', shopHandler.getShopInfo)
shopRouter.post('/updateShopInfo', shopHandler.updateShopInfo)
shopRouter.post('/uploadShopPic', upload.array('img', 1), shopHandler.uploadShopPic)
module.exports = shopRouter