// 自定义异常类
class HttpException extends Error{
    constructor(msg = '服务器异常', errorCode = 1000, code = 400){
        super();
        this.msg = msg;
        this.code = code;
        this.errorCode = errorCode;
    }
}


// 封装Restful统一生成函数
export default {
    // 异常类
    HttpException,
    // 返回格式统一处理
    restify: function () {
      return async (ctx, next) => {
        console.log(`请求地址：${ctx.request.method} ${ctx.request.url}...`);
        ctx.rest = (data) => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            result: data,
            statusCode: 1000,
            message: "OK"
          }
        };
  
        // 200 成功
        // 200101 权限不足
        // 200102 登陆失败
        // 200103 没用该用户
        // 200104 密码错误
        // 200105 异常操作失败
        // 200106 参数异常
        // 200107 无效token
        // 200108 未找到该数据
        // 200109 删除数据失败
        // 200110 添加的用户已离职
        
        // 此处是报错的抛出异常
        // 有时间测试下，这种抛出错误和直接throw new Error()有何不同    ？？？？？？？？？？？？？？？？？？
        try {
          await next();
        } catch (error) {
          console.log(`报错了：${error.message}`);
          ctx.response.body = {
            statusCode: error.StatusCode || 400,
            message: error.message || '未知错误'
          }
        }
      }
    }
  }
  