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
// import locale from 'antd/es/date-picker/locale/zh_CN';
// import Flvjs from 'flv.js';
// import { CaretRightOutlined } from '@ant-design/icons';
// import VideoMonitor from '../videoMonitor';


const store = new dynamicTablestore();

@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '1',
      videoVal: null,
      videoFlag: false
    };
    this.closeFn = this.closeFn.bind(this);
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


  render() {
    const { baseData, markData } = this.props.param;
    const { size, videoVal, videoFlag } = this.state;
    // const lamp_holder = parseInt(markData?.lamp_holder || 0);
    const tempData = baseData?.wifi;

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
                <span style={{ display: 'inline-block', width: '45%' }}>设备状态：
                  {tempData?.[0]?.eqstate === 1 || tempData?.[0]?.eqstate === '1' ? '正常' : tempData?.[0]?.eqstate === 2 || tempData?.[0]?.eqstate === '2' ? '离线' : ''}</span>
              </div>

              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >序列号：
                  <div className="modalTxt" title={tempData?.[0]?.info?.ext?.serialnum}>
                  {tempData?.[0]?.info?.ext?.serialnum}
                  </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>
                    电源状态：
                  {tempData?.[0]?.powerstate === '1' || tempData?.[0]?.powerstate === 1 ? '开' : tempData?.[0]?.powerstate === 0 || tempData?.[0]?.powerstate === '0' ? '关' : ''}
                  </span>
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
                >所属灯杆编号：
                  <div className="modalTxt" title={tempData?.[0]?.info?.deveui}>
                  {tempData?.[0]?.info?.deveui}
                  </div>
                </span>
                <span style={{ display: 'inline-block', width: '45%' }}>
                    在线人数：
                     <div className="modalTxt">
                       {tempData?.[0]?.meas?.online}
                    </div>
                  </span>
              </div>
              <div style={{ lineHeight: '35px' }}>
                <span style={{
                  display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                }}
                >设备型号：
                  <div className="modalTxt" title={tempData?.[0]?.info?.ext?.eqmodel}>
                  {tempData?.[0]?.info?.ext?.eqmodel}
                  </div>
                </span>
              </div>

              <div style={{ margin: '10px 0', fontSize: '16px' }}>电源控制</div>
              <div style={{ margin: '0 0 10px 0' }}>
                {/* <Switch */}
                {/*  checkedChildren="开启" */}
                {/*  unCheckedChildren="关闭" */}
                {/*  defaultChecked={tempData?.[0]?.meas?.status === 1} */}
                {/*  onChange={this.onChangeSwitch.bind(this, tempData?.[0]?.info?.deveui)} */}
                {/* /> */}

                <div
                  className="btnDiv"
                >
                  <Radio.Group
                    // value={tempData?.[0]?.meas?.status !== undefined ? `${tempData?.[0]?.meas?.status}`:''}
                    onChange={this.onChangeSwitch.bind(this, tempData?.[0]?.info?.deveui)}
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
