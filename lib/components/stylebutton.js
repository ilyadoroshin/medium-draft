'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICONS = {
  H: 'fa fa-header',
  H2: 'fa fa-header',
  OL: 'zmdi zmdi-format-list-numbered',
  UL: 'zmdi zmdi-format-list-bulleted',
  B: 'zmdi zmdi-format-bold',
  I: 'zmdi zmdi-format-italic',
  U: 'zmdi zmdi-format-underlined',
  '#': 'zmdi zmdi-link'
};

var StyleButton = function (_React$Component) {
  _inherits(StyleButton, _React$Component);

  function StyleButton() {
    _classCallCheck(this, StyleButton);

    var _this = _possibleConstructorReturn(this, (StyleButton.__proto__ || Object.getPrototypeOf(StyleButton)).call(this));

    _this.onToggle = function (e) {
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    };
    return _this;
  }

  _createClass(StyleButton, [{
    key: 'render',
    value: function render() {
      var className = 'RichEditor-styleButton';
      var _props = this.props;
      var label = _props.label;
      var icon = _props.icon;


      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }
      className += ' RichEditor-styleButton-' + this.props.style.toLowerCase();
      return _react2.default.createElement(
        'span',
        {
          className: className + ' hint--top',
          onMouseDown: this.onToggle,
          'aria-label': this.props.description
        },
        icon && _react2.default.createElement('i', { className: ICONS[icon] }),
        label && label === 'H2' ? _react2.default.createElement(
          'span',
          { className: 'RichEditor-styleButton-h2' },
          _react2.default.createElement('i', { className: ICONS[label] })
        ) : _react2.default.createElement(
          'span',
          null,
          label
        )
      );
    }
  }]);

  return StyleButton;
}(_react2.default.Component);

exports.default = StyleButton;


StyleButton.propTypes = {
  onToggle: _react.PropTypes.func,
  style: _react.PropTypes.string,
  active: _react.PropTypes.bool,
  icon: _react.PropTypes.string,
  label: _react.PropTypes.string,
  description: _react.PropTypes.string
};