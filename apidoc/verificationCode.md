# 邮件验证码

---
### 1、 发送邮件验证码

通过向注册的邮件发送验证码，验证邮件的合法性。

```
POST  http://localhost:6000/api/v1.0.0/sendEmailVerificationCode
body: {
  "email": "keco339@sina.com"   // 邮件 必填
}
```


返回JSON数据描述：
```
statusCode: 200
body: {
  "ret": true    // 发送是否成功  成功: true; 失败: false
}
```

错误码处理：

|HTTP状态码|code错误码|描述|
|:---:|:---:|:---|
|400|8000|邮件格式不合法|
