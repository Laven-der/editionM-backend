## Technology stack

express@4.16.2 + mongoose@4.10.6 + ssh2@0.8.5 + gulp-api-doc@2.2.0 + gulp-nodemon@2.2.1 + apidoc-markdown2@0.3.6

简体中文 | [English](./README.md)

## 简介

[editionM-backend](https://github.com/Laven-der/editionM-backend) 是一个后台集成解决方案，它基于 [express](https://www.expressjs.com.cn/) 和 [ssh2](https://www.npmjs.com/package/ssh2)。它使用了基于分布式文件存储的数据库
[mongodb](https://www.mongodb.org.cn/)，提供简易的用户管理（登录、权限验证配置等），利用本地请求触发服务器执行 sh，达到项目发版管理，如果只是想拉取或者上传服务器功能，以及触发服务器 sh 功能，主要是解决公司前端具有多个服务器环境，发布项目分支，便捷修改不同环境域名api代理入口，可配套前端web项目，实现界面发版功能，记录发版时间，及时回滚，取决于你编辑的sh脚本多样性😁；

sh链接服务器传送入口 | [sh-server](./bin/sh-utils/start.sh)

或者配置成通过读取.list文件，具体执行什么操作，如发布指定版本等详情请查看sh
## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 、[git](https://git-scm.com/)和[mongodb](https://www.mongodb.org.cn/)

## 开发

```bash
# 克隆项目
git clone https://github.com/Laven-der/editionM-backend.git
cd editionM-backend

# 建议用淘宝cnpm 安装 可以通过如下操作解决 npm 下载速度慢的问题
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装依赖
cnpm install

```

## 配置 mongo 数据库

查看.env 配置之后 | [mongo 配置](./MONGOD.md)

```bash
# 先执行mock数据脚本
npm run mock

# 或者 手动启动mongo并初始化数据
cd ./bin && node ./creat.js && ./init.sh

```

## 发布

#### 提示：需要在根目录新建 config.js 文件

```
// 具体内容如下
const config = {
   TEST: {
      server: {
         host: "122.222.0.13",//服务器ip
         port: 22,
         username: "root", // Avoid authority expiration
         password: "lavender.test$"
      },
      API_DOMAIN: "http://laven-zeus.test.com",
      PASSWORD_DOMAIN: "http://laven-sys.test.com",
      gitUrl: "https://github.com/Laven-der/editionM-backend.git",
      pageName: "test"
   }
};
module.exports = config;
```

```bash
# 启动服务
npm start

# 生成接口api文档
npm run doc

```

浏览器访问 http://localhost:6060

api 文档浏览器访问 http://127.0.0.1:6060/docs/


## 便捷链接服务器环境sh案例



---
