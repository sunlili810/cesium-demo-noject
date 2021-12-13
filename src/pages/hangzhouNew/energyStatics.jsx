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
      Xdata1: [],
      Ydata1: [],
      currentab: '7',
      appdata: null
    };
    this.onChange = this.onChange.bind(this);
    this.handlePieData = this.handlePieData.bind(this);
  }


  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  fetch() {
    const { currentab } = this.state;
    const param = {
      loadingFlag: false,
      url: '/light/dashboard/energy',
      method: 'get',
      data: {
        startdate: currentab === '7' ? moment().subtract(6, "days").format('YYYY-MM-DD') : moment(moment().valueOf() - 2592000000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn: this.handlePieData
    };
    store.handleNormal(param);
  }

  // 处理饼图数据
  handlePieData(data) {
    const Xdata1 = [];
    const Ydata1 = [];
    data.appdata.perdayEnergy.map((item) => {
      Xdata1.push(item.date);
      Ydata1.push(item.energy !== null && item.energy !== undefined ? (item.energy).toFixed(1) : 0);
    });

    this.setState({
      Xdata1,
      Ydata1,
      appdata: data.appdata
    });
    // if(that.timer1){
    //  clearTimeout(that.timer1)
    // }
    //
    // that.timer1 = setTimeout(()=>{
    //  that.fetch(that.state.deveui);
    // },5*60*1000);
  }

  onChange(value) {
    this.fetch({ resid: value });
  }

  handletabChange= (value) => {
    this.setState({ currentab: value }, () => {
      this.fetch();
    });
  };

  render() {
    const {
      Xdata1,
      Ydata1,
      currentab,
      appdata
    } = this.state;
    const linedata1 = {
      title: '',
      // legend: {
      //   // data: ['行径方向'],
      //   y: 10,
      //   textStyle: {
      //     color: '#717B84'
      //   }
      //
      // },
      left: '6%',
      top: '40%',
      xdata: Xdata1,
      // xdata: ['12-21','12-22','12-22','12-23','12-24','12-25','12-26'],
      yAxis: [
        {
          name: '',
          type: 'value',
          // max: 100,
          // min: -60,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: true,
            lineStyle: {
              color: '#A0A9B4',
              type: 'solid'
            }
          }
        }
      ],
      serrydata: [
        { name: '能耗', data: Ydata1 }
        // { name: '左右方向', data: Ydata2 }
      ]
    };

    return (
      <div className="linecharPage" style={{ height: '100%' }}>
        <div className="orderTit" style={{padding:'5px 10px'}}>
          <span className="comTit" style={{ position: 'relative' }}>
            {/* <LineChartOutlined /> */}
            能耗统计

            <div style={{
              position: 'absolute', left: '210px', bottom: '-50px', width: '200px', fontSize: '15px'
            }}
            >总能耗：{parseInt(appdata?.totalEnergy) || 0} kwh
            </div>
          </span>
          <div className="radioBarDev">
            {/* <Radio.Group value={currentab} onChange={this.handletabChange}> */}
            {/*  <Radio.Button value="7">一周</Radio.Button> */}
            {/*  <Radio.Button value="-1">一天</Radio.Button> */}
            {/*  <Radio.Button value="-4">一小时</Radio.Button> */}
            {/* </Radio.Group> */}

            <Select defaultValue={currentab} style={{ width: '100px', height: '28px', lineHeight: '28px' }} onChange={this.handletabChange}>
              <Option value="7">最近一周</Option>
              <Option value="30">最近一月</Option>
              {/* <Option value="-1">最近一天</Option> */}
              {/* <Option value="-4">最近一小时</Option> */}
            </Select>

          </div>
        </div>
        <div className="orderCont" style={{ height: '90%' }}>
          <div className="line1" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{
              color: '#FFF', position: 'absolute', left: '15px', top: '20px'
            }}
            >单位/kwh
            </div>
            <Linechar id="linecharEnery" param={linedata1} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
