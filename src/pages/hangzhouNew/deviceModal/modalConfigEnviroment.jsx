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

import Envtempline from '../commonRight/envTempLine';

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
  }


  componentWillUnmount() {

  }


  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  handleVideoChange(e) {
    this.setState({
      videoVal: e.target.value
    });
  }

  onChangeSwitch(size, lightid, flag, checked) { // 开关请求
    // console.log(`size=====${size}`);
    // console.log(`lightid=====${lightid}`);
    // console.log(`checked=====${checked}`);
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/lamp/light/cmd/lightctr',
      method: 'post',
      data: {
        lightid,
        lightno: size,
        status: flag === 1 ? checked ? 1 : 0 : 0,
        level: flag !== 1 ? checked : 0
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
    const tempData = baseData?.weather;
    const currentRad = videoVal === null ? baseData?.video?.[0]?.info?.deveui : videoVal;
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
        <div className="rightM" style={{ width: '100%', margin: '0' }}>
          {/* <Radio.Group size="small" key={videoVal} value={currentRad} onChange={this.handleVideoChange}> */}
          {/*  { */}
          {/*    baseData?.video.length ? baseData.video.map(item => (<Radio.Button key={item?.info?.deveui} value={item?.info?.deveui}>{item?.info?.devname}</Radio.Button>)) : '' */}
          {/*   } */}
          {/* </Radio.Group> */}

          <div className="lightTwo">
            <div className="listonecont" style={{ color: '#fff' }}>
              <div style={{ display: 'inline-block', width: '35%', fontSize: '12px',marginRight:'3%' }}>
                <div style={{ lineHeight: '35px',height: '35px',marginTop: '10px' }}>
                  <span style={{
                    display: 'inline-block', marginRight: '5px', verticalAlign: 'top'
                  }}
                  >设备名称：
                  </span>
                  <div
                    title={tempData?.[0]?.info?.devname}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.devname}
                  </div>


                </div>

                <div style={{ lineHeight: '35px',height: '35px' }}>
                  <span style={{
                    display: 'inline-block', marginRight: '5px', verticalAlign: 'top'
                  }}
                  >设备编号：
                  </span>
                  <div
                    title={tempData?.[0]?.info?.deveui}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.deveui}
                  </div>
                </div>

                <div style={{ lineHeight: '35px',height: '35px' }}>
                  <span style={{
                    display: 'inline-block', marginRight: '5px', verticalAlign: 'top'
                  }}
                  >设备类型：
                  </span>
                  <div
                    title={tempData?.[0]?.info?.devtypename}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.devtypename}
                  </div>
                </div>
                <div style={{ lineHeight: '35px',height: '35px' }}>
                  序列号：
                  <div
                    title={tempData?.[0]?.info?.ext?.serialnum}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.ext?.serialnum}
                  </div>
                </div>
                <div style={{ lineHeight: '35px',height: '35px' }}>
                  所属灯杆编号：
                  <div
                    title={markData?.devname}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >

                      {markData?.devname}

                  </div>
                </div>
                <div style={{ lineHeight: '35px',height: '35px' }}>
                  设备型号：
                  <div
                    title={tempData?.[0]?.info?.ext?.eqmodel}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.ext?.eqmodel}
                  </div>
                </div>

                <div style={{ lineHeight: '35px',height: '35px' }}>
                  供应商：
                  <div
                    title={tempData?.[0]?.info?.ext?.supplier}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.ext?.supplier}
                  </div>
                </div>
                <div style={{ lineHeight: '35px',height: '35px' }}>
                  设备品牌：
                  <div
                    title={tempData?.[0]?.info?.ext?.brand}
                    style={{
                      display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      verticalAlign: 'middle'
                    }}
                  >
                    {tempData?.[0]?.info?.ext?.brand}
                  </div>
                </div>
                <div style={{ lineHeight: '35px',height: '35px' }}>
                  设备状态：{tempData?.[0]?.eqstate === '1' || tempData?.[0]?.eqstate === 1 ? '在线' : tempData?.[0]?.eqstate === '2' || tempData?.[0]?.eqstate === 2 ?'离线':''}

                </div>
                <div style={{ lineHeight: '35px',height: '35px' }}>
                  电源状态：
                  {tempData?.[0]?.powerstate === '1' || tempData?.[0]?.powerstate === 1 ? '开' : tempData?.[0]?.powerstate === '0' || tempData?.[0]?.powerstate === 0 ?'关':''}
                </div>

              </div>

              <div style={{
                display: 'inline-block', width: '62%', verticalAlign: 'top', fontSize: '12px'
              }}
              >
                <Envtempline lightid={markData?.deveui} deveui={tempData?.[0]?.info.deveui} />
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
