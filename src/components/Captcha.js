import React, { PropTypes } from 'react';
import gt from 'utils/gt';
import { getCaptcha } from 'actions/gee';
import $ from 'jquery';


export default class Captcha extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    gt();
    const handlerEmbed = (captchaObj) => {
      this.props.callback(captchaObj);
      if ($('#js-embed-captcha')[0]) {
        captchaObj.appendTo('#js-embed-captcha');
      }
    };
    getCaptcha()
      .then((res) => res.json())
      .then((res) => {
        const data = JSON.parse(res);
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
        }, handlerEmbed);
      });
  }

  render() {
    let clientValidEl = null;
    if (this.props.clientValid === 0) {
      clientValidEl = <p className="text-danger mmd-top">请先拖动验证码到相应位置</p>;
    }
    return (
      <div>
        <div id="js-embed-captcha" className="embed-captcha"></div>
        {clientValidEl}
      </div>
    );
  }
}

Captcha.propTypes = {
  callback: PropTypes.func.isRequired,
  clientValid: PropTypes.number.isRequired,
};
