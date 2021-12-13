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
import Flvjs from 'flv.js';
import { CaretRightOutlined } from '@ant-design/icons';
import VideoMonitor from '../videoMonitor';

const store = new dynamicTablestore();

@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '1',
      videoVal: null,
      videoFlag: false,
      slideVal: this.props.param.baseData?.lighting?.[0]?.meas ?.brightness1
    };
    this.changeSlide = this.changeSlide.bind(this);
  }


    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    };


    handleVideoChange(e) {
      this.setState({
        videoVal: e.target.value
      });
    }

    changeSlide(value) {
      this.setState({
        slideVal: value
      });
    }

    onChangeSwitch(size, lightid, flag, e) { // 开关请求
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
          status: flag === 1 ? e.target.value : -1,
          level: flag === -1 ? e/5 : 0
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
      const { size, slideVal } = this.state;
      const lamp_holder = parseInt(markData?.lamp_holder || 0);
      const currentLight = baseData?.lighting?.[0]?.meas;
      const currentLightInfo = baseData?.lighting?.[0]?.info;

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
            <Radio.Group size="small" key="1" value={size} onChange={this.handleSizeChange}>
              {/* <Radio.Button value="1">1号灯</Radio.Button> */}
              {/* <Radio.Button value="2">2号灯</Radio.Button> */}

              {/*{*/}
              {/*  Array.from(new Array(lamp_holder)).map((item, index) => (*/}
              {/*    <Radio.Button key={index} value={`${index + 1}`}>{`灯${index + 1}`}</Radio.Button>*/}
              {/*  ))*/}
              {/*}*/}

              {
                baseData?.lighting?.length? baseData?.lighting?.map((item, index) => (
                  <Radio.Button className="btnBg" key={index} value={`${index+1}`} style={{marginRight:'10px',marginBottom:'10px'}}>{`灯控${index + 1}`}</Radio.Button>
                )):''
              }


            </Radio.Group>

            <div className="lightTwo">
              <div className="listonecont" style={{ color: '#fff' }}>


                <div style={{ lineHeight: '26px' }}>
                  <span
                    style={{
                      display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                    }}
                  >设备名称：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.devname}*/}
                      {baseData?.lighting?.[size-1]?.info?.devname}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>供应商：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.ext?.supplier}*/}
                      {baseData?.lighting?.[size-1]?.info.ext?.supplier}
                    </div>
                  </span>
                </div>


                <div style={{ lineHeight: '26px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备编号：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.deveui}*/}
                      {baseData?.lighting?.[size-1]?.info?.deveui}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>
                    设备品牌：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.ext?.brand}*/}
                      {baseData?.lighting?.[size-1]?.info?.ext?.brand}
                    </div>
                  </span>
                </div>

                <div style={{ lineHeight: '26px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备类型：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.devtypename}*/}
                      {baseData?.lighting?.[size-1]?.info?.devtypename}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>
                    设备状态：
                    {baseData?.lighting?.[size-1]?.eqstate === 1 || baseData?.lighting?.[size-1]?.eqstate === '1' ? '在线' : baseData?.lighting?.[size-1]?.eqstate === 2 || baseData?.lighting?.[size-1]?.eqstate === '2' ? '离线' : ''}
                    {/* {currentLight?.[`workStatus${size}`] === 1 || currentLight?.[`workStatus${size}`] === '1' ? '正常' : currentLight?.[`workStatus${size}`] === '0' || currentLight?.[`workStatus${size}`] === 0 ? '异常':''} */}
                  </span>
                </div>

                <div style={{ lineHeight: '26px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >序列号：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.ext?.serialnum}*/}
                      {baseData?.lighting?.[size-1]?.info?.ext?.serialnum}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>电源状态：
                    {baseData?.lighting?.[size-1]?.powerstate === '1' || baseData?.lighting?.[size-1]?.powerstate === 1 ? '开' : baseData?.lighting?.[size-1]?.powerstate === 0 || baseData?.lighting?.[size-1]?.powerstate === '0' ? '关' : ''}
                  </span>
                </div>

                <div style={{ lineHeight: '26px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >所属灯杆编号：
                    <div className="modalTxt">
                      {markData?.devname}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>亮度：
                    {
                      baseData?.lighting?.[size-1]?.meas?.[`brightness${size}`]*5 || 0
                  }
                  </span>
                </div>
                <div style={{ lineHeight: '26px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备型号：
                    <div className="modalTxt">
                      {/*{currentLightInfo?.ext?.eqmodel}*/}
                      {
                        baseData?.lighting?.[size-1]?.info?.ext?.eqmodel
                      }
                    </div>
                  </span>

                </div>


                <div style={{ margin: '10px 0' }}>
                灯具控制
                </div>
                <div style={{ margin: '10px 0' }}>

                  <span style={{ margin: '0 10px 0 0px' }}>
                    {/* <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={currentLight?.[`workStatus${size}`] === 1} onChange={this.onChangeSwitch.bind(this, size, markData?.deveui, 1)} /> */}
                    <div
                      className="btnDiv"
                    >
                      <Radio.Group
                        // value={currentLight?.[`workStatus${size}`]!== undefined ? `${currentLight?.[`workStatus${size}`]}` : ''}
                        onChange={this.onChangeSwitch.bind(this, size, baseData?.lighting?.[size-1]?.info?.deveui, 1)}
                        className="btnBg"
                      >
                        <Radio.Button value="1">开</Radio.Button>
                        <Radio.Button value="0">关</Radio.Button>
                      </Radio.Group>
                    </div>
                  </span>
                </div>

                <div className="">亮度调节</div>

                <div className="">
                  <div style={{
                    display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle',marginLeft:'10px'
                  }}
                  >
                    <Slider
                      defaultValue={baseData?.lighting?.[size-1]?.meas?.[`brightness${size}`]*5}
                      key={size}
                      disabled={false}
                      step={5}
                      onChange={this.changeSlide}
                      onAfterChange={this.onChangeSwitch.bind(this, size, baseData?.lighting?.[size-1]?.info?.deveui, -1)} />
                  </div>
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
