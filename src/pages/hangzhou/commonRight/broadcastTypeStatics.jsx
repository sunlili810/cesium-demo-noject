import React, { Component } from 'react';
import '../index.less';
import {
  BarChartOutlined
} from '@ant-design/icons';
import Bar from 'components/echart/bar';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      yData: []
    };
  }

  componentDidMount() {
    this.fetch();
    // this.props.onRef(this);
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetch(deveui) {
    const that = this;
    // this.setState({ deveui });
    //
    // const tempData = [{
    //   devtpId: 'claa_btlabel',
    //   devtpNm: '蓝牙定位标签.CLAA',
    //   devtpCategory: '智能定位',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 0.0
    // }, {
    //   devtpId: 'claa_toiletstall_occupy',
    //   devtpNm: '智能厕位占用感应设备（DT20）.CLAA',
    //   devtpCategory: '智能家居',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 0.0
    // }, {
    //   devtpId: 'claa_vca10_xx_xxxx_v0',
    //   devtpNm: 'VCA防碰撞终端(VCA10).V0',
    //   devtpCategory: '通用物联网应用',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 0.0
    // }, {
    //   devtpId: 'dayang_smartsocket',
    //   devtpNm: '智能插座.D.Y',
    //   devtpCategory: '智能家居',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 0.0
    // }, {
    //   devtpId: 'gprs_claa_locanchor',
    //   devtpNm: 'GPRS.CAT1蓝牙定位锚点.CLAA',
    //   devtpCategory: '智慧城市',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 100.0
    // }, {
    //   devtpId: 'gprs_claa_temp_tgr10',
    //   devtpNm: 'GPRS.CAT1定位测温终端.CLAA',
    //   devtpCategory: '智慧城市',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 100.0
    // }, {
    //   devtpId: 'heao_roadlamp',
    //   devtpNm: '智能路灯.H.A',
    //   devtpCategory: '智慧城市',
    //   devOnlineRatio: 100.0,
    //   devAlarmRatio: 0.0
    // }];
    // const tempXData = [];
    // const serryData = tempData.map((item) => {
    //   tempXData.push(item.devtpNm);
    //   return item.devOnlineRatio;
    // });
    //
    // that.setState({
    //   xData: tempXData,
    //   yData: serryData
    // });

    const param = {
      loadingFlag: false,
      url: '/appm/home/qrydevstatratioperdevtp',
      method: 'get',
      data: {
        // days:7
      },
      successFn(data) {
        const tempXData = [];
        const serryData = data.map((item) => {
          tempXData.push(item.devtpNm);
          return item.devOnlineRatio;
        });

        that.setState({
          xData: tempXData,
          yData: serryData
        });

        // if(that.timer1){
        //  clearTimeout(that.timer1)
        // }
        // that.timer1 = setTimeout(()=>{
        //  that.fetch(that.state.deveui);
        // },5*60*1000);
      }
    };
    store.handleNormal(param);
  }

  handlemarkclick(deveui) {
    this.fetch(deveui);
  }


  render() {
    const {
      xData, yData
    } = this.state;
    const param = {
      xdata: xData, // xData,
      colorOption: {
        yLineColor: '#C3C3C3',
        xLineColor: '#C3C3C3',
        yTxtColor: '#C3C3C3',
        xTxtColor: '#C3C3C3'

      },
      LinearGradientColors: [
        [
          { offset: 0, color: '#5A09FA' },
          { offset: 0.5, color: '#7B1AF2' },
          { offset: 1, color: '#9728EA' }
        ],
        [

          { offset: 0, color: '#23DA4F' },
          { offset: 0.5, color: '#8CE54B' },
          { offset: 1, color: '#EFEF46' }
        ],
        [

          { offset: 0, color: '#2EBDFF' },
          { offset: 0.5, color: '#2EBDFF' },
          { offset: 1, color: '#2EBDFF' }
        ],
        [

          { offset: 0, color: '#53FED9' },
          { offset: 0.5, color: '#53FED9' },
          { offset: 1, color: '#53FED9' }
        ],
        [

          { offset: 0, color: '#60B1CC' },
          { offset: 0.5, color: '#60B1CC' },
          { offset: 1, color: '#60B1CC' }
        ],
        [

          { offset: 0, color: '#CFA448' },
          { offset: 0.5, color: '#CFA448' },
          { offset: 1, color: '#CFA448' }
        ]
      ],
      serrydata: [{
        data: yData,
        type: 'bar'
      }]
      // [
      //   {
      //     name: '告警总量',
      //     type: 'bar',
      //     barWidth: '10',
      //     data: yData
      //   }
      // {
      //  name: '二级告警',
      //  type: 'bar',
      //  barWidth: '10',
      //  data:[10,90,20,50,30,90] //yData2
      // }
      // ]
      // yAxis: [
      //  {
      //    yAxisIndex: 1,
      //    splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
      //      show: false
      //    },
      //  },
      //  //双y轴
      //  //{
      //  //  name: '电线沟',
      //  //  yAxisIndex: 2,
      //  //  splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
      //  //    show: false,
      //  //
      //  //  },
      //  //}
      // ]
    };
    return (
      <div className="leftTwoPage" style={{ height: '100%' }}>
        <div className="bar" style={{ height: '80%' }}>
          <Bar id="broadcastBar" param={param} />
        </div>

      </div>
    );
  }
}

export default PageComponent;
