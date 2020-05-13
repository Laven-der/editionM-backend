/**
 * Created by lavender on 2018/4/14.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema(
  {
    "avatar": String,
    "id": Number,
    "name": String,
    "mobile": String,
    "sex": String,
    "email": String,
    "city": String,
    "idcard": String,
    "birthday": String,
    "password":String,
    "desc": String,
    "group": String,
    "desc": String,
    "avatar": String,
    "interest": Array,
    "roles":Array
  }
);
module.exports = mongoose.model("User", User);