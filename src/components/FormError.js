import React, { PropTypes } from 'react';

export default class ProgressButton extends React.Component {

  render() {
    const field = this.props.children;
    const errorMsg = field.touched && (field.error || field.svError);
    if (!errorMsg) {
      return null;
    }
    return <div className="text-danger">{errorMsg}</div>;
  }
}

ProgressButton.propTypes = {
  children: PropTypes.oneOfType([
    React.PropTypes.arrayOf(PropTypes.node),
    React.PropTypes.node,
  ]),
};
