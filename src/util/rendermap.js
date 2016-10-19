import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

import { Entity, Block } from './constants';

/*
Mapping that returns containers for the various block types.
*/
const RenderMap = Map({
  [Block.CAPTION]: {
    element: 'cite',
  },
  [Block.BLOCKQUOTE_CAPTION]: {
    element: 'blockquote',
  },
  [Block.TODO]: {
    element: 'div',
  },
  [Block.IMAGE]: {
    element: 'figure',
  },
  [Block.BREAK]: {
    element: 'div',
  },
  [Entity.LINK]: {
    element: 'a',
  },
}).merge(DefaultDraftBlockRenderMap);


export default RenderMap;
