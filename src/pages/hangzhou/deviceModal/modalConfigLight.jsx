import React, { Component } from 'react';
import {
  Form, Input, Button, Select, Row, Col, DatePicker, TimePicker, InputNumber, Radio, Slider, Switch
} from 'antd';
import './deviceModal.less';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import modalSecond from 'components/modal/modalSecond';
import dynamicTablestore from 'store/tablestore';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import VideoMonitor from "../videoMonitor";

const dynamtore = new dynamicTablestore();

@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
  }

    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    };

    slideChange = (value) => {
      this.setState({
        inputValue: value
      });
    }

    render() {
      return (
        <div className="deviceModal" style={{ position: 'relative' }}>
          <div className="leftM">
            <img src={require('images/light.png')} />
          </div>
          <div className="rightM">
            <h5>智慧照明</h5>
            <Radio.Group size="small" value="1" onChange={this.handleSizeChange}>
              <Radio.Button value="1">1号灯</Radio.Button>
              <Radio.Button value="2">2号灯</Radio.Button>
            </Radio.Group>

            <div className="lightOne">
              <div>
                在线状态：在

                <span style={{ margin: '0 10px 0 10px' }}> 电压：10V</span>
              </div>
              <div className="">开关状态：<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={this.onChange} />
                <span style={{ margin: '0 10px 0 10px' }}>电流：5A</span>

              </div>
              <div className="">开关亮度：
                <div style={{
                  display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle'
                }}
                >
                  <Slider defaultValue={30} disabled={false} onChange={this.slideChange} />
                </div>
                <span style={{ margin: '0 10px 0 10px' }}>功率：50kwh</span>
              </div>
            </div>

              <div className="lightTwo">
                  <div className="listTit">视频监控</div>
                  <div className="listonecont">
                      <VideoMonitor />
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
