const UserRouter = require('./UserRouter');
const EditionRouter = require("./EditionRouter");
module.exports = (app) => {
    app.use('/api/user', UserRouter),
        app.use('/api/edition', EditionRouter)
}