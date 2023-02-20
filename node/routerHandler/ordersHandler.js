const db = require('../sql')

exports.getOrders = (req, res) => {
  db.query('select * from orders', (err, result) => {
    if (err) return res.cc(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result
    })
  })
}
exports.addOrders = (req,res) => {
  const sqlStr = 'insert into order set ?'
  const order = req.query
  console.log(order)
  db.query(sqlStr,order,(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}