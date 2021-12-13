import React, { Component } from 'react';
import {
  Radio, Icon, Progress, Drawer
} from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './commonRight.less';
import Piecircle2 from 'components/echart/piecircle2';
import * as echarts from 'echarts';
import Bar from 'components/echart/bar';
import tabStore from 'store/tablestore';
import EnergyStatics from './energyStatics';
// import ThreePies from './threePies';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: null,
      Visible: true
    };
  }

  fetchSummary(deveui) {
    const that = this;
    // this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/huadian/heavy/summary',
      method: 'get',
      data: {
      },
      successFn(data) {
        that.setState({
          summaryData: data.data
        });

        if (that.timer1) {
          clearTimeout(that.timer1);
        }
        that.timer1 = setTimeout(() => {
          that.fetchSummary();
        }, window.timer);
      }
    };
    store.handleNormal(param);
  }

   showDrawer = () => {
     const { Visible } = this.state;
     this.setState({ Visible: !Visible });
   };

   onClose = () => {
     this.setState({ Visible: false });
   };

   render() {
     const { summaryData, Visible } = this.state;
     const standby = summaryData !== null ? summaryData.standby : 0;
     const work = summaryData !== null ? summaryData.work : 0;

     const onlinenum = summaryData !== null ? summaryData.onlinenum : 0;
     const devnum = summaryData !== null ? summaryData.devnum : 0;

     const confirmnum = summaryData !== null ? summaryData.confirmnum : 0;
     const total = summaryData !== null ? summaryData.total : 0;
     // 获得环形饼图数据
     const tempcolors1 = ['#ACC9FF', '#D7E5FF', '#95EB61', '#439EC5'];
     const pieParamCircle1 = {
       radius: standby === 0 && work === 0 ? ['50%', '115%'] : ['50%', '85%'],
       // colors: ['#ACC9FF','#D7E5FF','#95EB61','#46E2B4'],
       colors: [
         new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
           offset: 0,
           color: tempcolors1[0]
         },
         {
           offset: 0.9,
           color: tempcolors1[1]
         }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
           offset: 0,
           color: tempcolors1[2]
         },
         {
           offset: 0.5,
           color: tempcolors1[3]
         }])],
       centerFontColor: '#fff',
       seriesData: [
         {
           name: '待机中',
           value: standby
         },
         {
           name: '作业中',
           value: work
         }
       ]

       // this.state.seriesData
     };
console.log(Visible);

     return (
       <div className="commonRightFloatPage">
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
         >
           <div className="topR">
             <div className="tit" style={{ fontWeight: '600', margin: '15px 0' }}>设备概览</div>
             <div className="">设备总数：100</div>
             <div className="desc"><span>在线：100</span>  <span>离线：20</span></div>

             <div className="tit" style={{ fontWeight: '600', margin: '20px 0' }}>监测数据分析</div>

             <EnergyStatics />

           </div>
         </Drawer>

       </div>
     );
   }
}

export default PageComponent;
