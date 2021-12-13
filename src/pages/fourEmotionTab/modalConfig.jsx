import React, { Component } from 'react';
import {
  Form, Input, Button, Select, Row, Col, DatePicker, TimePicker, InputNumber
} from 'antd';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import modalSecond from 'components/modal/modalSecond';
import dynamicTablestore from 'store/tablestore';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const dynamtore = new dynamicTablestore();
const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
};
@observer
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.cancelClickHandler = this.cancelClickHandler.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  handleOk() {
    const { param } = this.props;
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const data = {
        ...values,
        id: param.id === undefined ? undefined : param.id
      };
      this.props.onTrigger('okBtn', data);
    });
  }

  cancelClickHandler() {
    this.props.onTrigger('cancelBtn');
  }

  changeFn(values) {
    // console.log(values);
  }

  onFinish = (values) => {
    const { param } = this.props;
    const data = {
      ...values,
      id: param.id === undefined ? undefined : param.id
    };
    this.props.onTrigger('okBtn', data);
  };

  render() {
    const { param } = this.props;
    const { cameraList } = param;
    // {id: 0
    // ipaddr: "12.123.12.12"
    // key: 1
    // name: "gagag"
    // port: 51000
    // status: "offline"
    // statusDesc: "离线"}
    const fieldData = [
      {
        name: 'channel',
        value: 'Ant Design'
      }
    ];
    const { entries } = Object;
    const tempFieldData = [];
    for (const [key, value] of entries(param)) {
      tempFieldData.push({
        name: key,
        value
      });
    }

    return (
      <div className="swConfig" style={{ position: 'relative' }}>
        <Form layout="horizontal" initialValues={{ port: '51000' }} fields={tempFieldData} onFinish={this.onFinish}>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="通道号：" name="channel" rules={[{ required: true, message: '请填写有效期开始时间' }]} hasFeedback {...formItemLayout}>
                <InputNumber min={1} max={3} style={{ width: '100%' }} />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem name="deveui" label="关联设备deveui：" rules={[{ required: true, message: '请填写关联设备' }]} hasFeedback {...formItemLayout}>
                <Select>
                  {
                    cameraList.map((item, index) => (<Option key={index} value={item.deveui}>{item.devname}</Option>))
                  }
                </Select>
              </FormItem>
            </Col>
            {/* <Col span={12}> */}
            {/* <FormItem label="关联设备类型：" name="devtype" rules={[{ required: false, message: '请填写设备类型' }]} hasFeedback {...formItemLayout}> */}
            {/* <Select> */}
            {/* <Option key="1" value="1">1</Option> */}
            {/* <Option key="2" value="1">2</Option> */}
            {/* </Select> */}
            {/* </FormItem> */}
            {/* </Col> */}
            <Col span={12}>
              <FormItem label="停车位名称：" name="name" rules={[{ required: true, message: '请填写停车位名称' }]} hasFeedback {...formItemLayout}>
                <Input />
              </FormItem>
            </Col>
            {/* <Col span={12}> */}
            {/* <FormItem label="类型：" name="type" rules={[{ required: true, message: '请选择类型' }]} hasFeedback {...formItemLayout}> */}
            {/* <Select> */}
            {/* <Option value="0">白名单</Option> */}
            {/* <Option value="1">黑名单</Option> */}
            {/* </Select> */}
            {/* </FormItem> */}
            {/* </Col> */}
            {/* <Col span={12}> */}
            {/* <FormItem label="车牌号：" name="value" rules={[{ required: true, message: '请填写车牌号' }]} hasFeedback {...formItemLayout}> */}
            {/* <Input /> */}
            {/* </FormItem> */}
            {/* </Col> */}

          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <FormItem
                wrapperCol={{ span: 24 }}
                className="footer"
                style={{ textAlign: 'center' }}
              >
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.cancelClickHandler}>
                  取消
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

modalComponent.propTypes = {
  param: PropTypes.object.isRequired,
  onTrigger: PropTypes.func.isRequired
};

export default modalComponent;
