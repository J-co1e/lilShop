const db = require('../sql')
let fileInfo = {}
exports.getShopInfo = (req, res) => {
  db.query('select * from shop', (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result
    })
  })
}
exports.updateShopInfo = (req, res) => {
  const store = req.body
  let sqlStr = ''
  if (fileInfo.path) {
    store.imgUrl = fileInfo.path
    sqlStr = `update shop set shopName = '${store.shopName}',shopDetail = '${store.shopDetail}',shopPic = '${store.imgUrl}'`
    fileInfo = {}
  } else {
    sqlStr = `update shop set shopName = '${store.shopName}',shopDetail = '${store.shopDetail}'`
  }
  db.query(sqlStr, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.uploadShopPic = (req, res) => {
  const file = req.files
  fileInfo.type = file[0].mimetype
  fileInfo.name = file[0].originalname
  fileInfo.size = file[0].size
  fileInfo.path = 'http://127.0.0.1:88/store/' + file[0].filename
  res.send({
    code: '200',
    value: "图片上传成功",
    data: fileInfo
  })
}
