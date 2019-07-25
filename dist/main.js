'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 使得输出高亮的库

/**
 * ywj commands
 *      - config
 *      - init
 */

// VERSION是从package.json中读取的
let actionMap = {
    init: {
        description: 'generate a new project from a template',
        usages: ['ywj init templateName projectName']
    },
    config: {
        alias: 'cfg',
        description: 'config .ywjrc',
        usages: ['ywj config set <k> <v>', // key value
        'ywj config get <k>', 'ywj config remove <k>']
    }
    // 可以继续添加其它的命令


    // 添加 init / config 命令
}; // 命令行工具库
Object.keys(actionMap).forEach(action => {
    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias) // 别名
    .action(() => {
        console.log(`process: ${process}`);
        switch (action) {// 为每一种命令添加动作
            case 'config':
                // 配置
                (0, _index2.default)(action, ...process.argv.slice(3)); // ywj config get/set k v
                break;
            case 'init':
                (0, _index2.default)(action, ...process.argv.slice(3));
            default:
                break;
        }
    });
});

function help() {
    // \r 移到行首, \n换下一行
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach(action => {
        actionMap[action].usages.forEach(usage => {
            // 打印出每个命令的使用方法
            console.log('  - ' + usage);
        });
    });
    console.log('\r'); // 换行好像有点问题，等出问题在看下
}

_commander2.default.usage('<command> [options]');

// ywj -h --help 
// 输入这两个指令,就执行help函数
// 打印出所有命令的用法

_commander2.default.on('-h', help);
_commander2.default.on('--help', help);

// ywj -V VERSION 为 package.json中的版本号
_commander2.default.version(_constants.VERSION, '-V  --version').parse(process.argv);

// ywj不带参数时
if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp(make_green);
}

function make_green(txt) {
    return _chalk2.default.green(txt);
}