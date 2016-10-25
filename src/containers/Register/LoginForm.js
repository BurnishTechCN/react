import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import ProgressButton from 'components/ProgressButton';
import FormError from 'components/FormError';
import validate from './validate';

const fields = ['mobile', 'password', 'confirm_password', 'sms_code'];

class RegisterForm extends React.Component {

  static contextTypes = {
    registerQL: PropTypes.object.isRequired,
    sms: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  render() {
    const {
      fields: { mobile, password, confirm_password, sms_code },
      handleSubmit,
    } = this.props;
    const { registerQL, sms, submitting } = this.context;
    const preventDefault = false;
    // 发短信前端校验
    if (sms.smsPhoneErr && !mobile.touched) {
      mobile.touched = true;
      mobile.error = sms.smsPhoneErr;
    }
    // 注册服务端校验
    const registerQLResponse = registerQL.response;
    if (registerQLResponse && registerQL.type === 'Q_ERROR') {
      const errorJson = registerQLResponse.json || {};
      mobile.error = errorJson.mobile || '';
      password.error = errorJson.password || '';
      sms_code.error = errorJson.sms_code || '';
    }
    return (
      <form onSubmit={handleSubmit} className="center-con">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="手机号码"
            {...mobile}
          />
          <FormError>{mobile}</FormError>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="密码"
            maxLength="100"
            {...password}
          />
          <FormError>{password}</FormError>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="确认密码"
            maxLength="100"
            {...confirm_password}
          />
          <FormError>{confirm_password}</FormError>
        </div>
        <div className="form-group psm-top">
          <ProgressButton
            classNames="btn btn-primary btn-lg w-100 block"
            type="submit"
            disabled={submitting}
            preventDefault={preventDefault}
          >注册</ProgressButton>
        </div>
        <div className="text-right">
          <Link to="/">登录</Link>
        </div>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'register',
  fields,
  validate,
})(RegisterForm);
