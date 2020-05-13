/**
 * Created by jrontend on 2018/3/20.
 */
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('connecting', function () {
    console.log('connecting to MongoDB...');
});

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function () {
    console.log('MongoDB connected!');
});
db.once('open', function () {
    console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
    console.log('MongoDB disconnected!');
    connectDb()
});
const connectDb = () => {
    mongoose.connect(process.env.MONGOURL || 'mongodb://localhost:27017/memory', {
        "auth": {
            "authdb": process.env.MONGO_AUTH_DB || 'admin'
        },
        "user": process.env.MONGO_USER || 'admin',
        "pass": process.env.MONGO_PWD || 'root123',
        "server": {
            "socketOptions": {
                "keepAlive": 1
            },
            "auto_reconnect": true
        }
    });
    mongoose.set('useCreateIndex', true);
}
connectDb()