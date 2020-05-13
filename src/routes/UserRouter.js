const express = require('express');
// const validate = require('express-validation');
const route = express.Router();

const UserController = require('../controllers/UserController');




// route.get("/login", UserController.login);
route.post("/doLogin", UserController.doLogin);
route.post("/setUserinfo", UserController.setUserinfo);
route.get("/getUserinfo", UserController.getUserinfo);
route.post("/register", UserController.register);
route.get("/checkEmail", UserController.checkEmail);
route.post("/upload", UserController.upload);
route.post("/sendEmail", UserController.sendEmail);
// route.checkout("/regist", UserController.checkUserExist);
// route.post("/regist", UserController.addUser);
// route.post("/up", UserController.up)
// route.post("/docut", UserController.docut);
// route.get("/getAvatar", UserController.getAvatar);
// route.post("/changeWpan", UserController.changeWpan);
// route.get("/showwpan", UserController.showwpan);
// route.post("/addwpan", UserController.addwpan);

// route.get("/", UserController.showInfo);
// route.get("/#/*", UserController.showInfo);

// route.get("/regist", UserController.regist);
// route.checkout("/login", UserController.showInfo);
// route.post("/changeUser", UserController.changeUser);
module.exports = route;