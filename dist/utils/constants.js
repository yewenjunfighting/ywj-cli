'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TEMPLATE = exports.RC = exports.VERSION = undefined;

var _package = require('../../package.json');

//当前 package.json 的版本号
var VERSION = exports.VERSION = _package.version;

// 用户的根目录
var HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
// console.log(`home:${HOME}`);
// 配置文件目录
var RC = exports.RC = HOME + '/.ywjrc';

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
// https://github.com/yewenjunfighting/ywj-cli
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置

var TEMPLATE = exports.TEMPLATE = {
    'vue-web': {
        user: 'liwudi',
        projectName: 'VueProject'
    },
    'react-web': {
        user: 'lpz1096',
        projectName: 'vueProMobileTemplate'
    },
    'vue-mobile': {
        user: 'lidaguang1989',
        projectName: 'react-seed'
    },
    'react-mobile': {
        user: 'slashhuang',
        projectName: 'react-mobile-template'
    }
};