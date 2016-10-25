import _ from 'lodash';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { SIDEBAR_MENU } from 'constants/ui';

export default class Sidebar extends React.Component {

  static contextTypes = {
    ui: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sidebarMenuData: SIDEBAR_MENU,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { nextPathName } = nextProps;
    _.each(this.state.sidebarMenuData, (item, index) => {
      if (item.submenu) {
        _.each(item.submenu, (o, i) => {
          this.state.sidebarMenuData[index].submenu[i].active =
            o.to === nextPathName ? 'active-link' : '';
        });
      } else {
        this.state.sidebarMenuData[index].active =
          item.to === nextPathName ? 'active-link' : '';
      }
      return true;
    });
    this.setState({
      sidebarMenuData: this.state.sidebarMenuData,
    });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  handleVisible(index, visible) {
    this.state.sidebarMenuData[index].hover = visible ? 'hover' : '';
    this.setState({
      sidebarMenuData: this.state.sidebarMenuData,
    });
  }

  buildSidebarMenu() {
    const { ui } = this.context;
    return _.map(this.state.sidebarMenuData, (item, index) => {
      let submenuEl = null;
      if (item.submenu) {
        submenuEl = (
          <ul className="collapse in">
            {
              (item.submenu.map((o, i) => {
                return (
                  <li className={o.active} key={i}>
                    <Link to={o.to} >{o.title}</Link>
                  </li>
                );
              }))
            }
          </ul>
        );
      }
      let itemContent = (
        <Link to={item.to} className={item.hover}>
          <i className={item.icon}></i>
          <span className="menu-title">
            <strong>{item.title}</strong>
          </span>
        </Link>
      );
      if (item.submenu) {
        itemContent = (
          <a className="curp">
            <i className={item.icon}></i>
            <span className="menu-title">
              <strong>{item.title}</strong>
            </span>
            <i className="arrow"></i>
          </a>
        );
      }
      // 如果是折叠的侧边栏
      if (ui.sidebarCollapseClass === 'mainnav-sm') {
        const overlay = (
          <div className="popover menu-popover">
            <div className="sub-menu">
              <ul>
                <li className="single-content"><a>444</a></li>
                <li><a>33333</a></li>
              </ul>
            </div>
          </div>
        );
        return (
          <li key={index} className={item.active}>
            <Tooltip
              placement="rightTop"
              onVisibleChange={this.handleVisible.bind(this, index)}
              overlayClassName="sidebar-overlay"
              overlay={overlay}
            >
              {itemContent}
              {submenuEl}
            </Tooltip>
          </li>
        );
      }
      return (
        <li key={index} className={item.active}>
          {itemContent}
          {submenuEl}
        </li>
      );
    });
  }

  render() {
    const sidebarMenuEl = this.buildSidebarMenu();
    return (
      <nav id="mainnav-container">
        <div id="mainnav">
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content">
                <ul id="mainnav-menu" className="list-group">
                  <li className="list-header">Navigation</li>
                  {sidebarMenuEl}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  nextPathName: PropTypes.string.isRequired,
};
