/*
 * 处理用户登录状态,
 * isAuthticate初始化为undefind, 后端返回结构后设置为true/false
 * */

import {
  AUTH_USER,
  LOGOUT,
} from 'constants/auth';

const initialState = {
  isAuthenticated: undefined,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        ...action.user,
        isAuthenticated: !!action.user.token,
      };
    case LOGOUT:
      return {
        ...state,
        username: '',
        first_name: '',
        last_name: '',
        groups: [],
        token: '',
        email: '',
        user_psermissions: [],
        date_joined: '',
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
