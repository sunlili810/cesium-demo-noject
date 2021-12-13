import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Input, Row, Col, Select, Divider
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
};
class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.searchListFn = this.searchListFn.bind(this);
  }

  componentDidMount() {
  }

  searchListFn() {
    const { form } = this.props;
    const { validateFields } = form;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const data = {
        ...values
      };
      const { searchFn } = this.props;
      searchFn(data);
    });
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const data = {
      ...values,
      channel: values.channel === undefined ? undefined : values.channel
    };
    const { searchFn } = this.props;
    searchFn(data);
  };

  render() {
    const {
      addUser, deletMany
    } = this.props;
    return (
      <Form
        layout="horizontal"
        onFinish={this.onFinish}
        style={{
          display: 'inline-block', textAlign: 'left', verticalAlign: 'middle', width: '100%'
        }}
      >
        <Row gutter={24}>
          <Col span={4}>
            <FormItem
              label="通道号："
              name="channel"
              {...{
                labelCol: {
                  span: 6
                },
                wrapperCol: {
                  span: 18
                }
              }}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="关联设备deveui：" name="deveui" {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          {/* <Col span={5}> */}
          {/* <FormItem label="关联设备类型：" name="devtype" {...formItemLayout}> */}
          {/* <Select> */}
          {/* <Option key="1" value="1">1</Option> */}
          {/* <Option key="2" value="1">2</Option> */}
          {/* </Select> */}
          {/* </FormItem> */}
          {/* </Col> */}
          <Col span={5}>
            <FormItem label="停车位名称：" name="name" {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem
              wrapperCol={{ span: 24 }}
              className="footer"
            >
              <Button className="btn-add" htmlType="submit" type="primary">查询</Button>
              <Divider type="vertical" />
              <Button className="btn-add" type="primary" onClick={addUser}>添加</Button>
            </FormItem>
          </Col>
        </Row>

      </Form>
    );
  }
}

pageComponent.propTypes = {
  addUser: PropTypes.func.isRequired,
  deletMany: PropTypes.func.isRequired,
  searchFn: PropTypes.func.isRequired,
  param: PropTypes.array.isRequired
};
// export default Form.create()(pageComponent);
export default pageComponent;
