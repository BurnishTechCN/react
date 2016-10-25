import React, { PropTypes } from 'react';
import { DEBUG, SSO_URL } from 'config';
import logo from 'images/logo.jpg';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { toggleSidebarCollapse } from 'actions/ui';

export default class Header extends React.Component {

  static contextTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleLogin() {
    const locate = this.context.location;
    const ssoTail = '/land';
    const callbackTail = DEBUG ? `/#${locate.pathname}` : `${locate.pathname}`;
    const callbackUrl = encodeURIComponent(`${location.protocol}//${location.host}${callbackTail}`);
    const ssoUrl = `${SSO_URL}${ssoTail}?callback=${callbackUrl}&next=/`;
    window.open(ssoUrl);
  }

  handleLogout() {
    this.context.actions.logout();
  }

  handleSidebarCollapse() {
    const { dispatch, ui } = this.context;
    const sidebarClass = ui.sidebarCollapseClass === 'mainnav-lg' ? 'mainnav-sm' : 'mainnav-lg';
    dispatch(toggleSidebarCollapse(sidebarClass));
  }

  render() {
    const { auth } = this.context;
    const { isAuthenticated, username } = auth;
    let userEl = null;
    if (isAuthenticated === false) {
      userEl = <a className="curp" onClick={this.handleLogin.bind(this)}>登录</a>;
    } else if (isAuthenticated === true) {
      const userNameEl = (
        <div>
          {username}
          <i className="ion-person"></i>
        </div>
      );
      userEl = (
        <div>
          <DropdownButton bsStyle="default" pullRight={!!1} title={userNameEl} noCaret id="dropdown-no-caret">
            <MenuItem eventKey="2" onClick={this.handleLogout.bind(this)}>
              <i className="ion-android-exit icon-lg icon-fw" />退出
            </MenuItem>
          </DropdownButton>
        </div>
      );
    }

    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <img src={logo} className="brand-icon" alt="" />
              <div className="brand-title">
                <span className="brand-text">监控系统</span>
              </div>
            </a>
          </div>
          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links pull-left">
              <li className="tgl-menu-btn">
                <a className="mainnav-toggle curp" onClick={this.handleSidebarCollapse.bind(this)}>
                  <i className="ion-navicon"></i>
                </a>
              </li>
              <li className="dropdown">
                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                  <i className="ion-ios-bell"></i>
                  <span className="badge badge-header badge-danger"></span>
                </a>
              </li>
              <li className="mega-dropdown">
                <a href="#" className="mega-dropdown-toggle">
                  <i className="ion-android-apps"></i>
                </a>
              </li>
            </ul>
            <ul className="nav navbar-top-links pull-right">
              <li id="dropdown-user">
                {userEl}
              </li>
              <li>
                <a className="aside-toggle curp">
                  <i className="ion-android-more-vertical" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
