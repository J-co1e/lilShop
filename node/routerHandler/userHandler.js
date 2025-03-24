const db = require("../sql");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const secretKey = "yyds";
const constantRoute = [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/foods",
    name: "foods",
    label: "菜品管理",
    icon: "dish",
    url: "MallManage/MallManage",
  },
  {
    path: "/orders",
    name: "orders",
    label: "订单管理",
    icon: "s-claim",
  },
];
const managerRoute = [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/foods",
    name: "foods",
    label: "菜品管理",
    icon: "dish",
    url: "MallManage/MallManage",
  },
  {
    path: "/user",
    name: "user",
    label: "人员管理",
    icon: "s-custom",
    url: "UserManage/UserManage",
  },
  {
    path: "/orders",
    name: "orders",
    label: "订单管理",
    icon: "s-claim",
  },
  {
    path: "/shop",
    name: "shop",
    label: "店铺信息",
    icon: "s-shop",
  },
];
let fileInfo = {};
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlStr = `select * from users where username='${username}' and password='${password}'`;
  const tokenStr = jwt.sign({ username: req.body.username }, secretKey, {
    expiresIn: "3h",
  });
  db.query(sqlStr, (err, result) => {
    if (err) res.send(err);
    if (result.length === 1) {
      res.send({
        code: "200",
        msg: "成功",
        id: result[0].userId,
        token: tokenStr,
        routes: result[0].status === 1 ? managerRoute : constantRoute,
        isAdmin: result[0].status,
        roles: result[0].status === 1 ? ["admin"] : [],
      });
    } else {
      res.send({
        code: "9999",
        msg: "用户名或密码错误，请重新输入",
      });
    }
  });
};
exports.getUsers = (req, res) => {
  const size = req.query.size;
  const current = req.query.current;
  const offset = (Number(current) - 1) * Number(size);
  db.query(
    `SELECT * FROM users where isDelete = 0 limit ${+size} offset ${offset}`,
    (err, result) => {
      if (err) return res.send(err);
      db.query(`SELECT * FROM users`, (err1, result1) => {
        res.send({
          code: "200",
          msg: "成功",
          data: result,
          total: result1.length,
        });
      });
    }
  );
};
exports.updateUsers = (req, res) => {
  // 修改用户
  const user = req.body;
  let sqlStr = "";
  if (fileInfo.path) {
    user.imgUrl = fileInfo.path;
    sqlStr = `update users set username = '${user.username}',password = '${user.password}',status = ${user.status},imgUrl = '${user.imgUrl}' where userId = ${user.userId}`;
    fileInfo = {};
  } else {
    sqlStr = `update users set username = '${user.username}',password = '${user.password}',status = ${user.status} where userId = ${user.userId}`;
  }
  db.query(sqlStr, (err, result) => {
    if (err) return res.send(err);
    res.send({
      code: "200",
      msg: "成功",
    });
  });
};
exports.addUsers = (req, res) => {
  const sqlStr = "insert into users set ?";
  const userInfo = req.body;
  userInfo.imgUrl = fileInfo.path;
  db.query(sqlStr, userInfo, (err, result) => {
    if (err) return res.send(err);
    res.send({
      code: "200",
      msg: "成功",
    });
    fileInfo = {};
  });
};
exports.searchUsers = (req, res) => {
  db.query(
    `select * from users where userId like '%${req.body.id}%' and isDelete = 0`,
    (err, result) => {
      if (err) res.send(err);
      res.send({
        code: "200",
        msg: "成功",
        data: result,
        total: result.length,
      });
    }
  );
};
exports.uploadAvatar = (req, res) => {
  const file = req.files;
  fileInfo.type = file[0].mimetype;
  fileInfo.name = file[0].originalname;
  fileInfo.size = file[0].size;
  fileInfo.path = "http://127.0.0.1:88/users/" + file[0].filename;
  res.send({
    code: "200",
    value: "图片上传成功",
    data: fileInfo,
  });
};
exports.deleteUsers = (req, res) => {
  db.query(
    `update users set isDelete = 1 where userId = ${req.body.userId}`,
    (err, result) => {
      if (err) return res.send(err);
      res.send({
        code: "200",
        msg: "成功",
      });
    }
  );
};
