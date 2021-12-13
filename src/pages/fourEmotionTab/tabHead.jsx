import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tabstore from 'store/tablestore';
import {
  Form, Button, Input, Row, Col, Select, Divider, DatePicker
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';

const store = new tabstore();
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    span: 9
  },
  wrapperCol: {
    span: 15
  }
};

const templist = [
  {
    id: 'res_ok_co8',
    name: 'res_ok_co8'
  },
  {
    id: 'res_ok_co12',
    name: 'res_ok_co12'
  },
  {
    id: 'res_ok_ts10',
    name: 'res_ok_ts10'
  }
];

class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restype: templist[0].id,
      devuiList: []
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(nextProps, prevState) {
    if (nextProps.resid !== this.props.resid) {
      this.fetch(nextProps.currentResid);
    }
  }

  // componentDidMount() {
  //   this.fetch();
  // }

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
    const startTime = values?.rangedate?.[0].format('YYYY-MM-DD HH:mm:ss');
    const endTime = values?.rangedate?.[1].format('YYYY-MM-DD HH:mm:ss');

    const data = {
      startTime: startTime || '',
      endTime: endTime || '',
      restype: values.restype || '',
      deveui: values.deveui
    };
    const { searchFn } = this.props;
    searchFn(data);
  };

  handleSelect(value) {
    this.setState({
      restype: value
    }, () => {
      this.fetch();
    });
  }

  fetch = () => {
    const that = this;
    const queryParam = {
      loadingFlag: false,
      url: '/appext/smartfarm/fourinfo/greenhousebugdevs',
      method: 'post',
      data: {
        resid: this.props.resid,
        devtype: this.state.restype
      },
      successFn(data) {
        that.setState({
          devuiList: data.appdata
        });
      }
    };
    store.handleNormal(queryParam);
  };

  render() {
    const {
      addUser, deletMany
    } = this.props;
    const { devuiList, restype } = this.state;
    return (
      <Form
        layout="horizontal"
        onFinish={this.onFinish}
        initialValues={{
          rangedate: [moment().startOf('day').subtract(1, 'days'), moment()],
          restype,
          deveui: devuiList?.devlist?.[0]?.subresid
        }}
        key={devuiList?.devlist?.[0]?.subresid}
        style={{
          display: 'inline-block', textAlign: 'left', verticalAlign: 'middle', width: '100%'
        }}
      >
        <Row gutter={24}>
          <Col span={5}>
            <FormItem label="设备类型：" name="restype" {...formItemLayout}>
              <Select onChange={this.handleSelect}>
                {
                   templist.length ? templist.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>)) : ''
                 }
                {/* <Option key="res_ok_co8" value="res_ok_co8">res_ok_co8</Option> */}
                {/* <Option key="res_ok_co12" value="res_ok_co12">res_ok_co12</Option> */}
                {/* <Option key="res_ok_ts10" value="res_ok_ts10">res_ok_ts10</Option> */}
              </Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem
              label="设备："
              name="deveui"
              {...{
                labelCol: {
                  span: 4
                },
                wrapperCol: {
                  span: 20
                }
              }}
            >
              <Select onChange={this.handleSelect} key={devuiList?.devlist?.[0]?.subresid}>
                {
                  devuiList?.devlist?.length ? devuiList?.devlist.map((item) => (<Option key={item.subresid} value={item.subresid}>{item.subresname}</Option>)) : ''
                }
                {/* <Option key="res_ok_co8" value="res_ok_co8">res_ok_co8</Option> */}
                {/* <Option key="res_ok_co12" value="res_ok_co12">res_ok_co12</Option> */}
                {/* <Option key="res_ok_ts10" value="res_ok_ts10">res_ok_ts10</Option> */}
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="采集时间："
              name="rangedate"
              {...{
                labelCol: {
                  span: 4
                },
                wrapperCol: {
                  span: 20
                }
              }}
            >
              <RangePicker
                className="timeRang"
                showTime
                locale={zhCN}
                showTime
                format="YYYY-MM-DD HH:mm"
              />
            </FormItem>
          </Col>
          <Col span={3}>
            <FormItem
              wrapperCol={{ span: 24 }}
              className="footer"
            >
              <Button className="btn-add" htmlType="submit" type="primary">查询</Button>
              {/* <Divider type="vertical" /> */}
              {/* <Button className="btn-add" type="primary" >批量删除</Button> */}
            </FormItem>
          </Col>
        </Row>

      </Form>
    );
  }
}

pageComponent.propTypes = {
  deletMany: PropTypes.func.isRequired,
  searchFn: PropTypes.func.isRequired,
  param: PropTypes.array.isRequired
};
// export default Form.create()(pageComponent);
export default pageComponent;
