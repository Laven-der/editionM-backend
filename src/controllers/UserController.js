const crypto = require("crypto");
const service = require("../services/UserService");
const model = require("../models/User");
const fs = require("fs");
const formidable = require("formidable")
const path = require("path");
const nodemailer = require('nodemailer');
// 引入jwt token工具
const TokenUtil = require('../utils/token');
//引入htmldom结构
const htmlDom = require('./api/html')
const mailTransport = nodemailer.createTransport({
  host: "smtp.qq.com",
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth: {
    user: '527369072@qq.com',
    pass: 'xliotthnmhixbhbb'
  },
});
/**
 * @apiDefine CODE_500
 * @apiSuccess (Response 500) {number} code 500
 * @apiSuccess (Response 500) {string} [message] error description
 * @apiSuccessExample {json} Response 500 Example
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "code": 500
 *     "message": "SERVER_ERROR"
 *     "error":"test is not defined"
 *   }
 */
/**
 * @api {post} /api/user/doLogin 登录接口
 * @apiDescription 登录并获取用户信息
 * @apiName doLogin
 * @apiGroup user
 *
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} password 用户密码
 *
 * @apiSuccess {String} code 是否登录成功1 失败-1
 * @apiSuccess {String} message  信息提示
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "code" : 1
            "message" : "登录成功"
 *     }
 * @apiUse CODE_500
 */

module.exports.doLogin = (req, res, next) => {
  const username = req.body.username;
  var password = req.body.password;
  //加密
  password = setcodeKey(password)
  service
    .doLogin(username, password, res)
    .then(data => {
      if (data.length > 0) {
        // 登陆成功，添加token验证
        // let _id = data[0]._id.toString();
        let _data = {
          username,
          password
        }
        // 将用户id传入并生成token
        let SetToken = new TokenUtil(_data);
        let token = SetToken.generateToken();
        // 将 token 返回给客户端
        res.status(200).json({
          'code': 1,
          data,
          token: token
        });
      } else {
        res.status(200).json({
          'msg': '账户或密码错误',
          'code': -1,
          data
        });
      }
    })
    .catch(e => {
      next(e);
    });
};

//解码密钥
function decodeKey(key) {
  return key.replace(/\\u002e/g, ".");
}

function setcodeKey(key) {
  return crypto
    .createHash("SHA256")
    .update(key + "薰衣草")
    .digest("hex");
}

/**
 * @apiDefine CODE_500
 * @apiSuccess (Response 500) {number} code 500
 * @apiSuccess (Response 500) {string} [message] error description
 * @apiSuccessExample {json} Response 500 Example
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "code": 500
 *     "message": "SERVER_ERROR"
 *     "error":"test is not defined"
 *   }
 */
/**
 * @api {get} /api/user/getUserinfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getUserinfo
 * @apiGroup user
 *
 * @apiParam {String} ACCESS-TOKEN-STAGE 用户cookies
 *
 * @apiSuccess {String} email 邮箱
 * @apiSuccess {String} name  姓名
 * @apiSuccess {String} avatar  头像
 * @apiSuccess {String} birthday  生日
 * @apiSuccess {String} city  地址
 * @apiSuccess {Array} interest  爱好
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [{
 *             "_id": "5cce5352a0271220b469c308",
 *             "email": "user@qq.com",
 *             "avatar": "http://test/test.png"
 *             "sex": "男",
 *             "name": "小明",
 *             "birthday": "1997-01-07T16:00:00.000Z",
 *             "city": "北京市海淀区",
 *             "desc": "这个人很懒，什么都没留下",
 *             "__v": 0,
 *             "interest": ["看电影", "睡懒觉", "看书"]
 *         }]
 *     }
 * @apiUse CODE_500
 */
