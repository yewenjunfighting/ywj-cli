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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// promisify返回一个返回值是promise版本的函数
// promisify会在所有情况下假定original是一个最后的参数是回调函数的函数
// 如果它不是,那么它返回的函数的返回值是undefined
// util是node的一个模块
// ywjrc文件的增删改查
var exits = (0, _util.promisify)(_fs2.default.exists);
var readFile = (0, _util.promisify)(_fs2.default.readFile);
var writeFile = (0, _util.promisify)(_fs2.default.writeFile);

// RC是配置文件
// DEFAULTS是默认配置
var get = exports.get = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key) {
        var exit, opts, _opts, res;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context.sent;

                        // console.log(`exit: ${exit}`);
                        opts = '';

                        if (!exit) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 7;
                        return ReadFile(_constants.RC);

                    case 7:
                        _opts = _context.sent;
                        res = researchJson('get', key, undefined)(_opts);
                        // 如果是对象的话转化为字符序列后输出

                        if ((typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) === 'object') res = JSON.stringify(res, undefined, '\t');
                        // console.log(opts instanceof Error);
                        console.log(_chalk2.default.bold.green(res));
                        // 这个要该,写个遍历的算法
                        _context.next = 14;
                        break;

                    case 13:
                        console.log(_chalk2.default.bold.red('该目录下没有package.json文件'));

                    case 14:
                        return _context.abrupt('return', opts);

                    case 15:
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
        var exit, opts;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context2.sent;

                        // RC: C:\Users\17289/.ywjrc; exit: false
                        // console.log(`RC: ${RC}; exit: ${exit}`);
                        opts = void 0;

                        if (!exit) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 7;
                        return readFile(_constants.RC, 'utf8');

                    case 7:
                        opts = _context2.sent;
                        return _context2.abrupt('return', opts);

                    case 9:
                        return _context2.abrupt('return', {});

                    case 10:
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
        var exit, opts;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context3.sent;
                        opts = void 0;

                        if (!exit) {
                            _context3.next = 20;
                            break;
                        }

                        _context3.next = 7;
                        return readFile(_constants.RC, 'utf8');

                    case 7:
                        opts = _context3.sent;

                        opts = JSON.parse(opts);

                        if (key) {
                            _context3.next = 12;
                            break;
                        }

                        console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('key is required'));
                        return _context3.abrupt('return');

                    case 12:
                        if (value) {
                            _context3.next = 15;
                            break;
                        }

                        console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('value is required'));
                        return _context3.abrupt('return');

                    case 15:
                        researchJson('set', key, value)(opts);
                        _context3.next = 18;
                        return writeFile(_constants.RC, JSON.stringify(opts, undefined, '\t'));

                    case 18:
                        _context3.next = 21;
                        break;

                    case 20:
                        console.log(_chalk2.default.bold.red('该目录下没有package.json文件'));

                    case 21:
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
        var exit, opts;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context4.sent;
                        opts = void 0;

                        if (!exit) {
                            _context4.next = 11;
                            break;
                        }

                        _context4.next = 7;
                        return ReadFile(_constants.RC);

                    case 7:
                        opts = _context4.sent;

                        if (opts[key]) delete opts[key];else console.log(_chalk2.default.bold.red('package.json\u6587\u4EF6\u6CA1\u6709' + key + '\u5C5E\u6027'));
                        _context4.next = 11;
                        return writeFile(_constants.RC, JSON.stringify(opts, undefined, '\t'), 'utf8');

                    case 11:
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
            console.log(prop);
            var dataType = (0, _typeof3.default)(json[prop]);
            if (dataType === 'object') {
                if (type === 'get' && prop === key) {
                    return res = json[prop];
                } else return DFS(json[prop]);
            } else {
                if (prop === key) {
                    if (type === 'get') res = json[prop];else json[prop] = value;
                    return res || (res = true);
                }
            }
        });
        return res;
    };
}

// 数组扁平化
function flut() {
    var newArr = [];
    return function DFS(arr) {
        arr.forEach(function (val) {
            // 只需要铺平数组即可
            if (Object.prototype.toString.call(val) === "[object Array]") DFS(val);else newArr.push(val);
        });
        return newArr;
    };
}

// 柯里化
//add(a, b) => add()()
function add(a) {
    return function (b) {
        return a + b;
    };
}