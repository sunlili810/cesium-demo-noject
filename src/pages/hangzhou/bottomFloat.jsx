import React, { Component } from 'react';
import {
  Button, Slider, Switch
} from 'antd';
import { CaretDownOutlined, CaretUpOutlined, SyncOutlined } from '@ant-design/icons';
import './index.less';
import tabStore from 'store/tablestore';
import VideoMonitor from './videoMonitor';

const store = new tabStore();

// const baseData = {
//   broadcast: [
//     {
//       workStatus: 1,
//       voice: 20,
//       devtype: 'claa_lamppost_led',
//       collecttime: 1619668800000,
//       brightness: 30,
//       screenStatus: 1,
//       devname: '广播1',
//       deveui: 'R001',
//       status: 0
//     }
//   ],
//   weather: [
//     {
//       zfs: 12,
//       pm10: 8,
//       qy: 9,
//       fs: 3,
//       wd: 5,
//       deveui: 'R004',
//       sd: 6,
//       devtype: 'claa_lamppost_weather',
//       collecttime: 1619668800000,
//       fx: 4,
//       yl: 11,
//       pm25: 7,
//       zs: 10,
//       devname: '气象1',
//       ang: 2,
//       status: '1'
//     }
//   ],
//   video: [
//     {
//       devtype: 'claa_lamppost_video',
//       url: null
//     }
//   ],
//   lighting: [
//     {
//       workStatus: 2,
//       devtype: 'claa_lamppost_lighting',
//       collecttime: 1619668800000,
//       brightness: 3,
//       devname: '照明',
//       deveui: 'R002',
//       status: 1
//     }
//   ]
// };


