import React, { Component } from 'react';
import './index.less';
import {
  BarChartOutlined
} from '@ant-design/icons';
import Bar from 'components/echart/bar';
import tabStore from 'store/tablestore';
import moment from 'moment';

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

  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   if (nextProps.lightId !== this.props.lightId) {
  //     this.fetch(nextProps.lightId);
  //   }
  // }


  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  // fetch(deveui) {
  //   const that = this;
  //   const param = {
  //     loadingFlag: false,
  //     url: '/light/visualization/statistic',
  //     method: 'get',
  //     data: {
  //       lampid: deveui
  //     },
  //     successFn(data) {
  //       const tempXData = [];
  //       const serryData = data?.appdata?.energy.map((item) => {
  //         tempXData.push(item.date);
  //         return item.realEnergy;
  //       });
  //
  //       that.setState({
  //         xData: tempXData,
  //         yData: serryData
  //       });
  //     }
  //   };
  //   store.handleNormal(param);
  // }

  handlemarkclick(deveui) {
    this.fetch(deveui);
  }


  render() {
    const {
      xData, yData
    } = this.props;
    const param = {
      xdata: xData, // xData,
      colorOption: {
        yLineColor: '#E2E2E5',
        xLineColor: '#E2E2E5',
        yTxtColor: '#fff',
        xTxtColor: '#fff'

      },
      LinearGradientColors: [
        [
          { offset: 0, color: '#645CAE' },
          { offset: 0.5, color: '#645CAE' },
          { offset: 1, color: '#645CAE' }
        ],
        [

          { offset: 0, color: '#5C6FAE' },
          { offset: 0.5, color: '#5C6FAE' },
          { offset: 1, color: '#5C6FAE' }
        ],
        [

          { offset: 0, color: '#4373C5' },
          { offset: 0.5, color: '#4373C5' },
          { offset: 1, color: '#4373C5' }
        ],
        [

          { offset: 0, color: '#439EC5' },
          { offset: 0.5, color: '#439EC5' },
          { offset: 1, color: '#439EC5' }
        ],
        [

          { offset: 0, color: '#96CBE2' },
          { offset: 0.5, color: '#96CBE2' },
          { offset: 1, color: '#96CBE2' }
        ],
        [

          { offset: 0, color: '#C7DFE9' },
          { offset: 0.5, color: '#C7DFE9' },
          { offset: 1, color: '#C7DFE9' }
        ],
        [
          { offset: 0, color: '#1AB3F5' },
          { offset: 0.5, color: '#1AB3F5' },
          { offset: 1, color: '#1AB3F5' }
        ],
        [
          { offset: 0, color: '#A1E3FF' },
          { offset: 0.5, color: '#A1E3FF' },
          { offset: 1, color: '#A1E3FF' }
        ],
        [
          { offset: 0, color: '#5A09FA' },
          { offset: 0.5, color: '#7B1AF2' },
          { offset: 1, color: '#9728EA' }
        ]
      ],
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
        <div className="bar" style={{ height: '96%' }}>
          <Bar id="bar1" param={param} />
        </div>

      </div>
    );
  }
}

export default PageComponent;
