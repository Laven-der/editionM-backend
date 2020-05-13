let AWS = require("aws-sdk");
var fs = require("fs");
var OSS = require("ali-oss");
var str = process.env.S3;
const S3 = JSON.parse(str)
class Storage {
    constructor(client, bucket) {
        if (!!client) {
            this.client = client;
            this.bucket = bucket;
        } else {
            if (process.env.FILE_SYSTEM === "oss") {
                this.client = new OSS(process.env.OSS);
            } else if (process.env.FILE_SYSTEM === "s3") {
                if (!!bucket) {
                    this.client = new AWS.S3(S3.options);
                    this.bucket = bucket;
                } else {
                    this.client = new AWS.S3(S3.options);
                    this.bucket = S3.bucket;
                }
            }
        }
        this.FILE_SYSTEM = process.env.FILE_SYSTEM;
    }

    /********************************** 查询 ********************************/

    /**
     * 判断对象的存在性
     * @param key
     * @returns {Promise}
     */
    async getExif(key) {
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            // return co.wrap(function* (key) {
            //     return yield client.head(key);
            // })(key);
            return client.head(key);
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.client.headObject({ Bucket: this.bucket, Key: key }, function (
                    err,
                    metadata
                ) {
                    if (err && err.code === "NotFound") {
                        reject(err);
                    } else {
                        resolve(metadata);
                    }
                });
            });
        }
    }

    /**
     * 列出请求目录下的目录和文件
     * @param prefix    目录
     * @returns {Promise}
     */
    async listObjects(prefix) {
        if (prefix !== "" && prefix[prefix.length - 1] !== "/") {
            prefix += "/";
        }
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            // return co.wrap(function* (prefix) {
            //     return yield client.list({
            //         prefix: prefix,
            //         // delimiter: '/',
            //         'max-keys': 1000
            //     });
            // })(prefix);
            return client.list({
                prefix: prefix,
                "max-keys": 1000
            });
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.client.listObjects(
                    {
                        Bucket: this.bucket,
                        // Delimiter: '/',
                        Prefix: prefix
                    },
                    function (err, data) {
                        if (err) {
                            console.log(err, err.stack); // an error occurred
                            reject(err);
                        } else {
                            // successful response
                            resolve(data);
                        }
                    }
                );
            });
        }
    }

    /********************************** 下载 ********************************/

    /**
     * 从服务器获取buffer对象
     * @param key
     * @returns {*}
     */
    async getObject(key) {
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            // return co.wrap(function* (key) {
            //     return yield client.get(key);
            // })(key).then(result => {
            //     return {
            //         AcceptRanges: result.res.headers['accept-ranges'],
            //         Body: result.content,
            //         ContentLength: result.res.size,
            //         ContentType: result.res.headers['content-type'],
            //         ETag: result.res.headers.etag,
            //         LastModified: result.res.headers['last-modified'],
            //         Metadata: null,
            //         res: result.res,
            //     }
            // });

            const result = await client.get(key);
            return {
                AcceptRanges: result.res.headers["accept-ranges"],
                Body: result.content,
                ContentLength: result.res.size,
                ContentType: result.res.headers["content-type"],
                ETag: result.res.headers.etag,
                LastModified: result.res.headers["last-modified"],
                Metadata: null,
                res: result.res
            };
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.client.getObject({ Bucket: this.bucket, Key: key }, function (
                    err,
                    data
                ) {
                    if (err) {
                        return reject(err);
                    } else {
                        // console.log(data);           // successful response
                        return resolve(data);
                    }
                });
            });
        }
    }

    /**
     * 下载存储服务中的文件到本地
     * @param key
     * @param file
     * @returns {Promise.<TResult>}
     */
    downloadObject(key, file) {
        console.log("我是下载");
        return this.getObject(key).then(result => {
            fs.writeFileSync(file, result.Body);
            return result;
        });
    }

    /**
     * 获取目录下的所有文件
     * @param dir
     * @returns {*}
     */
    readDir(dir) {
        if (this.FILE_SYSTEM === "oss") {
            return this.listObjects(dir).then(async result => {
                if (result.objects != null) {
                    let i = 0;
                    let lists;
                    // return co(function*(){
                    //     result.objects = result.objects.filter(function(obj) {
                    //        return obj.name.substr(obj.name.length - 1) != '/';
                    //     });
                    //     return yield result.objects.map(co.wrap(function* (obj) {
                    //         let str = yield this.getObject(obj.name);
                    //         return {
                    //             path: obj.name,
                    //             body: str.Body
                    //         };
                    //     }).bind(this));
                    // }.bind(this));
                    result.objects = result.objects.filter(function (obj) {
                        return obj.name.substr(obj.name.length - 1) != "/";
                    });
                    return result.objects.map(async item => {
                        let str = await this.getObject(obj.name);
                        return {
                            path: obj.name,
                            body: str.Body
                        };
                    });
                } else {
                    return [];
                }
            });
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.listObjects(dir)
                    .then(async result => {
                        var contentPromise;

                        if (result.Contents.length != 0) {
                            let lists;
                            //   co(
                            //     function*() {
                            //       resolve(
                            //         yield result.Contents.map(
                            //           co.wrap(
                            //             function*(content) {
                            //               let str = yield this.getObject(content.Key);
                            //               return {
                            //                 path: content.Key,
                            //                 body: str.Body
                            //               };
                            //             }.bind(this)
                            //           )
                            //         )
                            //       );
                            //     }.bind(this)
                            //   );
                            resolve(
                                result.Contents.map(async content => {
                                    let str = await this.getObject(content.Key);
                                    return {
                                        path: content.Key,
                                        body: str.Body
                                    };
                                }
                                )
                            )
                        } else {
                            resolve([]);
                        }
                    })
                    .catch(err => {
                        throw err;
                        console.log(err);
                    });
            });
        }
    }

    /********************************** 上传 ********************************/

    /**
     * 将 buffer 上传存储服务
     * @param key
     * @param buffer
     * @returns {*}
     */
    async putObject(key, buffer) {
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            //   return co
            //     .wrap(function*(key, buffer) {
            //       return yield client.put(key, buffer, { timeout: 100000 });
            //     })(key, buffer)
            //     .then(result => {
            //       result.ETag = result.res.headers.etag;
            //       return result;
            //     });
            const result = await client.put(key, buffer, { timeout: 100000 });
            result.ETag = result.res.headers.etag;
            return result
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.client.putObject(
                    { Bucket: this.bucket, Key: key, Body: buffer },
                    function (err, data) {
                        if (err) {
                            console.log(err, err.stack); // an error occurred
                            return reject(err);
                        } else {
                            return resolve(data);
                            // console.log(data);           // successful response
                        }
                    }
                );
            });
        }
    }

    /**
     * 上传文件到存储服务中
     * @param key
     * @param file
     */
    uploadObject(key, file) {
        var arrayBuffer = fs.readFileSync(file);
        return this.putObject(key, arrayBuffer);
    }

    /********************************** 复制 ********************************/

    /**
     * 复制目录
     * @param oriDir 原路径
     * @param dstDir 目标路径
     * @returns {Promise.<TResult>}
     */
    copyDir(oriDir, dstDir) {
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            return this.listObjects(oriDir).then(result => {
                if (result.objects != null) {
                    result.objects.forEach(async obj => {
                        //     co(function*() {
                        //       yield client.copy(
                        //         dstDir + obj.name.slice(oriDir.length),
                        //         obj.name
                        //       );
                        //     }).catch(function(err) {
                        //       console.error(err);
                        //     });
                        //   });
                        try {
                            await client.copy(
                                dstDir + obj.name.slice(oriDir.length),
                                obj.name
                            );
                        } catch (error) {
                            console.error(err);
                        }

                    });
                    return result.objects;
                } else {
                    return [];
                }
            });
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.listObjects(oriDir)
                    .then(result => {
                        if (result.Contents.length != 0) {
                            var promises = result.Contents.map(content => {
                                return new Promise((resolve, reject) => {
                                    this.client.copyObject(
                                        {
                                            Bucket: this.bucket,
                                            CopySource: "/" + this.bucket + "/" + content.Key,
                                            Key: dstDir + content.Key.slice(oriDir.length)
                                        },
                                        function (err, data) {
                                            if (err) {
                                                console.log(err, err.stack);
                                                reject(err);
                                            } else {
                                                resolve(data);
                                            }
                                        }
                                    );
                                });
                            });

                            return resolve(Promise.all(promises));
                        } else {
                            resolve();
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
    }

    /********************************** 删除 ********************************/

    /**
     * 删除对象
     * @param key
     * @returns {Promise}
     */
    async deleteObject(key) {
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            return await client.delete(key);
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.client.deleteObject({ Bucket: this.bucket, Key: key }, function (
                    err,
                    data
                ) {
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                        return reject(err);
                    } else {
                        return resolve(data); // successful response
                    }
                });
            });
        }
    }

    /**
     * 删除目录
     * @param prefix    要删除的文件目录
     * @returns {Promise}
     * @constructor
     */
    removeDir(prefix) {
        if (this.FILE_SYSTEM === "oss") {
            let client = this.client;

            return this.listObjects(prefix).then(async result => {
                var contentPromise;

                if (result.objects != null) {
                    var names = result.objects.map(obj => {
                        return obj.name;
                    });

                    contentPromise = await client.deleteMulti(names, { quiet: true });

                }

                return contentPromise;
            });
        } else if (this.FILE_SYSTEM === "s3") {
            return new Promise((resolve, reject) => {
                this.listObjects(prefix).then(result => {
                    var contentPromise;

                    if (result.Contents.length != 0) {
                        var keys = result.Contents.map(content => {
                            return { Key: content.Key };
                        });

                        this.client.deleteObjects(
                            {
                                Bucket: this.bucket,
                                Delete: { Objects: keys }
                            },
                            function (err, data) {
                                if (err) {
                                    console.log(err, err.stack);
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    } else {
                        resolve();
                    }
                });
            });
        }
    }
}

module.exports = Storage;

// var ossClient = new OSS({
//     region: 'oss-cn-beijing',
//     accessKeyId: 'LTAI0H5xzdRAn3bF',
//     accessKeySecret: 'PIpjwC8kKNc81BVSF13MET0yZUqujK',
//     bucket: 'mapdesign',
//     secure: true,
//     internal: global.env === "production",
//     timeout: '3600s'
// });

// var storage = new Storage(ossClient);

// var file = storage.getObject('code/raster.json')
//     .then(result => {
//         console.log('code/raster.json');
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.getExif('code/raster1.json')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// let buffer = fs.readFileSync('/Users/lavender/Downloads/test1.zip');
// storage.putObject('test/test.zip', buffer)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.deleteObject('test/test.zip')
//     .then(reuslt => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.listObjects('')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log(error);
//     });

// let s3Client = new AWS.S3(s3.options);
// var storage = new Storage(s3Client, 'test');

// storage.getObject('test1.zip');

// storage.getExif('test2.zip')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// let buffer = fs.readFileSync('/Users/lavender/Downloads/test1.zip');
// storage.putObject('test/test.zip', buffer)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.deleteObject('test/test.zip')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.listObjects('tilelive-s3')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.removeDir('test')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.copyDir('test', 'test1')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// storage.uploadObject('upload.docx', '/Users/lavender/Downloads/95510_user_guide.docx');
// storage.downloadObject('laker.zip', '/Users/lavender/Downloads/download.zip');
