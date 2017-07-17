'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageBlock = function (_React$Component) {
  _inherits(ImageBlock, _React$Component);

  function ImageBlock(props) {
    _classCallCheck(this, ImageBlock);

    var _this = _possibleConstructorReturn(this, (ImageBlock.__proto__ || Object.getPrototypeOf(ImageBlock)).call(this, props));

    _this.state = {
      selected: false
    };

    _this.onClick = _this.onClick.bind(_this);
    // this.enableEditable = this.enableEditable.bind(this);
    return _this;
  }

  _createClass(ImageBlock, [{
    key: 'onClick',
    value: function onClick() {
      this.setState({
        selected: !this.state.selected
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.setState({
        selected: true
      });
    }

    // enableEditable(e) {
    //   this.setState({
    //     editableEnabled: true,
    //   });
    // }

  }, {
    key: 'render',
    value: function render() {
      var data = this.props.block.getData();
      // const length = this.props.block.getLength();
      var src = data.get('src');
      var className = this.state.selected ? 'is-selected' : '';
      // const showPlaceholder = length < 1 && this.state.editableEnabled === false;
      if (src !== null) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'md-block-image-inner-container' },
            _react2.default.createElement('img', { role: 'presentation', onClick: this.onClick, className: className, src: src })
          ),
          _react2.default.createElement(
            'figcaption',
            null,
            _react2.default.createElement(_draftJs.EditorBlock, this.props)
          )
        );
      }
      return _react2.default.createElement(_draftJs.EditorBlock, this.props);
    }
  }]);

  return ImageBlock;
}(_react2.default.Component);

ImageBlock.propTypes = {
  block: _react.PropTypes.object
};

exports.default = ImageBlock;

/*

<div
              className="block-image-toolbar-container"
              style={{ display: (this.state.selected ? 'block' : 'none') }}
            >
              <i className="fa fa-lg fa-trash" title="Remove image" />
            </div>*/