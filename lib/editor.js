'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent');

var _isSoftNewlineEvent2 = _interopRequireDefault(_isSoftNewlineEvent);

var _addbutton = require('./components/addbutton');

var _addbutton2 = _interopRequireDefault(_addbutton);

var _toolbar = require('./components/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _customrenderer = require('./components/customrenderer');

var _customrenderer2 = _interopRequireDefault(_customrenderer);

var _customstylemap = require('./util/customstylemap');

var _customstylemap2 = _interopRequireDefault(_customstylemap);

var _rendermap = require('./util/rendermap');

var _rendermap2 = _interopRequireDefault(_rendermap);

var _keybinding = require('./util/keybinding');

var _keybinding2 = _interopRequireDefault(_keybinding);

var _constants = require('./util/constants');

var _beforeinput = require('./util/beforeinput');

var _beforeinput2 = _interopRequireDefault(_beforeinput);

var _blockStyleFn = require('./util/blockStyleFn');

var _blockStyleFn2 = _interopRequireDefault(_blockStyleFn);

var _model = require('./model');

var _image = require('./components/sides/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
A wrapper over `draft-js`'s default **Editor*component which provides
some built-in customisations like custom blocks (todo, caption, etc) and
some key handling for ease of use so that users' mouse usage is minimum.
*/
var MediumDraftEditor = function (_React$Component) {
  _inherits(MediumDraftEditor, _React$Component);

  function MediumDraftEditor(props) {
    _classCallCheck(this, MediumDraftEditor);

    var _this = _possibleConstructorReturn(this, (MediumDraftEditor.__proto__ || Object.getPrototypeOf(MediumDraftEditor)).call(this, props));

    _this.focus = function () {
      return _this._editorNode.focus();
    };
    _this.onChange = function (editorState) {
      _this.props.onChange(editorState);
    };

    _this.getEditorState = function () {
      return _this.props.editorState;
    };

    _this.onTab = _this.onTab.bind(_this);
    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.handleBeforeInput = _this.handleBeforeInput.bind(_this);
    _this.handleReturn = _this.handleReturn.bind(_this);
    _this.handleDroppedFiles = _this.handleDroppedFiles.bind(_this);
    _this.toggleBlockType = _this._toggleBlockType.bind(_this);
    _this.toggleInlineStyle = _this._toggleInlineStyle.bind(_this);
    _this.setLink = _this.setLink.bind(_this);
    _this.blockRendererFn = _this.props.rendererFn(_this.onChange, _this.getEditorState);
    return _this;
  }

  // componentDidMount() {
  //   this.focus();
  // }


  /*
  Implemented to provide nesting of upto 2 levels in ULs or OLs.
  */


  _createClass(MediumDraftEditor, [{
    key: 'onTab',
    value: function onTab(e) {
      var editorState = this.props.editorState;

      var newEditorState = _draftJs.RichUtils.onTab(e, editorState, 2);
      if (newEditorState !== editorState) {
        this.onChange(newEditorState);
      }
    }

    /*
    Adds a hyperlink on the selected text with some basic checks.
    */

  }, {
    key: 'setLink',
    value: function setLink(url) {
      var blank = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      var entityKey = null;
      var newUrl = url;
      if (url !== '') {
        if (url.indexOf('@') >= 0) {
          newUrl = 'mailto:' + newUrl;
        } else if (url.indexOf('http') === -1) {
          if (url.indexOf('/') === -1) {
            newUrl = 'http://' + newUrl;
          }
        }
        entityKey = _draftJs.Entity.create(_constants.Entity.LINK, 'MUTABLE', {
          url: newUrl, target: blank ? '_blank' : undefined
        });
      }
      this.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, entityKey), this.focus);
    }

    // addMedia() {
    // const src = window.prompt('Enter a URL');
    // if (!src) {
    //   return;
    // }
    // const entityKey = Entity.create('image', 'IMMUTABLE', {src});
    // this.onChange(
    //   AtomicBlockUtils.insertAtomicBlock(
    //     this.props.editorState,
    //     entityKey,
    //     ' '
    //   )
    // );
    // }


    /*
    Implemented to just pass it on to the parent component. Will add some
    customizations later or as when needed.
    */

  }, {
    key: 'handleDroppedFiles',
    value: function handleDroppedFiles(selection, files) {
      if (this.props.handleDroppedFiles) {
        this.props.handleDroppedFiles(selection, files);
      }
    }

    /*
    Handles custom commands based on various key combinations. First checks
    for some built-in commands. If found, that command's function is apllied and returns.
    If not found, it checks whether parent component handles that command or not.
    Some of the internal commands are:
     - showlinkinput -> Opens up the link input tooltip if some text is selected.
    - add-new-block -> Adds a new block at the current cursor position.
    - changetype:block-type -> If the command starts with `changetype:` and
      then succeeded by the block type, the current block will be converted to that particular type.
    - toggleinline:inline-type -> If the command starts with `toggleinline:` and
      then succeeded by the inline type, the current selection's inline type will be
      togglled.
    */

  }, {
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      // console.log(command);
      if (this.props.handleKeyCommand && this.props.handleKeyCommand(command)) {
        return true;
      }
      if (command === 'showlinkinput') {
        if (this.toolbar) {
          this.toolbar.handleLinkInput(null, true);
        }
        return true;
      } else if (command === 'add-new-block') {
        var _editorState = this.props.editorState;

        this.onChange((0, _model.addNewBlock)(_editorState, _constants.Block.BLOCKQUOTE));
        return true;
      }
      var editorState = this.props.editorState;

      var block = (0, _model.getCurrentBlock)(editorState);
      if (command.indexOf('changetype:') === 0) {
        var newBlockType = command.split(':')[1];
        var currentBlockType = block.getType();
        if (currentBlockType === _constants.Block.ATOMIC || currentBlockType === 'media') {
          return false;
        }
        if (currentBlockType === _constants.Block.BLOCKQUOTE && newBlockType === _constants.Block.CAPTION) {
          newBlockType = _constants.Block.BLOCKQUOTE_CAPTION;
        } else if (currentBlockType === _constants.Block.BLOCKQUOTE_CAPTION && newBlockType === _constants.Block.CAPTION) {
          newBlockType = _constants.Block.BLOCKQUOTE;
        }
        this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, newBlockType));
        return true;
      } else if (command.indexOf('toggleinline:') === 0) {
        var inline = command.split(':')[1];
        this._toggleInlineStyle(inline);
        return true;
      }
      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    /*
    This function is responsible for emitting various commands based on various key combos.
    */

  }, {
    key: 'handleBeforeInput',
    value: function handleBeforeInput(str) {
      return this.props.beforeInput(this.props.editorState, str, this.onChange, this.props.stringToTypeMap);
    }

    /*
    By default, it handles return key for inserting soft breaks (BRs in HTML) and
    also instead of inserting a new empty block after current empty block, it first check
    whether the current block is of a type other than `unstyled`. If yes, current block is
    simply converted to an unstyled empty block. If RETURN is pressed on an unstyled block
    default behavior is executed.
    */

  }, {
    key: 'handleReturn',
    value: function handleReturn(e) {
      if (this.props.handleReturn) {
        if (this.props.handleReturn()) {
          return true;
        }
      }
      var editorState = this.props.editorState;

      if ((0, _isSoftNewlineEvent2.default)(e)) {
        this.onChange(_draftJs.RichUtils.insertSoftNewline(editorState));
        return true;
      }
      if (!e.altKey && !e.metaKey && !e.ctrlKey) {
        var currentBlock = (0, _model.getCurrentBlock)(editorState);
        var blockType = currentBlock.getType();

        if (blockType.indexOf('atomic') === 0) {
          this.onChange((0, _model.addNewBlockAt)(editorState, currentBlock.getKey()));
          return true;
        }

        if (currentBlock.getLength() === 0) {
          switch (blockType) {
            case _constants.Block.UL:
            case _constants.Block.OL:
            case _constants.Block.BLOCKQUOTE:
            case _constants.Block.BLOCKQUOTE_CAPTION:
            case _constants.Block.CAPTION:
            case _constants.Block.TODO:
            case _constants.Block.H2:
            case _constants.Block.H3:
            case _constants.Block.H1:
              this.onChange((0, _model.resetBlockWithType)(editorState, _constants.Block.UNSTYLED));
              return true;
            default:
              return false;
          }
        }

        var selection = editorState.getSelection();

        if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
          if (this.props.continuousBlocks.indexOf(blockType) < 0) {
            this.onChange((0, _model.addNewBlockAt)(editorState, currentBlock.getKey()));
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    }

    /*
    The function documented in `draft-js` to be used to toggle block types (mainly
    for some key combinations handled by default inside draft-js).
    */

  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      var type = _draftJs.RichUtils.getCurrentBlockType(this.props.editorState);
      if (type.indexOf('atomic:') === 0) {
        return;
      }
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, blockType));
    }

    /*
    The function documented in `draft-js` to be used to toggle inline styles of selection (mainly
    for some key combinations handled by default inside draft-js).
    */

  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      var type = _draftJs.RichUtils.getCurrentBlockType(this.props.editorState);
      if (type.indexOf('header') === 0) {
        return;
      }
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
    }

    /*
    Renders the `Editor`, `Toolbar` and the side `AddButton`.
    */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var editorState = _props.editorState;
      var editorEnabled = _props.editorEnabled;
      // const currentBlockType = RichUtils.getCurrentBlockType(this.props.editorState);

      var showAddButton = editorEnabled; // && currentBlockType.indexOf('atomic:') < 0;
      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-root' },
        _react2.default.createElement(
          'div',
          { className: 'RichEditor-editor' },
          _react2.default.createElement(_draftJs.Editor, _extends({
            ref: function ref(node) {
              _this2._editorNode = node;
            }
          }, this.props, {
            editorState: editorState,
            blockRendererFn: this.blockRendererFn,
            blockStyleFn: this.props.blockStyleFn,
            onChange: this.onChange,
            onTab: this.onTab,
            blockRenderMap: this.props.blockRenderMap,
            handleKeyCommand: this.handleKeyCommand,
            handleBeforeInput: this.handleBeforeInput,
            handleDroppedFiles: this.handleDroppedFiles,
            handleReturn: this.handleReturn,
            customStyleMap: this.props.customStyleMap,
            readOnly: !editorEnabled,
            keyBindingFn: this.props.keyBindingFn,
            placeholder: this.props.placeholder,
            spellCheck: editorEnabled && this.props.spellCheck
          })),
          showAddButton && this.props.sideButtons.length > 0 ? _react2.default.createElement(_addbutton2.default, {
            editorState: editorState,
            getEditorState: this.getEditorState,
            setEditorState: this.onChange,
            focus: this.focus,
            sideButtons: this.props.sideButtons
          }) : null,
          _react2.default.createElement(_toolbar2.default, {
            ref: function ref(c) {
              _this2.toolbar = c;
            },
            editorNode: this._editorNode,
            editorState: editorState,
            toggleBlockType: this.toggleBlockType,
            toggleInlineStyle: this.toggleInlineStyle,
            editorEnabled: editorEnabled,
            setLink: this.setLink,
            focus: this.focus,
            blockButtons: this.props.blockButtons,
            inlineButtons: this.props.inlineButtons
          })
        )
      );
    }
  }]);

  return MediumDraftEditor;
}(_react2.default.Component);

