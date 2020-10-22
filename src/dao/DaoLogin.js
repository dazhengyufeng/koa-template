/*
 * @Date: 2019-08-21 15:14:50
 * @information: 最新更改时间
 */
import loginModel from '../schema/LoginSchema';


class DaoLogin {

  async login(where) {
    return await loginModel.findOne(where);
  }

}

export default DaoLogin

