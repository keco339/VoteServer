# 候选人与活动关系

### 1、 候选人与活动关系

此接口为标准的REST API。

```
URL:  http://localhost:6000/api/v1.0.0/candidateActivitiesMemberships/:uuid
```

资源JSON描述：
```
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidateActivitiesMemberships/mXQzKW7P2WLNHlB1MhixFg",
  "id": 1,
  "uuid": "mXQzKW7P2WLNHlB1MhixFg",                  // 关系UUID
  "candidateUUID": "3zx8R9JssRTP7et8WzKFww",         // 候选人UUID
  "activityUUID": "Oi3UOU0RrtEdto0EVXpNjw",          // 活动UUID
  "createdAt": "2019-08-23 11:12:24",
  "modifiedAt": "2019-08-23 11:12:24",
  "candidate": {
    "href": "http://localhost:6000/api/v1.0.0/candidates/3zx8R9JssRTP7et8WzKFww" // 候选人URL
  },
  "activity": {
    "href": "http://localhost:6000/api/v1.0.0/activities/Oi3UOU0RrtEdto0EVXpNjw" // 活动URL
  }
}
```
