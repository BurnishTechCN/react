import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DateField } from 'react-date-picker';
import 'moment/locale/zh-cn';


export default class DatePicker extends React.Component {

  focus() {
    const datePicker = this.refs.datePicker;
    const dateFieldEl = ReactDOM.findDOMNode(datePicker);
    dateFieldEl.getElementsByTagName('input')[0].focus();
  }

  render() {
    // ...props 需要从redux-form field传入
    const { initValue, loaded, ...props } = this.props;
    const pickerProps = {
      dateFormat: 'YYYY-MM-DD',
      locale: 'zh-cn',
      footer: !!0,
      collapseOnDateClick: !!1,
      updateOnDateClick: !!1,
      ref: 'datePicker',
    };
    if (loaded) {
      pickerProps.defaultValue = initValue;
    }
    return (
      <div className="box-date-field" onClick={this.focus.bind(this)}>
        <DateField {...pickerProps} {...props} />
        <span className="box-date-icon curp">
          <i className="icon icon-date"></i>
          <i className="icon icon-date"></i>
        </span>
      </div>
    );
  }
}

DatePicker.propTypes = {
  loaded: PropTypes.bool.isRequired,
  initValue: PropTypes.any,
};
