# 投票服务组件

启动服务步骤：

1.  下载工程依赖包
```
    npm install
```

2.  创建数据库

数据库使用MySQL， 数据库设计文档存放在`./doc/VoteServer.mwb`, 数据库SQL文件存放在`./doc/VoteServer.sql`。
请将数据库SQL文件导入数据库中。

3.  修改工程配置文件

工程配置文件，存放于`./config/config.js`

修改配置文件中，数据库相关配置
```
knex: {
    client: 'mysql',
    connection: {
        host : 'xxx.xxx.xxx.xxx',     // 数据库IP
        port : 3306,                  // 数据库端口

        user : 'root',                // 数据库账号
        password : '******',          // 数据库密码

        database : 'T_VoteServerDB',  // 数据库名称
    },
},
```

4.  启动服务

服务启动后，默认端口使用6000，如果想改变服务端口，请在config中`server.port`修改。

```
    node server.js
```

6.  接口文档说明

服务启动后，可访用`http://http://localhost:6000/apidoc/index.html`查看APIDOC。

7.  工程说明

本工程主要使用了`rest-router-model`中件间模块进行REST接口建模，相关模块使用请参考：`https://github.com/keco339/rest-router-model`
