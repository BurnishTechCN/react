/*
 *  处理所有的ajax请求, 返回相应状态
 * */

import {
  Q_PENDING,
  Q_SUCCESS,
  Q_ERROR,
} from 'constants/common';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case Q_PENDING:
      return {
        ...state,
        [action.module]: { isFetching: true, ...action },
        loadingBar: true,
      };
    case Q_SUCCESS:
      return {
        ...state,
        [action.module]: {
          isFetching: false,
          isError: false,
          ...action,
        },
        loadingBar: false,
      };
    case Q_ERROR:
      return {
        ...state,
        [action.module]: {
          isFetching: false,
          isError: true,
          ...action,
        },
        loadingBar: false,
      };
    default:
      return state;
  }
}
