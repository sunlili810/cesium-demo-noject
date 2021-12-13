import React, { Component } from 'react';
import { DatePicker,Button,Form,Select } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import './query.less';
import searchIcon from 'images/searchIcon.png';
import tabStore from 'store/tablestore';

const store = new tabStore();
const FormItem = Form.Item;
const { Option } = Select;
const {  RangePicker } = DatePicker;
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteList:[]
    };

  }

  componentDidMount(){

    this.fetch();
  }

  componentWillMount() {
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }


  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/agriculture/overview/map',
      method: 'POST',
      data: {

      },
      successFn(data) {
        that.setState({
          siteList: data.data
        });
        if(that.timer1){
          clearTimeout(that.timer1)
        }
        //that.timer1 = setTimeout(()=>{
        //  that.fetch();
        //},5*1000);
      }
    };
    store.handleNormal(param);
  }

  onFinish = (values) => {
    const startTime=values.rangedate[0].format('YYYY-MM-DD');
    console.log(startTime);
    const endTime= values.rangedate[1].format('YYYY-MM-DD');

    const data = {
      exemplaryId:values.exemplaryId,
      startTime,
      endTime
    };
    const { searchFn } = this.props;
    searchFn(data);
  };
  handleSearch(){
    //const { searchFn } = this.props;
    //searchFn(data);
  }



  render() {
    const {siteList}=this.state;
    return (
      <div className="queryWrap queryWrappic" style={{position:'relative'}}>
        <Form
          layout="horizontal"
          onFinish={this.onFinish}
          //style={{
          //  display: 'inline-block', textAlign: 'left', verticalAlign: 'middle', width: '100%'
          //}}
        >

          <FormItem
            label="地点："
            name="exemplaryId"
            rules={[{ required: false, message: '请选择地点' }]}
            {...{
              labelCol: {
                span: 4
              },
              wrapperCol: {
                span: 15
              }
            }}
          >
            <Select allowClear placeholder="请选择地点" style={{ display: 'inline-block' }}>
              { siteList.map((item, index) => (<Option key={index} value={item.deveui}>{item.devname}</Option>))}
            </Select>
          </FormItem>

          <FormItem
            label="选择时段："
            name="rangedate"
            rules={[{ required: false, message: '请选择地点' }]}
            {...{
              labelCol: {
                span: 5
              },
              wrapperCol: {
                span: 19
              }
            }}
            className="dateDiv dateDiv2"
            style={{display:'inline-block',width:'79%'}}
          >

            <RangePicker  className="timeRang" locale={zhCN} showTime format='YYYY-MM-DD' />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 24 }}
            className="footer"
            style={{display:'inline-block'}}
          >
            {/*<Button className="btn-add" type="primary" htmlType="submit" style={{ marginRight: '5px' }}>查询</Button>*/}
            <button className="queryTxt" type="submit">查询</button>
          </FormItem>


        {/*<label>选择查询时段</label>*/}
        {/*<RangePicker ref="picdate" onOk={this.sureClick}  className="timeRang" onChange={this.onChange} locale={zhCN} showTime format='YYYY-MM-DD' />*/}
        {/*<img src={searchIcon} className="searchIcon" title="查询" onClick={this.handleSearch} style={{position:'absolute',width:'35px',height:'35px',right:'0',top:'0',zIndex:'9999'}} />*/}
        </Form>
      </div>
    );
  }
}

export default PageComponent;


