const db = require('../sql')
exports.getShopInfo = (req,res) => {
  db.query('select * from shop',(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result
    })
  })
}
exports.updateShopInfo = (req,res) => {
  const info = req.body
  const sqlStr = 'update shop set ?'
  db.query(sqlStr,info,(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
