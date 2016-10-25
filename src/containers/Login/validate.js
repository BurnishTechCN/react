import regexp from 'utils/regexp';

export default function validate(values) {
  const errors = {};
  if (!values.mobile) {
    errors.mobile = '请输入手机号';
  }
  if (!regexp.isMobile(values.mobile)) {
    errors.mobile = '请输入正确的手机号';
  }
  if (!values.password) {
    errors.password = '请输入密码';
  }
  return errors;
}
