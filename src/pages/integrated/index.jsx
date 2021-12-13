import React, { Component } from 'react';
import {
  Button, Radio, Switch, Select, Popover, message
} from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import tabStore from 'store/tablestore';
import Layout from 'components/layout/layout';
import shadeBig from 'images/shadeBig.png';
import locationIcon from 'images/location.png';

const store = new tabStore();
const { Option } = Select;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greenhouseList: null,
      currentResid: null,
      staticsData: null,
      statusObj: null

    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    this.fetchGreenHouse();
    this.fetchStatics();
    this.fetchStatus();
  }

  fetchGreenHouse() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/resrelation/queryresshadow',
      method: 'post',
      data: {
        restypeid: 'res_greenhouse'
      },
      successFn(data) {
        that.setState({
          greenhouseList: data
        });
        if (data.length) {
          that.fetch(data[0].resid);
          that.fetchSoil(data[0].resid);
        }
      }
    };
    store.handleNormal(param);
  }

  fetchStatics() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appext/farm/monitor/device/count',
      method: 'post',
      data: {

      },
      successFn(data) {
        that.setState({
          staticsData: data.appdata
        });
      }
    };
    store.handleNormal(param);
  }

  fetchStatus(tresid) {
    const that = this;
    const params = {
      loadingFlag: false,
      url: '/appext/farm/disaster/summary',
      method: 'post',
      data: {
        resid: tresid
      },
      successFn(data) {
        that.setState({
          statusObj: data.appdata
        });
      }
    };
    store.handleNormal(params);
  }

  fetchCanmeraList(type) {
    const that = this;
    const { resid } = this.state;
    const params = {
      loadingFlag: false,
      url: '/appext/farm/disaster/control',
      method: 'post',
      data: {
        resid,
        type: 2// type
      },
      successFn(data) {
        message.success('指令发送成功！');
      }
    };
    store.handleNormal(params);
  }

  handleMenuClick(resid) {
    this.setState({ currentResid: resid });
  }

    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    };

    handleDeviceChange1(value) {
      console.log(value);
    }

    render() {
      const {
        greenhouseList, size, currentResid, staticsData, statusObj
      } = this.state;
      const tempList = greenhouseList?.length ? greenhouseList.map((item, index) => ({
        locX: parseInt(item?.remark?.split(';')?.[0]?.split(',')?.[0]) + 22,
        locY: parseInt(item?.remark?.split(';')?.[0]?.split(',')?.[1]) - 48,
        resid: item.resid,
        resname: item.resname
      })) : [];
      return (
        <Layout name="integrated" layoutList={greenhouseList} handleMenuClick={this.handleMenuClick}>
          <div className="integratedWrap" style={{ height: '100%' }}>

            <div className="integratedWrapDiv">
              <div className="leftCont" style={{ position: 'relative' }}>
                {
                          tempList?.length ? tempList.map((item, index) => (
                            <div className="tipName" key={index}>
                              <Link to={`${window.routername}/index/rd=${item.resid}`}>
                                <Popover
                                      // style={{ width: 500 }}
                                  content={item.resname}
                                  title=""
                                      // visible={true}
                                  trigger="hover"
                                >
                                  <img
                                    src={locationIcon}
                                    style={{
                                      position: 'absolute', left: `${item.locX}px`, top: `${item.locY}px`, width: '25px'
                                    }}
                                    alt=""
                                  />
                                </Popover>
                              </Link>
                            </div>
                          )) : ''
                      }

                <img src={shadeBig} alt="" style={{ height: '845px' }} />

              </div>
              <div className="rightCont">
                <div className="rTop">
                  <div className="listOne listOneDg">
                    <div className="iconDiv">
                      <div className="tit">滴灌系统</div>
                      <div className="iconF"><span className="icon iconfont">&#xeb36;</span></div>
                    </div>
                    <div className="controlDiv">
                      <div className="time">已开启{statusObj?.sunshade?.workhours}小时</div>
                      <div className="status">当前状态 <b>{statusObj?.sunshade?.status === 0 ? '开启' : '关闭'}</b></div>
                      <div className="ControlBtn"> <Button onClick={this.fetchCanmeraList.bind(this, 2)}>{statusObj?.sunshade?.status === 0 ? '点击开启' : '点击关闭'}</Button></div>
                    </div>
                  </div>

                  <div className="tit">自动调度策略<span>（可在后台系统中配置）</span></div>
                  <div className="staticOne">
                    {
                                  statusObj?.sunshade?.policies.map((item, index) => (<div key={index} className="rangeClock">{item.remark}</div>))
                              }
                    {/* <div className="rangeClock">开启时段2：<br/>每天8:30-15:30</div> */}
                  </div>

                </div>
                <div className="rBottom">
                  <div className="tit">设备数量</div>

                  <div className="listOne">
                    <div className="num">{staticsData?.greenHouse || 0}</div>
                    <div className="name">大棚数量</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.videoCamera || 0}</div>
                    <div className="name">摄像头</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.envMonitor || 0}</div>
                    <div className="name">大棚环境采集装置</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.soilMonitor || 0}</div>
                    <div className="name">大棚土壤监测装置</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.waterMonitor || 0}</div>
                    <div className="name">水肥营养监测装置</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.weatherStation || 0}</div>
                    <div className="name">农业气象站</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.okDevice || 0}</div>
                    <div className="name">智能虫情装置</div>
                  </div>

                  <div className="listOne">
                    <div className="num">{staticsData?.centController || 0}</div>
                    <div className="name">集中型控制箱</div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </Layout>
      );
    }
}

export default PageComponent;
