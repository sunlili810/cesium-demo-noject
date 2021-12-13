import React, { Component } from 'react';
import moment from 'moment';

class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localH: moment().format('HH'),
      localM: moment().format('mm')
    };
  }

  componentDidMount() {
    if (this.timer1) {
      clearInterval(this.timer1);
    }
    this.timer1 = setInterval(() => {
      this.setState({
        localH: moment().format('HH'),
        localM: moment().format('mm')
      });
    }, 1000);
  }


  render() {
    const { localH, localM } = this.state;
    return (
      <div className="timeWrap">
        <span className="sp-h">{localH} </span>
        <b> : </b>
        <span className="sp-m">{localM} </span>
      </div>
    );
  }
}
export default pageComponent;
