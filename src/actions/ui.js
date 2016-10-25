/*
 * 处理UI状态改变
 *  */
import {
  UI_SIDEBAR_COLLAPSE,
} from 'constants/ui';


export function toggleSidebarCollapse(collapse) {
  return {
    type: UI_SIDEBAR_COLLAPSE,
    collapse,
  };
}
