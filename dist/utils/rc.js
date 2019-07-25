'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.set = exports.getAll = exports.get = undefined;

var _constants = require('./constants');

var _ini = require('ini');

var _util = require('util');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// promisify返回一个返回值是promise版本的函数
// promisify会在所有情况下假定original是一个最后的参数是回调函数的函数
// 如果它不是,那么它返回的函数的返回值是undefined
// util是node的一个模块
const exits = (0, _util.promisify)(_fs2.default.exists); // ywjrc文件的增删改查

const readFile = (0, _util.promisify)(_fs2.default.readFile);
const writeFile = (0, _util.promisify)(_fs2.default.writeFile);

// RC是配置文件
// DEFAULTS是默认配置
const get = exports.get = async key => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        return opts[key];
    }
    return '';
};

const getAll = exports.getAll = async () => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        return opts;
    }
    return {};
};

const set = exports.set = async (key, value) => {
    const exit = await exits(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        opts = (0, _ini.decode)(opts);
        if (!key) {
            console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('key is required'));
            return;
        }
        if (!value) {
            console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('value is required'));
            return;
        }
        Object.assign(opts, { [key]: value });
    } else {
        opts = Object.assign(_constants.DEFAULTS, { [key]: value });
    }
    await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
};

const remove = exports.remove = async key => {
    const exit = await exists(_constants.RC);
    let opts;
    if (exit) {
        opts = await readFile(_constants.RC, 'utf8');
        // 解码
        opts = (0, _ini.decode)(opts);
        delete opts[key];
        await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
    }
};