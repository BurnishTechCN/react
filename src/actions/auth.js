/*
 *  调用login, 获取用户token
 * */
import cookie from 'js-cookie';
import { post } from 'utils/request';
import {
  AUTH_USER,
  LOGOUT,
} from 'constants/auth';


export function auth() {
  return {
    module: 'loginQL',
    promise() {
      return post('auth/token/get/', {
        username: 'admin',
        password: '123456',
      });
    },
    onSuccess(response, dispatch) {
      const { token } = response;
      if (token) {
        cookie.set('o_jwt_id', token);
        dispatch({
          type: AUTH_USER,
          user: response,
        });
      }
    },
  };
}

export function logout() {
  cookie.remove('o_jwt_id');
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
}
