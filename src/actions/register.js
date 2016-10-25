/*
 *  发短信前端校验
 *  发短信
 *  注册操作
 * */

import { push } from 'react-router-redux';
import { post } from 'utils/request';
import sAlert from 'utils/sAlert';

export function register(values) {
  const postData = {
    mobile: values.mobile || '',
    password: values.password || '',
    sms_code: parseInt(values.sms_code, 10) || 0,
  };
  return {
    module: 'registerQL',
    promise() {
      return post('accounts/register/', postData);
    },
    onSuccess(response, dispatch) {
      clearInterval(window.interval);
      if (response.mobile) {
        sAlert('注册成功');
        dispatch(push('/'));
      }
    },
  };
}
