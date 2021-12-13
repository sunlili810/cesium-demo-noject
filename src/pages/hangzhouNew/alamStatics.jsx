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
    this.setState = () => false;
  }

  fetch(filter) {
    const { currentab } = this.state;
    // const startdate =  moment(moment().valueOf()-604800000).format('YY-MM-DD');
    // const enddate =  moment().format('YY-MM-DD');
    const param = {
      loadingFlag: false,
      url: '/appm/qos/alarm/stat/perdayforlight',
      method: 'post',
      data: {
        //startdate: currentab === '7' ? moment(moment().valueOf() - 604800000).format('YYYY-MM-DD') : moment(moment().valueOf() - 2592000000).format('YYYY-MM-DD'),
        startdate: currentab === '7' ? moment().subtract(6, "days").format('YYYY-MM-DD') : moment(moment().valueOf() - 2592000000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn: this.handlePieData
    };
    store.handleNormal(param);
  }

  // 处理饼图数据
  // handlePieData(data) {
  //   let tempSerry = [];
  //   const serryData = data.alarms.map((item) => {
  //     tempSerry = item.alarms.map(item2 => item2.curalarms);
  //     return {
  //       name: item.devtypename,
  //       data: tempSerry
  //     };
  //   });
  //
  //   this.setState({
  //     Xdata: data.dates,
  //     legendData: data.devtypenames,
  //     serryData
  //   });
  // }
  handlePieData(data) {
    let tempSerry = [];
    let totalAlarm0=0;
    let totalAlarm1=0;
    let totalAlarm2=0;
    let totalAlarm3=0;
    let totalAlarm4=0;
    let totalAlarm5=0;
    let totalAlarm6=0;
    let totalAlarm7=0;
    let totalAlarm8=0;
    let totalAlarm9=0;
    let totalAlarm10=0;
    let totalAlarm11=0;
    let totalAlarm12=0;
    let totalAlarm13=0;
    let totalAlarm14=0;
    let totalAlarm15=0;
    let totalAlarm16=0;
    let totalAlarm17=0;
    let totalAlarm18=0;
    let totalAlarm19=0;
    let totalAlarm20=0;
    let totalAlarm21=0;
    let totalAlarm22=0;
    let totalAlarm23=0;let totalAlarm24=0;
    let totalAlarm25=0;
    let totalAlarm26=0;
    let totalAlarm27=0;
    let totalAlarm28=0;
    let totalAlarm29=0;
    let totalAlarm30=0;



    const serryData = data.alarms.map((item,index) => {
      totalAlarm0+= item.alarms?.[0].curalarms;
      totalAlarm1+= item.alarms?.[1].curalarms;
      totalAlarm2+= item.alarms?.[2].curalarms;
      totalAlarm3+= item.alarms?.[3].curalarms;
      totalAlarm4+= item.alarms?.[4].curalarms;
      totalAlarm5+= item.alarms?.[5].curalarms;
      totalAlarm6+= item.alarms?.[6].curalarms;

      totalAlarm7+= item.alarms?.[7]?.curalarms;
      totalAlarm8+= item.alarms?.[8]?.curalarms;
      totalAlarm9+= item.alarms?.[9]?.curalarms;
      totalAlarm10+= item.alarms?.[10]?.curalarms;
      totalAlarm11+= item.alarms?.[11]?.curalarms;
      totalAlarm12+= item.alarms?.[12]?.curalarms;
      totalAlarm13+= item.alarms?.[13]?.curalarms;

      totalAlarm14+= item.alarms?.[14]?.curalarms;
      totalAlarm15+= item.alarms?.[15]?.curalarms;
      totalAlarm16+= item.alarms?.[16]?.curalarms;
      totalAlarm17+= item.alarms?.[17]?.curalarms;
      totalAlarm18+= item.alarms?.[18]?.curalarms;
      totalAlarm19+= item.alarms?.[19]?.curalarms;
      totalAlarm20+= item.alarms?.[20]?.curalarms;

      totalAlarm21+= item.alarms?.[21]?.curalarms;
      totalAlarm22+= item.alarms?.[22]?.curalarms;
      totalAlarm23+= item.alarms?.[23]?.curalarms;
      totalAlarm24+= item.alarms?.[24]?.curalarms;
      totalAlarm25+= item.alarms?.[25]?.curalarms;
      totalAlarm26+= item.alarms?.[26]?.curalarms;
      totalAlarm27+= item.alarms?.[27]?.curalarms;

      totalAlarm28+= item.alarms?.[28]?.curalarms;
      totalAlarm29+= item.alarms?.[29]?.curalarms;
      totalAlarm30+= item.alarms?.[30]?.curalarms;

    });
    const { currentab } = this.state;
    this.setState({
      Xdata: data.dates,
      legendData: data.devtypenames,
      serryData:[{
        name:'数量',
        data:currentab === '7' ?[totalAlarm0,totalAlarm1,totalAlarm2,totalAlarm3,totalAlarm4,totalAlarm5,totalAlarm6]:[totalAlarm0,totalAlarm1,totalAlarm2,totalAlarm3,totalAlarm4,totalAlarm5,totalAlarm6,totalAlarm7,totalAlarm8,totalAlarm9,totalAlarm10,totalAlarm11,totalAlarm12,totalAlarm13,totalAlarm14,totalAlarm15,totalAlarm16,totalAlarm17,totalAlarm18,totalAlarm19,totalAlarm20,totalAlarm21,totalAlarm22,totalAlarm23,totalAlarm24,totalAlarm25,totalAlarm26,totalAlarm27,totalAlarm28,totalAlarm29,totalAlarm30]
      }]
    });
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
        show: false,
        data: legendData,
        y: 10,
        textStyle: {
          color: '#717B84'
        }

      },
      left: '6%',
      top: '40%',
      xdata: Xdata,
      color: ['red'], //['red', '#04FC46', '#D54AF6', '#09D1F1', '#f9715f', '#ecb031', '#6973c2', '#43AEA8'],
      // xdata: ['12-21','12-22','12-22','12-23','12-24','12-25','12-26'],
      yAxis: [
        {
          name: '',
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
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
            show: false,
            minInterval: 1,
            lineStyle: {
              type: 'solid',
              color: '#E2E2E5', // 左边线的颜色
              width: '1'// 坐标线的宽度
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: true,
            lineStyle: {
              color: '#E2E2E5',
              type: 'solid'
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
        <div className="orderTit" style={{padding:'5px 10px'}}>
          <span className="comTit" >
            {/* <LineChartOutlined /> */}
            告警数量统计
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
            </Select>

          </div>
        </div>
        <div className="orderCont">
          <div className="line1" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{
              color: '#FFF', position: 'absolute', left: '15px', top: '20px'
            }}
            >数量/个
            </div>
            <Linechar id="linechar1" param={linedata1} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
