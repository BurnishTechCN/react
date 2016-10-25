import React, { PropTypes } from 'react';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/login';
import { auth as authAction } from 'actions/auth';
import regexp from 'utils/regexp';
import LoginForm from './LoginForm';

class LoginView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    loginQL: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    actions: PropTypes.object.isRequired,
    loginQL: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  getChildContext() {
    const { actions, loginQL, dispatch } = this.props;
    const { submitting } = this.state;
    return {
      actions,
      loginQL,
      dispatch,
      submitting,
    };
  }

  componentWillMount() {
    this.props.dispatch(authAction());
  }

  componentWillReceiveProps(nextProps) {
    const { loginQL } = nextProps;
    if (!loginQL.isFetching && loginQL.response) {
      this.setState({
        submitting: false,
      });
    }
  }

  setSubmitting(submitting) {
    this.setState({
      submitting,
    });
  }

  render() {
    const initialValues = {};
    const { location } = this.props;
    const { search } = location;
    const parsedQueryString = queryString.parse(search);
    const { u } = parsedQueryString;
    if (u && regexp.isMobile(u)) {
      initialValues.mobile = u;
    }
    return (
      <div className="col-md-12">
        <LoginForm
          loginQL={this.props.loginQL}
          setSubmitting={this.setSubmitting.bind(this)}
          initialValues={initialValues}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const loginQL = state.api.loginQL || {};
  const auth = state.auth || {};
  return {
    auth,
    loginQL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