module.exports.getUserinfo = (req, res, next) => {
  const {
    username,
    password
  } = req.tokenData;
  service
    .getUserinfo(username, password)
    .then(data => {
      const info = {
        sex,
        name,
        moble,
        birthday,
        city,
        desc,
        avatar,
        interest,
        roles,
        age
      } = data[0]
      res.status(200).json({
        code: 1,
        data: info
      });
    })
    .catch(e => {
      next(e);
    });
}
/**
* @api {post} /api/user/setUserinfo 修改用户信息
* @apiDescription 修改用户信息
* @apiName setUserinfo
* @apiGroup user
*
* @apiParam {String} email 邮箱
* @apiParam {String} name 姓名
* @apiParam {String} avatar 头像
* @apiParam {String} sex 性别
* @apiParam {String} birthday 生日
* @apiParam {String} city 所在地
* @apiParam {String} desc 描述
* @apiParam {Array}  interest <div><table border="0">
                        <tr>
                          <th>参数</th>
                          <th>备注</th>
                        </tr>
                        <tr>
                          <td>interest</td>    
                          <td><ul style="text-decoration:none;">
                            <li>{ "code" : 1 ,"message" : "修改成功"}</li>
                            <li>{ "code" : 1 ,"message" : "修改成功"}</li>
                            <li>{ "code" : 1 ,"message" : "修改成功"}</li>
                            <li>{ "code" : 1 ,"message" : "修改成功"}</li>
                            <li>{ "code" : 1 ,"message" : "修改成功"}</li>
                            <li>{ "code" : 1 ,"message" : "修改成功"}</li>
                          </ul></td>   
                        </tr>
                        </table></div>
* @apiSuccess {Number} code 修改成功1 失败-1
* @apiSuccess {String} message  信息提示
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "code" : 1
            "message" : "修改成功"
 *     }
* @apiUse CODE_500
*/
/**
 * @api {POST} /register 注册用户
 * @apiGroup Users
 * @apiVersion 0.0.1
 * @apiDescription 用于注册用户
 * @apiParam {String} account 用户账户名 
 * @apiParam {String} password 密码
 * @apiParam {String} mobile 手机号
 * @apiParam {int} vip = 0  是否注册Vip身份 0 普通用户 1 Vip用户
 * @apiParam {String} [recommend] 邀请码
 * @apiParamExample {json} 请求样例：
 *                ?account=sodlinken&password=11223344&mobile=13739554137&vip=0&recommend=
 * @apiSuccess (200) {String} msg 信息
 * @apiSuccess (200) {int} code 0 代表无错误 1代表有错误
 * @apiSuccessExample {json} 返回样例:
 *                {"code":"0","msg":"注册成功"}
 */

module.exports.setUserinfo = (req, res, next) => {
  //识别用户的请求
  const fields = req.body
  const username = fields.username;
  const data = {
    sex: fields.sex,
    name: fields.name,
    moble: fields.moble,
    birthday: fields.birthday,
    city: fields.city,
    desc: fields.desc,
    avatar: fields.avatar,
    interest: fields.interest,
    age: fields.age
  }
  service
    .userinfoUpdate(username, data)
    .then(result => {
      res.json({
        "code": 1,
        result
      });
    })
};
//得到头像
//读取数据库

