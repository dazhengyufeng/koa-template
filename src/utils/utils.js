/*
 * @Date: 2019-08-21 15:14:50
 * @information: 最新更改时间
 */
/**
 * 获取当前时间以及时间格式化工具
 * @author:小月月
 * @date:2019-03-22
 **/
function Format(fmt) {
    // 如果fmt不为空，则格式化传进来的时间
    if (fmt) {
      fmt.setMinutes(fmt.getMinutes() - fmt.getTimezoneOffset());
      let value = replace(fmt);
      return new Object(value);
    } else {
      let date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      let dateTime = replace(date);
      return new Object(dateTime);
    }
  }
  
  // 获取当前时间
  function nowTime(fmt) {
    if (!(this instanceof nowTime)) {
      return new Format(fmt);
    }
  }
  
  function replace(time) {
    return time.toJSON().replace(/[T]/g, ' ').replace(/Z/g, '').substring(0, 19);
  }
  
  /**
   * @date 2019.5.19
   * @author 潘亚楠
   * @information 验证翻页
   */
  function validatePageInfo(pageInfo) {
    let{page, size}=pageInfo
    let message = ''
    if (typeof page != 'number' || typeof size != 'number') {
       return message = '页码和页总量必须是数字';
    }
    if (page < 1) {
        return message ='页码必须大于1';
    }
    return message;
  }
  
  /**
   * @author: 周靖松
   * @information: 格式化日期
   * @Date: 2019-08-21 18:42:38
   */
  Date.prototype.goTime = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
  }   
  
  
  module.exports = {nowTime,validatePageInfo };
  