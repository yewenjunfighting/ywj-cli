// ywjrc文件的增删改查
import { RC } from './constants';
import { decode, encode } from 'ini';
import { promisify } from 'util'; // util是node的一个模块
import chalk from 'chalk';
import fs from 'fs';

// promisify返回一个返回值是promise版本的函数
// promisify会在所有情况下假定original是一个最后的参数是回调函数的函数
// 如果它不是,那么它返回的函数的返回值是undefined
const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// RC是配置文件
// DEFAULTS是默认配置
export const get = async(key) => {
    const exit = await exits (RC);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        return opts[key];
    }
    return '';
}

export const getAll = async() => {
    const exit = await exits(RC);
    // RC: C:\Users\17289/.ywjrc; exit: false
    // console.log(`RC: ${RC}; exit: ${exit}`);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        return opts;
    }
    return {};
}

export const set = async(key, value) => {
    const exit = await exits(RC);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        if(!key) {
            console.log(chalk.red(chalk.bold('Error:')), chalk.red('key is required'));
            return ;
        }
        if(!value) {
            console.log(chalk.red(chalk.bold('Error:')), chalk.red('value is required'));
            return ;
        }
        Object.assign(opts, { [key]: value });
    } else {
        opts = Object.assign(DEFAULTS, { [key]: value });
    }
    await writeFile(RC, encode(opts), 'utf8');
}

export const remove = async(key) => {
    const exit = await exists(RC);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        // 解码
        opts = decode(opts);
        delete opts[key];
        await writeFile(RC, encode(opts), 'utf8');
    }
}