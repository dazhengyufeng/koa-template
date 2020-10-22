// const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
// 	var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// })

import { request, summary, query, path, body, tags, security, prefix, middlewaresAll } from 'koa-swagger-decorator'

//登陆
// swagger 接口分组
const Tag = tags(['登陆']);
// 接口版本号
const controllerVersion = 'v1';

    //路由前缀
    @prefix(`/${controllerVersion}/orization`)
    export default class LoginController{

        @request('post', '/login') //路由和请求方式
        @summary('登陆入口') //swagger 链接后面的注释
        @Tag
        @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
        static async loginEnter(ctx){
            try {
                let result = await login_Domain.login(ctx.validatedBody)
                let id = result?result.id:'账号或密码不正确'
                ctx.rest(id)
            } catch (error) {
                throw new responseHandle.HttpException(5000, `${error.message}`);
            }
        }
    }