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
import al from 'images/arrowLeft2.png';
import ar from 'images/arrowRight2.png';
import WisdomLightBar from '../wisdomLightBarNew';
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
      xData: [],
      yData: [],
      lists: []
    };
  }

  componentDidMount() {
    this.fetchStatus();
     this.fetchPie();
    // this.fetchSummary();
  }


  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.lightId !== this.props.lightId) {
      this.fetch(nextProps.lightId);
    }
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  fetchSummary(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appm/qos/alarm/current/pagequeryalarm',
      method: 'get',
      data: {
        fm_curalarm_devtype: 'rs_video_camera',
        startdate: moment(moment().valueOf() - 604800000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn(data) {
        that.setState({
          alarmData: data.alarms
        });
      }
    };
    store.handleNormal(param);
  }

  fetchStatus() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/common/status',
      method: 'get',
      data: {
        restype: 'claa_lamppost_lighting'
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

  fetch(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/visualization/statistic',
      method: 'get',
      data: {
        lampid: deveui
      },
      successFn(data) {
        const tempXData = [];
        const serryData = data?.appdata?.energy.map((item) => {
          tempXData.push(item.date);
          return item.realEnergy;
        });
        that.setState({
          xData: tempXData.reverse(),
          yData: serryData.reverse(),
          lists: data?.appdata,
          summaryData: [
            {
              name: '亮灯数',
              value: data?.appdata?.lightOn || 0
            },
            {
              name: '未亮灯数',
              value: data?.appdata?.lightTotal  - data?.appdata?.lightOn
            }
          ]
        });
      }
    };
    store.handleNormal(param);
  }

  fetchPie(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/common/statisbydevtp',
      method: 'get',
      data: {
        restype: 'claa_lamppost_lighting'
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

  showDrawer = () => {
    const { Visible } = this.state;
    this.setState({ Visible: !Visible });
  };

  onClose = () => {
    this.setState({ Visible: false });
  };

  render() {
    const {
      summaryData, Visible, alarmData, statusData, xData, yData, lists
    } = this.state;
    const { lightId } = this.props;
    // const standby = summaryData !== null ? summaryData.standby : 0;
    // const work = summaryData !== null ? summaryData.work : 0;


    const tempLegend = summaryData?.length ? summaryData.map(item => item.name) : [];
    // 获得环形饼图数据
    const tempcolors1 = ['#ACC9FF', '#D7E5FF', '#95EB61', '#439EC5'];
    const pieParamCircle1 = {
      radius: summaryData?.[0]?.value === 0 && summaryData?.[1]?.value === 0 ? ['40%', '60%'] : ['40%', '60%'],
      // colors: ['#ACC9FF','#D7E5FF','#95EB61','#46E2B4'],
      legendData: tempLegend, // ['待机中', '作业中'],
      // colors: [
      //   new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
      //     offset: 0,
      //     color: tempcolors1[0]
      //   },
      //   {
      //     offset: 0.9,
      //     color: tempcolors1[1]
      //   }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
      //     offset: 0,
      //     color: tempcolors1[2]
      //   },
      //   {
      //     offset: 0.5,
      //     color: tempcolors1[3]
      //   }])],
      centerFontColor: '#fff',
      color:'#1EC3D6',
      graphicTxt:lists?.lightRate,
      seriesData: summaryData
      //   [
      //   {
      //     name: '待机中',
      //     value: 0
      //   },
      //   {
      //     name: '作业中',
      //     value: 0
      //   }
      // ]

      // this.state.seriesData
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

            <div className="tit" style={{ fontWeight: '600', margin: '0px 0 10px 0' }}>
              <span className="icon iconfont icon-a-zu1632" style={{ marginRight: '5px' }} />
              照明设备概览
            </div>

            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px'
              }}
            >
              <div><span className="icon iconfont icon-a-lujing2208" style={{ color: '#22B3C4', fontSize: '30px' }} /></div>
              <div>总数量：{statusData?.total}</div>
            </div>
            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px'
              }}
            >
              <div><span className="icon iconfont icon-a-lujing2208" style={{ color: '#29DC35', fontSize: '30px' }} /></div>
              <div>在线数量：{statusData?.online}</div>
            </div>
            <div
              className="listOne"
              style={{
                display: 'inline-block', width: '33%', textAlign: 'center', fontSize: '12px', position: 'relative'
              }}
            >
              <div><span className="icon iconfont icon-a-lujing2208" style={{ color: '#B8B8B8', fontSize: '30px' }} /></div>
              <div>离线数量：{statusData?.total - statusData?.online}</div>
            </div>
          </div>
          <div className="energyDiv" style={{ position: 'relative', height: '32%', marginBottom: '5px' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit titToday" style={{ fontWeight: '600', margin: '0px 0 10px 0' }}>
              <span className="icon iconfont icon-a-lujing2174" style={{ marginRight: '5px' }} />
              LED灯亮灯率统计
            </div>
            <div className="pieWrap1" style={{ height: '88%' }}>
              <div style={{
                display: 'inline-block', width: '100%', height: '100%', paddingTop: '20px', textAlign: 'center', verticalAlign: 'middle'
              }}
              >
                <Piecircle2 id="pieCircleLight" className="pieFather" param={pieParamCircle1} />

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
              <span className="icon iconfont icon-a-lujing2175" style={{ marginRight: '5px' }} />
              灯具能耗统计
              <span style={{
                display: 'inline-block', marginLeft: '25px', fontWeight: '500', fontSize: '13px', color: '#ABAFB4'
              }}
              >当日能耗：{yData.length>0? yData[yData.length - 1]: ''} kw/h
              </span>
            </div>
            <div className="alamList" style={{ height: '90%' }}>
              {/* { */}
              {/*  alarmData.length ? alarmData.map(item => ( */}
              {/*    <div className="listOne"> */}
              {/*      <div className="time"><span className="tipColor" style={{ background: item.confirmstate === 2 || item.confirmstate === 3 || item.confirmstate === 4 ? '#7E7E7E' : '#D95A5A' }} />{item.alarmtime} <span className="status">{item.confirmstate === 0 ? '未确认' : item.confirmstate === 1 ? '告警' : item.confirmstate === 2 ? '误报' : item.confirmstate === 3 ? '已恢复' : item.confirmstate === 4 ? '其它' : ''}</span></div> */}
              {/*      <div>#5球机 <span className="num">10001</span> #1001灯杆</div> */}
              {/*    </div> */}
              {/*  )) : '' */}
              {/* } */}


              {/* <div className="listOne"> */}
              {/*  <div className="time"><span className="tipColor" style={{ background: '#D14646' }} />2020-11-12 09:43:20 <span className="status">离线告警</span></div> */}
              {/*  <div>#5球机 <span className="num">10001</span> #1001灯杆</div> */}
              {/* </div> */}

              <WisdomLightBar lightId={lightId} xData={xData} yData={yData} />
              {/*//yData*/}


              {/* <div className="energyCont" style={{}}> */}
              {/*  <div className="desc descP"> */}

              {/*    <span className="icon iconfont icon-a-lujing2173" style={{ marginRight: '5px' }} /> */}
              {/*    10.13 */}
              {/*    <div className="progDiv" style={{ lineHeight: '0' }}> */}
              {/*      <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_lamppost_lighting / energyData?.total)*100) || 0}%` }} /></div> */}
              {/*      <span className="txt">{Number(energyData?.claa_lamppost_lighting.toFixed(1) || 0).toFixed(1)}kwh</span> */}
              {/*    </div> */}
              {/*  </div> */}

              {/* </div> */}


            </div>
          </div>


        </Drawer>

      </div>
    );
  }
}

export default PageComponent;
