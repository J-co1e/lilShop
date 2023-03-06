const db = require('../sql')
let fileInfo = {}
exports.getGoods = (req, res) => { // 获取菜品
  const size = req.query.size
  const current = req.query.current
  const offset = (Number(current) - 1) * Number(size)
  db.query(`SELECT * FROM foods where isDelete = 0 limit ${+size} offset ${offset}`, (err, result) => {
    if (err) return res.send(err)
    db.query(`SELECT * FROM foods`, (err1, result1) => {
      res.send({
        code: '200',
        msg: '成功',
        data: result,
        total: result1.length
      })
    })
  })
}
exports.addGoods = (req, res) => { // 添加菜品
  const sqlStr = 'insert into foods set ?'
  const foodInfo = req.body
  foodInfo.imgUrl = fileInfo.path
  db.query(sqlStr, foodInfo, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
    fileInfo = {}
  })
}
exports.deleteGoods = (req, res) => { // 删除菜品
  const foodId = req.body.foodId
  const sqlStr = `update foods set isDelete = 1 where foodId = ${foodId}`
  db.query(sqlStr, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.updateGoods = (req, res) => { // 修改菜品
  const food = req.body
  let sqlStr = ''
  if (fileInfo.path) {
    food.imgUrl = fileInfo.path
    sqlStr = `update foods set foodName = '${food.foodName}',price = ${food.price},type = '${food.type}',description = '${food.description}' ,imgUrl = '${food.imgUrl}' where foodId = ${food.foodId}`
    fileInfo = {}
  } else {
    sqlStr = `update foods set foodName = '${food.foodName}',price = ${food.price},type = '${food.type}',description = '${food.description}' where foodId = ${food.foodId}`
  }
  db.query(sqlStr, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.searchGoods = (req, res) => {
  db.query(`select * from foods where foodName like '%${req.body.foodName}%' and isDelete = 0`, (err, result) => {
    if (err) res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result,
      total: result.length
    })
  })
}
exports.uploadFoodPic = (req, res) => {
  const file = req.files
  fileInfo.type = file[0].mimetype
  fileInfo.name = file[0].originalname
  fileInfo.size = file[0].size
  fileInfo.path = 'http://127.0.0.1:88/foods/' + file[0].filename
  res.send({
    code: '200',
    value: "图片上传成功",
    data: fileInfo
  })
}