import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import ProgressButton from 'components/ProgressButton';
import FormError from 'components/FormError';
import validate from './validate';

const fields = ['mobile', 'password'];

class LoginForm extends React.Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setSubmitting: PropTypes.func.isRequired,
    loginQL: PropTypes.object.isRequired,
  };

  static contextTypes = {
    actions: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      captchaClientValid: 2,
    };
  }

  submit(values) {
    const captcha = this.captchaValidate.getValidate();
    const { actions } = this.context;

    this.setState({
      captchaClientValid: captcha ? 1 : 0,
    });

    if (captcha) {
      this.props.setSubmitting(true);
      actions.login(values, captcha);
    }
  }

  render() {
    const {
      fields: { mobile, password },
      loginQL,
      handleSubmit,
    } = this.props;
    const { submitting } = this.context;
    const preventDefault = false;
    // 登录服务端校验
    const loginQLResponse = loginQL.response;
    if (loginQLResponse && loginQLResponse.code === 400) {
      const errorJson = loginQLResponse.json || {};
      mobile.error = errorJson.mobile || errorJson.non_field_errors;
    } else {
      _.each(this.props.fields, (item) => {
        const field = item;
        field.svError = '';
      });
    }
    // 刷新验证码
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))} className="center-con">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="手机号"
            {...mobile}
          />
          <FormError>{mobile}</FormError>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="密码"
            {...password}
          />
          <FormError>{password}</FormError>
        </div>
        <div className="form-group pmd-top">
          <ProgressButton
            classNames="btn btn-primary btn-lg w-100 block"
            type="submit"
            disabled={submitting}
            preventDefault={preventDefault}
          >登录</ProgressButton>
        </div>
        <div className="text-right">
          <Link to="/password/validate">忘记密码</Link>
          <span className="h-span-split" />
          <Link to="/register">注册</Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields,
  validate,
})(LoginForm);
