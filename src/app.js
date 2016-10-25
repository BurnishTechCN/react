import cookie from 'js-cookie';
import classnames from 'classnames';
import Progress from 'react-progress';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/auth';
import Footer from 'components/Footer';


class App extends React.Component {

  static childContextTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      loadingBarPercent: 0,
    };
  }

  getChildContext() {
    const { actions, auth, ui, location, dispatch } = this.props;
    return {
      auth,
      ui,
      location,
      actions,
      dispatch,
    };
  }

  componentWillMount() {
    const token = cookie.get('o_jwt_id');
    this.props.actions.auth(token);
    clearInterval(this.loadingBarTimer);
  }

  componentWillReceiveProps(nextProps) {
    const { loadingBar } = nextProps;

    if (loadingBar) {
      this.setState({
        loadingBarPercent: 0,
      });
      this.loadingBarTimer = setInterval(() => {
        const loadingBarPercent = this.state.loadingBarPercent;
        const incrLoadingBarPercent = loadingBarPercent + Math.floor(Math.random() * 20);
        if (incrLoadingBarPercent < 99) {
          this.setState({
            loadingBarPercent: incrLoadingBarPercent,
          });
        }
      }, 800);
    } else {
      clearInterval(this.loadingBarTimer);
      this.setState({
        loadingBarPercent: 100,
      });
    }
  }

  handleLogout() {
    this.props.actions.logout();
  }

  render() {
    const { loadingBarPercent } = this.state;
    const { ui } = this.props;
    const containerClass = classnames('effect aside-float aside-bright', ui.sidebarCollapseClass);

    return (
      <div>
        <Progress percent={loadingBarPercent} style={{ zIndex: 999 }} />
        <div id="container" className={containerClass}>
          <div className="boxed">
            <div id="content-container">
              {this.props.children}
            </div>
            <div className="sidebar-popover">
              0.0
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const loadingBar = state.api.loadingBar || false;
  const auth = state.auth || {};
  const ui = state.ui || {};
  return {
    loadingBar,
    auth,
    ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch),
  };
};


App.propTypes = {
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
