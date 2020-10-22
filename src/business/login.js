
class loginDomain {
  async registered(query) {
    const isHave = await loginItem.searchAccount(query);
    if(!!isHave)throw new Error('账号已存在');
    const result = await loginItem.addAccount(query);
    return result;
  }
}

export default loginDomain;
