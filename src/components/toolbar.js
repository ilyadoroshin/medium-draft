// import './toolbar.scss';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Entity } from 'draft-js';

import BlockToolbar from './blocktoolbar';
import InlineToolbar from './inlinetoolbar';

import { getSelection, getSelectionRect } from '../util/index';
import { getCurrentBlock } from '../model/index';
import { Entity as CEntity } from '../util/constants';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showURLInput: false,
      urlInputValue: '',
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleLinkInput = this.handleLinkInput.bind(this);
    this.hideLinkInput = this.hideLinkInput.bind(this);
    this.persistChange = this.persistChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { editorState } = newProps;
    if (!newProps.editorEnabled) {
      return;
    }
    const selectionState = editorState.getSelection();
    if (selectionState.isCollapsed()) {
      if (this.state.showURLInput) {
        this.setState({
          showURLInput: false,
        });
      }
      return;
    }
  }

  componentDidUpdate() {
    if (!this.props.editorEnabled || this.state.showURLInput) {
      return;
    }
    const selectionState = this.props.editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return;
    }
    // eslint-disable-next-line no-undef
    const nativeSelection = getSelection(window);
    if (!nativeSelection.rangeCount) {
      return;
    }
    const selectionBoundary = getSelectionRect(nativeSelection);

    // eslint-disable-next-line react/no-find-dom-node
    const toolbarNode = ReactDOM.findDOMNode(this);
    // const toolbarBoundary = toolbarNode.getBoundingClientRect();

    // eslint-disable-next-line react/no-find-dom-node
    const parent = ReactDOM.findDOMNode(this.props.editorNode);
    const parentBoundary = parent.getBoundingClientRect();

    /*
    * Main logic for setting the toolbar position.
    */
    toolbarNode.style.top =
      `${(selectionBoundary.top - parentBoundary.top - 45)}px`;
    toolbarNode.style.width = '250px';
    const widthDiff = selectionBoundary.width - 250;

    if (widthDiff >= 0) {
      toolbarNode.style.left = `${widthDiff / 2}px`;
    } else {
      const left = (selectionBoundary.left - parentBoundary.left);
      toolbarNode.style.left = `${left + (widthDiff / 2)}px`;
      // toolbarNode.style.width = toolbarBoundary.width + 'px';
      // if (left + toolbarBoundary.width > parentBoundary.width) {
        // toolbarNode.style.right = '0px';
        // toolbarNode.style.left = '';
        // toolbarNode.style.width = toolbarBoundary.width + 'px';
      // }
      // else {
      //   toolbarNode.style.left = (left + widthDiff / 2) + 'px';
      //   toolbarNode.style.right = '';
      // }
    }
  }


  onKeyDown(e) {
    if (e.which === 13) {
      this.persistChange(e);
    } else if (e.which === 27) {
      this.hideLinkInput(e);
    }
  }

  onChange(e) {
    this.setState({
      urlInputValue: e.target.value,
    });
  }

  persistChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.setLink(this.state.urlInputValue);
    this.setState({
      showURLInput: false,
      urlInputValue: '',
    }, () => this.props.focus());
  }

  handleLinkInput(e, direct = false) {
    if (!direct) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      this.props.focus();
      return;
    }
    // const toolbarNode = ReactDOM.findDOMNode(this);
    // const toolbarBoundary = toolbarNode.getBoundingClientRect();
    // toolbarNode.style.width = toolbarBoundary.width + 'px';
    const currentBlock = getCurrentBlock(editorState);
    let selectedEntity = '';
    let linkFound = false;
    currentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      selectedEntity = entityKey;
      return entityKey !== null && Entity.get(entityKey).getType() === CEntity.LINK;
    }, (start, end) => {
      let selStart = selection.getAnchorOffset();
      let selEnd = selection.getFocusOffset();
      if (selection.getIsBackward()) {
        selStart = selection.getFocusOffset();
        selEnd = selection.getAnchorOffset();
      }
      if (start === selStart && end === selEnd) {
        linkFound = true;
        const { url } = Entity.get(selectedEntity).getData();
        this.setState({
          showURLInput: true,
          urlInputValue: url,
        }, () => {
          setTimeout(() => {
            this.urlinput.focus();
            this.urlinput.select();
          }, 0);
        });
      }
    });
    if (!linkFound) {
      this.setState({
        showURLInput: true,
      }, () => {
        setTimeout(() => {
          this.urlinput.focus();
        }, 0);
      });
    }
  }

  hideLinkInput(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.setLink(this.state.urlInputValue);
    this.setState({
      showURLInput: false,
      urlInputValue: '',
    }, () => this.props.focus());
  }

  render() {
    const { editorState, editorEnabled } = this.props;
    const { showURLInput, urlInputValue } = this.state;
    let isOpen = true;
    if (!editorEnabled || editorState.getSelection().isCollapsed()) {
      isOpen = false;
    }

    let classes = ['md-editor-toolbar'];
    if (isOpen) classes = classes.concat('md-editor-toolbar--isopen');
    if (showURLInput) classes = classes.concat('md-editor-toolbar--linkinput');

    return (
      <div className={classes.join(' ')}>
        <div className="RichEditor-controls RichEditor-show-link-input">
          <span className="md-url-input-close" onMouseDown={this.persistChange}>OK</span>
          <input
            ref={node => { this.urlinput = node; }}
            type="text"
            className="md-url-input"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            placeholder="Press ENTER or ESC"
            value={urlInputValue}
          />
        </div>

        {this.props.blockButtons.length > 0 ? (
          <BlockToolbar
            editorState={editorState}
            onToggle={this.props.toggleBlockType}
            buttons={this.props.blockButtons}
          />
        ) : null}

        {this.props.inlineButtons.length > 0 ? (
          <InlineToolbar
            editorState={editorState}
            onToggle={this.props.toggleInlineStyle}
            buttons={this.props.inlineButtons}
          />
        ) : null}

        <div className="RichEditor-controls">
          <div
            className="RichEditor-styleButton RichEditor-linkButton hint--top"
            onClick={this.handleLinkInput} aria-label="Add a link"
          >
            <i className="zmdi zmdi-link" />
          </div>
        </div>
      </div>
    );
  }
}

