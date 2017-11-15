'use strict';

require('babel-polyfill');

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _restifyCookies = require('restify-cookies');

var _restifyCookies2 = _interopRequireDefault(_restifyCookies);

var _restifyJoiMiddleware = require('restify-joi-middleware');

var _restifyJoiMiddleware2 = _interopRequireDefault(_restifyJoiMiddleware);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _index = require('../source/components/example/index.jsx');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PORT = process.env.PORT || 3050;
var server = _restify2.default.createServer();
server.use(_restify2.default.plugins.acceptParser(server.acceptable));
server.use(_restify2.default.plugins.queryParser());
server.use(_restify2.default.plugins.bodyParser());
server.use(_restify2.default.plugins.gzipResponse());
server.use(_restifyCookies2.default.parse);
server.use((0, _restifyJoiMiddleware2.default)());

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            res.status(200);
            res.send((0, _reactDom.hydrate)(_react2.default.createElement(_index2.default, null), document.getElementById("content")));
            return _context.abrupt('return', next());

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            server.listen(PORT);
          } catch (error) {
            console.log(error); // eslint-disable-line
          }

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}))();
//# sourceMappingURL=server.js.map