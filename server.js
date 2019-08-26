/**
 * Created by Administrator on 2018/1/8.
 */
const log4js = require('./log4js');
const package = require('./package.json');
const config = require('./config/config');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const logger = require('koa-logger');
const jsonExpand = require('koa-json-url-expand');
const serve = require('koa-static');
const path = require('path');
const _ = require('lodash');

config.readConfigServerParams().then(data => {
    const resourceConfig = require('./config/resourceConfig');
    const restRouterModel = require('rest-router-model');

    // 依次从系统环境变量、配置文件（配置环境或文件）读取服务端口，默认为3000
    const server_name = package.name;
    const ip = config.server.domain;
    const port = process.env.PORT || config.server.port || '3000';

    let VerificationCodeBusiness = require('./business/verificationCodeBusiness');
    let UserBusiness = require('./business/userBusiness');
    let ActivityBusiness = require('./business/activityBusiness');
    let VoteBusiness = require('./business/voteBusiness');
    // 对REST资源，扩展业务接口
    let extendBusinesses = {
        verificationCode: new VerificationCodeBusiness(),
        user: new UserBusiness(),
        activity: new ActivityBusiness(),
        vote: new VoteBusiness(),
    };

    const app = new Koa();
    require('koa-qs-plus')(app, 'extended', {arrayLimit: 2000});
    app.use(logger());
    // JWT
    // app.use(async (ctx,next)=>{
    //     // console.log('queries:',ctx.query);
    //     let bCanSkipJwted = false;
    //     config.skipJwtInterfaces.map(interfaceName=>{
    //         if(ctx.path.indexOf(interfaceName) >= 0) {
    //             bCanSkipJwted = true;
    //         }
    //     });
    //
    //     if(bCanSkipJwted && !ctx.header.authorization && !ctx.query.token) {
    //         console.log(` [JWT][${ctx.seq}] --> skip jwt verify ok! path: ${ctx.path}`);
    //         await  next();
    //     }
    //     else {
    //         let jwt_opt = { secret: config.jwt.public_key, algorithms: ['RS256'] ,passthrough:false};
    //         //优先使用Header头信息中的认证信息，若没有则使用query中的token
    //         if(!ctx.header.authorization){
    //             jwt_opt.getToken = function(){
    //                 return ctx.query.token;
    //             };
    //         }
    //
    //         if(!ctx.query.token && !ctx.header.authorization) {
    //             console.log(` [JWT][${ctx.seq}] --> no token in header and query! path: ${ctx.path}`);
    //             let error = new Error();
    //             error.name = 'no token';
    //             error.code = 9999;
    //             error.message = 'header no token';
    //             error.description = '';
    //             ctx.status = 401;
    //             ctx.body = error;
    //         }
    //         else {
    //             try {
    //                 await jwt(jwt_opt).call(null,ctx, next)/*.unless({ path: [/^\/authServer/] })*/;
    //             }
    //             catch (err){
    //                 console.error(` [JWT][${ctx.seq}] --> user jwt error: ${err}`);
    //                 let error = new Error();
    //                 error.name = err.name;
    //                 error.code = 9999;
    //                 error.message = err.message;
    //                 error.description = '';
    //                 ctx.status = err.status || 500;
    //                 ctx.body = error;
    //             }
    //         }
    //     }
    // });

    app.use(jsonExpand.routerPlugin(config.server.domain));
    app.use(serve(path.join(__dirname, './site')));

    let options = { serverName: server_name, ip: ip, port: port };
    restRouterModel.koaRestRouter(resourceConfig, extendBusinesses, config.knex, options).then(koa_router => {
        app.use(koa_router.routes());
        let server = app.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
        server.on('connection', function(socket) {
            // console.log("A new connection was made by a client.");
            socket.setTimeout(30 * 1000);
        })
    });
    function init() {
        // let email = 'keco339@sina.com';
        // let code = '366277';
        // extendBusinesses.verificationCode.verifiedEmailVerificationCode(email,code).then(ret=>console.log(ret));
    }
    // Event listener for HTTP server "error" event.
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        let bind = typeof port === 'string' ? (`pipe ${port}`) : (`port ${port}`);
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error('[Server Start] --> ' + bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error('[Server Start] --> ' + bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    //Event listener for HTTP server "listening" event.
    function onListening() {
        let addr = this.address();
        let bind = typeof addr === 'string' ? (`pipe ${addr}`) : (`port ${addr.port}`);

        console.log(`[Server Start] --> ${server_name} listening on ${bind}`);
        init();
    }
});
