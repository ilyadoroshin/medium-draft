import React, { PropTypes } from 'react';

import StyleButton from './stylebutton';


const InlineToolbar = (props) => {
  if (props.buttons.length < 1) {
    return null;
  }
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {props.buttons.map(type => {
        const iconLabel = {};
        iconLabel.label = type.label;
        iconLabel.icon = type.icon;
        return (
          <StyleButton
            {...iconLabel}
            key={type.style}
            active={currentStyle.has(type.style)}
            onToggle={props.onToggle}
            style={type.style}
            description={type.description}
          />
        );
      })}
    </div>
  );
};

InlineToolbar.propTypes = {
  buttons: PropTypes.array,
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
};

export default InlineToolbar;
