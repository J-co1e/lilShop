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
exports.updateType = (req, res) => {
  db.query(`select type from type where id = ${req.body.id}`, (err1, result1) => {
    if (err1) return res.send(err1)
    const typeName = result1[0].type
    db.query(`update type set type = '${req.body.type}' where id = ${req.body.id}`, (err, result) => {
      if (err) return res.send(err)
      db.query(`update foods set type = '${req.body.type}' where type = '${typeName}'`, (err2, result1) => {
        console.log(`update foods set type = '${req.body.type}' where type = '${typeName}'`)
        if (err2) return res.send(err2)
        res.send({
          code: '200',
          msg: '成功'
        })
      })
    })
  })
}
exports.deleteType = (req, res) => {
  db.query(`SELECT * FROM type INNER JOIN foods WHERE type.type = foods.type`,(err1,result1)=>{
    if(err1) res.send(err1)
    if(result1.some(item => {
      return item.id === req.body.id
    })){
      res.send({
        code: '999',
        msg: '删除失败'
      })
      return
    }
    db.query(`update type set isDelete = 1 where id = ${req.body.id}`, (err, result) => {
      if (err) return res.send(err)
      res.send({
        code: '200',
        msg: '成功'
      })
    })
  })
}