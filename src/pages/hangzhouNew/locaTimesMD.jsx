import React, { Component } from 'react';
import moment from 'moment';

class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localH: moment().format('HH'),
      localM: moment().format('mm'),
      localS: moment().format('ss')
    };
  }

  componentDidMount() {
    if (this.timer1) {
      clearInterval(this.timer1);
    }
    this.timer1 = setInterval(() => {
      this.setState({
        localH: moment().format('HH'),
        localM: moment().format('mm'),
        localS: moment().format('ss')
      });
    }, 1000);
  }

  componentWillUnmount() {
    if(this.timer1){
      clearInterval(this.timer1);
    }
  }


  render() {
    const localYY = moment().format('YYYY');
    const localMonth = moment().format('MM');
    const localDay = moment().format('DD');
    // const localH = moment().format('HH');
    // const localM = moment().format('mm');
    const { localH, localM ,localS} = this.state;

    const localWeek = moment().days();
    let tempWeek = '';
    switch (localWeek) {
      case 1:
        tempWeek = '一';
        break;
      case 2:
        tempWeek = '二';
        break;
      case 3:
        tempWeek = '三';
        break;
      case 4:
        tempWeek = '四';
        break;
      case 5:
        tempWeek = '五';
        break;
      case 6:
        tempWeek = '六';
        break;
      case 0:
        tempWeek = '日';
        break;
      default:
        break;
    }

    return (
      <div className="timeWrap">
        <span className="sp-month">{localYY} - </span>
        <span className="sp-month">{localMonth} - </span>
        <span className="sp-day">{localDay} </span>

        <span className="sp-h">{localH} </span>
        <b> : </b>
        <span className="sp-m">{localM} </span>
        <b> : </b>
        <span className="sp-m">{localS} </span>
        <span className="sp-week">星期{tempWeek}</span>
      </div>
    );
  }
}
export default pageComponent;
