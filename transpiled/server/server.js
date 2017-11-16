'use strict';

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _restifyCookies = require('restify-cookies');

var _restifyCookies2 = _interopRequireDefault(_restifyCookies);

var _serveStaticRestify = require('serve-static-restify');

var _serveStaticRestify2 = _interopRequireDefault(_serveStaticRestify);

var _restifyJoiMiddleware = require('restify-joi-middleware');

var _restifyJoiMiddleware2 = _interopRequireDefault(_restifyJoiMiddleware);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _index = require('../shared/components/example/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jsdom = require("jsdom");

var assetsPath = (0, _path.resolve)(__dirname, '../../build/webpack-assets.json');
var templatePath = (0, _path.resolve)(__dirname, '../../src/shared/template/index.ejs');
var PORT = process.env.PORT || 3050;

var renderString = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filename, data, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              _ejs2.default.renderFile(filename, data, options, function (err, str) {
                if (err !== null) return reject(err);
                return resolve(str);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function renderString(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var server = _restify2.default.createServer();
server.use(_restify2.default.plugins.acceptParser(server.acceptable));
server.use(_restify2.default.plugins.queryParser());
server.use(_restify2.default.plugins.bodyParser());
server.use(_restify2.default.plugins.gzipResponse());
server.use(_restifyCookies2.default.parse);
server.use((0, _restifyJoiMiddleware2.default)());

server.pre((0, _serveStaticRestify2.default)((0, _path.resolve)(__dirname, '../../build/')));

server.pre(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Request-Method, X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.charSet('utf-8');
  return next();
});

server.get({
  path: '/',
  name: 'Get articles'
}, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var page, render, webpackAssets, scripts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = (0, _server.renderToString)(_react2.default.createElement(_index2.default, null));
            _context2.next = 3;
            return renderString(templatePath, {
              htmlWebpackPlugin: {
                options: {
                  render: page
                }
              }
            });

          case 3:
            render = _context2.sent;


            if (_fs2.default.existsSync(assetsPath)) {
              webpackAssets = JSON.parse(_fs2.default.readFileSync(assetsPath));
              scripts = Object.keys(webpackAssets).sort().map(function (entry) {
                return '<script src="' + webpackAssets[entry].js + '"></script>';
              }).join('');

              render = render.replace('</body>', scripts + '</body>');
            }
            res.status(200);
            res.write(render);
            res.end();
            return _context2.abrupt('return', next());

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            server.listen(PORT);
          } catch (error) {
            console.log(error); // eslint-disable-line
          }

        case 1:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
}))();
//# sourceMappingURL=server.js.map