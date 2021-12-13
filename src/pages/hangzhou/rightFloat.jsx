import React, { Component } from 'react';
import { Radio, Icon, Progress ,Drawer} from 'antd';
import './index.less';
import Bar from 'components/echart/bar';
import Gauge from 'components/echart/gauge';
import tabStore from 'store/tablestore';
import ThreePies from './threePies';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: '1',
      summaryData: null,
      Visible: true
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appext/lamppost/summary',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({ summaryData: data.data });
        // if(that.timer1){
        //  clearTimeout(that.timer1)
        // }
        // that.timer1 = setTimeout(()=>{
        //  that.fetch(that.state.deveui);
        // },5*60*1000);
      }
    };
    store.handleNormal(param);
  }


  handleSizeChange = (e) => {
    this.setState({ currentpage: e.target.value });
  };

  showDrawer = () => {
    const { Visible } = this.state;
    this.setState({ Visible: !Visible });
  };

  onClose = () => {
    this.setState({ Visible: false });
  };

  render() {
    const { currentpage, summaryData,Visible } = this.state;
    const option = {
      data: 50,
      title: '总耗能'
    };
    return (
      <div className="rightFloatPage">
        {/* <Radio.Group value={currentpage} onChange={this.handleSizeChange} style={{ marginBottom: 3 }}> */}
        {/*  <Radio.Button value="1">设备耗能</Radio.Button> */}
        {/*  /!* <Radio.Button value="2">实时监控</Radio.Button> *!/ */}
        {/* </Radio.Group> */}

        {
          Visible ? (<DoubleRightOutlined className="arrowLR arrowRSide" onClick={this.showDrawer} />) : (<DoubleLeftOutlined className="arrowLR arrowLSide" onClick={this.showDrawer} />)
        }
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={Visible}
          mask={false}
          width={300}
          className="ligntRight"
        >

        <div className="topR">
          <div className="tit">设备概览</div>
          <div style={{ padding: '0 20px' }}>
            <div className="" style={{ textAlign: 'center' }}>灯杆总数：{summaryData !== null ? summaryData.statis.lighting : 0}</div>
            <div className="desc"><span>照明：{summaryData !== null ? summaryData.statis.lighting : 0}</span>  <span style={{ display: 'inline-block', marginLeft: '30px' }}>广播：{summaryData !== null ? summaryData.statis.broadcast : 0}</span></div>
            <div className="desc"><span>监控：{summaryData !== null ? summaryData.statis.video : 0}</span>  <span style={{ display: 'inline-block', marginLeft: '30px' }}>报警：</span></div>
            <div className="desc"><span>气象：{summaryData !== null ? summaryData.statis.weather : 0}</span>  <span style={{ display: 'inline-block', marginLeft: '30px' }}>充电桩：</span></div>
            <div className="desc"><span>大屏：</span>  <span style={{ display: 'inline-block', marginLeft: '30px' }}>WIFI：</span></div>
          </div>
          {/* <div className="tit titToday">当日耗能</div> */}
          {/* <div className="titTotal">总耗能：2500kwh</div> */}
          {/* <div className="desc descP">照明<div className="progDiv"><span className="lineprogress" style={{ width: '100%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">监控<div className="progDiv"><span className="lineprogress" style={{ width: '80%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">气象<div className="progDiv"><span className="lineprogress" style={{ width: '90%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">大屏<div className="progDiv"><span className="lineprogress" style={{ width: '10%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">广播<div className="progDiv"><span className="lineprogress" style={{ width: '30%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">报警<div className="progDiv"><span className="lineprogress" style={{ width: '50%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">充电桩<div className="progDiv"><span className="lineprogress" style={{ width: '20%' }} /><span className="txt">400kwh</span></div></div> */}
          {/* <div className="desc descP">WIFI<div className="progDiv"><span className="lineprogress" style={{ width: '80%' }} /><span className="txt">400kwh</span></div></div> */}

        </div>
        <div className="bottomR">
          <div className="tit">监测统计</div>
          <ThreePies />
        </div>
        <div className="energyDiv">
          <div className="tit">能耗监测统计</div>
          <div className="energyCont" style={{}}>
            <Gauge id="energyGua" param={option} />
            <div className="desc descP">照明<div className="progDiv"><span className="lineprogress" style={{ width: '100%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">监控<div className="progDiv"><span className="lineprogress" style={{ width: '80%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">气象<div className="progDiv"><span className="lineprogress" style={{ width: '90%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">大屏<div className="progDiv"><span className="lineprogress" style={{ width: '10%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">广播<div className="progDiv"><span className="lineprogress" style={{ width: '30%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">报警<div className="progDiv"><span className="lineprogress" style={{ width: '50%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">充电桩<div className="progDiv"><span className="lineprogress" style={{ width: '20%' }} /><span className="txt">400kwh</span></div></div>
            <div className="desc descP">WIFI<div className="progDiv"><span className="lineprogress" style={{ width: '80%' }} /><span className="txt">400kwh</span></div></div>
          </div>

        </div>
        </Drawer>
      </div>
    );
  }
}

export default PageComponent;
