import React, { Component } from 'react';
import { Select } from 'antd';
import moment from 'moment';
import {
  LineChartOutlined
} from '@ant-design/icons';
import './index.less';
import tabStore from 'store/tablestore';
import Linechar from 'components/echart/line';

const store = new tabStore();
const { Option } = Select;
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Xdata: [],
      serryData: [],
      legendData: [],
      currentab: '7'
    };
    this.handlePieData = this.handlePieData.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.craneData !== this.props.craneData) {
  //     this.fetch({ resid: nextProps.craneData, days: this.state.currentab });
  //   }
  // }

  componentDidMount() {
    this.fetch();
   // this.handlePieData();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetch(filter) {
    const { currentab } = this.state;
    // const startdate =  moment(moment().valueOf()-604800000).format('YY-MM-DD');
    // const enddate =  moment().format('YY-MM-DD');
    const param = {
      loadingFlag: false,
      url: '/appm/qos/alarm/stat/perday',
      method: 'post',
      data: {
        startdate: currentab === '7' ? moment(moment().valueOf() - 604800000).format('YYYY-MM-DD') : moment(moment().valueOf() - 2592000000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn: this.handlePieData
    };
    store.handleNormal(param);
  }

  // 处理饼图数据
  handlePieData(data) {
    // const tempData = {
    //   alarms: [{
    //     devtype: 'lansi_temp_v3',
    //     devtypename: '温湿度计.L.S.V3',
    //     alarms: [{
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-06'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-07'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-08'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-09'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-10'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-11'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-12'
    //     }]
    //   }, {
    //     devtype: 'xinshanying_tempalarm',
    //     devtypename: '智能温感报警器.X.S.Y',
    //     alarms: [{
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-06'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-07'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-08'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-09'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-10'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-11'
    //     }, {
    //       alarms: 0,
    //       curalarms: 0,
    //       hisalarms: 0,
    //       date: '2021-04-12'
    //     }]
    //   }],
    //   dates: ['2021-04-06', '2021-04-07', '2021-04-08', '2021-04-09', '2021-04-10', '2021-04-11', '2021-04-12'],
    //   devtypenames: ['温湿度计.L.S.V3', '智能温感报警器.X.S.Y']
    // };
    let tempSerry = [];
    const serryData = data.alarms.map((item) => {
      tempSerry = item.alarms.map(item2 => item2.curalarms);
      return {
        name: item.devtypename,
        data: tempSerry
      };
    });

    this.setState({
      Xdata: data.dates,
      legendData: data.devtypenames,
      serryData
    });
    // if(that.timer1){
    //  clearTimeout(that.timer1)
    // }
    //
    // that.timer1 = setTimeout(()=>{
    //  that.fetch(that.state.deveui);
    // },5*60*1000);
  }

  handletabChange= (value) => {
    this.setState({ currentab: value }, () => {
      this.fetch();
    });
    // this.fetch({
    //   currentab
    // });
  };

  render() {
    const {
      Xdata,
      serryData,
      legendData,
      currentab
    } = this.state;
    const linedata1 = {
      title: '',
      legend: {
        data: legendData,
        y: 10,
        textStyle: {
          color: '#717B84'
        }

      },
      left: '6%',
      top: '40%',
      xdata: Xdata,
      // xdata: ['12-21','12-22','12-22','12-23','12-24','12-25','12-26'],
      yAxis: [
        {
          name: '',
          type: 'value',
          axisLabel: {
            textStyle: {
              color:  '#666666'
            }
          },
          // max: 100,
          // min: -60,
          // axisLine: {
          //   lineStyle: {
          //     color: '#737274'
          //   }
          // },
          axisLine: {
            show: true,
            minInterval: 1,
            lineStyle: {
              type: 'solid',
              color: '#E2E2E5',//左边线的颜色
              width: '1'//坐标线的宽度
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: true,
            lineStyle: {
              color: '#E2E2E5',
              type: 'dashed'
            }
          },
          minInterval: 1
        }
      ],
      serrydata: serryData
      //   [
      //   { name: '行径方向', data: Ydata1 }
      //   // { name: '左右方向', data: Ydata2 }
      // ]
    };

    return (
      <div className="linecharPage" style={{ height: '100%' }}>
        <div className="orderTit">
          <span className="comTit"><LineChartOutlined />告警数量统计</span>
          <div className="radioBarDev">
            {/* <Radio.Group value={currentab} onChange={this.handletabChange}> */}
            {/*  <Radio.Button value="7">一周</Radio.Button> */}
            {/*  <Radio.Button value="-1">一天</Radio.Button> */}
            {/*  <Radio.Button value="-4">一小时</Radio.Button> */}
            {/* </Radio.Group> */}

            <Select defaultValue={currentab} style={{ width: '100px', height: '28px', lineHeight: '28px' }} onChange={this.handletabChange}>
              <Option value="7">最近一周</Option>
              <Option value="30">最近一月</Option>
            </Select>

          </div>
        </div>
        <div className="orderCont">
          <div className="line1" style={{ width: '100%', height: '100%' }}>
            <Linechar id="linechar1" param={linedata1} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
