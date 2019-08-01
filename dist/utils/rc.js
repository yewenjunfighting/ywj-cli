'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.set = exports.getAll = exports.get = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _constants = require('./constants');

var _util = require('util');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// promisify返回一个返回值是promise版本的函数
// promisify会在所有情况下假定original是一个最后的参数是回调函数的函数
// 如果它不是,那么它返回的函数的返回值是undefined
var exits = (0, _util.promisify)(_fs2.default.exists); // util是node的一个模块
// ywjrc文件的增删改查

var readFile = (0, _util.promisify)(_fs2.default.readFile);
var writeFile = (0, _util.promisify)(_fs2.default.writeFile);

// RC是配置文件
// DEFAULTS是默认配置
var get = exports.get = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key) {
        var geting, exit, opts, _opts, res;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // console.log(`key: ${key}`);
                        geting = (0, _ora2.default)('\u6B63\u5728\u83B7\u53D6' + key + '\u7684\u503C');

                        geting.start();
                        _context.next = 4;
                        return exits(_constants.RC);

                    case 4:
                        exit = _context.sent;

                        // console.log(`exit: ${exit}`);
                        opts = '';

                        if (!exit) {
                            _context.next = 14;
                            break;
                        }

                        _context.next = 9;
                        return ReadFile(_constants.RC);

                    case 9:
                        _opts = _context.sent;
                        res = researchJson('get', key, undefined)(_opts);

                        if (res) {
                            geting.succeed("get it");
                            if ((typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) === 'object') res = JSON.stringify(res, undefined, '\t');
                            console.log(_chalk2.default.bold.green(res));
                        } else geting.fail('\u6CA1\u6709' + key + '\u5B57\u6BB5');
                        _context.next = 15;
                        break;

                    case 14:
                        geting.fail('该目录下没有package.json文件');

                    case 15:
                        return _context.abrupt('return', opts);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function get(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getAll = exports.getAll = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var exit, getAll, opts;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context2.sent;
                        getAll = (0, _ora2.default)('正在获取数据...');

                        getAll.start();
                        opts = void 0;

                        if (!exit) {
                            _context2.next = 14;
                            break;
                        }

                        _context2.next = 9;
                        return readFile(_constants.RC, 'utf8');

                    case 9:
                        opts = _context2.sent;

                        // console.log(opts);
                        // opts = decode(opts);
                        // console.log(opts);
                        getAll.succeed("get All");
                        return _context2.abrupt('return', opts);

                    case 14:
                        getAll.fail('该目录下没有package.json文件');

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getAll() {
        return _ref2.apply(this, arguments);
    };
}();

var set = exports.set = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key, value) {
        var seting, exit, opts, res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        seting = (0, _ora2.default)('\u6B63\u5728\u8BBE\u7F6E' + key + '\u7684\u503C');

                        seting.start();
                        _context3.next = 4;
                        return exits(_constants.RC);

                    case 4:
                        exit = _context3.sent;
                        opts = void 0;

                        if (!exit) {
                            _context3.next = 23;
                            break;
                        }

                        _context3.next = 9;
                        return readFile(_constants.RC, 'utf8');

                    case 9:
                        opts = _context3.sent;

                        opts = JSON.parse(opts);

                        if (key) {
                            _context3.next = 14;
                            break;
                        }

                        seting.fail('key is required');
                        return _context3.abrupt('return');

                    case 14:
                        if (value) {
                            _context3.next = 17;
                            break;
                        }

                        seting.fail('value is required');
                        return _context3.abrupt('return');

                    case 17:
                        res = researchJson('set', key, value)(opts);

                        if (res) seting.succeed('设置成功');else seting.fail('设置失败: package.json中没有该字段,或者该字段为对象或数组');
                        _context3.next = 21;
                        return writeFile(_constants.RC, JSON.stringify(opts, undefined, '\t'));

                    case 21:
                        _context3.next = 24;
                        break;

                    case 23:
                        seting.fail('该目录下没有package.json文件');

                    case 24:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function set(_x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();

var remove = exports.remove = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(key) {
        var exit, removing, opts, res;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context4.sent;
                        removing = (0, _ora2.default)('正在删除${key}字段...');

                        removing.start();
                        opts = void 0;

                        if (!exit) {
                            _context4.next = 16;
                            break;
                        }

                        _context4.next = 9;
                        return ReadFile(_constants.RC);

                    case 9:
                        opts = _context4.sent;
                        res = researchJson('remove', key, undefined)(opts);

                        if (res && res.valueOf() === true) {
                            removing.succeed('删除成功');
                        } else removing.fail('删除失败');
                        _context4.next = 14;
                        return writeFile(_constants.RC, JSON.stringify(opts, undefined, '\t'), 'utf8');

                    case 14:
                        _context4.next = 17;
                        break;

                    case 16:
                        removing.fail('该目录下没有package.json文件');

                    case 17:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function remove(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

function ReadFile(file) {
    return new Promise(function (res, rej) {
        _fs2.default.readFile(file, 'utf8', function (err, data) {
            if (err) rej(new Error('读取文件出错'));else res(JSON.parse(data));
        });
    });
}

function researchJson(type, key, value) {
    var res = void 0;
    return function DFS(json) {
        Object.keys(json).some(function (prop) {
            // console.log(prop);
            var dataType = (0, _typeof3.default)(json[prop]);
            if (dataType === 'object') {
                if (type === 'get' && prop === key) {
                    return res = json[prop];
                } else return DFS(json[prop]);
            } else {
                if (prop === key) {
                    if (type === 'get') res = json[prop];else if (type === 'remove') res = new Boolean(delete json[prop]);else json[prop] = value;
                    return res || (res = true);
                }
            }
        });
        return res;
    };
}