export const BLOCK_BUTTONS = [
  {
    icon: 'H',
    style: 'header-one',
    description: 'Heading',
  },

  {
    icon: 'UL',
    style: 'unordered-list-item',
    description: 'Unordered List',
  },
  {
    icon: 'OL',
    style: 'ordered-list-item',
    description: 'Ordered List',
  },
];

export const INLINE_BUTTONS = [
  {
    icon: 'B',
    style: 'BOLD',
    description: 'Bold',
  },
  {
    icon: 'I',
    style: 'ITALIC',
    description: 'Italic',
  },
  {
    icon: 'U',
    style: 'UNDERLINE',
    description: 'Underline',
  },
];

Toolbar.propTypes = {
  editorEnabled: PropTypes.bool,
  editorState: PropTypes.object,
  toggleBlockType: PropTypes.func,
  toggleInlineStyle: PropTypes.func,
  inlineButtons: PropTypes.arrayOf(PropTypes.object),
  blockButtons: PropTypes.arrayOf(PropTypes.object),
  editorNode: PropTypes.object,
  setLink: PropTypes.func,
  focus: PropTypes.func,
};

Toolbar.defaultProps = {
  blockButtons: BLOCK_BUTTONS,
  inlineButtons: INLINE_BUTTONS,
};

        // <div className="RichEditor-controls">
        //   <div
        //     className="RichEditor-styleButton RichEditor-linkButton hint--top"
        //     onClick={this.handleLinkInput} aria-label="Text format"
        //   >
        //     <i className="zmdi zmdi-text-format" />
        //   </div>
        // </div>
        //
        //
