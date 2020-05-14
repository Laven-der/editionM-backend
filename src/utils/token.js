// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
// 创建 token 类
class SetToken {
    constructor(data) {
        this.data = data;

    }
    //生成token
    generateToken() {
        let data = this.data;
        // let created = Math.floor(Date.now() / 1000);
        console.log(data, "data")
        let cert = fs.readFileSync(path.join(__dirname, '../../key/private.key'));;//私钥 可以自己生成
        let token = jwt.sign(data, cert, {
            expiresIn: 60 * 60 * 4  // 1小时过期
        });
        return token;
    }
    // 校验token
    verifyToken() {
        let token = this.data;
        let cert = fs.readFileSync(path.join(__dirname, '../../key/private.key'));//公钥 可以自己生成
        let res;
        jwt.verify(token, cert, (err, decode) => {
            if (err) {
                console.log(err, "err")
                res = 'err';
            } else {
                res = decode;
            }
        })
        console.log(res, "wwwwww")
        return res;
    }
}
module.exports = SetToken;