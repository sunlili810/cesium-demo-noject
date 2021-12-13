import React, { Component } from 'react';
import {
  Radio, Icon, Progress, Drawer
} from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './commonRight.less';
import Piecircle2 from 'components/echart/piecircle2';
import * as echarts from 'echarts';
// import Bar from 'components/echart/bar';
import tabStore from 'store/tablestore';
import moment from 'moment';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';
import Linechar from 'components/echart/line';
import LocalTimes from '../locaTimesMD';
import al from 'images/arrowLeft2.png';
import ar from 'images/arrowRight2.png';

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
      Ydata1: []
    };
  }

  componentDidMount() {
    this.fetchStatus();
    this.fetchLine();
    this.fetchSummary();
  }

  componentWillUnmount() {
    this.setState = () => false;
    if (this.timer2) {
      clearTimeout(this.timer2);
    }
  }

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
        restype: 'claa_emergency_alarm'
      },
      successFn(data) {
        that.setState({
          statusData: data
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

  fetchSummary(deveui) {
    const that = this;
    // this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/appm/qos/alarm/his/pagequeryalarm',
      method: 'get',
      data: {
        fm_curalarm_devtype: 'claa_emergency_alarm',
        startdate: moment(moment().valueOf() - 604800000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn(data) {
        that.setState({
          alarmData: data.alarms
        });
        if (this.timer2) {
          clearTimeout(this.timer2);
        }
        that.timer2=setTimeout(()=>{that.fetchSummary()},60*1000*1000)
      }
    };
    store.handleNormal(param);
  }

  fetchPie(deveui) {
    const that = this;
    // this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/light/common/statisbydevtp',
      method: 'get',
      data: {
        restype: 'claa_emergency_alarm'
      },
      successFn(data) {
        const tempData = data.map(item => ({
          name: item.devtpNm,
          value: item.devNum
        }));
        that.setState({
          summaryData: tempData
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

  fetchLine(deveui) {
    const that = this;

    const param = {
      loadingFlag: false,
      url: '/icpas/emergency/count',
      method: 'get',
      data: {
        //deveui
      },
      successFn(data) {
        const tempXData = [];
        const tempYData = [];
        const serryData = data.appdata.map((item) => {
          tempXData.push(item.date);
          tempYData.push(item.num);
        });

        that.setState({
          Xdata: tempXData,
          Ydata1: tempYData
        });
      }
    };
    store.handleNormal(param);
  }

  render() {
    const {
      summaryData, Visible, alarmData, statusData, Xdata, Ydata1
    } = this.state;


    // const standby = summaryData !== null ? summaryData.standby : 0;
    // const work = summaryData !== null ? summaryData.work : 0;


    const tempLegend = summaryData?.length ? summaryData.map(item => item.name) : [];


    // 获得环形饼图数据
    const tempcolors1 = ['#ACC9FF', '#D7E5FF', '#95EB61', '#439EC5'];
    // const pieParamCircle1 = {
    //   radius: ['40%', '60%'], // standby === 0 && work === 0 ? ['60%', '140%'] : ['60%', '95%'],
    //   // colors: ['#ACC9FF','#D7E5FF','#95EB61','#46E2B4'],
    //   legendData: tempLegend, // ['待机中', '作业中'],
    //   // colors: [
    //   //   new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
    //   //     offset: 0,
    //   //     color: tempcolors1[0]
    //   //   },
    //   //   {
    //   //     offset: 0.9,
    //   //     color: tempcolors1[1]
    //   //   }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
    //   //     offset: 0,
    //   //     color: tempcolors1[2]
    //   //   },
    //   //   {
    //   //     offset: 0.5,
    //   //     color: tempcolors1[3]
    //   //   }])],
    //   centerFontColor: '#fff',
    //   seriesData: summaryData
    //   //   [
    //   //   {
    //   //     name: '待机中',
    //   //     value: 0
    //   //   },
    //   //   {
    //   //     name: '作业中',
    //   //     value: 0
    //   //   }
    //   // ]
    //
    //   // this.state.seriesData
    // };

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
      xdata: Xdata,
      color:'red',
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
              color: '#475567',
              type: 'solid'
            }
          },
          minInterval: 1
        }
      ],
      serrydata: [
        { name: '数量', data: Ydata1 }
        // { name: '左右方向', data: Ydata2 }
      ]
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
              <span className="icon iconfont icon-a-lujing2063" style={{ marginRight: '5px', fontWeight: '500' }} />
              报警设备概览
            </div>

            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px'
              }}
            >
              <div><span className="icon iconfont icon-a-lujing2224" style={{ color: '#22B3C4', fontSize: '30px' }} /></div>
              <div>总设备：{statusData?.total}</div>
            </div>
            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px'
              }}
            >
              <div><span className="icon iconfont icon-a-lujing2224" style={{ color: '#29DC35', fontSize: '30px' }} /></div>
              <div>在线数量：{statusData?.online}</div>
            </div>
            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px', position: 'relative'
              }}
            >
              <div><span className="icon iconfont icon-a-lujing2224" style={{ color: '#B8B8B8', fontSize: '30px' }} /></div>
              <div>离线数量：{statusData?.total - statusData?.online}</div>
            </div>
          </div>
          <div className="energyDiv" style={{ position: 'relative', height: '32%', marginBottom: '5px' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit titToday" style={{ fontWeight: '600', margin: '0px 0 15px 0' }}>
              <span className="icon iconfont icon-a-zu1832" style={{ marginRight: '5px', fontWeight: '500' }} />
              报警趋势统计
            </div>
            <div className="pieWrap1" style={{ height: '86%' }}>
              <div style={{
                display: 'inline-block', width: '100%', height: '100%', paddingTop: '20px', textAlign: 'center', verticalAlign: 'middle'
              }}
              >
                {/* <Piecircle2 id="pieCircleLight" className="pieFather" param={pieParamCircle1} /> */}

                <Linechar id="emergency1" param={linedata1} />

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

            <div className="tit" style={{ fontWeight: '600', margin: '0px 0 15px 0' }}>
              <span className="icon iconfont icon-a-lujing2147" style={{ marginRight: '5px', fontWeight: '500' }} />
              实时报警列表
              <a
                href={`${window.apiUrl}/pages/combo/application/fm/alarmhistory.jsp?projectid=${localStorage.getItem('projectid')}`}
                target="_blank"
                style={{
                  color: '#D8D8D8', background: '#526A89', borderRadius: '5px', fontSize: '12px', display: 'inline-block', padding: '3px 5px', float: 'right'
                }}
              >更多
              </a>
            </div>
            <div className="alamList" style={{ height: '84%' }}>
              {
                alarmData.length ? alarmData.map((item, index) => (
                  <div className="listOne" key={index}>
                    <div className="time"><span className="tipColor" style={{ background: item.confirmstate === 2 || item.confirmstate === 3 || item.confirmstate === 4 ? '#7E7E7E' : '#D95A5A' }} />
                      {item.alarmtime}
                      <span className="status" style={{ color: item.confirmstate === 2 || item.confirmstate === 3 || item.confirmstate === 4 ? '#7E7E7E' : '#D95A5A' }}>{item.confirmstate === 0 ? '紧急呼叫' : item.confirmstate === 1 ? '告警' : item.confirmstate === 2 ? '误报' : item.confirmstate === 3 ? '已恢复' : item.confirmstate === 4 ? '其它' : ''}</span>
                    </div>
                    {/* <div>#5球机 <span className="num">10001</span> #1001灯杆</div> */}
                    <div>
                      #{item.devname}
                      <span className="num">{item.alarmcode}</span>
                      #{item.mainresname}
                    </div>
                  </div>
                )) : ''
              }


              {/* <div className="listOne"> */}
              {/*  <div className="time"><span className="tipColor" style={{ background: '#D14646' }} />2020-11-12 09:43:20 <span className="status">离线告警</span></div> */}
              {/*  <div>#5球机 <span className="num">10001</span> #1001灯杆</div> */}
              {/* </div> */}

              {/* <div className="listOne"> */}
              {/*  <div className="time"><span className="tipColor" style={{ background: '#D14646' }} />2020-11-12 09:43:20 <span className="status">离线告警</span></div> */}
              {/*  <div>#5球机 <span className="num">10001</span> #1001灯杆</div> */}
              {/* </div> */}

              {/* <div className="listOne"> */}
              {/*  <div className="time"><span className="tipColor" style={{ background: '#D14646' }} />2020-11-12 09:43:20 <span className="status">离线告警</span></div> */}
              {/*  <div>#5球机 <span className="num">10001</span> #1001灯杆</div> */}
              {/* </div> */}

              {/* <EnergyStatics /> */}
            </div>
          </div>


        </Drawer>

      </div>
    );
  }
}

export default PageComponent;
