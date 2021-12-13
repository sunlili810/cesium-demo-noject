import React, { Component } from 'react';
import {
  Radio, Icon, Progress, Drawer
} from 'antd';
import './index.less';
import Bar from 'components/echart/bar';
import Gauge from 'components/echart/gauge';
import tabStore from 'store/tablestore';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
// import ThreePies from './threePies';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';
import al from 'images/arrowLeft2.png';
import ar from 'images/arrowRight2.png';
import LocalTimes from './locaTimesMD';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: '1',
      summaryData: null,
      Visible: true,
      energyData: null,
      alarmData: null
    };
  }

  componentDidMount() {
    this.fetch();
    this.fetchEnergymonitor();
    this.fetchAlarm();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  handleSizeChange = (e) => {
    this.setState({ currentpage: e.target.value });
  };

  showDrawer = () => {
    const { Visible } = this.state;
    this.setState({ Visible: !Visible });
  };

  onClose = () => {
    this.setState({ Visible: false });
  };

  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appm/home/qrydevstatratioperdevtp',
      method: 'get',
      data: {

      },
      successFn(data) {
        const serryData = data.map(item => {
          if(item !== null){
            return {
              devtpNm: item.devtpNm,
              devOnlineRatio: item.devOnlineRatio
            }
          }else {
            return null
          }

        });
        that.setState({ summaryData: serryData });
      }
    };
    store.handleNormal(param);
  }

  fetchEnergymonitor() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/visualization/energymonitor',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({ energyData: data.appdata });
      }
    };
    store.handleNormal(param);
  }

  fetchAlarm() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/visualization/alarmmonitor',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({ alarmData: data.appdata });
      }
    };
    store.handleNormal(param);
  }

  render() {
    const {
      currentpage, summaryData, Visible, energyData, alarmData
    } = this.state;
    const option = {
      data: Number(energyData?.total || 0).toFixed(1),
      title: '总耗能'
    };
    return (
      <div className="rightFloatPage">
        <LocalTimes />


        {/* <Radio.Group value={currentpage} onChange={this.handleSizeChange} style={{ marginBottom: 3 }}> */}
        {/*  <Radio.Button value="1">设备耗能</Radio.Button> */}
        {/*  /!* <Radio.Button value="2">实时监控</Radio.Button> *!/ */}
        {/* </Radio.Group> */}

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

          <div className="topR" style={{ position: 'relative', height: '29%' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit">
              <span className="icon iconfont icon-a-lujing2081" style={{ marginRight: '5px', fontWeight: '500' }} />
              实时在线率
            </div>
            <div style={{ padding: '0' }}>

              {
                summaryData?.length ? summaryData.map((item, index) => {
                  if(item !== null){
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'inline-block', width: '60px', height: '90px', margin: '0 5px 15px 4px', verticalAlign: 'top'
                        }}
                      >
                        <div style={{
                          display: 'inline-block', width: '59px', height: '59px', background: '#2D4058', borderRadius: '50%'
                        }}
                        ><Progress type="circle" strokeColor="#0CDAF2" percent={item?.devOnlineRatio} format={() => `${item?.devOnlineRatio}%`} width={59} />
                        </div>
                        <div
                          style={{
                            textAlign: 'center', marginTop: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                          }}
                          title={item?.devtpNm}
                        >{item?.devtpNm}
                        </div>
                      </div>
                    )
                  }

              }) : ''
              }

              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '90px', margin: '0 3px 10px 0' */}
              {/* }} */}
              {/* > */}
              {/*  <div style={{ */}
              {/*    display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%' */}
              {/*  }} */}
              {/*  ><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /> */}
              {/*  </div> */}
              {/*  <div style={{ textAlign: 'center', marginTop: '5px' }}>智能灯控</div> */}
              {/* </div> */}

              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '90px', margin: '0 3px 10px 0' */}
              {/* }} */}
              {/* > */}
              {/*  <div style={{ */}
              {/*    display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%' */}
              {/*  }} */}
              {/*  ><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /> */}
              {/*  </div> */}
              {/*  <div style={{ textAlign: 'center', marginTop: '10px' }}>视频监控</div> */}
              {/* </div> */}

              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '90px', margin: '0 3px 10px 0' */}
              {/* }} */}
              {/* > */}
              {/*  <div style={{ */}
              {/*    display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%' */}
              {/*  }} */}
              {/*  ><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /> */}
              {/*  </div> */}
              {/*  <div style={{ textAlign: 'center', marginTop: '10px' }}>WIFI</div> */}
              {/* </div> */}

              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '90px', margin: '0 3px 10px 0' */}
              {/* }} */}
              {/* > */}
              {/*  <div style={{ */}
              {/*    display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%' */}
              {/*  }} */}
              {/*  ><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /> */}
              {/*  </div> */}
              {/*  <div style={{ textAlign: 'center', marginTop: '10px' }}>环境气象</div> */}
              {/* </div> */}

              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%', margin: '0 3px' */}
              {/* }} */}
              {/* > */}
              {/*  <div><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /></div> */}
              {/*  <div style={{ textAlign: 'center' }}>IP广播</div> */}
              {/* </div> */}

              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%', margin: '0 3px' */}
              {/* }} */}
              {/* > */}
              {/*  <div><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /></div> */}
              {/*  <div style={{ textAlign: 'center' }}>信息屏</div> */}
              {/* </div> */}
              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%', margin: '0 3px' */}
              {/* }} */}
              {/* > */}
              {/*  <div><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /></div> */}
              {/*  <div style={{ textAlign: 'center' }}>一键报警</div> */}
              {/* </div> */}
              {/* <div style={{ */}
              {/*  display: 'inline-block', width: '65px', height: '65px', background: '#2D4058', borderRadius: '50%', margin: '0 3px' */}
              {/* }} */}
              {/* > */}
              {/*  <div><Progress type="circle" strokeColor="#0CDAF2" percent={75} width={65} /></div> */}
              {/*  <div style={{ textAlign: 'center', marginBottom: '5px' }}>充电桩</div> */}
              {/* </div> */}


            </div>


          </div>
          {/* <div className="bottomR"> */}
          {/*  <div className="tit">监测统计</div> */}
          {/*  <ThreePies /> */}
          {/* </div> */}
          <div className="energyDiv" style={{ position: 'relative', height: '52%' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit">
              <span className="icon iconfont icon-a-lujing2072" style={{ marginRight: '5px', fontWeight: '500' }} />
              用电实时监测
            </div>
            <div className="energyCont" style={{}}>
              <div style={{ height: '115px' }}><Gauge id="energyGua" param={option} /></div>
              <div className="desc descP">

                <span className="icon iconfont icon-a-lujing2173" style={{ marginRight: '5px' }} />
                照明
                <div className="progDiv" style={{ lineHeight: '0' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_lamppost_lighting / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{Number(energyData?.claa_lamppost_lighting.toFixed(1) || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-a-lujing2187" style={{ marginRight: '5px' }} />
                监控
                <div className="progDiv" style={{ lineHeight: '0' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.rs_video_camera / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{Number(energyData?.rs_video_camera || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-a-lujing2150" style={{ marginRight: '5px' }} />
                气象
                <div className="progDiv" style={{ lineHeight: '0' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_lamppost_weather / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{Number(energyData?.claa_lamppost_weather || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-leftbar_icon_homepage_default" style={{ marginRight: '5px' }} />
                信息屏
                <div className="progDiv" style={{ lineHeight: '0', marginLeft: '5px' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_public_screen / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{Number(energyData?.claa_public_screen || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-a-lujing2062" style={{ marginRight: '5px' }} />
                广播
                <div className="progDiv" style={{ lineHeight: '0' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_public_broadcast / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{Number(energyData?.claa_public_broadcast || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-a-lujing2224" style={{ marginRight: '5px' }} />
                报警
                <div className="progDiv" style={{ lineHeight: '0' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_emergency_alarm / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{Number(energyData?.claa_emergency_alarm || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-a-lujing2064" style={{ marginRight: '5px' }} />
                充电桩
                <div className="progDiv" style={{ lineHeight: '0', marginLeft: '5px' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_charging_pile / energyData?.total) * 100) || 0}%` }} /></div>
                  <span className="txt">{(energyData?.claa_charging_pile || 0).toFixed(1)}kwh</span>
                </div>
              </div>
              <div className="desc descP">
                <span className="icon iconfont icon-a-zu1860" style={{ marginRight: '5px' }} />
                WIFI
                <div className="progDiv" style={{ lineHeight: '0', marginLeft: '10px' }}>
                  <div style={{ background: '#3E536E', lineHeight: '0' }}>
                    <span className="lineprogress" style={{ width: `${parseInt((energyData?.claa_public_wifi / energyData?.total) * 100) || 0}%` }} />
                  </div>
                  <span className="txt">{Number(energyData?.claa_public_wifi || 0).toFixed(1)}kwh</span>
                </div>
              </div>
            </div>

          </div>


          <div className="bottomR" style={{ marginTop: '5px', height: '14%', position: 'relative' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit">
              <span className="icon iconfont icon-a-zu1636" style={{ marginRight: '5px', fontWeight: '500' }} />
              告警实时监测
            </div>

            <div className="desc descP">未确认
              <div className="progDiv" style={{ verticalAlign: 'MIDDLE', lineHeight: '0' }}>
                <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((alarmData?.unconfirm / (alarmData?.confirm + alarmData?.unconfirm) || 0) * 100)}%`, height: '20px', background: '#F20C23' }} /></div>
                <span className="txt" style={{ top: '9px', left: '5px', fontWeight: 'bold' }}>{alarmData?.unconfirm || 0}</span>
              </div>
            </div>

            <div className="desc descP">已确认
              <div className="progDiv" style={{ verticalAlign: 'MIDDLE', lineHeight: '0' }}>
                <div style={{ background: '#3E536E', lineHeight: '0' }}><span className="lineprogress" style={{ width: `${parseInt((alarmData?.confirm / (alarmData?.confirm + alarmData?.unconfirm) || 0) * 100)}%`, height: '20px', background: '#2EDDF2' }} /></div>
                <span className="txt" style={{ top: '9px', left: '5px', fontWeight: 'bold' }}>{alarmData?.confirm || 0}</span>
              </div>
            </div>


          </div>


        </Drawer>
      </div>
    );
  }
}

export default PageComponent;
