import React, { PropTypes } from 'react';

const ICONS = {
  H: 'fa fa-header',
  OL: 'zmdi zmdi-format-list-numbered',
  UL: 'zmdi zmdi-format-list-bulleted',
  B: 'zmdi zmdi-format-bold',
  I: 'zmdi zmdi-format-italic',
  U: 'zmdi zmdi-format-underlined',
  '#': 'zmdi zmdi-link',
};

export default class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    className += ` RichEditor-styleButton-${this.props.style.toLowerCase()}`;
    return (
      <span
        className={`${className} hint--top`}
        onMouseDown={this.onToggle}
        aria-label={this.props.description}
      >
      { this.props.icon && <i className={ICONS[this.props.icon]} /> }
      { this.props.label && <span>{ this.props.label }</span> }
      </span>
    );
  }
}


StyleButton.propTypes = {
  onToggle: PropTypes.func,
  style: PropTypes.string,
  active: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
};
