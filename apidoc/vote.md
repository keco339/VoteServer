# 投票

### 1、 投票

此接口为标准的REST API。

```
URL:  http://localhost:6000/api/v1.0.0/votes/:uuid
```

资源JSON描述：
```
body: {
  "href": "http://localhost:6000/api/v1.0.0/votes/FiYO2Ey32YBdpky3zW4vYw",  // 投票URL
  "id": 1,                                              // ID号
  "uuid": "FiYO2Ey32YBdpky3zW4vYw",                     // 投票UUID
  "count": 1,                                           // 数量
  "userActivityRecordUUID": "e4IlHZER6wv3WAhMz3F9FA",   // 记录UUID
  "userUUID": "HC7xL43NgLJRDyeXiHNbpQ",                 // 用户UUID
  "candidateUUID": "3zx8R9JssRTP7et8WzKFww",            // 候选人UUID
  "activityUUID": "AQCfakMaIu2Rn7V2OlxQKQ",             // 活动UUID
  "createdAt": "2019-08-23 15:52:31",
  "modifiedAt": "2019-08-23 15:52:31",
  "user": {
    "href": "http://localhost:6000/api/v1.0.0/users/HC7xL43NgLJRDyeXiHNbpQ"
  },
  "candidate": {
    "href": "http://localhost:6000/api/v1.0.0/candidates/3zx8R9JssRTP7et8WzKFww"
  },
  "activity": {
    "href": "http://localhost:6000/api/v1.0.0/activities/AQCfakMaIu2Rn7V2OlxQKQ"
  },
  "userActivityRecord": {
    "href": "http://localhost:6000/api/v1.0.0/userActivityRecords/e4IlHZER6wv3WAhMz3F9FA"
  }
}
```


### 2、 投票

```
POST  http://localhost:6000/api/v1.0.0/commitVotes
body:
{
  "userUUID": "LaZpdfsOfH6O3ZMmOUBw9w",               // 用户UUID
  "activityUUID": "4HE1tqVIQbQxmjIyEYXing",           // 活动UUID
  "votes": [                                          // 候选人数组
    {
      "candidateUUID": "3zx8R9JssRTP7et8WzKFww",      // 候选人UUID
      "count": 1                                      // 投票数量
    }
  ]
}
```

返回JSON数据
```
body:
{
  status: "succeed"          // 处理结果, "succeed": 投票成功, "voted":已经投票
}
```

错误码处理：

|HTTP状态码|code错误码|描述|
|:---:|:---:|:---|
|404|8000|无效活动|
|404|8001|无效用户|
|400|8002|活动还未开始|
|400|8003|活动已经结束|



