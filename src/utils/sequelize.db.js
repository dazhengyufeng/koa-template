
import config from '../config/db';
import Sequelize from 'sequelize';
import TimeUtil from '../../src/util/TimeUtil';
const Op = Sequelize.Op

// orm 别名
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

// 默认字段
const { STRING, INTEGER, DATE, BOOLEAN, NOW } = Sequelize;

class DBConfig {
  defineModel(name, attributes) {
    attributes.id = {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    };
    attributes.creat_time = {
      type: DATE,
      defaultValue: NOW,
      get () {
        return TimeUtil.nowTime(this.getDataValue('createtime'))
      }
    };
    return sequelize.define(name, attributes, {
      freezeTableName: true,
      timestamps: false,
      underscorder: true
    });
  }
}

// Sequelize实例
let sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, {
  host: config.sequelize.host,
  port: config.sequelize.port,
  dialect: config.sequelize.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  timezone: '+08:00',
  underscore: true,
  operatorsAliases: operatorsAliases,
  logging: console.log
});

// 测试数据库链接
sequelize.authenticate().then(() => {
  console.log('连接成功');
}).catch((error) => {
  console.error('连接失败', error);
});

export default DBConfig;
