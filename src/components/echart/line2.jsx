import React, { Component } from 'react';
import * as echarts from 'echarts';
// import PropTypes from 'prop-types';
import $ from 'jquery';


class PageComponent extends Component {
  // constructor(props) {
  //  super(props);
  // }

  componentDidMount() {
    window[this.props.id] = echarts.init(document.getElementById(this.props.id));
    this.initLines();
    const that = this;
    $(window).on('resize', () => {
      window[that.props.id].resize();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initLines();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
    window[this.props.id] = null;
  }

  initLines() {
    const { param } = this.props;
    // console.log(123456);
    const tempArry = [];
    param.serrydata.map((item) => {
      const tempObj = {};
      tempObj.type = 'line';
      tempObj.areaStyle = item.areaStyle !== undefined ? item.areaStyle : {
        normal: {
          color: ['rgba(7,18,38,0.8)']
        }
      };
      // tempObj.axisLabel = item.axisLabel === undefined ? {
      //  textStyle: {
      //    color: '#737274'
      //  }
      // } : item.axisLabel;
      // tempObj.areaStyle = { normal: {} };
      tempObj.smooth = item.smooth ? item.smooth : false;
      tempObj.symbolSize = item.symbolSize ? item.symbolSize : 5;
      tempObj.itemStyle = item.itemStyle ? item.itemStyle : {
        // normal: {
        //  color: "#1bdaf8", //折线点的颜色
        //  //lineStyle: {
        //  //  color: "#0d427e" //折线的颜色
        //  //}
        // }
      };
      tempObj.name = item.name;
      tempObj.connectNulls = item.connectNulls ? item.connectNulls : false;
      tempObj.label = {
        normal: {
          show: false
        }
      };
      if (item.yAxisIndex !== undefined) {
        tempObj.yAxisIndex = item.yAxisIndex;
      }
      tempObj.data = item.data;
      tempArry.push(tempObj);
      return tempArry;
    });
    const option = {
      title: {
        text: param.title,
        x: 'left',
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      legend: param.legend,
      color: ['#BD35DA', '#0491C6', '#DDB41D', '#FFD700', '#0194da', '#f9715f', '#ecb031', '#6973c2', '#43AEA8', '#E8D418', '#60B1CC', '#CFA448', '#6ED6C2', '#6C85BD', '#BAC3D2', '#F45C47'],
      tooltip: {
        trigger: 'axis',
        show:false
      },
      // grid: {
      //  left: param.left === undefined ? '4%' : param.left,
      //  right: '8%',
      //  bottom: '1%',
      //  top: param.top === undefined ? '30%' : param.top,
      //  containLabel: true,
      //  borderWidth: 1,
      //  borderColor: '#666666'
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisLabel: {
          textStyle: {
            color: param.colorOption === undefined ? '#666666' : param.colorOption.xTxtColor // x轴，y轴的数字颜色，如图1
          }
        },
        boundaryGap: false,
        axisLine: {
          onZero: true,
          lineStyle: {
            color: param.colorOption === undefined ? 'axisLine' : param.colorOption.xLineColor,
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: param.colorOption === undefined ? '#666666' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        },
        data: param.xdata
      }],
      yAxis: param.yAxis === undefined ? [
        {
          type: 'value',
          min: param.yMin ? param.yMin : 0,
          axisLabel: {
            textStyle: {
              color: param.colorOption === undefined ? '#737274' : param.colorOption.yTxtColor,
              fontSize: '12',
              extraCssText: 'line-height:30px'
            }
          },
          axisLine: {
            onZero: true,
            lineStyle: {
              color: param.colorOption === undefined ? 'axisLine' : param.colorOption.yLineColor,
              width: 1,
              type: 'solid'
            }
          },
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: true,
            lineStyle: {
              color: param.colorOption === undefined ? '#666666' : param.colorOption.backgroundLineColor,
              type: 'solid'
            }
          },
          minInterval: 1
        }
      ] : param.yAxis,
      series: tempArry, // param.serrydata
      dataZoom: [{
        type: 'inside',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
        startValue: 1,
        endValue: 2000
      }]
    };

    // LineChart.setOption(option);
    window[this.props.id].setOption(option);
  }

  render() {
    const { id } = this.props;
    return (
      <div id={id} style={{ width: '100%', height: '95%' }} />
    );
  }
}

// PageComponent.propTypes = {
//  // param: PropTypes.object().isRequired
// };
export default PageComponent;
