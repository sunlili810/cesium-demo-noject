import React, { Component } from 'react';
import { Select } from 'antd';
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

      craneData: [],
      currentab: '7'
    };
    this.onChange = this.onChange.bind(this);
    this.handlePieData = this.handlePieData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.craneData !== this.props.craneData) {
      this.fetch({ resid: nextProps.craneData, days: this.state.currentab });
    }
  }

  componentDidMount() {
    // this.fetchCrane();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetch(filter) {
    // this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/huadian/heavy/crane/line',
      method: 'get',
      data: {
        ...filter
        // days:7
      },
      successFn: this.handlePieData
    };
    store.handleNormal(param);
  }

  // 处理饼图数据
  handlePieData(data) {
    const Xdata1 = [];
    const Ydata1 = [];
    const Ydata2 = [];

    data.data.mainbeam.map((item) => {
      Xdata1.push(item.collecttime);
      Ydata1.push(item.x !== null && item.x !== undefined ? (item.x).toFixed(1) : 0);
    });

    this.setState({
      Xdata1,
      Ydata1
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
    this.setState({ currentab: value });
    const { craneData } = this.props;
    this.fetch({
      days: value,
      resid: craneData
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
      legend: {
        //data: ['行径方向'],
        y: 10,
        textStyle: {
          color: '#717B84'
        }

      },
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
              color: '#737274'
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: true,
            lineStyle: {
              color: '#E2E2E5',
              type: 'solid'
            }
          }
        }
      ],
      serrydata: [
       // { name: '行径方向', data: Ydata1 }
        // { name: '左右方向', data: Ydata2 }
      ]
    };

    return (
      <div className="linecharPage" style={{ height: '100%' }}>
        <div className="orderTit">
          <span className="comTit"><LineChartOutlined />能耗统计</span>
          <div className="radioBarDev">
            {/* <Radio.Group value={currentab} onChange={this.handletabChange}> */}
            {/*  <Radio.Button value="7">一周</Radio.Button> */}
            {/*  <Radio.Button value="-1">一天</Radio.Button> */}
            {/*  <Radio.Button value="-4">一小时</Radio.Button> */}
            {/* </Radio.Group> */}

            <Select defaultValue={currentab} style={{ width: '100px', height: '28px', lineHeight: '28px' }} onChange={this.handletabChange}>
              <Option value="7">最近一周</Option>
              <Option value="-1">最近一天</Option>
              <Option value="-4">最近一小时</Option>
            </Select>

          </div>
        </div>
        <div className="orderCont" style={{ height: '90%' }}>
          <div className="line1" style={{ width: '100%', height: '100%' }}>
            <Linechar id="linecharEnery" param={linedata1} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
