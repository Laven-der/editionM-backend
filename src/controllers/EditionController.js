const formidable = require("formidable/lib");
const path = require('path');
const fs = require("fs");
// 获取北京时间
const chinaTime = require('china-time');
const CONFIG = require('../../config')
const exec = require('child_process').exec;
const service = require("../services/EditionService");

module.exports.getEditionLists = (req, res, next) => {
    let isAdmin = req.tokenData.isAdmin || false
    service
        .getEditionLists()
        .then(data => {
            let result = [];
            //非管理员不能查看服务器配置信息
            if (isAdmin) {
                data.map(item => {
                    const { pageName, branch, serviceName, remotePath, apiDomain, resetDomain, releaseDate, gitUrl, tag, _id } = item;
                    result.push({ pageName, branch, serviceName, remotePath, apiDomain, resetDomain, releaseDate, gitUrl, tag, _id });
                })
            } else {
                result = data
            }
            res.json({
                "code": 1,
                result
            });
        }).catch(e => {
            next(e);
        });
}
module.exports.updateEditionItem = (req, res, next) => {
    var fields = req.body
    const { _id, ...dataObj } = fields

    service
        .updateEditionItem(_id, dataObj)
        .then(data => {
            res.status(200).json({
                "code": 1,
                data
            });
        }).catch(e => {
            throw e;
        });
};
module.exports.addEditionItem = (req, res, next) => {
    var fields = req.body
    const dataObj = {
        ...fields
    }
    service
        .addEditionItem(dataObj)
        .then(data => {
            res.status(200).json({
                "code": 1,
                data
            });
        }).catch(e => {
            throw e;
        });
};
module.exports.deleteEditionItem = (req, res, next) => {
    console.log(req.query._id, "id")
    service
        .deleteEditionItem(req.query._id)
        .then(data => {
            res.status(200).json({
                "code": 1,
                data
            });
        }).catch(e => {
            throw e;
        });
};
module.exports.setServiceEdition = (req, res, then) => {
    const pageMame = req.query.pageMame,
        _id = req.query._id,
        serviceName = req.query.serviceName || 'TEST',
        remotePath = req.query.remotePath,
        server = CONFIG[serviceName].server;
    let shellPath = remotePath.substring(0, `${remotePath.lastIndexOf("\/") + 1}`);
    let cmd = `cd ${shellPath} && ./start.sh ${pageMame} \nexit\n`;
    service.Shell(server, cmd, function (err, data) {
        if (err) {
            res.json({
                code: -1,
                errMsg: err.toString()
            })
        } else {
            let result = {
                msg: "success",
                code: 1
            }
            if (data.toString().indexOf("Error") > -1 || data.toString().indexOf("make") > -1) {
                result.msg = data.toString()
                result.code = -1
            }
            let releaseDate = chinaTime('YYYY-MM-DD HH:mm:ss')
            service
                .updateEditionItem(_id, { releaseDate })
                .then(docs => {
                    res.json({
                        code: result.code,
                        msg: result.msg,
                        releaseDate,
                        data
                    });
                }).catch(e => {
                    throw e;
                });

        }

    })
}


//上传文件
exports.uploadPagefile = function (req, res) {
    var form = new formidable.IncomingForm();
    // 参数：server 远程电脑凭证；localPath 本地路径；remotePath 远程路径；then 回调函数fileName文件对象
    let serviceName = req.body.serviceName || 'TEST';
    server = CONFIG[serviceName].server,
        pageName = CONFIG[serviceName].pageName,
        dirName = req.body.dirName,
        remotePath = req.body.remotePath;
    if (req.body.isUpload) {
        console.log(req.body.isUpload)

        //本地上传文件夹
        form.uploadDir = path.resolve(__dirname, "../../static/uploads");
        //保留文件的拓展名
        form.keepExtensions = true;
        form.parse(req, function (err, fields, files) {
            let fileData = files[dirName],//当前上传文件信息对象
                localPath = fileData.path;
            // fs.rename(localPath, newpath,function(err){
            //     if(err){
            //         throw Error("改名失败");
            //     }
            // });
            service.UploadFile(server, localPath, remotePath, function (err, data) {
                if (err) {
                    res.json({
                        code: -1,
                        errMsg: err.toString(),
                        msg: "上传失败"
                    })
                } else {
                    res.success({ content: fileData, localPath })
                }

            })
        });
        return;
    } else {
        console.log(req.body.serviceName, req.body.serviceName, req.body.remotePath)
        let localPath = path.resolve(__dirname, `../../web/${pageName}/dist.zip`);
        service.UploadFile(server, localPath, remotePath, function (err, data) {
            if (err) {
                res.json({
                    code: -1,
                    errMsg: err.toString(),
                    msg: "上传失败"
                })
            } else {
                res.success({ data })
            }

        })
    }
}
/**
 * 描述：下载文件
 * 参数：server 远程电脑凭证；remotePath 远程路径；localPath 本地路径；then 回调函数
 * 回调：then(err, result)
 */
