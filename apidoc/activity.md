# 活动

### 1、 活动

此接口为标准的REST API。

```
URL:  http://localhost:6000/api/v1.0.0/activities/:uuid
```

资源JSON描述：
```
body: {
  "href": "http://localhost:6000/api/v1.0.0/activities/AQCfakMaIu2Rn7V2OlxQKQ", // 活动资源URL
  "id": 1,                                  // ID号
  "uuid": "AQCfakMaIu2Rn7V2OlxQKQ",         // 活动UUID
  "name": "第五届政法委员选举",                // 活动名称
  "description": "第五届政法委员选举",         // 活动描述
  "startAt": "2019-09-01 10:00:00",         // 活动开始时间
  "endAt": "2019-09-01 22:00:00",           // 活动结束时间
  "status": "enabled",                      // 活动状态
  "createdAt": "2019-08-23 10:38:21",       // 创建时间
  "modifiedAt": "2019-08-23 10:38:21"       // 修改时间
  "candidateActivitiesMemberships": {
    "href": "http://localhost:6000/api/v1.0.0/activities/AQCfakMaIu2Rn7V2OlxQKQ/candidateActivitiesMemberships"
  },
  "candidates": {                           // 活动候选人列表
    "href": "http://localhost:6000/api/v1.0.0/activities/AQCfakMaIu2Rn7V2OlxQKQ/candidates"
  }
}
```


### 2、 为活动增加候选人


```
POST http://localhost:6000/api/v1.0.0/activities/Oi3UOU0RrtEdto0EVXpNjw/addCandidate
body:
{
  "candidateUUID": "3zx8R9JssRTP7et8WzKFww"         // 候选人UUID
}
```

返回候选人与活动关系JSON描述：
```
statusCode: 201
body: {
  "href": "http://localhost:6000/api/v1.0.0/candidateActivitiesMemberships/mXQzKW7P2WLNHlB1MhixFg",
  "id": 1,
  "uuid": "mXQzKW7P2WLNHlB1MhixFg",
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


### 3、 为活动移出候选人


```
POST http://localhost:6000/api/v1.0.0/activities/Oi3UOU0RrtEdto0EVXpNjw/removeCandidate
body:
{
  "candidateUUID": "3zx8R9JssRTP7et8WzKFww"         // 候选人UUID
}
```

返回描述：
```
statusCode: 204
body: undefined
```




### 4、 活动候选人投票统计

```
GET http://localhost:6000/api/v1.0.0/activities/:candidateUUID/statActivityCandidateVotes
params:
{
  "candidateUUID": "3zx8R9JssRTP7et8WzKFww"         // 候选人UUID
}
```

返回描述：
```
statusCode: 204
body:
[
  {
    "candidateUUID": "3zx8R9JssRTP7et8WzKFww",     // 候选人UUID
    "count": 10                                    // 统计票数
  },
  {
    "candidateUUID": "h73Gn9kLoiekneI3NOdoZx",
    "count": 5
  }
]
```
