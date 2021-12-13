import React, { Component } from 'react';
import {
  Modal,
  Radio, Slider, Switch
} from 'antd';
import './deviceModal.less';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import dynamicTablestore from 'store/tablestore';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
// import Flvjs from 'flv.js';
import { CaretRightOutlined } from '@ant-design/icons';
// import bglogin from 'images/bg-login.png';
import closeBtn from 'images/confirm-close.png';
// import VideoMonitor from '../videoMonitor';

const store = new dynamicTablestore();

@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '1',
      videoVal: null,
      videoFlag: false,
      cutScreenUrl: null
    };
    // this.closeFn = this.closeFn.bind(this);
    this.closeImg = this.closeImg.bind(this);
  }


  componentWillUnmount() {
    this.distroyFn();
  }

  // getVideoUrl(resid) {
  //   const that = this;
  //   if (resid === undefined) {
  //     return;
  //   }
  //   const param = {
  //     loadingFlag: false,
  //     url: '/appext/vediomoni/startmonitor',
  //     method: 'post',
  //     data: {
  //       devid: resid
  //     },
  //     successFn(data) {
  //       that.setState({ videoFlag: true });
  //       that.initFlv(data.url);
  //     }
  //   };
  //   store.handleNormal(param);
  // }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };


  initFlv = (tempurl) => {
    // const { videoList } = this.state;
    if (Flvjs.isSupported()) {
      const videoElement = document.getElementById('video1');
      this.flvPlayervideo1 = Flvjs.createPlayer({
        type: 'flv', // 指定视频类型
        url: tempurl, // 'https://rtmp01open.ys7.com:9188/v3/openlive/F50704205_6_2.flv?expire=1626937083&id=338326330969042944&t=6330fa241153348c90d1daf8667b98f735be2ea7fabed03700ceb09713e32de7&ev=100', // 指定流链接
        isLive: true, // 开启直播
        hasAudio: false, // 关闭声音
        aspectRatio: '4:3'
        // cors: true,  // 开启跨域访问
        // duration:0,
        // currentTime:0,
      },
      {
        //  autoCleanupSourceBuffer:true,//对SourceBuffer进行自动清理
        // autoCleanupMaxBackwardDuration:12,//    当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
        // autoCleanupMinBackwardDuration:8,//指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
        // enableStashBuffer: true, //关闭IO隐藏缓冲区
        // enableWorker: true, // 是否多线程工作
        // isLive: true,
        // lazyLoad: false,
        // reuseRedirectedURL: true, //重用301/302重定向url，用于随后的请求，如查找、重新连接等。
      });
      this.flvPlayervideo1.attachMediaElement(videoElement);
      this.flvPlayervideo1.load();
      this.flvPlayervideo1.play();
    }
  }

  handleVideoChange(e) {
    this.setState({
      videoVal: e.target.value
    });
  }

  closeFn() {
    this.setState({ videoFlag: false });
    this.distroyFn();
  }

  distroyFn() {
    if (window.timer1) {
      clearTimeout(window.timer1);
    }
    if (this.flvPlayervideo1) {
      this.flvPlayervideo1.pause();
      this.flvPlayervideo1.unload();
      this.flvPlayervideo1.detachMediaElement();
      this.flvPlayervideo1.destroy();
      this.flvPlayervideo1 = null;
    }
  }

  onChangeSwitch(resid, e) { // 开关请求
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/common/ctrlres',
      method: 'post',
      data: {
        resid,
        devtype: 'claa_public_screen',
        status: e.target.value
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props.param;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  handleScreen(status, screenid) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/publicscreen/cmd/ctrlscreen',
      method: 'post',
      data: {
        screenid,
        status
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props.param;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  handleCutScreen(status, screenid) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/publicscreen/cmd/printscreen',
      method: 'post',
      data: {
        screenid
      },
      successFn(data) {
        that.setState({
          cutScreenUrl: data.url
        });
        // Modal.success({
        //   content: '指令已下发！'
        // });
        // const { fetchBasedata } = that.props.param;
        // fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  handleSlide(screenid, value) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/publicscreen/cmd/adjustbrightness',
      method: 'post',
      data: {
        screenid,
        brightness: value
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props.param;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  handleSlideVoice(resid, value) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/publicscreen/cmd/adjustsound',
      method: 'post',
      data: {
        screenid: resid,
        sound: value
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props.param;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  closeImg() {
    this.setState({ cutScreenUrl: null });
  }


  render() {
    const { baseData, markData } = this.props.param;
    const {
      size, videoVal, videoFlag, cutScreenUrl
    } = this.state;
    // const lamp_holder = parseInt(markData?.lamp_holder || 0);
    const tempData = baseData?.screen;
    // const currentRad = videoVal === null ? baseData?.video?.[0]?.info?.deveui : videoVal;
    // const tempData = baseData?.video.filter(item => item.info.deveui === currentRad);
    return (
      <div className="deviceModal" style={{ position: 'relative' }}>
        <div style={{
          fontSize: '16px', fontWeight: 'bold', color: '#fff', height: '30px', lineHeight: '30px', marginBottom: '15px'
        }}
        >设备概览
        </div>
        {/* <div className="leftM"> */}
        {/*  <div style={{ color: '#fff' }}>灯杆编号：{markData?.deveui}</div> */}
        {/*  <div style={{ color: '#fff', marginBottom: '10px' }}>灯杆名称：{markData?.devname}</div> */}
        {/*  <img src={require('images/light.png')} /> */}
        {/* </div> */}
        <div className="rightM" style={{ width: '92%', margin: '0 4%' }}>
          {/* <Radio.Group size="small" key={videoVal} value={currentRad} onChange={this.handleVideoChange}> */}
          {/*  { */}
          {/*    baseData?.video.length ? baseData.video.map(item => (<Radio.Button key={item?.info?.deveui} value={item?.info?.deveui}>{item?.info?.devname}</Radio.Button>)) : '' */}
          {/*   } */}
          {/* </Radio.Group> */}

          <div className="lightTwo">
            <div className="listonecont" style={{ color: '#fff' }}>

              <div style={{ lineHeight: '35px', marginTop: '10px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >设备名称：
                  <div className="modalTxt" title={tempData?.[0]?.info?.devname}>
                  {tempData?.[0]?.info?.devname}
                  </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>供应商：
                  <div className="modalTxt" title={tempData?.[0]?.info?.ext?.supplier}>
{tempData?.[0]?.info?.ext?.supplier}
                    </div>
                  </span>
              </div>

              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >设备编号：
                  <div className="modalTxt" title={tempData?.[0]?.info?.deveui}>
                  {tempData?.[0]?.info?.deveui}
                  </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>
                    设备品牌：
                     <div className="modalTxt" title={tempData?.[0]?.info?.ext?.brand}>
{tempData?.[0]?.info?.ext?.brand}
                    </div>
                  </span>
              </div>

              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >设备类型：
                  <div className="modalTxt" title={tempData?.[0]?.info?.devtypename}>
                  {tempData?.[0]?.info?.devtypename}
                  </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>设备状态：{tempData?.[0]?.eqstate === '1' || tempData?.[0]?.eqstate === 1 ? '在线' : tempData?.[0]?.eqstate === '2' || tempData?.[0]?.eqstate === 2 ? '离线':''}</span>
              </div>

              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >序列号：
                  <div className="modalTxt" title={tempData?.[0]?.info?.devtypename}>
                  {tempData?.[0]?.info?.devtypename}
                  </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>电源状态：
                  {tempData?.[0]?.eqstate === 1 || tempData?.[0]?.eqstate === '1' ? '开' : tempData?.[0]?.eqstate === 0 || tempData?.[0]?.eqstate === '0'? '关' : ''}
                </span>
              </div>

              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >所属灯杆编号：
                    <div className="modalTxt" title={markData?.devname}>
                    {markData?.devname}
                    </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>音量大小：
                  {
                    tempData?.[0]?.meas?.sound
                  }</span>
              </div>

              {/* <div style={{ lineHeight: '35px' }}> */}
              {/*  <span style={{ */}
              {/*    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top' */}
              {/*  }} */}
              {/*  >供应商：{tempData?.[0]?.info?.devname} */}
              {/*  </span> */}
              {/*  <span style={{ display: 'inline-block', width: '45%' }}>设备品牌：{tempData?.[0]?.info?.devname}</span> */}
              {/* </div> */}

              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >设备型号：
                   <div className="modalTxt" title={tempData?.[0]?.info?.ext?.eqmodel}>
                    {tempData?.[0]?.info?.ext?.eqmodel}
                    </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>屏幕亮度：
                  {
                    tempData?.[0]?.meas?.lightvalue
                  }</span>
              </div>


              {/* <div> */}
              {/*  <span className="btn-monitor" onClick={this.getVideoUrl.bind(this, currentRad)}>实时监控</span> */}
              {/* </div> */}


              {/* { */}
              {/*  videoFlag ? ( */}
              {/*    <div className="videoWrap" style={{ position: 'relative' }}> */}
              {/*      <img */}
              {/*        src={require('images/confirm-close.png')} */}
              {/*        style={{ */}
              {/*          width: '30px', */}
              {/*          height: '30px', */}
              {/*          position: 'absolute', */}
              {/*          right: '5px', */}
              {/*          top: '5px', */}
              {/*          zIndex: '99', */}
              {/*          background: 'rgba(8, 29, 56, 0.9)', */}
              {/*          padding: '0 0 2px 1px', */}
              {/*          cursor: 'pointer', */}
              {/*          borderRadius: '50%' */}
              {/*        }} */}
              {/*        onClick={this.closeFn} */}
              {/*        alt="" */}
              {/*      /> */}
              {/*      <video */}
              {/*        className="video-js vjs-default-skin " */}
              {/*        id="video1" */}
              {/*        controls */}
              {/*        autoPlay */}
              {/*        muted */}
              {/*        style={{ width: '100%', height: '100%', objectFit: 'fill' }} */}
              {/*      /> */}
              {/*    </div> */}
              {/*  ) : '' */}
              {/* } */}

              <div style={{ margin: '10px 0', fontSize: '16px' }}>屏幕控制</div>
              <div style={{ margin: '0 0 10px 0' }}>
                {/* <Switch */}
                {/*  checkedChildren="开启" */}
                {/*  unCheckedChildren="关闭" */}
                {/*  defaultChecked={tempData?.[0]?.meas?.workStatus === 1} */}
                {/*  onChange={this.onChangeSwitch.bind(this, tempData?.[0]?.info?.deveui)} */}
                {/* /> */}

                <div
                  className="btnDiv"
                >
                  <Radio.Group
                    className="btnBg"
                    // value={tempData?.[0]?.meas?.workStatus !== undefined ? `${tempData?.[0]?.meas?.workStatus}` : ''}
                    onChange={this.onChangeSwitch.bind(this, tempData?.[0]?.info?.deveui)}>
                    <Radio.Button value="1">开</Radio.Button>
                    <Radio.Button value="0">关</Radio.Button>
                  </Radio.Group>
                </div>

              </div>


              <div style={{ margin: '20px 0 20px 5px' }}>
                <span
                  className="btn-monitor btnBg"
                  style={{
                    width: '50px', height: '24px', lineHeight: '24px'
                  }}
                  onClick={this.handleScreen.bind(this, 1, tempData?.[0]?.info?.deveui)}
                >显示
                </span>
                <span
                  className="btn-monitor btnBg"
                  style={{
                    marginLeft: '5px', width: '50px', height: '24px', lineHeight: '24px'
                  }}
                  onClick={this.handleScreen.bind(this, 2, tempData?.[0]?.info?.deveui)}
                >息屏
                </span>
                <span
                  className="btn-monitor btnBg"
                  style={{
                    marginLeft: '5px', width: '50px', height: '24px', lineHeight: '24px'
                  }}
                  onClick={this.handleScreen.bind(this, 3, tempData?.[0]?.info?.deveui)}
                >重启
                </span>
                <span
                  className="btn-monitor btnBg"
                  style={{
                    marginLeft: '5px', width: '50px', height: '24px', lineHeight: '24px'
                  }}
                  onClick={this.handleCutScreen.bind(this, 4, tempData?.[0]?.info?.deveui)}
                >截屏
                </span>
              </div>




              <div className="">亮度调节

              </div>

              <div className="" style={{marginBottom:'8px'}}>
                <div style={{
                  display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle'
                }}
                >
                  <Slider
                    defaultValue={tempData?.[0]?.meas?.lightvalue}
                    disabled={false}
                    onAfterChange={this.handleSlide.bind(this, tempData?.[0]?.info?.deveui)}
                  />
                </div>
              </div>

              <div className="">音量控制

              </div>

              <div className="">
                <div style={{
                  display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle'
                }}
                >
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={tempData?.[0]?.meas?.sound}
                    disabled={false}
                    onAfterChange={this.handleSlideVoice.bind(this, tempData?.[0]?.info?.deveui)}
                  />
                </div>
              </div>





              {/* cutScreenUrl */}

              <div style={{ position: 'relative' }}>
                <img
                  src={closeBtn}
                  style={{
                    display: cutScreenUrl !== null && cutScreenUrl !== '' ? 'block' : 'none',
                    position: 'absolute',
                    right: '27%',
                    top: '10px',
                    width: '26px',
                    cursor: 'pointer'
                  }}
                  onClick={this.closeImg}
                />
                <img
                  src={cutScreenUrl}
                  style={{
                    display: cutScreenUrl !== null && cutScreenUrl !== '' ? 'block' : 'none',
                    maxWidth: '400px',
                    maxHeight: '200px'
                  }}

                />
              </div>


            </div>
          </div>

        </div>
      </div>
    );
  }
}

modalComponent.propTypes = {
  param: PropTypes.object.isRequired,
  onTrigger: PropTypes.func.isRequired
};

export default modalComponent;
