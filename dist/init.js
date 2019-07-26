'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Colored symbols for various log levels

// init命令
// 当用户执行init命令后, 向用户提出问题
// 接收用户的输入并进行相应的处理
// 命令格式 ywj init template-name project-name
var init = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(templateName, projectName) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // 如果当前目录下没有同名的项目
                        if (!_fs2.default.existsSync(projectName)) {
                            // 命令行交互
                            _inquirer2.default.prompt([{
                                name: 'description',
                                message: 'Please enter the project description: '
                            }, {
                                name: 'author',
                                message: 'Please enter the author name: '
                            }]).then(function () {
                                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(answer) {
                                    var loading;
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    // 下载模板, 选择模板
                                                    // 通过配置文件, 获取模板信息
                                                    // 显示正在加载的效果
                                                    loading = (0, _ora2.default)('downloading template ...');

                                                    loading.start();
                                                    // console.log(templateName, projectName);
                                                    (0, _get.downloadLocal)(templateName, projectName).then(function () {
                                                        // 模板下载成功
                                                        loading.succeed();
                                                        var fileName = projectName + '/package.json';
                                                        console.log('fileName: ' + fileName);
                                                        if (_fs2.default.existsSync(fileName)) {
                                                            // 读取package.json文件,并设置它的name, author, description字段
                                                            var data = _fs2.default.readFileSync(fileName).toString();
                                                            var json = JSON.parse(data);
                                                            json.name = projectName;
                                                            json.author = answer.author;
                                                            json.description = answer.description;
                                                            // 修改项目文件夹中的package.json文件
                                                            // 为了package.json文件的可读性,字符串化的时候写入了\t
                                                            // 上面的操作就是: 当模板下载完了,读取项目根目录下的package.json
                                                            // 读取,写入用户输入的数据, 覆盖原来的package.json文件
                                                            _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                                                            console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                                                        }
                                                    }).catch(function () {
                                                        loading.fail();
                                                    });

                                                case 3:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined);
                                }));

                                return function (_x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        } else {
                            // 项目已存在
                            console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
                        }

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function init(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}(); // 引入下载模板的函数


module.exports = init;