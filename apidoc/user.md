# 用户

### 1、 用户

此接口为标准的REST API。

```
URL:  http://localhost:6000/api/v1.0.0/users/:uuid
```

资源JSON描述：
```
body: {
  "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ",  // 用户资源URL
  "id": 1,                                          // ID号
  "uuid": "HC7xL43NgLJRDyeXiHNbpQ",                 // 用户UUID
  "name": null,                                     // 用户名称
  "email": "keco339@sina.com",                      // 电子邮箱
  "status": "enabled",                              // 状态   可用："enabled"; 禁用:"disabled"
  "createdAt": "2019-08-22 17:46:14",               // 创建时间
  "modifiedAt": "2019-08-22 17:46:14",              // 修改时间
  "userActivityRecords": {       // 用户参于活动记录列表
    "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ/userActivityRecords"
  },
  "votes": {                    // 用户投票列表
    "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ/votes"
  }
}
```

---
### 2、 注册用户

```
POST  http://localhost:6000/api/v1.0.0/signup
body:
{
  "email": "keco339@sina.com",     // 用户邮件
  "code": "317162",                // 邮件验证码
  "password": "ODg4ODg4"           // 密码  base64
}
```


返回JSON数据描述：
```
statusCode: 200
body: {
  "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ",  // 用户资源URL
  "id": 1,                                          // ID号
  "uuid": "HC7xL43NgLJRDyeXiHNbpQ",                 // 用户UUID
  "name": null,                                     // 用户名称
  "email": "keco339@sina.com",                      // 电子邮箱
  "status": "enabled",                              // 状态   可用："enabled"; 禁用:"disabled"
  "createdAt": "2019-08-22 17:46:14",               // 创建时间
  "modifiedAt": "2019-08-22 17:46:14",              // 修改时间
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiJIQzd4TDQzTmdMSlJEeWVYaUhOYnBRIiwiZW1haWwiOm51bGx9LCJpYXQiOjE1NjY0NjcxNzQsImV4cCI6MTU2OTA1OTE3NH0.Asy1EBeJSwo_bjlM81SY_8P7oMk63tkyaQGl3GTn2Pdn5wyJL9TCcufwv4cRgtYO6R9eQfOwKtC7D5x_kN0o0jZ1xPu4WW9aX5t1wsY2hHI1sF54MP2-XFUbmPMAYA7_isD_-9RPOnfuBBp0slA-atskmpsDP3ks6QEv_lSPP4k"
}
```

错误码处理：

|HTTP状态码|code错误码|描述|
|:---:|:---:|:---|
|400|8000|邮件格式不合法|
|400|8001|用户已经创建|
|400|8002|验证码验证失败|


---
### 3、 用户登录

```
POST request URL http://localhost:6000/api/v1.0.0/login
body:
{
  "email": "keco339@sina.com",     // 用户邮件
  "password": "ODg4ODg4"           // 密码  base64
}
```


返回JSON数据描述：
```
statusCode: 200
body: {
  "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ",  // 用户资源URL
  "id": 1,                                          // ID号
  "uuid": "HC7xL43NgLJRDyeXiHNbpQ",                 // 用户UUID
  "name": null,                                     // 用户名称
  "email": "keco339@sina.com",                      // 电子邮箱
  "status": "enabled",                              // 状态   可用："enabled"; 禁用:"disabled"
  "createdAt": "2019-08-22 17:46:14",               // 创建时间
  "modifiedAt": "2019-08-22 17:46:14",              // 修改时间
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiJIQzd4TDQzTmdMSlJEeWVYaUhOYnBRIiwiZW1haWwiOm51bGx9LCJpYXQiOjE1NjY0NjcxNzQsImV4cCI6MTU2OTA1OTE3NH0.Asy1EBeJSwo_bjlM81SY_8P7oMk63tkyaQGl3GTn2Pdn5wyJL9TCcufwv4cRgtYO6R9eQfOwKtC7D5x_kN0o0jZ1xPu4WW9aX5t1wsY2hHI1sF54MP2-XFUbmPMAYA7_isD_-9RPOnfuBBp0slA-atskmpsDP3ks6QEv_lSPP4k"
}
```

错误码处理：

|HTTP状态码|code错误码|描述|
|:---:|:---:|:---|
|404|8000|用户未注册|
|404|8001|账号密码不匹配|
