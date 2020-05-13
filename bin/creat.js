var fs = require("fs");
var path = require("path");
//引入一个产生随机数据非常方便的包：
var Mock = require("mockjs");
var Random = Mock.Random;

//准备写入的文件的地址
var xieruwenjianURL = path.resolve(__dirname, "./users-mock.txt");

//如果已经要写入的文件存在，就删除准备写入的文件
//fs.existsSync()表示判断文件是否存在
//fs.unlinkSync()表示删除文件
if (fs.existsSync(xieruwenjianURL)) {
    fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘users-mock.txt’已经删除，即将开始写入新数据...");
getData = (count = 100) => {
    let List = []
    for (let i = 0; i < count; i++) {
        let mockData = {
            id: '@increment',
            timestamp: +Mock.Random.date('T'),
            author: '@first',
            "name": Random.cname(),						//会员姓名
            "mobile": Mock.mock(/^((13[0-9])|(14[57])|(15([5-9]))|(18[5-9]))\d{8}$/),			//手机号
            "sex": Random.pick(["男", "女"]),
            "city": Random.city(true),
            "idcard": Random.integer(100000000000000000, 900000000000000000),
            "email": Random.email(),
            "_id": "5da51082d5d3bbd2f9c93390",
            "username": "admin",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dzantievm/128.jpg",
            "interest": Random.pick(["听歌", "看电视", "睡觉"]),
            "roles": Random.pick(["admin", "ele"]),
            "password": "c9c51c5dc6f69a34f4e4f915225e1253010056ea3a0ba47963f4d314233a98ed"
        }
        List.push(Mock.mock(mockData))
        //写入最终生成的文件
        fs.appendFileSync(xieruwenjianURL, JSON.stringify(List[i]) + "\r\n");

    }
}
const count = 1;
getData(count)

console.log(`已经写入${count}条新数据，快打开‘users-mock.txt’看看吧！`);
