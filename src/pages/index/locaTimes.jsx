import React, { Component } from 'react';
import moment from 'moment';

class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localS: moment().format('ss')
    };
  }
  componentDidMount() {
    if (this.timer1) {
      clearInterval(this.timer1);
    }
    this.timer1 = setInterval(() => { this.setState({ localS: moment().format('ss') }); }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer1);
  }
  render() {
    const localYear = moment().format('YYYY');
    const localMonth = moment().format('MM');
    const localDay = moment().format('DD');
    const localH = moment().format('HH');
    const localM = moment().format('mm');
    return (
      <div>
        <span className="sp-year">{localYear} 年 </span>
        <span className="sp-month">{localMonth} 月 </span>
        <span className="sp-day">{localDay} 日</span>
        <span className="sp-h">{localH} </span>
        <b> : </b>
        <span className="sp-m">{localM} </span>
        <b> : </b>
        <span className="sp-sout"><span className="sp-s">{this.state.localS}</span></span>
      </div>
    );
  }
}
export default pageComponent;
