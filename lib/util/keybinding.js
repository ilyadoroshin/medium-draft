'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

/*
Emits various key commands to be used by `handleKeyCommand` in `Editor` based
on various key combos.
*/
exports.default = function (e) {
  if (e.altKey === true) {
    if (e.shiftKey === true) {
      switch (e.which) {
        // Alt + Shift + A
        case 65:
          return 'add-new-block';
        default:
          return (0, _draftJs.getDefaultKeyBinding)(e);
      }
    }
    switch (e.which) {
      // 1
      case 49:
        return 'changetype:ordered-list-item';
      // @
      case 50:
        return 'showlinkinput';
      // #
      case 51:
        return 'changetype:header-one';
      // *
      case 56:
        return 'changetype:unordered-list-item';
      // <
      // case 188: return 'changetype:caption';
      // // -
      // case 189: return 'changetype:caption';
      // >
      case 190:
        return 'changetype:unstyled';
      // "
      // case 222: return 'changetype:blockquote';
      default:
        return (0, _draftJs.getDefaultKeyBinding)(e);
    }
  }
  return (0, _draftJs.getDefaultKeyBinding)(e);
};