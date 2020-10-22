import DBConfig from '../utils/sequelize.db';
import Sequelize from 'sequelize';


const tableName = 'user_info';
const db = new DBConfig();
const { STRING,INTEGER,DATE } = Sequelize;

const userInfoModel = db.defineModel(tableName, {
    name: INTEGER(5), // 姓名
    creat_time: DATE, // 创建时间
    is_delete: STRING(30), // 是否删除
    companyName: STRING(30), // 公司名称
    userId: STRING(11), // 身份证号
});

module.exports = userInfoModel;