// ywjrc文件的增删改查
import { RC } from './constants';
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
    // console.log(`key: ${key}`);
    const exit = await exits (RC);
    // console.log(`exit: ${exit}`);
    let opts = '';
    if(exit) {
       // console.log(`RC: ${RC}`);
        let opts = await ReadFile(RC);
        let res = researchJson('get', key, undefined)(opts);
        // 如果是对象的话转化为字符序列后输出
        if(typeof res === 'object') res = JSON.stringify(res, undefined, '\t');
        // console.log(opts instanceof Error);
        console.log(chalk.bold.green(res));
        // 这个要该,写个遍历的算法
    }else console.log(chalk.bold.red('该目录下没有package.json文件'));
    return opts;
}

export const getAll = async() => {
    const exit =  await exits(RC);
    // RC: C:\Users\17289/.ywjrc; exit: false
    // console.log(`RC: ${RC}; exit: ${exit}`);
    let opts;
    if(exit) {
        opts =  await readFile(RC, 'utf8');
        // console.log(opts);
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
        researchJson('set', key, value)(opts);
        await writeFile(RC, JSON.stringify(opts, undefined, '\t'));
    } else {
        console.log(chalk.bold.red('该目录下没有package.json文件'));
    }
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
        fs.readFile(file, 'utf8', (err, data)=> {
            if(err) rej(new Error('读取文件出错'));
            else res(JSON.parse(data));
        })
    })
}

function researchJson(type, key, value) {
    let res = void 0;
    return function DFS(json) {
        Object.keys(json).some((prop)=> {
            console.log(prop);
            let dataType = typeof json[prop];
            if(dataType === 'object') {
                if(type === 'get' && prop === key) {
                   return res = json[prop];
                }else return DFS(json[prop]);
            }else {
                if(prop === key) {
                    if(type === 'get') res = json[prop];
                    else json[prop] = value;
                    return res || (res = true);
                }
            }
        })
        return res;
    };
}

// 数组扁平化
function flut() {
    let newArr = [];
    return function DFS(arr) {
        arr.forEach((val)=> {
            // 只需要铺平数组即可
            if(Object.prototype.toString.call(val) === "[object Array]") DFS(val);
            else newArr.push(val);
        });
        return newArr;
    }
}

// 柯里化
//add(a, b) => add()()
function add(a) {
    return function(b) {
        return a + b;
    }
}