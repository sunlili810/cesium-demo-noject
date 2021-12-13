import React, { Component } from 'react';
import './index.less';
import tabStore from 'store/tablestore';
import Piecircle2 from 'components/echart/piecircle2';
import * as echarts from 'echarts';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: null
    };
  }

  componentDidMount() {
    this.fetchSummary();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentab !== this.props.currentab) {
      this.fetchSummary({ days: nextProps.currentab });
    }
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetchSummary(deveui) {
    const that = this;
    // this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/appm/home/qrystatisticsnum',
      method: 'post',
      data: {
      },
      successFn(data) {
        that.setState({
          summaryData: data
        });

        // if (that.timer1) {
        //   clearTimeout(that.timer1);
        // }
        // that.timer1 = setTimeout(() => {
        //   that.fetchSummary();
        // }, window.timer);
      }
    };
    store.handleNormal(param);
  }


  render() {
    const { summaryData } = this.state;
    const standby = summaryData !== null ? summaryData.lightupnum : 0;
    const work = summaryData !== null ? summaryData.lightnum : 0;

    const onlinenum = summaryData !== null ? summaryData.resstonline : 0;
    const devnum = summaryData !== null ? summaryData.resstnum : 0;

    const confirmnum = summaryData !== null ? summaryData.resalarmnum : 0;
    const total = summaryData !== null ? summaryData.resnum : 0;
    // 获得环形饼图数据
    const tempcolors1 = ['#95EB61', '#439EC5', '#ACC9FF', '#D7E5FF'];
    const pieParamCircle1 = {
      radius: standby === 0 && work === 0 ? ['40%', '105%'] : ['40%', '75%'],
      // colors: ['#ACC9FF','#D7E5FF','#95EB61','#46E2B4'],
      colors: [
        new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: tempcolors1[0]
        },
        {
          offset: 0.9,
          color: tempcolors1[1]
        }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: tempcolors1[2]
        },
        {
          offset: 0.5,
          color: tempcolors1[3]
        }])],
      centerFontColor: '#fff',
      seriesData: [
        {
          name: '亮灯数',
          value: standby
        },
        {
          name: '不亮灯数',
          value: work - standby
        }
      ]

      // this.state.seriesData
    };
    // const tempcolors2 = ['#3EABF6', '#654DFB', '#ACC9FF', '#D7E5FF'];
    const tempcolors2 = ['#654DFB', '#3EABF6', '#ACC9FF', '#D7E5FF'];
    const pieParamCircle2 = {
      radius: onlinenum === 0 && devnum === 0 ? ['40%', '105%'] : ['40%', '75%'],
      // colors: ['#3EABF6','#654DFB','#ACC9FF','#D7E5FF'],
      colors: [
        new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: tempcolors2[0]
        },
        {
          offset: 0.9,
          color: tempcolors2[1]
        }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: tempcolors2[2]
        },
        {
          offset: 0.7,
          color: tempcolors2[3]
        }])],
      centerFontColor: '#fff',

      seriesData: [
        {
          name: '在线',
          value: onlinenum
        },
        {
          name: '离线',
          value: devnum - onlinenum
        }

      ]

      // this.state.seriesData
    };
    const tempcolors3 = ['#F15F1A', '#F1B70C', '#ACC9FF', '#D7E5FF'];
    const pieParamCircle3 = {
      radius: confirmnum === 0 && total === 0 ? ['40%', '105%'] : ['40%', '75%'],
      // colors: ['#ACC9FF','#D7E5FF','#F15F1A','#F1B70C'],
      colors: [
        new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: tempcolors3[0]
        },
        {
          offset: 0.9,
          color: tempcolors3[1]
        }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
          offset: 0,
          color: tempcolors3[2]
        },
        {
          offset: 0.9,
          color: tempcolors3[3]
        }])],
      centerFontColor: '#fff',
      seriesData: [
        {
          name: '告警',
          value: confirmnum
        },
        {
          name: '未告警',
          value: total - confirmnum
        }
      ]

      // this.state.seriesData
    };

    return (
      <div className="threePiePage" style={{ height: '100%' }}>
        <div
          className="pieWrap1"
          style={{
            display: 'inline-block', width: '33.3%', height: '58%', textAlign: 'center', verticalAlign: 'top'
          }}
        >
          <Piecircle2 id="pieCircle" className="pieFather" param={pieParamCircle1} />
          <div>亮灯率</div>

        </div>

        <div
          className="pieWrap2"
          style={{
            display: 'inline-block', width: '33.3%', height: '58%', textAlign: 'center', verticalAlign: 'top'
          }}
        >
          <Piecircle2 id="pieCircle2" param={pieParamCircle2} style={{ width: '100%', height: '100%' }} />
          <div>在线率</div>
        </div>

        <div
          className="pieWrap3"
          style={{
            display: 'inline-block', width: '33.3%', height: '58%', textAlign: 'center', verticalAlign: 'top'
          }}
        >
          <Piecircle2 id="pieCircle3" param={pieParamCircle3} style={{ width: '100%', height: '100%' }} />
          <div>告警率</div>
        </div>

      </div>
    );
  }
}

export default PageComponent;
