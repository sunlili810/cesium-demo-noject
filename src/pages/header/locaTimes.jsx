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
      <div className="timePage" style={{display:'inline-block'}}>
        <span className="sp-year">{localYear} - </span>
        <span className="sp-month">{localMonth} - </span>
        <span className="sp-day" style={{marginRight:'10px'}}>{localDay} </span>
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
