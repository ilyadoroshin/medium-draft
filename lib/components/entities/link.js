'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLinkEntities = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findLinkEntities = exports.findLinkEntities = function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();

    // if (entityKey) console.log(entityKey, Entity.get(entityKey).getType());
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
  }, callback);
};

var Link = function Link(props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData();

  var url = _Entity$get$getData.url;
  var target = _Entity$get$getData.target;


  return _react2.default.createElement(
    'a',
    {
      className: 'draft-link hint--top hint--rounded',
      href: url,
      rel: 'noopener noreferrer',
      target: target,
      'aria-label': url
    },
    props.children
  );
};

Link.propTypes = {
  children: _react.PropTypes.node,
  entityKey: _react.PropTypes.string
};

exports.default = Link;