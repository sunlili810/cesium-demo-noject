import React, { Component } from 'react';
import { Select } from 'antd';
import {
  LineChartOutlined
} from '@ant-design/icons';
import '../index.less';
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
      currentab: 'wd'
    };
    this.lineData = [];
    this.handlePieData = this.handlePieData.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.lightid);
  //   if (nextProps.lightid !== this.props.lightid) {
  //     console.log(nextProps.lightid);
  //     //this.fetch({ resid: nextProps.lightid });
  //   }
  // }

  componentDidMount() {
    // this.fetchCrane();
    const { deveui } = this.props;
    this.fetch({ deveui });
  }


  fetch(values) {
    const param = {
      loadingFlag: false,
      url: '/lamp/light/weather/current',
      method: 'get',
      data: {
        ...values
      },
      successFn: this.handlePieData
    };
    store.handleNormal(param);
  }

  // 处理饼图数据
  handlePieData(data) {
    const Xdata1 = [];
    const Ydata1 = [];
    data.appdata.map((item) => {
      Xdata1.push(item.collecttime);
      Ydata1.push(item.wd !== null && item.wd !== undefined ? (item.wd).toFixed(1) : 0);
    });
    this.lineData = data.appdata;

    this.setState({
      Xdata1,
      Ydata1
    });
  }

  handletabChange= (value) => {
    this.setState({ currentab: value }, () => {
      const { currentab } = this.state;
      const Ydata1 = [];
      this.lineData.map((item) => {
        Ydata1.push(item[currentab] !== null && item[currentab] !== undefined ? (item[currentab]).toFixed(1) : 0);
      });
      this.setState({
        Ydata1
      });
    });
  };

  render() {
    const {
      Xdata1,
      Ydata1,
      currentab
    } = this.state;
    const linedata1 = {
      title: '',
      // legend: {
      //   data: ['行径方向'],
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
              color: '#4E5D71',
              type: 'solid'
            }
          }
        }
      ],
      serrydata: [
        { name: currentab === 'wd' ? '温度' : '湿度', data: Ydata1 }
        // { name: '左右方向', data: Ydata2 }
      ]
    };
    let currentName = '';
    switch (currentab) {
      case 'wd':
        currentName = `温度：${Ydata1?.[0] || 0}℃`;
        break;
      case 'sd':
        currentName = `湿度：${Ydata1?.[0] || 0}%`;
        break;
      case 'yl':
        currentName = `雨量：${Ydata1?.[0] || 0}`;
        break;
      case 'pm25':
        currentName = `PM2.5：${Ydata1?.[0] || 0}`;
        break;
      case 'zfs':
        currentName = `光照：${Ydata1?.[0] || 0}`;
        break;
      case 'pm10':
        currentName = `PM10：${Ydata1?.[0] || 0}`;
        break;
      case 'qy':
        currentName = `气压：${Ydata1?.[0] || 0}`;
        break;
      case 'zs':
        currentName = `噪声：${Ydata1?.[0] || 0}`;
        break;
      case 'fs':
        currentName = `风速：${Ydata1?.[0] || 0}`;
        break;
      default:
        currentName = '';
        break;
    }
    return (
      <div className="linecharPage" style={{ height: '100%', marginTop: '38px' }}>
        <span>当前{currentName}</span>
        <Select
          defaultValue={currentab}
          style={{
            width: '80px', height: '26px', lineHeight: '26px', float: 'right'
          }}
          onChange={this.handletabChange}
        >

          <Option value="wd">温度</Option>
          <Option value="sd">湿度</Option>
          <Option value="yl">雨量</Option>
          <Option value="pm25">PM2.5</Option>

          <Option value="zfs">光照</Option>

          <Option value="pm10">PM10</Option>
          <Option value="qy">气压</Option>
          <Option value="zs">噪声</Option>
          <Option value="fs">风速</Option>

        </Select>
        <div className="orderCont" style={{ height: '290px' }}>
          <div className="line1" style={{ width: '100%', height: '100%' }}>
            <Linechar id="linecharEneryLight" param={linedata1} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
