import React, { Component } from 'react';
import {
  Radio, Slider, Switch, Modal
} from 'antd';
import './deviceModal.less';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import modalSecond from 'components/modal/modalSecond';
import dynamicTablestore from 'store/tablestore';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import VideoMonitor from '../videoMonitor';

const store = new dynamicTablestore();

@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '1',
      switchCheck: null
    };
  }

    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    };

    slideChange = (value) => { // 亮度下发请求
      const that = this;
      const param = {
        loadingFlag: false,
        url: '/project/project/place/reacttree',
        method: 'post',
        data: {
          projectid: ''
        },
        successFn(data) {
          that.setState({ treeData: data });
        }
      };
      // store.handleNormal(param);
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
      const { size } = this.state;
      const lamp_holder = parseInt(markData?.lamp_holder || 0);
      const currentLight = baseData?.lighting?.[0]?.meas;
      const currentWeather = baseData?.weather?.[0]?.meas;
      return (
        <div className="deviceModal" style={{ position: 'relative' }}>
          <div style={{
            fontSize: '18px', fontWeight: 'bold', color: '#fff', height: '30px', lineHeight: '30px', marginBottom: '15px'
          }}
          >灯杆概览
          </div>
          <div className="leftM">
            <div style={{ color: '#fff' }}>灯杆编号：<span
              title={markData?.deveui}
              style={{
                display: 'inline-block', maxWidth: '113px', verticalAlign: 'middle', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}
            >{markData?.deveui}
                                                </span>
            </div>
            <div style={{ color: '#fff', marginBottom: '10px' }}>灯杆名称：<span
              title={markData?.devname}
              style={{
                display: 'inline-block', maxWidth: '113px', verticalAlign: 'middle', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}
            >{markData?.devname}
                                                                      </span>
            </div>
            <img src={baseData?.lighting?.[size-1]?.info?.imageurl||require('images/light.png').default} />
          </div>
          <div className="rightM">
            <h4 style={{ color: '#fff', fontWeight: 'bold',fontSize:'16px', marginBottom: '10px' }}>功能照明</h4>
            <Radio.Group size="small" key="1" value={size} onChange={this.handleSizeChange}>
              {/* <Radio.Button value="1">1号灯</Radio.Button> */}
              {/* <Radio.Button value="2">2号灯</Radio.Button> */}

              {/*{*/}
              {/*  Array.from(new Array(lamp_holder)).map((item, index) => (*/}
              {/*    <Radio.Button key={index} value={`${index + 1}`}>{`灯${index + 1}`}</Radio.Button>*/}
              {/*  ))*/}
              {/*}baseData?.lighting*/}

              {
                baseData?.lighting?.length? baseData?.lighting?.map((item, index) => (
                  <Radio.Button className="btnBg" style={{marginRight:'5px'}} key={index} value={`${index+1 }`}>{`灯控${index + 1}`}</Radio.Button>
                )):''
              }


            </Radio.Group>

            <div className="lightOne" style={{ color: '#fff', marginTop: '15px' }}>
              <div style={{ margin: '10px 0' }}>
                灯控状态：{baseData?.lighting?.meas?.[`${size-1}`]?.eqstate === 1 || currentLight?.[`${size-1}`]?.eqstate === '1' ? '开' : '关'}

                <span style={{ margin: '0 10px 0 20px' }}>
                  {/* <Switch */}
                  {/*  checkedChildren="开启" */}
                  {/*  unCheckedChildren="关闭" */}
                  {/*  defaultChecked={currentLight?.[`workStatus${size}`] === 1} */}
                  {/*  onChange={this.onChangeSwitch.bind(this, size, markData?.deveui, 1)} */}
                  {/* /> */}

                  <div
                    className="btnDiv"
                  >
                    <Radio.Group
                      className="btnBg"
                      // value={currentLight?.[`workStatus${size}`] !== undefined ? `${currentLight?.[`workStatus${size}`]}` : ''}
                      onChange={this.onChangeSwitch.bind(this, size, baseData?.lighting?.[size-1]?.info?.deveui, 1)}
                    >
                      <Radio.Button value="1">开</Radio.Button>
                      <Radio.Button value="0">关</Radio.Button>
                    </Radio.Group>
                  </div>


                </span>
              </div>


              <div className="">
                <span style={{ marginRight: '10px' }}>亮度：{baseData?.lighting?.[size-1]?.meas?.[`brightness${size}`]*5||0}</span>
                亮度调节
                <div style={{
                  display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle', marginLeft: '15px'
                }}
                >
                  <Slider
                    defaultValue={baseData?.lighting ?.[size-1]?.meas?.[`brightness${size}`]*5 }
                    key={size}
                    disabled={false}
                    min={0}
                    max={100}
                    step={5}
                    onAfterChange={this.onChangeSwitch.bind(this, size, baseData?.lighting?.[0]?.info?.deveui, -1)}
                  />
                </div>
              </div>

              <div className="">
                <span style={{ margin: '0 10px 0 0px' }}>电压：{baseData?.lighting ?.[size-1]?.meas?.U}V</span>
                <span style={{ margin: '0 10px 0 10px' }}>电流：{baseData?.lighting ?.[size-1]?.meas?.I}A</span>
                <span style={{ margin: '0 10px 0 10px' }}>功率：{baseData?.lighting ?.[size-1]?.meas?.P}kwh</span>
              </div>

            </div>

            <div className="lightTwo">
              <div className="listTit" style={{ color: '#fff', margin: '20px 0 15px 0', fontSize:'16px',fontWeight: 'bold' }}>环境监测</div>
              <div className="listonecont" style={{ color: '#fff' }}>
                {/* <VideoMonitor /> */}
                <div>设备状态：{baseData?.weather?.[0]?.eqstate === 1 || baseData?.weather?.[0]?.eqstate === '1'? '在线' : baseData?.weather?.[0]?.eqstate === 2 || baseData?.weather?.[0]?.eqstate === '2' ? '离线' : ''}</div>
                <div style={{ lineHeight: '35px' }}>
                  <span style={{ display: 'inline-block', width: '50%', marginRight: '10px' }}>温度：{currentWeather?.wd}℃</span>
                  <span style={{ display: 'inline-block', width: '45%' }}>湿度：{currentWeather?.sd}% RH</span>
                </div>

                <div style={{ lineHeight: '35px' }}>
                  <span style={{ display: 'inline-block', width: '50%', marginRight: '10px' }}>气压：{currentWeather?.qy}hPa</span>
                  <span style={{ display: 'inline-block', width: '45%' }}>风速：{currentWeather?.fs }m/s</span>
                </div>

                <div style={{ lineHeight: '35px' }}>
                  <span style={{ display: 'inline-block', width: '50%', marginRight: '10px' }}>风向：{currentWeather?.fx}°</span>
                  <span style={{ display: 'inline-block', width: '45%' }}>噪声：{currentWeather?.zs}dB(A)</span>
                </div>

                <div style={{ lineHeight: '35px' }}>
                  <span style={{ display: 'inline-block', width: '50%', marginRight: '10px' }}>PM2.5：{currentWeather?.pm25}ug/m²</span>
                  <span style={{ display: 'inline-block', width: '45%' }}>PM10：{currentWeather?.pm10}ug/m²</span>
                </div>

                <div style={{ lineHeight: '35px' }}>
                  <span style={{ display: 'inline-block', width: '50%', marginRight: '10px' }}>紫外线：{currentWeather?.zfs}UVI</span>
                  <span style={{ display: 'inline-block', width: '45%' }}>降雨量：{currentWeather?.yl}mm</span>
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
