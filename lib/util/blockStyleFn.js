'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

/*
Get custom classnames for each of the different block types supported.
*/

var BASE_BLOCK_CLASS = 'md-block';

exports.default = function (block) {
  switch (block.getType()) {
    case _constants.Block.BLOCKQUOTE:
      return BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-quote RichEditor-blockquote';
    case _constants.Block.UNSTYLED:
      return BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-paragraph';
    case _constants.Block.ATOMIC:
      return BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-atomic';
    case _constants.Block.CAPTION:
      return BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-caption';
    case _constants.Block.TODO:
      return BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-paragraph ' + BASE_BLOCK_CLASS + '-todo';
    case _constants.Block.IMAGE:
      return BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-image';
    case _constants.Block.BLOCKQUOTE_CAPTION:
      {
        var cls = BASE_BLOCK_CLASS + ' ' + BASE_BLOCK_CLASS + '-quote';
        return cls + ' RichEditor-blockquote ' + BASE_BLOCK_CLASS + '-quote-caption';
      }
    default:
      return '' + BASE_BLOCK_CLASS;
  }
};