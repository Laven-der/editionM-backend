/*
 * @Author: lavender
 * @Date: 2018-06-13 17:06:25
 * @Last Modified by: lavender
 */

require('dotenv').config();

const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const ValidationError = require('express-validation');
const cors = require('cors')
const ERROR_TYPES = require('./server-error/constants');
const ErrorBase = require('./server-error');
const createRoutes = require('./routes');
const TokenUtil = require("./utils/token")
const RolesUtil = require("./utils/roles")

//链接mongo数据库
require("./utils/db")

const app = express();
app.use(cors());
app.use(session({
    resave: false,
    secret: 'qasystem',
    saveUninitialized: true,
    cookie: {
        maxAge: 8226400
    } //session能够存储的时间
}));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(express.static('./static'));
app.use(function (req, res, next) {
    res.setTimeout(5 * 60 * 1000, function () {
        console.log("Request has timed out.");
        return res.status(408).send("请求超时")
    })
    res.success = (data) => {
        const { code = 1, msg = "Success", ...otherArgment } = data;
        res.json({
            code, msg,
            ...otherArgment
        })
    }
    // 把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
    if (req.url.indexOf('/api/user/doLogin') != 0 && req.url.indexOf('/api/user/register') != 0 && req.url.indexOf('/api/user/logout ') != 0) {
        var token = req.body.token || req.query.token || req.headers['x-token'] || ""
        // 如果考验通过就next，否则就返回登陆信息不正确
        let SetToken = new TokenUtil(token);
        let result = SetToken.verifyToken();
        if (result == 'err') {
            res.send({
                code: 50014,
                msg: '您未登录或登录已过期,请重新登录'
            });
        } else {
            const data = {
                roles: result.roles || ['admin'],
                url: req.url
            }
            let Permission = new RolesUtil(data);
            let flag = Permission.verifyRoles();
            req.tokenData = { ...result, isAdmin: flag };
            if (flag) {
                next();
            } else {
                res.send({
                    code: 403,
                    msg: '没有权限'
                });
            }
        }
    } else {
        next();
    }
});

createRoutes(app)
function listen() {
    const port = Number(process.env.PORT || 6060);
    app.listen(port);
    console.log(`app started on port ${port}`);
}

app.use((err, req, res, next) => {
    if (err instanceof ErrorBase) {
        res.status(err.status).json({
            msg: err.type,
            error: err.message
        });
    } else if (err instanceof ValidationError) {
        res.status(err.status).json({
            type: ERROR_TYPES.VALIDATION_ERROR,
            error: err.errors
        })
    } else {
        res.status(500).json({
            msg: ERROR_TYPES.DEFAULT,
            error: err.message
        });
    }
});
listen()