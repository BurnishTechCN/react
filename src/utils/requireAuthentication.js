/*
 * 前端Router拦截器:
 * exmaple:
 *  <Route path="profile" component={requireAuthentication(ProfileView)} />
 *  访问私有页面时, 需要经过此拦截器
 * */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/auth';
import { push } from 'react-router-redux';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props) {
      const { auth, dispatch, location } = props;
      // 未授权则跳转到首页
      if (auth.isAuthenticated === false && location.pathname !== '/') {
        return dispatch(push('/'));
      }
      return false;
    }

    render() {
      return (
        <div>
          { this.props.auth.isAuthenticated === true ? <Component {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const auth = state.auth || {};
    return {
      auth,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch,
      actions: bindActionCreators(actionCreators, dispatch),
    };
  };

  AuthenticatedComponent.propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
