// 管理 .eosrc文件 
// 命令格式: ywj config set k v
import { get, set, getAll, remove } from './utils/rc';
import chalk from 'chalk';

let config = async(action, key, value) => {
    switch(action) {
        case 'get':
            if(key) {
                let result = await get(key);
                console.log(result);
            } else {
                let obj = await getAll();
                console.log(obj);
            }
            break;
        case 'set':
            set(key, value);
            break;
        case 'remove':
            remove(key);
            break;
        default:
            break;
    }
    if(!action) console.log(chalk.bold.red('输入ywj -h查看config命令用法'));
}

module.exports = config;