// MediumDraftEditor.propTypes = {
//   beforeInput: PropTypes.func,
//   keyBindingFn: PropTypes.func,
//   customStyleMap: PropTypes.object,
//   blockStyleFn: PropTypes.func,
//   rendererFn: PropTypes.func,
//   editorEnabled: PropTypes.bool,
//   spellCheck: PropTypes.bool,
//   stringToTypeMap: PropTypes.object,
//   blockRenderMap: PropTypes.object,
//   blockButtons: PropTypes.array,
//   inlineButtons: PropTypes.array,
//   placeholder: PropTypes.string,
//   continuousBlocks: PropTypes.arrayOf(PropTypes.string),
//   sideButtons: PropTypes.arrayOf(PropTypes.object),
//   editorState: PropTypes.object.isRequired,
//   onChange: PropTypes.func.isRequired,
//   handleDroppedFiles: PropTypes.func,
//   handleKeyCommand: PropTypes.func,
//   handleReturn: PropTypes.func,
// };

// MediumDraftEditor.defaultProps = {
//   beforeInput,
//   keyBindingFn,
//   customStyleMap,
//   blockStyleFn,
//   rendererFn,
//   editorEnabled: true,
//   spellCheck: true,
//   stringToTypeMap: StringToTypeMap,
//   blockRenderMap: RenderMap,
//   blockButtons: BLOCK_BUTTONS,
//   inlineButtons: INLINE_BUTTONS,
//   placeholder: 'Write your story...',
//   continuousBlocks: [
//     Block.UNSTYLED,
//     Block.BLOCKQUOTE,
//     Block.OL,
//     Block.UL,
//     Block.CODE,
//     Block.TODO,
//   ],
//   sideButtons: [
//     {
//       title: 'Image',
//       component: ImageButton,
//     },
//   ],
// };


