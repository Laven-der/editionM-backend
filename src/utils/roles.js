// 引入模块依赖
const path = require('path');
// 创建 token 类
class Permission {
    constructor(data) {
        this.roles = data.roles;
        this.url = data.url;
        console.log(this.url)
    }
    // 校验token
    verifyRoles() {
        let roles = this.roles;
        let flag = false;
        if (this.url.indexOf('/api/edition/getEditionPage') > -1) {
            if (roles.includes('admin')) {
                flag = true
            } else {
                flag = false;
            }
        } else {
            flag = true;
        }

        return flag;
    }
}
module.exports = Permission;



