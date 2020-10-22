const Koa = require('koa');
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')
import router from "./src/swagger";
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser');
// Restful统一生成函数
import responseHandle from './src/middleware/ResponseHandle';

const app = new Koa();

// morgan 处理日志
const ENV = 'pred' //假设环境参数是prd
if (ENV === 'dev') {
  app.use(morgan('dev'))  // 测试环境，打印在控制台
} else {  // 线上环境，写入文件
  const logFileName = path.join(__dirname, 'src/logs', 'access.log')
  const logStream = fs.createWriteStream(logFileName, { flags: 'a' })
  app.use(morgan('combined', {
    stream: logStream
  }))
}
app.use(bodyParser());  // 解析request的body
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
app.use(responseHandle.restify());
app.use(router.routes());


app.listen(9000);