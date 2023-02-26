const db = require('../sql')
exports.getGoods = (req, res) => { // 获取菜品
  db.query('SELECT * FROM foods', (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result
    })
  })
}
exports.addGoods = (req, res) => { // 添加菜品
  const sqlStr = 'insert into foods set ?'
  db.query(sqlStr,req.body,(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.deleteGoods = (req,res) => { // 删除菜品
  const foodId = req.body.id
  const sqlStr = 'delete from foods where id =?'
  db.query(sqlStr,foodId,(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.updateGoods = (req,res) => { // 修改菜品
  const updateStr = 'UPDATE foods SET ? WHERE id=?'
  const food = req.body
  db.query(updateStr,[food,food.id],(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}