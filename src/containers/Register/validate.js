import regexp from 'utils/regexp';

export default function validate(values) {
  const errors = {};
  if (!regexp.isMobile(values.mobile)) {
    errors.mobile = '请输入正确的手机号';
  }
  if (!values.password) {
    errors.password = '请输入密码';
  }
  if (values.password && values.password.length < 6) {
    errors.password = '密码不能少于6位';
  }
  if (!values.sms_code) {
    errors.sms_code = '请输入短信验证码';
  }
  if (values.password !== values.confirm_password) {
    errors.confirm_password = '两次输入不一致';
  }
  if (!values.confirm_password) {
    errors.confirm_password = '请输入确认密码';
  }
  return errors;
}
