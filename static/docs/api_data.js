define({ "api": [
  {
    "type": "POST",
    "url": "/register",
    "title": "注册用户",
    "group": "Users",
    "version": "0.0.1",
    "description": "<p>用于注册用户</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "vip",
            "defaultValue": "0",
            "description": "<p>是否注册Vip身份 0 普通用户 1 Vip用户</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "recommend",
            "description": "<p>邀请码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求样例：",
          "content": "?account=sodlinken&password=11223344&mobile=13739554137&vip=0&recommend=",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>信息</p>"
          },
          {
            "group": "200",
            "type": "int",
            "optional": false,
            "field": "code",
            "description": "<p>0 代表无错误 1代表有错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回样例:",
          "content": "{\"code\":\"0\",\"msg\":\"注册成功\"}",
          "type": "json"
        }
      ]
    },
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/UserController.js",
    "groupTitle": "Users",
    "name": "PostRegister"
  },
  {
    "type": "post",
    "url": "/api/member/addMember",
    "title": "新增用户信息",
    "description": "<p>新增用户信息</p>",
    "name": "addMember",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "interest",
            "description": "<p>爱好</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>新增成功1 失败-1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>信息提示</p>"
          }
        ],
        "Response 500": [
          {
            "group": "Response 500",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>500</p>"
          },
          {
            "group": "Response 500",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"code\" : 1\n        \"message\" : \"新增成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response 500 Example",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500\n  \"message\": \"SERVER_ERROR\"\n  \"error\":\"test is not defined\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/MemberController.js",
    "groupTitle": "member"
  },
  {
    "type": "get",
    "url": "/api/member/deleteMember",
    "title": "批量删除用户",
    "description": "<p>批量删除用户</p>",
    "name": "deleteMember",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "id",
            "description": "<p>删除项目id[]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>删除成功1 失败-1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>信息提示</p>"
          }
        ],
        "Response 500": [
          {
            "group": "Response 500",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>500</p>"
          },
          {
            "group": "Response 500",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"code\" : 1\n        \"message\" : \"删除成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response 500 Example",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500\n  \"message\": \"SERVER_ERROR\"\n  \"error\":\"test is not defined\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/MemberController.js",
    "groupTitle": "member"
  },
  {
    "type": "post",
    "url": "/api/member/updateMember",
    "title": "更新用户信息",
    "description": "<p>更新用户信息</p>",
    "name": "updateMember",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "interest",
            "description": "<p>爱好</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>更新成功1 失败-1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>信息提示</p>"
          }
        ],
        "Response 500": [
          {
            "group": "Response 500",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>500</p>"
          },
          {
            "group": "Response 500",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"code\" : 1\n        \"message\" : \"更新成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response 500 Example",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500\n  \"message\": \"SERVER_ERROR\"\n  \"error\":\"test is not defined\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/MemberController.js",
    "groupTitle": "member"
  },
  {
    "type": "post",
    "url": "/api/user/doLogin",
    "title": "登录接口",
    "description": "<p>登录并获取用户信息</p>",
    "name": "doLogin",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>是否登录成功1 失败-1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>信息提示</p>"
          }
        ],
        "Response 500": [
          {
            "group": "Response 500",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>500</p>"
          },
          {
            "group": "Response 500",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"code\" : 1\n        \"message\" : \"登录成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response 500 Example",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500\n  \"message\": \"SERVER_ERROR\"\n  \"error\":\"test is not defined\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/UserController.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/getUserinfo",
    "title": "获取用户信息",
    "description": "<p>获取用户信息</p>",
    "name": "getUserinfo",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ACCESS-TOKEN-STAGE",
            "description": "<p>用户cookies</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>地址</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "interest",
            "description": "<p>爱好</p>"
          }
        ],
        "Response 500": [
          {
            "group": "Response 500",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>500</p>"
          },
          {
            "group": "Response 500",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [{\n        \"_id\": \"5cce5352a0271220b469c308\",\n        \"email\": \"user@qq.com\",\n        \"avatar\": \"http://test/test.png\"\n        \"sex\": \"男\",\n        \"name\": \"小明\",\n        \"birthday\": \"1997-01-07T16:00:00.000Z\",\n        \"city\": \"北京市海淀区\",\n        \"desc\": \"这个人很懒，什么都没留下\",\n        \"__v\": 0,\n        \"interest\": [\"看电影\", \"睡懒觉\", \"看书\"]\n    }]\n}",
          "type": "json"
        },
        {
          "title": "Response 500 Example",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500\n  \"message\": \"SERVER_ERROR\"\n  \"error\":\"test is not defined\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/UserController.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/setUserinfo",
    "title": "修改用户信息",
    "description": "<p>修改用户信息</p>",
    "name": "setUserinfo",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>所在地</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "desc",
            "description": "<p>描述</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "interest",
            "description": "<div><table border=\"0\">                         <tr>                           <th>参数</th>                           <th>备注</th>                         </tr>                         <tr>                           <td>interest</td>                               <td><ul style=\"text-decoration:none;\">                             <li>{ \"code\" : 1 ,\"message\" : \"修改成功\"}</li>                             <li>{ \"code\" : 1 ,\"message\" : \"修改成功\"}</li>                             <li>{ \"code\" : 1 ,\"message\" : \"修改成功\"}</li>                             <li>{ \"code\" : 1 ,\"message\" : \"修改成功\"}</li>                             <li>{ \"code\" : 1 ,\"message\" : \"修改成功\"}</li>                             <li>{ \"code\" : 1 ,\"message\" : \"修改成功\"}</li>                           </ul></td>                            </tr>                         </table></div>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>修改成功1 失败-1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>信息提示</p>"
          }
        ],
        "Response 500": [
          {
            "group": "Response 500",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>500</p>"
          },
          {
            "group": "Response 500",
            "type": "string",
            "optional": true,
            "field": "message",
            "description": "<p>error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"code\" : 1\n        \"message\" : \"修改成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response 500 Example",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500\n  \"message\": \"SERVER_ERROR\"\n  \"error\":\"test is not defined\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "c:/Users/Administrator/Desktop/work/memory-backend/src/controllers/UserController.js",
    "groupTitle": "user"
  }
] });