class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideMessg: false,
      baseData: null
    };
    this.hideMessgFn = this.hideMessgFn.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetch() {
    const that = this;

    const param = {
      loadingFlag: false,
      url: '/appext/lamppost/basedataqry',
      method: 'post',
      data: {

      },
      successFn(data) {
        that.setState({ baseData: data });
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

  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  slideChange = (value) => {
    this.setState({
      inputValue: value
    });
  }

  hideMessgFn() {
    const { hideMessg } = this.state;
    this.setState({
      hideMessg: !hideMessg
    });
  }

  render() {
    const { hideMessg, baseData } = this.state;
    console.log(baseData);
    return (
      <div className="bottomFloatPage">
        <div className="bottomFloat">
          <div className="bTop">
            <div className="tit">灯杆编号：75026974</div>
            <div className="cont">
              <div className="listOne">
                <div className="listTit">智慧照明</div>
                <div className="listonecont">

                  {
                    baseData?.lighting.length ? baseData.lighting.map(item => (
                      <div className="rowDiv" key={item.deveui}>
                        <span className="leftName">{item.devname}</span>
                        <span className="rightVal"><span style={{ background: item.workStatus === 2 ? '#27FF18' : '#D40D0E' }} />{item.workStatus === 2 ? '开启' : '关闭'}</span>
                        <span className="rightVal">{item.brightness}%</span>
                      </div>
                    )) : ''
                  }

                  {/* <div className="rowDiv"> */}
                  {/*  <span className="leftName">1号灯</span> */}
                  {/*  <span className="rightVal"><span />开启</span> */}
                  {/*  <span className="rightVal">88%</span> */}
                  {/* </div> */}

                  {/* <div className="rowDiv"> */}
                  {/*  <span className="leftName">2号灯设备状态</span> */}
                  {/*  <span className="rightVal"><span />开启</span> */}
                  {/*  <span className="leftName">2号灯照度</span> */}
                  {/*  <span className="rightVal">88%</span> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="listTwo">
                <div className="listTit">设备运行状态</div>
                <div className="listonecont">
                  <div className="rowDiv">
                    <span className="leftName">充电桩：</span>
                    <span className="rightVal"><span /></span>

                    <span className="leftName">一键报警：</span>
                    <span className="rightVal"><span /></span>

                    <span className="leftName">公共广播：</span>
                    <span className="rightVal"><span />{baseData?.broadcast.length ? baseData.broadcast[0].workStatus === 2 ? '正常' : '异常' : ''}</span>

                    <span className="leftName">公共WIFI：</span>
                    <span className="rightVal"><span />{baseData?.broadcast.length ? baseData.broadcast[0].workStatus === 2 ? '正常' : '异常' : ''}</span>

                    <span className="leftName">信息发布：</span>
                    <span className="rightVal"><span />{baseData?.broadcast.length ? baseData.broadcast[0].workStatus === 2 ? '正常' : '异常' : ''}</span>
                  </div>
                </div>
              </div>
              <div className="listThree">
                <div className="listTit">环境监测</div>
                <div className="listonecont">
                  <div className="rowDiv">
                    <span className="leftName">运行状态：</span>
                    <span className="rightVal"><span style={{ background: baseData?.weather.length ? baseData?.weather?.[0]?.status === '1' ? '#27FF18' : '#D40D0E' : 'none' }} />{baseData?.weather.length ? baseData.weather[0].status === '1' ? '正常' : '异常' : ''}</span><br />

                    <div className="tablist" style={{ marginTop: '10px' }}>
                      <div className="tTop tTopBord">风速</div>
                      <div className="tBottom tTopBord">{baseData?.weather.length ? baseData.weather[0].fs : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">风向</div>
                      <div className="tBottom">{baseData?.weather.length ? baseData.weather[0].fx : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">温度</div>
                      <div className="tBottom">{baseData?.weather.length ? baseData.weather[0].wd : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">湿度</div>
                      <div className="tBottom">{baseData?.weather.length ? baseData.weather[0].sd : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">倾斜度</div>
                      <div className="tBottom">{baseData?.weather.length ? baseData.weather[0].ang : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop tTopBord">气压</div>
                      <div className="tBottom tTopBord tBottomBord">{baseData?.weather.length ? baseData.weather[0].qy : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">雨量</div>
                      <div className="tBottom tBottomBord">{baseData?.weather.length ? baseData.weather[0].yl : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">光照度</div>
                      <div className="tBottom tBottomBord">{baseData?.weather.length ? baseData.weather[0].zfs : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">PM2.5</div>
                      <div className="tBottom tBottomBord">{baseData?.weather.length ? baseData.weather[0].pm25 : ''}</div>
                    </div>
                    <div className="tablist">
                      <div className="tTop">PM10</div>
                      <div className="tBottom tBottomBord">{baseData?.weather.length ? baseData.weather[0].pm10 : ''}</div>
                    </div>


                  </div>
                </div>
              </div>
              <div className="listFour">
                <div className="listTit">视频监控</div>
                <div className="listonecont">
                  <VideoMonitor />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bBottom"> */}
          {/* */}
          {/*  { */}
          {/*    hideMessg ? ( */}
          {/*      <div> */}
          {/*        <div className="left"> */}
          {/*          <div className="listTit">智慧照明</div> */}
          {/*          <div className="listOne"> */}
          {/*            <div className="">1号灯开关：<Switch defaultChecked onChange={this.onChange} /><span style={{ marginLeft: '10px' }}>开启</span></div> */}
          {/*            <div className="">1号灯调节： */}
          {/*              <div style={{ */}
          {/*                display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle' */}
          {/*              }} */}
          {/*              > */}
          {/*                <Slider defaultValue={30} disabled={false} onChange={this.slideChange} /><span className="slideTxt">0%</span> */}
          {/*              </div> */}
          {/*            </div> */}
          {/*          </div> */}

          {/*          <div className="listOne" style={{ marginTop: '20px' }}> */}
          {/*            <div className="">2号灯开关：<Switch defaultChecked onChange={this.onChange} /><span style={{ marginLeft: '10px' }}>开启</span></div> */}
          {/*            <div className="">2号灯调节： */}
          {/*              <div style={{ */}
          {/*                display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle' */}
          {/*              }} */}
          {/*              > */}
          {/*                <Slider defaultValue={30} disabled={false} onChange={this.slideChange} /><span className="slideTxt">0%</span> */}
          {/*              </div> */}
          {/*            </div> */}
          {/*          </div> */}


          {/*        </div> */}
          {/*        <div className="right"> */}
          {/*          <div className="listTit">公共广播</div> */}
          {/*          <div className="listOne"> */}
          {/*            <div className="">启用：<Switch defaultChecked onChange={this.onChange} /> */}
          {/*              <span style={{ margin: '0 10px 0 10px' }}>开启</span> */}
          {/*              <Button type="danger" icon={<SyncOutlined />} size="small">重启</Button> */}
          {/*            </div> */}
          {/*            <div className="">音量： */}
          {/*              <div style={{ */}
          {/*                display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle' */}
          {/*              }} */}
          {/*              > */}
          {/*                <Slider defaultValue={30} disabled={false} onChange={this.slideChange} /><span className="slideTxt">0%</span> */}
          {/*              </div> */}
          {/*            </div> */}
          {/*          </div> */}
          {/*          <div className="listTit" style={{ marginTop: '15px' }}>信息发布</div> */}
          {/*          <div className="listOne"> */}
          {/*            <div className="">开关：<Switch defaultChecked onChange={this.onChange} /> */}
          {/*              <span style={{ margin: '0 10px 0 10px' }}>开启</span> */}
          {/*              <Button type="danger" icon={<SyncOutlined />} size="small">重启</Button> */}
          {/*            </div> */}
          {/*          </div> */}
          {/*        </div> */}
          {/*      </div> */}
          {/*    ) : '' */}
          {/*  } */}
          {/*  <div className="hidePageBtn" onClick={this.hideMessgFn}>{hideMessg ? (<span>隐藏配置界面<CaretDownOutlined /></span>) : (<span>打开配置界面<CaretUpOutlined /></span>)}</div> */}
          {/* </div> */}
        </div>

      </div>
    );
  }
}

export default PageComponent;
