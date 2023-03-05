const db = require('../sql')

exports.getAllTypes = (req, res) => {
  db.query('select * from type where isDelete = 0', (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result
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