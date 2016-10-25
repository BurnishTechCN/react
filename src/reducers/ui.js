/*
 *  处理全局的ui改变
 * */

import {
  UI_SIDEBAR_COLLAPSE,
} from 'constants/ui';

const initialState = { sidebarCollapseClass: 'mainnav-lg' };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UI_SIDEBAR_COLLAPSE:
      return {
        ...state,
        sidebarCollapseClass: action.collapse,
      };
    default:
      return state;
  }
}
