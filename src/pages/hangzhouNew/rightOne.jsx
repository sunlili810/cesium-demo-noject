import React, { Component } from 'react';
import './index.less';
import {
  BarChartOutlined
} from '@ant-design/icons';
import Bar from 'components/echart/bar';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      yData: []
    };
  }

  componentDidMount() {
    this.fetch();
    // this.props.onRef(this);
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  fetch(deveui) {
    const that = this;

    const param = {
      loadingFlag: false,
      url: '/appm/home/qrydevstatratioperdevtp',
      method: 'get',
      data: {
        // days:7
      },
      successFn(data) {
        const tempXData = [];
        const serryData = data.map((item) => {
          if(item !== null){
            tempXData.push(item.devtpNm);
            return item.devOnlineRatio;
          }

        });
        that.setState({
          xData: tempXData,
          yData: serryData.filter((item)=>item!== undefined)
        });
      }
    };
    store.handleNormal(param);
  }

  handlemarkclick(deveui) {
    this.fetch(deveui);
  }


  render() {
    const {
      xData, yData
    } = this.state;
    const param = {
      xdata: xData, // xData,
      colorOption: {
        yLineColor: '#E2E2E5',
        xLineColor: '#E2E2E5',
        yTxtColor: '#fff',
        xTxtColor: '#fff'

      },
      ColorsList: [
        '#645CAE', '#5C6FAE', '#4373C5', '#439EC5', '#96CBE2', '#C7DFE9', '#1AB3F5', '#A1E3FF', '#5A09FA'
      ],
      // LinearGradientColors: [
      //   [
      //     { offset: 0, color: '#645CAE' },
      //     { offset: 0.5, color: '#645CAE' },
      //     { offset: 1, color: '#645CAE' }
      //   ],
      //   [
      //
      //     { offset: 0, color: '#5C6FAE' },
      //     { offset: 0.5, color: '#5C6FAE' },
      //     { offset: 1, color: '#5C6FAE' }
      //   ],
      //   [
      //
      //     { offset: 0, color: '#4373C5' },
      //     { offset: 0.5, color: '#4373C5' },
      //     { offset: 1, color: '#4373C5' }
      //   ],
      //   [
      //
      //     { offset: 0, color: '#439EC5' },
      //     { offset: 0.5, color: '#439EC5' },
      //     { offset: 1, color: '#439EC5' }
      //   ],
      //   [
      //
      //     { offset: 0, color: '#96CBE2' },
      //     { offset: 0.5, color: '#96CBE2' },
      //     { offset: 1, color: '#96CBE2' }
      //   ],
      //   [
      //
      //     { offset: 0, color: '#C7DFE9' },
      //     { offset: 0.5, color: '#C7DFE9' },
      //     { offset: 1, color: '#C7DFE9' }
      //   ],
      //   [
      //     { offset: 0, color: '#1AB3F5' },
      //     { offset: 0.5, color: '#1AB3F5' },
      //     { offset: 1, color: '#1AB3F5' }
      //   ],
      //   [
      //     { offset: 0, color: '#A1E3FF' },
      //     { offset: 0.5, color: '#A1E3FF' },
      //     { offset: 1, color: '#A1E3FF' }
      //   ],
      //   [
      //     { offset: 0, color: '#5A09FA' },
      //     { offset: 0.5, color: '#7B1AF2' },
      //     { offset: 1, color: '#9728EA' }
      //   ]
      // ],
      serrydata: [{
        data: yData,
        type: 'bar'


      }]
      // [
      //   {
      //     name: '告警总量',
      //     type: 'bar',
      //     barWidth: '10',
      //     data: yData
      //   }
      // {
      //  name: '二级告警',
      //  type: 'bar',
      //  barWidth: '10',
      //  data:[10,90,20,50,30,90] //yData2
      // }
      // ]
      // yAxis: [
      //  {
      //    yAxisIndex: 1,
      //    splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
      //      show: false
      //    },
      //  },
      //  //双y轴
      //  //{
      //  //  name: '电线沟',
      //  //  yAxisIndex: 2,
      //  //  splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
      //  //    show: false,
      //  //
      //  //  },
      //  //}
      // ]
    };
    return (
      <div className="leftTwoPage" style={{ height: '100%' }}>
        <div className="comTit">
          {/* <BarChartOutlined /> */}
          设备在线率
        </div>
        <div className="bar" style={{ height: '81%',marginTop:'20px', position: 'relative' }}>
          <div style={{
            color: '#FFF', position: 'absolute', left: '25px', top: '-8px'
          }}
          >单位%
          </div>
          <Bar id="bar1" param={param} />
        </div>

      </div>
    );
  }
}

export default PageComponent;
