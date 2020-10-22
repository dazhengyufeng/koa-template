import fs from 'fs';
import path from 'path';

// model读取文件脚本(读取某一文件夹下的什么类型的文件，统一抛出)
let files = fs.readdirSync(path.resolve('src/model'));

let modelFile = files.filter((files) => {
  return files.endsWith('.js');
});

for (let item of modelFile) {
  let name = item.substring(0, item.length - 3);
  module.exports[name] = require('../../src/model/' + item);
}