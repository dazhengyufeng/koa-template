
// 教程https://www.jianshu.com/p/32f0fb0d7700?from=timeline&isappinstalled=0
// 1: sequelize.transaction
try{
    await sequelize.transaction(async (t) => {
        //添加商品信息
      let productInfo = await addProductDao(data, {transaction: t})
      let len = data.picUrl.length;
      for(let i = 0; i<len; i++){
        let addProductData = {
            picUrl: data.picUrl[i],//图片地址
            product_id: productInfo.get({plain:true}).product_id,//商品id
        }
        //添加商品图片
        await addProductImgDao(addProductData,{transaction: t})
      }
    })
}catch(err){
    throw new Error(err)
}


// 2: 在真正数据库操作额的地方,把transaction传进去。（sequelize.transaction回调函数里面的每个都这么做）
// 成功会自动提交，失败会自动回滚。
product_info.create( uppercaseSwtich_( data ) ,transaction )