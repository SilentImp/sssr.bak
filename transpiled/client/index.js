'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _example = require('components/example');

var _example2 = _interopRequireDefault(_example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var window = typeof window === 'undefined' ? '' : window; // eslint-disable-line
var document = typeof document === 'undefined' ? '' : document; // eslint-disable-line

_reactDom2.default.hydrate(_react2.default.createElement(_example2.default, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map