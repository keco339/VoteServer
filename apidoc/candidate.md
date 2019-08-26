# 候选人

### 1、 候选人

此接口为标准的REST API。

```
URL:  http://localhost:6000/api/v1.0.0/candidates/:uuid
```

资源JSON描述：
```
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w", // 候选人资源URL
  "id": 1,                                  // ID号
  "uuid": "CvO0TtCLj44Z6KQ3Kb3X4w",         // 候选人UUID
  "name": "张三",                            // 候选人名称
  "description": "第四届政法委员",             // 简介与描述
  "createdAt": "2019-08-22 18:28:19",       // 创建时间
  "modifiedAt": "2019-08-22 18:28:19"       // 修改时间
  "candidateActivitiesMemberships": {
    "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w/candidateActivitiesMemberships"
  },
  "activities": {                           // 候选人所参与过的活动列表
    "href": "http://localhost:6000/api/v1.0.0/candidates/CvO0TtCLj44Z6KQ3Kb3X4w/activities"
  }
}
```
