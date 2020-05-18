English | [ 简体中文](./README.md)

## Technology stack

express@4.16.2 + mongoose@4.10.6 + ssh2@0.8.5 + gulp-api-doc@2.2.0 + gulp-nodemon@2.2.1 + apidoc-markdown2@0.3.6

## Project introduce

```bash
# clone the project

 git clone https://github.com/Laven-der/editionM-backend.git

 cd editionM-backend

# It is recommended to use Taobao cnpm installation to solve the problem of slow download speed of NPM through the following operations
 npm install -g cnpm --registry=https://registry.npm.taobao.org

# install dependency

 cnpm install
```

## Mongo-init

read .env | [mongo-config](./MONGOD.md)

```bash
# create mock data
 npm run mock

```

#### Notice

#### Tip: you need to create a new one in the project root directory | config.js

```
// example
const config = {
   TEST: {
      server: {
         host: "122.222.0.13",//server IP
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
# develop
npm run start
```

and if you want to generate API documentation

```bash
npm run doc
```

API | This will automatically open http://127.0.0.1:6060/docs/

---
