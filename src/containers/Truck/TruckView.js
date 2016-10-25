import React from 'react';

export default class IndexView extends React.Component {
  render() {
    return (
      <div>
        <div id="page-title">
          <h1 className="page-header text-overflow">车辆管理</h1>
        </div>
        <div id="page-content">
          这里是车辆管理!
        </div>
      </div>
    );
  }
}
