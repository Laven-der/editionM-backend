
/**
 * Created by lavender on 2019/10/14.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Edition = new Schema(
    {
        serviceName: String,
        server: Object,
        pageName: String,
        remotePath: String,
        apiDomain: String,
        resetDomain: String,
        gitUrl: String,
        branch: String,
        tag: String,
        date: Date,
        releaseDate: String
    }
);
module.exports = mongoose.model("Edition", Edition);