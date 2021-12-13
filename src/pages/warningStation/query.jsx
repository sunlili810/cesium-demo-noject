import React, { Component } from 'react';
import { DatePicker,Select,Button } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import './query.less';


const {  RangePicker } = DatePicker;
const { Option } = Select;
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };

  }


  componentDidMount(){

  }

  componentWillMount() {

  }
  onChange=(date, dateString)=> {
    console.log(date, dateString);
  }

  render() {
    return (
      <div className="queryWrap">
        <label>选择查询时间段</label>
        <RangePicker className="timeRang" onChange={this.onChange} locale={zhCN} showTime format='YYYY-MM-DD HH:ss' />
        <Select className="warningDesc" placeholder="请选择告警描述" style={{ width: '100%' }} dropdownStyle={{background:'#fff'}} >

            <Option className="optList" style={{background:'#fff'}} key='1' value='请选择摄像头'>请选择摄像头</Option>

        </Select>
        <Button type="primary" className="queryBtn">查询</Button>

      </div>
    );
  }
}

export default PageComponent;

