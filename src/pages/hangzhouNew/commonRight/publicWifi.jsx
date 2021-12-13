import React, { Component } from 'react';
import {
  Radio, Icon, Progress, Drawer
} from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './commonRight.less';
import Piecircle2 from 'components/echart/piecircle2';
import * as echarts from 'echarts';
// import Bar from 'components/echart/barWifi';
import tabStore from 'store/tablestore';
import moment from 'moment';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';
import Linechar from 'components/echart/line';
import al from 'images/arrowLeft2.png';
import ar from 'images/arrowRight2.png';
import Barchar from '../wifiBar';
import LocalTimes from '../locaTimesMD';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: [],
      Visible: true,
      alarmData: [],
      statusData: null,
      Xdata: [],
      Ydata1: [],
      Ydata2: []
    };
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   if (nextProps?.wifiId !== this.props?.wifiId) {
  //     this.fetchWifi(nextProps?.wifiId);
  //   }
  // }

  componentDidMount() {
    this.fetchStatus();
    this.fetchWifi();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  // fetch(resid) {
  //   const param = {
  //     loadingFlag: false,
  //     url: '/huadian/heavy/crane/line',
  //     method: 'get',
  //     data: {
  //       resid
  //     },
  //     successFn: this.handlePieData
  //   };
  //   store.handleNormal(param);
  // }
  //
  // // 处理饼图数据
  // handlePieData(data) {
  //   const Xdata1 = [];
  //   const Ydata1 = [];
  //   const Ydata2 = [];
  //
  //   data.data.mainbeam.map((item) => {
  //     Xdata1.push(item.collecttime);
  //     Ydata1.push(item.x !== null && item.x !== undefined ? (item.x).toFixed(1) : 0);
  //   });
  //
  //   this.setState({
  //     Xdata1,
  //     Ydata1
  //   });
  // }

  showDrawer = () => {
    const { Visible } = this.state;
    this.setState({ Visible: !Visible });
  };

  onClose = () => {
    this.setState({ Visible: false });
  };

  fetchStatus() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/common/status',
      method: 'get',
      data: {
        restype: 'claa_public_wifi'
      },
      successFn(data) {
        that.setState({
          statusData: data
        });
      }
    };
    store.handleNormal(param);
  }

  fetchWifi(deveui) {
    const that = this;

    const param = {
      loadingFlag: false,
      url: '/lamp/light/wifi/current',
      method: 'get',
      data: {
        //deveui
      },
      successFn(data) {
        const tempXData = [];
        const tempYData = [];
        const tempYData2 = [];
        const serryData = data.appdata.map((item) => {
          tempXData.push(item.collecttime);
          tempYData.push(parseFloat(item.inflow / 1048576/1024).toFixed(2));
          tempYData2.push(parseFloat(item.outflow / 1048576/1024).toFixed(2));
          return item.online;
        });

        that.setState({
          Xdata: tempXData,
          Ydata1: serryData,
          Ydata2: [{
            name: '上行',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            data: tempYData
          },
          {
            name: '下行',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            data: tempYData2
          }
          ]
        });
      }
    };
    store.handleNormal(param);
  }

  render() {
    const {
      Visible, statusData, Xdata, Ydata1, Ydata2
    } = this.state;

    const linedata1 = {
      title: '',
      color: 'red',
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
      xdata: Xdata,
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
              color: '#8C95A0',
              type: 'solid'
            }
          },
          minInterval: 1
        }
      ],
      serrydata: [
        { name: '用户', data: Ydata1 }
        // { name: '左右方向', data: Ydata2 }
      ]
    };

    const param = {
      yminInterval: 10000,
      rotate: 0,
      // xdata: Xdata, // xData,
      colorOption: {
        yLineColor: '#E2E2E5',
        xLineColor: '#E2E2E5',
        yTxtColor: '#fff',
        xTxtColor: '#fff'

      },
      legend: {
        data: ['上行', '下行'],
        bottom: -5,
        icon: 'circle',
        itemStyle: {
          borderWidth: 8
        },
        textStyle: {
          color: '#fff'
        }
      },
      LinearGradientColors: [
        [
          { offset: 0, color: '#645CAE' },
          { offset: 0.5, color: '#645CAE' },
          { offset: 1, color: '#645CAE' }
        ],
        [

          { offset: 0, color: '#5C6FAE' },
          { offset: 0.5, color: '#5C6FAE' },
          { offset: 1, color: '#5C6FAE' }
        ],
        [

          { offset: 0, color: '#4373C5' },
          { offset: 0.5, color: '#4373C5' },
          { offset: 1, color: '#4373C5' }
        ],
        [

          { offset: 0, color: '#439EC5' },
          { offset: 0.5, color: '#439EC5' },
          { offset: 1, color: '#439EC5' }
        ],
        [

          { offset: 0, color: '#96CBE2' },
          { offset: 0.5, color: '#96CBE2' },
          { offset: 1, color: '#96CBE2' }
        ],
        [

          { offset: 0, color: '#C7DFE9' },
          { offset: 0.5, color: '#C7DFE9' },
          { offset: 1, color: '#C7DFE9' }
        ],
        [
          { offset: 0, color: '#1AB3F5' },
          { offset: 0.5, color: '#1AB3F5' },
          { offset: 1, color: '#1AB3F5' }
        ],
        [
          { offset: 0, color: '#A1E3FF' },
          { offset: 0.5, color: '#A1E3FF' },
          { offset: 1, color: '#A1E3FF' }
        ],
        [
          { offset: 0, color: '#5A09FA' },
          { offset: 0.5, color: '#7B1AF2' },
          { offset: 1, color: '#9728EA' }
        ]
      ],
      xAxis: {
        type: 'value',
        boundaryGap: [0.1, 0.1],
        axisLabel: {
          show: false,
          textStyle: {
            color: '#BABDC0'
          }
          // interval: 0,
          // rotate: param.rotate === undefined ? 0 : param.rotate
        },
        axisLine: { // 坐标轴样式
          show: false,
          onZero: true,
          lineStyle: {
            // color: param.colorOption === undefined ? '#800000' : param.colorOption.yLineColor,
            width: 1,
            type: 'solid'
          },
          axisTick: {
            show: false
          }
        },
        splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  竖线
          show: false,
          lineStyle: {
            // color: param.colorOption === undefined ? '#666666' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: { // 坐标轴样式
          show: false,
          onZero: true,
          lineStyle: {
            // color: param.colorOption === undefined ? '#800000' : param.colorOption.yLineColor,
            width: 1,
            type: 'solid'
          }
        },
        splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  竖线
          show: false,
          lineStyle: {
            // color: param.colorOption === undefined ? '#666666' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#BABDC0',
            fontSize: '10',
            extraCssText: 'line-height:30px'
          }

        },
        data: Xdata
      },
      serrydata: Ydata2
      //   [
      //   {
      //   data: Ydata2,
      //   type: 'bar'
      // }]
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
      <div className="rightFloatPage">
        <LocalTimes />
        {
          Visible ? (<img src={ar} alt="" className="arrowLR arrowRSide" onClick={this.showDrawer} />) : (<img src={al} alt="" className="arrowLR arrowLSide" onClick={this.showDrawer} />)
        }
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={Visible}
          mask={false}
          width={320}
          className="ligntRight"
        >
          <div className="topR" style={{ position: 'relative', height: '18%' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit" style={{ fontWeight: '600', margin: '0px 0 15px 0' }}>
              <span className="icon iconfont icon-a-zu1856" style={{ marginRight: '5px', fontWeight: '500' }} />
              WIFI设备概览
            </div>

            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px'
              }}
            >
              <div><span className="icon iconfont icon-a-zu1860" style={{ color: '#22B3C4', fontSize: '30px' }} /></div>
              <div>总设备：{statusData?.total}</div>
            </div>
            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px'
              }}
            >
              <div><span className="icon iconfont icon-a-zu1860" style={{ color: '#29DC35', fontSize: '30px' }} /></div>
              <div>在线数量：{statusData?.online}</div>
            </div>
            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px', position: 'relative'
              }}
            >
              <div><span className="icon iconfont icon-a-zu1860" style={{ color: '#B8B8B8', fontSize: '30px' }} /></div>
              <div>离线数量：{statusData?.total - statusData?.online}</div>
            </div>
          </div>
          <div className="energyDiv" style={{ position: 'relative', height: '32%', marginBottom: '5px' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit titToday" style={{ fontWeight: '600', margin: '0px 0 15px 0' }}>
              <span className="icon iconfont icon-a-lujing2179" style={{ marginRight: '5px', fontWeight: '500' }} />
              用户趋势统计
            </div>
            <div style={{ color: '#CCD0D5', fontSize: '11px', margin: '5px 0 0 5px' }}>数量/个</div>
            <div className="pieWrap1" style={{ height: '86%' }}>
              <div style={{
                display: 'inline-block', width: '100%', height: '100%', paddingTop: '20px', textAlign: 'center', verticalAlign: 'middle'
              }}
              >
                {/* <Piecircle2 id="pieCircleLight" className="pieFather" param={pieParamCircle1} /> */}
                <Linechar id="wifiline1" param={linedata1} />

              </div>

              {/* <div */}
              {/*  className="pieTxt" */}
              {/*  style={{ */}
              {/*    display: 'inline-block', width: '30%', verticalAlign: 'middle' */}
              {/*  }} */}
              {/* > */}
              {/*  <div>亮灯率</div> */}
              {/*  <div>亮灯数：97</div> */}
              {/*  <div>总数：100</div> */}
              {/* </div> */}

            </div>
          </div>

          <div className="bottomR" style={{ position: 'relative', height: '45%' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit" style={{ fontWeight: '600', margin: '0px 0 0px 0' }}>
              <span className="icon iconfont icon-a-lujing2185" style={{ marginRight: '5px', fontWeight: '500' }} />
              无线流量统计
            </div>
            <div style={{ color: '#CCD0D5', fontSize: '11px', margin: '5px 0 0 5px' }}>流量/G</div>
            <div className="alamList" style={{ height: '85%' }}>
              {/* { */}
              {/*  alarmData.length ? alarmData.map(item => ( */}
              {/*    <div className="listOne"> */}
              {/*      <div className="time"><span className="tipColor" style={{ background: item.confirmstate === 2 || item.confirmstate === 3 || item.confirmstate === 4 ? '#7E7E7E' : '#D95A5A' }} />{item.alarmtime} <span className="status">{item.confirmstate === 0 ? '未确认' : item.confirmstate === 1 ? '告警' : item.confirmstate === 2 ? '误报' : item.confirmstate === 3 ? '已恢复' : item.confirmstate === 4 ? '其它' : ''}</span></div> */}
              {/*      /!*<div>#5球机 <span className="num">10001</span> #1001灯杆</div>*!/ */}
              {/*      <div>{item.title}</div> */}
              {/*    </div> */}
              {/*  )) : '' */}
              {/* } */}

              <Barchar param={param} />

              {/* <EnergyStatics /> */}
            </div>
          </div>


        </Drawer>

      </div>
    );
  }
}

export default PageComponent;
