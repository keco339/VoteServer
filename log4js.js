/**
 * Created by Administrator on 2018/3/2.
 */

const log4js = require('log4js');

const logConfig = {
    type: 'console',
    level: 'all',
    filename: './logs/out.log'
};

log4js.configure({
    appenders: {
        console: { type: 'stdout' },
        // file: { type: 'file', filename: logConfig.filename, maxLogSize: 50*1024*1024, backups: 5 }
    },
    categories: {
        default: { appenders: [ 'console' ], level: 'all' },
        // file: { appenders: [ 'file' ], level: 'info' }
    },
    pm2: true,
});

const logger = log4js.getLogger(logConfig.type);
logger.level = 'all';


const methods = ['trace','debug','info','warn','error','fatal'];
methods.forEach(method=>console[method] = logger[method].bind(logger));
console.log = logger.info.bind(logger);

module.exports = logger;


// methods.forEach(method=>{
//     console[method](`log --> ${method}`)
// });

let env = 'LOGCOLLECTION';
// process.env[env] = 'open';
if(process.env[env]==='open'){
    let jsonStringify = JSON.stringify;
    JSON.stringify = function stringify(obj, v1, v2) {
        return jsonStringify.call(JSON, obj);
    };
}

