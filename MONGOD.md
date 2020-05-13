### 设置 mongo 的用户名密码，及其数据库密码

#### 1、如何创建用户管理员

```bash
# 用户管理员是第一个要创建的用户。在没有创建任何用户之前，你可以随意创建用户；但数据库中一旦有了用户，那么未登录的客户端就没有权限做任何操作了，除非使用db.auth(username, password)方法登录。

# 用户管理员的角色名叫 userAdminAnyDatabase，这个角色只能在 admin 数据库中创建。下面是一个例子

 mongo
> use admin
switched to db admin
> db.createUser({user:"root",pwd:"root123",roles:["userAdminAnyDatabase"]})
Successfully added user: { "user" : "root", "roles" : [ "userAdminAnyDatabase" ] }

# 这个例子创建了一个名为 root 的用户管理员。创建完了这个用户之后，我们应该马上以该用户的身份登录：

> db.auth("root","root123")
# 方法返回 1 表示登录成功。接下来我们为指定的数据库创建访问所需的账号。
1
db.auth()

```

#### 2、如何创建数据库用户

```bash
# 首先保证你已经以用户管理员的身份登录 admin 数据库。然后用 use 命令切换到目标数据库，同样用 db.createUser() 命令来创建用户，其中角色名为 “readWrite”。

# 普通的数据库用户角色有两种，read 和 readWrite。顾名思义，前者只能读取数据不能修改，后者可以读取和修改。
# 下面是一个例子：

> use flower
switched to dbflower
> db.createUser({user:"admin",pwd:"root123",roles:["readWrite"]})
Successfully added user: { "user" : "admin", "roles" : [ "readWrite" ] }
> db.auth("admin","root123")
1

```
