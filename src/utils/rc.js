// ywjrc文件的增删改查
import { RC } from './constants';
import { decode, encode } from 'ini';
import { promisify } from 'util'; // util是node的一个模块
import chalk from 'chalk';
import fs, { createWriteStream } from 'fs';

// promisify返回一个返回值是promise版本的函数
// promisify会在所有情况下假定original是一个最后的参数是回调函数的函数
// 如果它不是,那么它返回的函数的返回值是undefined
const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// RC是配置文件
// DEFAULTS是默认配置
export const get = async(key) => {
    // console.log(`key: ${key}`);
    const exit = await exits (RC);
    // console.log(`exit: ${exit}`);
    let opts = '';
    if(exit) {
       // console.log(`RC: ${RC}`);
        let opts = await ReadFile(RC);
        // console.log(opts instanceof Error);
        return opts[key];
        // 这个要该,写个遍历的算法
    }else console.log(chalk.bold.red('该目录下没有package.json文件'));
    return opts;
}

export const getAll = async() => {
    const exit = await exits(RC);
    // RC: C:\Users\17289/.ywjrc; exit: false
    // console.log(`RC: ${RC}; exit: ${exit}`);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        // opts = decode(opts);
        // console.log(opts);
        return opts;
    }
    return {};
}

export const set = async(key, value) => {
    const exit = await exits(RC);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        opts = JSON.parse(opts);
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
    await writeFile(RC, JSON.stringify(opts, undefined, '\t'));
}

export const remove = async(key) => {
    const exit = await exits(RC);
    let opts;
    if(exit) {
        opts = await ReadFile(RC);
        if(opts[key]) delete opts[key];
        else console.log(chalk.bold.red(`package.json文件没有${key}属性`));
        await writeFile(RC, JSON.stringify(opts, undefined, '\t'), 'utf8');
    }
}

function ReadFile(file) {
    return new Promise((res,rej)=> {
        readFile(file, 'utf8', (err, data)=> {
            if(err) rej(new Error('读取文件出错'));
            else res(JSON.parse(data));
        })
    })
}