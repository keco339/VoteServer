# 用户投票记录

### 1、 用户投票记录

此接口为标准的REST API。

```
URL:  http://localhost:6000/api/v1.0.0/userActivityRecords/:uuid
```

资源JSON描述：
```
body: {
  "href": "http://localhost:6000/api/v1.0.0/userActivityRecords/e4IlHZER6wv3WAhMz3F9FA", // 记录资源URL
  "id": 1,                                       // ID号
  "uuid": "e4IlHZER6wv3WAhMz3F9FA",              // 记录UUID
  "userUUID": "HC7xL43NgLJRDyeXiHNbpQ",          // 用户UUID
  "activityUUID": "AQCfakMaIu2Rn7V2OlxQKQ",      // 活动UUID
  "createdAt": "2019-08-23 15:06:23",
  "modifiedAt": "2019-08-23 15:06:23",
  "user": {
    "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ"
  },
  "activity": {
    "href": "http://localhost:6000/api/v1.0.0/activities/AQCfakMaIu2Rn7V2OlxQKQ"
  }
}
```
