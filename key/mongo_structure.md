# memory mongoDB 数据结构分析

## 1 数据表结构

### 1.1 DataSets（数据编辑器）

| 字段名 | 字段含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bounds | features 的边界 | Array | [0, 0, 0, 0] |
| created | 创建时间 | Date | ‘’ |
| description | 描述 | String | 无 |
| features | 要素数量 | Number | 0 |
| isDeleted | 删除标识 | Boolean | false |
| modified | 修改时间 | Date | 无 |
| name | 数据集名称 | String | 无 |
| owner | 用户 ID | String | 无 |
| size | 文件大小 | Number | 0 |
| editcount | 要素数量 | Number | 0 |
| focuspoint | 当前视口 | mongoose.Schema.Types.Mixed | {bearing: 0, latitude:0, zoom:0, pitch:0, longitude:0} |
| studioPreferences | 外观 | mongoose.Schema.Types.Mixed | {} |
| tilesets | 关联的瓦片 | mongoose.Schema.Types.Mixed | {} |

### 1.2 Ent（用户）

| 字段名 | 字段含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| createTime | 创建时间 | Date | 无 |
| modifyTime | 修改时间（未使用） | Date | 无 |
| isDelete | 删除标识（1 已删除；空或0 未删除） | String | 无 |
| eId | 用户 ID | String | 无 |
| secrete | 密钥（已失效） | String | 无 |
| validateTime | 签名有效时间（已失效） | Number | 无 |
| password | 密码 | String | 无 |
| tel | 手机号 | String | 无 |
| email | 电子邮箱 | String | 无 |
| emailVerify | 邮箱是否验证 | String | 无 |
| status | 账户状态（0 正常；1 停用） | String | 无 |
| accountType | 账户类型（0 免费帐户；1 收费帐户） | Number | 无 |
| profileUrl | 头像地址 | String | 无 |
| name | 名字 | String | 无 |
| position | 职位 | String | 无 |
| contactNumber | 联系电话 | String | 无 |
| birthday | 生日 | String | 无 |
| address | 地址 | String | 无 |
| webSite | 网址 | String | 无 |

### 1.3 Font（地图集中字体）

| 字段名 | 字段含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fontname | 字体全称 | String | 无 |
| owner | 用户 ID | String | 无 |
| scope | 公有/私有字体（public/secret）(已失效) | String | 'public' |
| isDeleted | 删除标识 | Boolean | false |
| familyName | 字体族名 | String | 无 |
| styleName | 字体样式名 | String | 无 |
| codepoints | 码位 | Array | [] |

### 1.4 StyleSet（地图集）

| 字段名 | 字段含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 样式集名称 | String | 无 |
| owner | 用户 ID | String | 无 |
| createTime | 创建时间 | Date | 无 |
| drafted | 草稿样式修改时间 | Date | 无 |
| published | 样式发布时间 | Date | 无 |
| draftStyle | 草稿样式 | Object | 无 |
| draftSprite | 草稿雪碧图（已作废） | Object | 无 |
| publishStyle | 发布样式 | Object | 无 |
| publishSprite | 发布雪碧图（已作废） | Object | 无 |

### 1.5 TileSet（数据列表）

| 字段名 | 字段含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 瓦片名称 | String | 无 |
| fields | （已作废） | String | 无 |
| dsname | （已作废） | String | 无 |
| param | （已作废） | String | 无 |
| state | 状态（success 成功） | String | 无 |
| eId | 用户 ID | String | 无 |
| size | （已作废） | Number | 无 |
| json | json 对象 | Object | 无 |
| jsonstats | jsonstats 对象 | Object | 无 |
| isDeleted | 删除标识 | Boolean | false |

### 1.6 Uploads（上传列表）

| 字段名 | 字段含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| complete | 是否完成 | Boolean | false |
| created | 创建时间 | Date | 无 |
| error | 错误信息 | Object | 无 |
| isDeleted | 删除标识 | Boolean | false |
| modified | 修改时间 | Date | 无 |
| name | 瓦片名称 | String | 无 |
| owner | 用户 ID | String | 无 |
| progress | 进度 | Number | 无 |
| tileset | 瓦片 ID | String | 无 |

## 2 模版库建立

1. 初始化用户表：

    根据用户需求，在 ent 表中加入用户记录。（eId 为 ent 的用户为必要的一条记录）

2. 初始化字体：

    加入一些英文字体和中文字体的记录，并在文件服务器中加入对应字体。

3. 初始化地图模版

    在 ent 用户中，加入一些公共模版库的记录。


