import React, { Component } from 'react';
import { Carousel } from 'antd';
import './index.less';
import {
  BarsOutlined
} from '@ant-design/icons';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: [],
      onlineData: null
    };
  }

  componentDidMount() {
    this.fetchSummary();
    // this.fetch();
  }


  fetchSummary(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/dashboard/power',
      method: 'post',
      data: {

      },
      successFn(data) {
        that.setState({
          summaryData: data.appdata
        });
      }
    };
    store.handleNormal(param);
  }

  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appm/home/qrystatisticsnum',
      method: 'post',
      data: {
        // days:7
      },
      successFn(data) {
        that.setState({ onlineData: data });
      }
    };
    store.handleNormal(param);
  }

  onChange(a, b, c) {
    console.log(a, b, c);
  }

  componentWillUnmount() {
    this.setState = () => false;
  }


  render() {
    const { summaryData, onlineData } = this.state;
    return (
      <div className="middleOnePage" style={{ height: '100%' }}>

        <div className="comTit" style={{marginLeft:'15px'}}>
          {/* <BarsOutlined /> */}
          项目功率总览
        </div>
        <div className="carouselWrap">

          <div className="listTwo">
            <div className="num"><span>{Number(summaryData?.totalPower).toFixed(1) || 0}</span>kw</div>
            <div className="tit">灯杆总功率</div>
          </div>
          <div className="listTwo">
            <div className="num"><span>{Number(summaryData?.lightPower).toFixed(1) || 0}</span>kw</div>
            <div className="tit">照明总功率</div>
          </div>


        </div>

      </div>
    );
  }
}

export default PageComponent;
