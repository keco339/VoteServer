
# API DOC

此文档为投票服务组件的接口说明文档。

### 1、功能接口

  1.  [发送邮件验证码](verificationCode.md#1)
  2.  [用户注册](user.md#2)
  3.  [用户登录](user.md#3)
  4.  [候选人](candidate.md#1)
  5.  [投票活动](activity.md#1)
  6.  [用户投票](vote.md#2)
  7.  [用户投票记录](userActivityRecord.md#1)
  8.  [活动候选人投票统计](activity.md#)


### 2、 REST说明

以候选人为例

1、创建资源
```
POST http://localhost:6000/api/v1.0.0/candidates
body:
{
  "name": "张三",
  "description": "第四届政法委员"
}
```

返回
```
statusCode: 201
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w",
  "id": 1,
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w",
  "name": "张三",
  "description": "第四届政法委员",
  "createdAt": "2019-08-22 18:28:19",
  "modifiedAt": "2019-08-22 18:28:19"
}
```

2、获取资源
```
GET http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w
path:
{
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w", // 资源UUID
}
```

返回
```
statusCode: 200
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w",
  "id": 1,
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w",
  "name": "张三",
  "description": "第四届政法委员",
  "createdAt": "2019-08-22 18:28:19",
  "modifiedAt": "2019-08-22 18:28:19"
}
```


3、更新资源
```
POST http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w
path:
{
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w", // 资源UUID
}
body:
{
  "description": "第五届政法委员"
}
```

返回
```
statusCode: 200
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w",
  "id": 1,
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w",
  "name": "张三",
  "description": "第五届政法委员",
  "createdAt": "2019-08-22 18:28:19",
  "modifiedAt": "2019-08-22 18:29:30"
}
```

4、列表查询资源
```
GET http://localhost:6000/api/v1.0.0/candidates?name=张三
querystring:
{
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w",
  "name": "张三A",
  "description": "第四届政法委员",
}
```

返回
```
statusCode: 200
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidates?name=张三",
  "offset": 0,
  "limit": 1,
  "size": 1,
  "items": [
    {
      "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w",
      "id": 1,
      "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w",
      "name": "张三",
      "description": "第四届政法委员",
      "createdAt": "2019-08-22 18:28:19",
      "modifiedAt": "2019-08-22 18:28:19"
    }
  ]
}
```



### 3、 Error错误

```
statusCode: 400                             // HTTP状态码
body: {
  "name": "Error",                          // 错误
  "statusCode": 400,                        // 状态码
  "code": 8001,                             // 错误码
  "message": "Unknown Error",               // 消息
  "description": "The user had created!",   // 描述
}
```


