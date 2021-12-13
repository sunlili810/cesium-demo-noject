import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Line from 'components/echart/line2.jsx';
import './index.less';

const url = 'operations/item_alarm_stat';

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xdata: [],
      ydata1: [],
      ydata2: [],
    };
    this.colors = ['#512178', '#0094E0', '#00f6ff', '#ffe704', '#ff812d', '#0024ff', '#34ff25'];
  }
  componentDidMount() {
  }
  componetWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { lineData, id } = this.props;

    const Xdata = [];
    const Ydata1 = [];
    const Ydata2 = [];
    lineData?lineData.map((item) => {
      Xdata.push(item.collecttime);
      Ydata1.push(item.temp!== null && item.temp!== undefined ? (item.temp).toFixed(1):0);
      Ydata2.push(item.humd!== null && item.humd !== undefined ? (item.humd).toFixed(1):0);
    }):'';



    const linedata = {
      title:'变电柜内温湿度',
      legend: {
        data: ['温度', '湿度'],
        textStyle:{
          color:'#ffffff',
        }

      },
      left: '6%',
      top: '40%',
      xdata: Xdata,
      //xdata: [9.11,9.12,9.13,9.14,9.15,9.16,9.17],
      yAxis: [
        {
          name: '温度',
          type: 'value',
          //max: 100,
          //min: 0,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: false
          }
        },
        {
          name: '湿度',
          type: 'value',
          //max: 100,
          //min: 0,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: false
          }
        }
      ],
      serrydata: [
        { name: '温度', data: Ydata1, yAxisIndex: 0 },
        { name: '湿度', data: Ydata2, yAxisIndex: 1 }
        //{ name: '水质PH值', data: [0,3,2,5,7,8,14], yAxisIndex: 0 },
        //{ name: '水质浊度', data: [3,2,3,2.5,2.9,3,1,2], yAxisIndex: 1 }
      ]
    };


    return (
      <div className="leftMiddle-Wrap">
        <Line id={id} param={linedata} />
      </div>
    );
  }
}

export default PageComponent;
