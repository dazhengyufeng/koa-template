import { SwaggerRouter } from 'koa-swagger-decorator';
import path from 'path';
//swagger页面配置
const swaggerRouterOpts = {
    title:'前端操作日志',
    description: 'swagger doc',
    version: '0.0.1',
    // swagger地址 我本地的swagger地址http://localhost:8080/index.html,
    swaggerHtmlEndpoint: '/index.html',
    swaggerJsonEndpoint: `/json.html`,
      // [可选] config的附加配置如何显示swagger视图 
    swaggerConfiguration: {
        display: {
            defaultModelsExpandDepth: 4,//模型的默认扩展深度（设置为-1将完全隐藏模型）。
            defaultModelExpandDepth: 3,//在模型示例部分中模型的默认扩展深度。
            docExpansion: 'list',       //控制操作和标签的默认扩展设置。
            defaultModelRendering: 'model'//控制首次呈现API时如何显示模型。
        }
    }
}

const swaggerRouter = new SwaggerRouter();
swaggerRouter.swagger(swaggerRouterOpts);

//扫描路由  这里扫描路由需要配合 koa-swagger-decorator的一些api 
swaggerRouter.mapDir(path.resolve(__dirname,'../controllers'))
export default swaggerRouter;