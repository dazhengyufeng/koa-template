
// ioredis和redis  ？？？？？

const Redis = require('ioredis');
const redisConfig = require('../config/env')('redis');
const redis = new Redis(redisConfig.redis);

// handle redis error
// logger error
redis.on('error', (err) => {
    console.log('redis error', err.message);
});

class RedisDao {

    /**
     * set 普通的set/get 字符串型
     * @param {String} key 
     * @param {String} value 
     * @param {Number} expire - 秒
     */
    static async set(key, value, expire) {
        if (!expire) {
            return await redis.set(key, value);
        }
        await redis.set(key, value, 'EX', expire);
    }

    /**
     * get 普通的set/get 字符串型 
     * @param {String} key 
     */
    static async get(key) {
        return await redis.get(key);
    }

    /**
     * sadd 无序集合Set
     * @param {String} key 
     * @param {String | Array} value 
     * @param {Number} expire - 秒
     */
    static async sadd(key, value, expire) {
        if (!expire) {
            return await redis.sadd(key, value);
        }
        return await redis.multi().sadd(key, value).expire(key, expire).exec();
    }

    /**
     * smember 无序集合Set, 返回无序集合所有值
     * @param {String} key 
     * @return {Array}
     */
    static async smembers(key) {
        return await redis.smembers(key);
    }

    /**
     * zadd 有序集合插入 score
     * @param {String} key 
     * @param {Number} score 
     * @param {String} value 
     * @param {Number} expire - 秒
     */
    static async zadd(key, score, value, expire) {
        if (!expire) {
            return await redis.zadd(key, score, value);
        }
        return await redis.multi().zadd(key, score, value).expire(key, expire).exec();
    }

    /**
     * zrange 获取有序集合值 
     * @param {String} key 
     * @param {Number} start 
     * @param {Number} stop 
     * @example let res = await RedisDao.zrange('lll',0,-1); //查询全部 
     */
    static async zrange(key, start, stop) {
        return await redis.zrange(key, start, stop);
    }

    /**
     * hmset hash用于存储对象 
     * @param {String} key 
     * @param {Object} value 
     * @param {Number} expire - 秒
     */
    static async hmset(key, value, expire) {
        if (!expire) {
            return await redis.hmset(key, value);
        }
        return await redis.multi().hmset(key, value).expire(key, expire).exec();
    }

    /**
     * hget hash返回value对象中指定的字段
     * @param {String} key 
     * @param {String} colum 
     */
    static async hget(key, colum) {
        return await redis.hget(key, colum);
    }

    /**
     * hgetall hash返回全部的value
     * @param {String} key 
     */
    static async hgetall(key) {
        return await redis.hgetall(key);
    }

    /**
     * pub/sub reids发布订阅 - 订阅者
     * @param {String} channel - 订阅的频道
     * @example 
         async () => {
             let sub = await RedisUtil.sub('test_channel');
             // 监听消息
             sub.on('message', (channel, message) => {
             console.log(channel, message);
             })
         }
     */
    static async sub(channel) {
        let _channel = typeof channel == 'string' ? channel : [...channel];
        const sub = new Redis(redisConfig.redis);
        await sub.subscribe(_channel);
        return sub;
    }

    /**
     * pub/sub reids发布订阅 - 发布者
     * @param {String} channel - 订阅的频道
     * @param {String} message -  发送的消息
     * @example 
         RedisUtil.pub('test_channel', 'this is pub essage')
     */
    static async pub(channel, message) {
        redis.publish(channel, message);
    }

    /**
     * del 删除key
     * @param {String} key 
     */
    static async del(key) {
        return await redis.del(key);
    }

    /**
     * hdel 删除hash {colum} 中的字段
     * @param {String} key 
     * @param {String} colum 
     */
    static async hdel(key, colum) {
        return await redis.hdel(key, colum);
    }

    /**
     * ttl 查询剩余时间
     * @param {String} key 
     */
    static async ttl(key) {
        return await redis.ttl(key);
    }

    /**
     * exists 查询是否存在key  1存在 0不存在
     * @param {String} key 
     */
    static async exists(key) {
        return await redis.exists(key);
    }

}

module.exports = RedisDao;
