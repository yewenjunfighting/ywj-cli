import { version } from '../../package.json';

//当前 package.json 的版本号
export const VERSION = version;

// 用户的根目录
//const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
// console.log(`home:${HOME}`);
// 配置文件目录
//export const RC = `${HOME}/package.json`;
export const RC = 'package.json';
// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
// https://github.com/yewenjunfighting/ywj-cli
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置

export const TEMPLATE = {
        'vue-web': {
            user: 'liwudi',
            projectName: 'VueProject',
        },
        'react-web': {
            user: 'lpz1096',
            projectName: 'vueProMobileTemplate',
        },
        'vue-mobile': {
            user: 'lidaguang1989',
            projectName: 'react-seed',
        },
        'react-mobile': {
            user: 'slashhuang',
            projectName: 'react-mobile-template',
        },
    }