exports.downloadPagefile = function (req, res) {
    var form = new formidable.IncomingForm();
    // 参数：server 远程电脑凭证；localPath 本地路径；remotePath 远程路径；then 回调函数
    let serviceName = req.query.serviceName || 'TEST',
        remotePath = `/mnt/test/dist.zip`
    const server = CONFIG[serviceName].server
    //本地
    downloadPath = path.resolve(__dirname, "../../static/download/test.text");
    service.DownloadFile(server, remotePath, downloadPath, function (err, data) {
        if (err) {
            res.json({
                code: -1,
                errMsg: err.toString()
            })
        } else {
            res.json({
                "code": 1,
                data
            })
        }
    })
}
/**
 * 描述：下载目录到本地
 * 参数：server 远程电脑凭证；
 *		remotePath 远程路径；
 *		localDir 本地路径，
 *		then 回调函数
 * 回调：then(err)
 */
exports.downloadDir = function (req, res) {
    var form = new formidable.IncomingForm();
    // 参数：server 远程电脑凭证；localPath 本地路径；remotePath 远程路径；then 回调函数
    let serviceName = req.query.serviceName || 'TEST',
        remoteDir = `/root/test-platform-uat/logs`
    const server = CONFIG[serviceName].server
    //本地上传文件夹
    localDir = path.resolve(__dirname, "../../static/download/logs");
    service.DownloadDir(server, remoteDir, localDir, function (err, data) {
        if (err) {
            res.json({
                code: -1,
                errMsg: err.toString(),
                msg: "下载失败"
            })
        } else {
            res.json({
                "code": 1,
                data
            })
        }
    })
}
/**
 * 描述：准备发版文件
 * 参数：pageMame 远程项目名称；
 *		serviceName 项目服务器名称，
 *		branch 远程项目分支；
 */
exports.getEditionPage = function (req, res, next) {
    var pagePath = path.resolve(__dirname, "../../web");
    const pageMame = req.query.pageMame || 'test-platform-fe',//远程项目名称；
        serviceName = req.query.serviceName || 'TEST';//项目服务器名称，
    const CONFIG_OBJ = CONFIG[serviceName],
        branch = req.query.branch || 'master';  //项目发版分支
    console.log(CONFIG_OBJ)
    // delDir(`${pagePath}/${pageMame}`)   //清空文件夹
    const cmdStr1 = `cd ${pagePath} && rm -rf ${pagePath}/* && git clone ${CONFIG_OBJ.gitUrl} && cd ${pagePath}/${pageMame} && git checkout ${branch}`,
        cmdStr2 = `cd ${pagePath}/${pageMame} && cnpm i && npm run build &&  zip -r dist.zip ./dist/`;
    runShell(cmdStr1, next).then(data => {
        let ENV_PATH = path.resolve(__dirname, `${pagePath}/${pageMame}/src/ENV.js`);
        setENV(ENV_PATH, CONFIG_OBJ, next).then(data => {
            if (data.msg === "ok") {
                runShell(cmdStr2, next).then(data => {
                    return res.json({
                        "code": 1,
                        msg: "ok",
                        data
                    })
                })
            }
        })
    })
}
function setENV(ENV_PATH, CONFIG_OBJ, next) {
    let ENVTEXT = `
    const ENV = {
        development: {
            API_DOMAIN: "https://zeus-test.meiwu365.com",
            PASSWORD_DOMAIN: "https://sys-test.meiwu365.com"
        },
        production: {
            API_DOMAIN:"${CONFIG_OBJ.API_DOMAIN}",
            PASSWORD_DOMAIN:"${CONFIG_OBJ.PASSWORD_DOMAIN}"
        }
    };
    // eslint-disable-next-line no-undef
    export default ENV[process.env.NODE_ENV];
    `
    if (fs.existsSync(ENV_PATH)) {
        fs.unlinkSync(ENV_PATH);
    }
    return new Promise((resolve, reject) => {
        //修改配置文件
        fs.writeFile(ENV_PATH, ENVTEXT + "\r\n", function (err) {
            if (err) reject(err)
            resolve({ msg: 'ok', ENVTEXT })
        })
    })
}
function runShell(cmdStr, next) {
    return new Promise((resolve, reject) => {
        exec(cmdStr, function (err, stdout, stderr) {
            if (err) next(err)
            console.log('shell执行成功');
            return resolve({ msg: 'ok' })
            //读取文件
        });
    })
}
function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
function setcodeKey(key) {
    return crypto
        .createHash("SHA256")
        .update(key + "薰衣草")
        .digest("hex");
}