MediumDraftEditor.propTypes = {
  beforeInput: _react.PropTypes.func,
  keyBindingFn: _react.PropTypes.func,
  customStyleMap: _react.PropTypes.object,
  blockStyleFn: _react.PropTypes.func,
  rendererFn: _react.PropTypes.func,
  editorEnabled: _react.PropTypes.bool,
  spellCheck: _react.PropTypes.bool,
  stringToTypeMap: _react.PropTypes.object,
  blockRenderMap: _react.PropTypes.object,
  blockButtons: _react.PropTypes.array,
  inlineButtons: _react.PropTypes.array,
  placeholder: _react.PropTypes.string,
  continuousBlocks: _react.PropTypes.arrayOf(_react.PropTypes.string),
  sideButtons: _react.PropTypes.arrayOf(_react.PropTypes.object),
  editorState: _react.PropTypes.object.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  handleDroppedFiles: _react.PropTypes.func,
  handleKeyCommand: _react.PropTypes.func,
  handleReturn: _react.PropTypes.func
};
MediumDraftEditor.defaultProps = {
  beforeInput: _beforeinput2.default,
  keyBindingFn: _keybinding2.default,
  customStyleMap: _customstylemap2.default,
  blockStyleFn: _blockStyleFn2.default,
  rendererFn: _customrenderer2.default,
  editorEnabled: true,
  spellCheck: true,
  stringToTypeMap: _beforeinput.StringToTypeMap,
  blockRenderMap: _rendermap2.default,
  blockButtons: _toolbar.BLOCK_BUTTONS,
  inlineButtons: _toolbar.INLINE_BUTTONS,
  placeholder: 'Write your story...',
  continuousBlocks: [_constants.Block.UNSTYLED, _constants.Block.BLOCKQUOTE, _constants.Block.OL, _constants.Block.UL, _constants.Block.CODE, _constants.Block.TODO],
  sideButtons: [{
    title: 'Image',
    component: _image2.default
  }]
};
exports.default = MediumDraftEditor;