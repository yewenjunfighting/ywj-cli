// ywjrc文件的增删改查
import { RC } from './constants';
import { promisify } from 'util'; // util是node的一个模块
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';

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
    let geting = ora(`正在获取${key}的值`);
    geting.start();
    const exit = await exits (RC);
    // console.log(`exit: ${exit}`);
    let opts = '';
    if(exit) {
       // console.log(`RC: ${RC}`);
        let opts = await ReadFile(RC);
        let res = researchJson('get', key, undefined)(opts);
        if(res) {
            geting.succeed("get it");
            if(typeof res === 'object') res = JSON.stringify(res, undefined, '\t');
            console.log(chalk.bold.green(res));
        }else geting.fail(`没有${key}字段`);
    }else geting.fail('该目录下没有package.json文件');
    return opts;
}

export const getAll = async() => {
    const exit =  await exits(RC);
    let getAll = ora('正在获取数据...');
    getAll.start();
    let opts;
    if(exit) {
        opts =  await readFile(RC, 'utf8');
        // console.log(opts);
        // opts = decode(opts);
        // console.log(opts);
        getAll.succeed("get All");
        return opts;
    }else {
        getAll.fail('该目录下没有package.json文件');
    }
}

export const set = async(key, value) => {
    let seting = ora(`正在设置${key}的值`);
    seting.start();
    const exit = await exits(RC);
    let opts;
    if(exit) {
        opts = await readFile(RC, 'utf8');
        opts = JSON.parse(opts);
        if(!key) {
            seting.fail('key is required');
            return ;
        }
        if(!value) {
            seting.fail('value is required')
            return ;
        }
        let res = researchJson('set', key, value)(opts);
        if(res) seting.succeed('设置成功');
        else seting.fail('设置失败: package.json中没有该字段,或者该字段为对象或数组');
        await writeFile(RC, JSON.stringify(opts, undefined, '\t'));
    } else {
        seting.fail('该目录下没有package.json文件');
    }
}

export const remove = async(key) => {
    const exit = await exits(RC);
    let removing = ora('正在删除${key}字段...');
    removing.start();
    let opts;
    if(exit) {
        opts = await ReadFile(RC);
        let res = researchJson('remove', key, undefined)(opts);
        if(res && res.valueOf() === true) {
            removing.succeed('删除成功');
        }else removing.fail('删除失败');
        await writeFile(RC, JSON.stringify(opts, undefined, '\t'), 'utf8');
    }else {
        removing.fail('该目录下没有package.json文件');
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
            // console.log(prop);
            let dataType = typeof json[prop];
            if(dataType === 'object') {
                if(type === 'get' && prop === key) {
                   return res = json[prop];
                }else return DFS(json[prop]);
            }else {
                if(prop === key) {
                    if(type === 'get') res = json[prop];
                    else if(type === 'remove') res = new Boolean(delete json[prop]);
                    else json[prop] = value;
                    return res || (res = true);
                }
            }
        })
        return res;
    };
}
