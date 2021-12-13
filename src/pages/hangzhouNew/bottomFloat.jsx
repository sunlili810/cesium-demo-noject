import React, { Component } from 'react';
import {
  Modal,
  Radio, Slider, Switch
} from 'antd';
import {
  CaretRightOutlined
} from '@ant-design/icons';
import './index.less';
import tabStore from 'store/tablestore';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';
import Flvjs from 'flv.js';
import closeBtn from 'images/confirm-close.png';
import RightFloat from './rightFloat';
// import VideoMonitor from './videoMonitor';

const store = new tabStore();

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideMessg: false,
      baseData: null,
      videoVal: null,
      videoFlag: false,
      cutScreenUrl: null
    };
    this.hideMessgFn = this.hideMessgFn.bind(this);
    this.closeFn = this.closeFn.bind(this);
    this.closeImg = this.closeImg.bind(this);
  }

  componentDidMount() {
    // this.fetch();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    this.distroyFn();
  }


  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  slideChange = (deveui, value) => {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/icpas/broadcast/setvoice',
      method: 'post',
      data: {
        resid: deveui,
        value
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  hideMessgFn() {
    const { hideMessg } = this.state;
    this.setState({
      hideMessg: !hideMessg
    });
  }

  handleVideoChange(e) {
    this.setState({
      videoVal: e.target.value
    });
  }

  onChangeSwitch(deveui, devtype, checked) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/common/ctrlres',
      method: 'post',
      data: {
        resid: deveui,
        devtype,
        status: checked ? 1 : 0
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  onChangeSwitchCommon(resid, e) { // 开关请求
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/common/ctrlres',
      method: 'post',
      data: {
        resid,
        status: e.target.value// checked ? 1 : 0
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

  getVideoUrl(resid) {
    const that = this;
    if (resid === undefined) {
      return;
    }
    const param = {
      loadingFlag: false,
      url: '/appext/vediomoni/startmonitor',
      method: 'post',
      data: {
        devid: resid
      },
      successFn(data) {
        that.setState({ videoFlag: true });
        that.initFlv(data.url);
      }
    };
    store.handleNormal(param);
  }

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
        // autoCleanupSourceBuffer:true,//对SourceBuffer进行自动清理
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

  handleSlide(resid, value) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/icpas/broadcast/setvoice',
      method: 'post',
      data: {
        resid,
        level: value
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

  handleCutScreen(screenid) {
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

  closeImg() {
    this.setState({ cutScreenUrl: null });
  }

  render() {
    const {
      hideMessg, videoVal, videoFlag, cutScreenUrl
    } = this.state;
    const { baseData } = this.props;
    const currentBroadcast = baseData?.broadcast?.[0]?.meas;
    const currentRad = videoVal === null ? baseData?.video?.[0]?.info?.deveui : videoVal;
    const tempData = baseData?.video.filter(item => item.info.deveui === currentRad);

    return (
      <div className="bottomFloatPage">
        <div className="bottomFloat">

          <div className="bOne" style={{ position: 'relative' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />
            {
              videoFlag ? (
                <div className="videoWrap">
                  <img
                    src={require('images/confirm-close.png').default}
                    style={{
                      width: '30px',
                      height: '30px',
                      position: 'absolute',
                      right: '5px',
                      top: '5px',
                      zIndex: '99',
                      background: 'rgba(8, 29, 56, 0.9)',
                      padding: '0 0 2px 1px',
                      cursor: 'pointer',
                      borderRadius: '50%'
                    }}
                    onClick={this.closeFn}
                    alt=""
                  />
                  <video
                    className="video-js vjs-default-skin "
                    id="video1"
                    controls
                    autoPlay
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                  />
                </div>
              ) : ''
            }


            <div className="tit">视频监控</div>
            <Radio.Group size="small" key={videoVal} value={currentRad} onChange={this.handleVideoChange}>
              {/* <Radio.Button value="1">监控1</Radio.Button> */}
              {/* <Radio.Button value="2">监控2</Radio.Button> */}
              {
                baseData?.video.length ? baseData.video.map(item => (<Radio.Button  className="btnBg" key={item?.info?.deveui} value={item?.info?.deveui}>{item?.info?.devname}</Radio.Button>)) : ''
              }
            </Radio.Group>
            <div style={{ margin: '10px 0' }}>设备名称：
              <div
                style={{
                  display: 'inline-block',
                  width: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
                title={tempData?.[0]?.info?.devname}
              >{tempData?.[0]?.info?.devname}
              </div>
              <span style={{ display: 'inline-block', marginLeft: '20px' }}>设备状态：{tempData?.[0]?.eqstate === 1 ? '在线' : tempData?.[0]?.eqstate === 2 ? '离线' : ''}</span>
            </div>
            <div>
              {/* <span className="btn-monitor">实时监控</span> */}
              <span className="btn-monitor btnBg" onClick={this.getVideoUrl.bind(this, currentRad)} style={{ fontSize: '18px' }}><CaretRightOutlined /></span>
            </div>
            <div style={{ margin: '20px 0 10px 0', fontSize: '16px' }}>充电桩</div>
            <div>设备名称：

              <div
                style={{
                  display: 'inline-block',
                  width: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
              />
              <span style={{ display: 'inline-block', marginLeft: '20px' }}>设备状态：</span>
            </div>

          </div>
          <div className="bTwo" style={{ position: 'relative' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit">公共广播</div>

            <div style={{ margin: '10px 0' }}>广播名称：
              <div
                style={{
                  display: 'inline-block',
                  width: '180px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
              >
                {baseData?.broadcast?.[0]?.info?.devname}
              </div>
            </div>

            <div>
              运行状态：
              {/* <Switch */}
              {/*  checkedChildren="开启" */}
              {/*  unCheckedChildren="关闭" */}
              {/*  defaultChecked={currentBroadcast?.workStatus === 1} */}
              {/*  onChange={this.onChangeSwitchCommon.bind(this, tempData?.[0]?.info?.deveui)} */}
              {/* /> */}

              <div
                className="btnDiv"
              >
                <Radio.Group
                  // value={currentBroadcast?.workStatus !== undefined ? `${currentBroadcast?.workStatus}` : ''}
                  onChange={this.onChangeSwitchCommon.bind(this, baseData?.broadcast?.[0]?.info?.deveui)}
                  className="btnBg"
                >
                  <Radio.Button value="1">开</Radio.Button>
                  <Radio.Button value="0">关</Radio.Button>
                </Radio.Group>
              </div>


              {/* <span */}
              {/*  className="btn-monitor" */}
              {/*  style={{ */}
              {/*    marginLeft: '15px', width: '50px', height: '24px', lineHeight: '24px' */}
              {/*  }} */}
              {/* >重启 */}
              {/* </span> */}
            </div>

            <div style={{ marginTop: '10px' }}>音量：{baseData?.broadcast?.[0]?.meas?.level}
              <div style={{
                display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle', marginLeft: '15px'
              }}
              >
                <Slider
                  min={0}
                  max={15}
                  defaultValue={baseData?.broadcast?.[0]?.meas?.level}
                  disabled={false}
                  onAfterChange={this.handleSlide.bind(this, baseData?.broadcast?.[0]?.info?.deveui)}
                />
              </div>
            </div>

            <div style={{ margin: '10px 0', fontSize: '16px' }}>一键报警</div>
            <div>设备名称：
              <div
                style={{
                  display: 'inline-block',
                  width: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
                title={baseData?.alarm?.[0]?.info?.devname}
              >

                {baseData?.alarm?.[0]?.info?.devname}
              </div>
              <span style={{ display: 'inline-block', marginLeft: '20px' }}>运行状态：{baseData?.alarm?.[0]?.meas?.status === 1 ? '正常' : ''}</span>
            </div>
          </div>
          <div className="bThree" style={{ position: 'relative' }}>
            <img className="boderLTop" src={img02} alt="" />
            <img className="boderRBottom" src={img04} alt="" />

            <div className="tit">信息发布</div>

            <div style={{ margin: '10px 0' }}>设备名称：
              <div
                style={{
                  display: 'inline-block',
                  width: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
                title={baseData?.screen?.[0]?.info?.devname}
              >
                {baseData?.screen?.[0]?.info?.devname}
              </div>
              <span style={{ display: 'inline-block', marginLeft: '20px' }}>设备状态：{baseData?.screen?.[0]?.eqstate === 1 ? '在线' : baseData?.screen?.[0]?.eqstate === 2 ? '离线' : ''}</span>
            </div>
            <div style={{ margin: '10px 0' }}>屏幕状态：
              <div
                style={{
                  display: 'inline-block',
                  width: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
                title={baseData?.screen?.[0]?.meas?.screenStatus === 1 ? '正常' : '异常'}
              >
              {baseData?.screen?.[0]?.meas?.screenStatus === 1 ? '正常' : '异常'}
              </div>
              <span style={{ display: 'inline-block', marginLeft: '20px' }}>播放状态：{baseData?.screen?.[0]?.meas?.workStatus === 1 ? '正常' : '异常'}</span></div>

            <div>
              {/* <Switch */}
              {/*  checkedChildren="开启" */}
              {/*  unCheckedChildren="关闭" */}
              {/*  defaultChecked={baseData?.screen?.[0]?.meas?.workStatus === 1} */}
              {/*  onChange={this.onChangeSwitchCommon.bind(this, baseData?.screen?.[0]?.info?.deveui)} */}
              {/* /> */}

              <div
                className="btnDiv"
              >
                <Radio.Group
                  // value={baseData?.screen?.[0]?.meas?.workStatus !== undefined ? `${baseData?.screen?.[0]?.meas?.workStatus}` : ''}
                  onChange={this.onChangeSwitchCommon.bind(this, baseData?.screen?.[0]?.info?.deveui)}
                  className="btnBg"
                >
                  <Radio.Button value="1">开</Radio.Button>
                  <Radio.Button value="0">关</Radio.Button>
                </Radio.Group>
              </div>

              {/* <span */}
              {/*  className="btn-monitor" */}
              {/*  style={{ */}
              {/*    marginLeft: '15px', width: '50px', height: '24px', lineHeight: '24px' */}
              {/*  }} */}
              {/* >重启 */}
              {/* </span> */}
              <span
                className="btn-monitor btnBg"
                style={{
                  marginLeft: '10px', width: '50px', height: '24px', lineHeight: '24px'
                }}
                onClick={this.handleCutScreen.bind(this, baseData?.screen?.[0]?.info?.deveui)}
              >截图
              </span>
            </div>

            <div style={{ margin: '20px 0 10px 0', fontSize: '16px' }}>公共WIFI</div>
            <div>设备名称：
              <div
                style={{
                  display: 'inline-block',
                  width: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
                title={baseData?.wifi?.[0]?.info?.devname}
              >
                {baseData?.wifi?.[0]?.info?.devname}
              </div>
              <span style={{ display: 'inline-block', marginLeft: '20px' }}>运行状态：{baseData?.wifi?.[0]?.eqstate === 1 ? '在线' : baseData?.wifi?.[0]?.eqstate === 2 ? '离线' : '异常'}</span>
            </div>

            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              height: '100%',
              //display: cutScreenUrl !== null && cutScreenUrl !== '' ? 'block' : 'none'
            }}
            >
              <img
                src={closeBtn}
                style={{
                  display: cutScreenUrl !== null && cutScreenUrl !== '' ? 'block' : 'none',
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  width: '26px',
                  cursor: 'pointer'
                }}
                onClick={this.closeImg}
              />
              <img
                src={cutScreenUrl}
                //src={closeBtn}
                style={{
                  display: cutScreenUrl !== null && cutScreenUrl !== '' ? 'block' : 'none',
                  width: '100%',
                  height: '238px'
                }}

              />
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
