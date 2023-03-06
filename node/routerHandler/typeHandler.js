const db = require('../sql')

exports.getAllTypes = (req, res) => {
  db.query('select * from type where isDelete = 0', (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result,
      total: result.length
    })
  })
}
exports.addType = (req, res) => {
  const type = req.body
  const sqlStr = 'insert into type set ?'
  db.query(sqlStr, type, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.updateType = (req,res) => {
  db.query(`update type set type = '${req.body.type}' where id = ${req.body.id}`,(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.deleteType = (req,res) => {
  db.query(`update type set isDelete = 1 where id = ${req.body.id}`,(err,result)=>{
    if(err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}