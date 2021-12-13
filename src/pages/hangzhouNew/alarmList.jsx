import React, { Component } from 'react';
import {
  AlertOutlined
} from '@ant-design/icons';
import './index.less';
import moment from 'moment';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmsData: []
    };
  }

  componentDidMount() {
    this.fetchSummary();
  }

  componentWillUnmount() {
    this.setState = () => false;
    if (this.timer2) {
      clearTimeout(this.timer2);
    }
  }

  fetchSummary() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appm/qos/alarm/current/pagequeryalarm',
      method: 'post',
      data: {
        startdate: moment(moment().valueOf() - 604800000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn(data) {
        that.setState({
          alarmsData: data.alarms
        });

        if (that.timer2) {
          clearTimeout(that.timer2);
        }
        that.timer2=setTimeout(()=>{that.fetchSummary()},60*1000*1000)
      }
    };
    store.handleNormal(param);
  }


  render() {
    const { alarmsData } = this.state;

    const tempData = alarmsData.length && alarmsData.length >= 4 ? alarmsData.slice(0, 4) : alarmsData;


    return (
      <div className="alarmListPage">
        <div className="comTit">
          {/* <AlertOutlined /> */}
        告警列表
        </div>
        <div className="alarmListCont" style={{ lineHeight: '23px', marginTop: '10px' }}>
          {
            tempData.map(item => (
              <div className="listOne" key={item.alarmid}>
                <div className="time"><span className="tipColor" style={{ background:  item.confirmstate === 1 ? '#A5D8FF' : '#EC3E3E' }} />{item.alarmtime}</div>
                <div className="tip">
                  <div className="tipCont">{item.title}</div>
                  <div className="status" style={{ color:  item.confirmstate === 1  ? '#A5D8FF' : '#EC3E3E' }}>当前状态：{item.confirmstate === 0 ? '未确认' : item.confirmstate === 1 ? '已确认' : ''}</div>
                </div>
                {/* <div className="desc">预警内容：<div style={{display:'inline-block',verticalAlign:'top'}} dangerouslySetInnerHTML={{ __html: item.descp.replace(/<\/br>/g, '<br/>') }} /></div> */}
                <div className="desc">预警内容：{item.descp.replace(/<\/br>/g, '; ')} </div>
              </div>
            ))
          }

        </div>
      </div>
    );
  }
}

export default PageComponent;