/**
 * 查询所有的所有的数据集
 * params：
 * ownerId 用户ID
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.register = (req, res, next) => {
  //识别用户的请求
  const fields = req.body;
  const username = fields.username;

  const password = setcodeKey(fields.password);
  const userObj = {
    username,
    password,
    sex: fields.sex,
    name: fields.name,
    moble: fields.moble,
    birthday: fields.birthday,
    city: fields.city,
    desc: fields.desc,
    group: fields.group,
    avatar: fields.avatar,
    interest: fields.interest,
    age: fields.age
  }
  service.checkEmail(username).then(count => {
    if (count) {
      res.status(200).json({
        "code": -1,
        "msg": "该邮箱已经被注册！"
      });
    } else {
      service
        .userinfoRegister(userObj)
        .then(result => {
          res.status(200).json({
            "code": 1,
            result
          });
        })
    }
  })
};
/**
 * 获取对应的数据集
 * params：
 * ownerId 用户ID
 * datasetId 数据集ID
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.checkEmail = (req, res, next) => {
  const email = req.query.email;
  service
    .checkEmail(email)
    .then(count => {
      if (count) {
        res.status(200).json({
          "code": -1,
          "msg": "该邮箱已经被注册！"
        });
      } else {
        res.status(200).json({
          "code": 1
        });
      }
    })
    .catch(e => {
      next(e);
    });
};
//添加网盘
exports.addwpan = function (req, res) {
  var uploadsbase = path.resolve(__dirname, "../static/uploads");
  var form = new formidable.IncomingForm();
  var email = req.session.email;
  if (!email) {
    res.json({
      result: -1
    });
    return;
  }
  model.find({
    email: email
  }, function (err, count) {
    var newdocs = count[0];
    if (!newdocs.carfiles) {
      return;
    }
    var arr = newdocs.carfiles;
    form.parse(req, function (err, fields) {
      var form2 = JSON.parse(fields.form2);
      //写入数据库
      var Arr = arr.concat(form2);
      newdocs.carfiles = Arr;
      newdocs.save(function (err, data) {
        if (err) {
          res.json({
            result: 0
          });
        } else {
          res.json({
            result: 1
          });
        }

      });
    });
  });
}; //展示网盘
exports.showwpan = function (req, res) {
  var email = req.session.email;
  //读取数据库
  //到时候我们用session来区分谁是谁，但是现在只要一个用户。
  model.find({
    email: email
  }, function (err, docs) {
    //头像
    //直接返回这个头像本身，而不是地址。
    res.json({
      result: docs[0]
    });
  });
};
exports.changeWpan = function (req, res) {
  var email = req.session.email;
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields) {
    var real = fields.real;
    model.update({
      email: email
    }, {
      $pull: {
        carfiles: {
          real: real
        }
      }
    }).exec();
  });
};

exports.sendEmail = function (req, res, next) {
  var name = "小明",
    model = "15522022193",
    home = true,
    money = 10000;;
  const data = {
    desc: '最真诚的祝福与快乐',
    srcArr: [{
      src: 'https://www.shqspay.com/images/xieyi.jpg',
      name: "名称",
      desc: ""
    }, {
      src: 'https://www.shqspay.com/images/xieyi.jpg',
      name: "名称",
      desc: ""
    }, {
      src: 'https://www.shqspay.com/images/xieyi.jpg',
      name: "名称",
      desc: ""
    }]
  }
  // res.json({ ok: true, dom: htmlDom.SetHtmlDom(data) });
  var options = {
    from: '节日祝福' + name + '|-<527369072@qq.com>',
    to: '527369072@qq.com',
    subject: `来自${name}的节日祝福`,
    html: htmlDom.SetHtmlDom(data)
  };
  mailTransport.sendMail(options, function (err, msg) {
    if (err) {
      res.render('index', {
        title: err
      });
    } else {
      res.json({
        ok: true
      });
    }
  });
}
exports.upload = function (req, res, next) {
  var form = new formidable.IncomingForm();
  //上传文件夹
  form.uploadDir = path.resolve(__dirname, "../uploads/");
  //保留文件的拓展名
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    res.json({
      "result": 1,
      "base": path.parse(files.viewpics.path).base
    })
  });
  return;
  if (!req.file) {
    res.json({
      ok: false
    });
    return;
  }

  // 输出文件信息
  // 重命名文件
  let oldPath = path.join(__dirname, '../' + req.file.path);
  let newPath = path.join(__dirname, '../uploads/' + req.file.originalname);
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      res.json({
        ok: false
      });
      console.log(err);
    } else {
      res.json({
        ok: true
      });
    }
  })
}