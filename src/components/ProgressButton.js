/*
 * 与后端有交互的按钮,提供loading和disable功能
 * */
import React, { PropTypes } from 'react';

export default class ProgressButton extends React.Component {

  static getDefaultProps = {
    preventDefault: false,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(e) {
    const { disabled, preventDefault, onClick } = this.props;
    if (disabled) {
      return;
    }
    this.setState({
      disabled: true,
    });
    if (preventDefault) {
      e.preventDefault();
    }
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { classNames, children, disabled, ...props } = this.props;
    const disabledClass = ' whirl traditional';
    const classNamespace = disabled ? classNames.concat(disabledClass) : classNames;
    return (
      <button
        className={classNamespace}
        onClick={this.handleClick.bind(this)}
        {...props}
      >
        {children}
      </button>
    );
  }
}

ProgressButton.propTypes = {
  classNames: PropTypes.string.isRequired,
  preventDefault: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};
