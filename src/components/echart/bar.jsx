import React, { Component } from 'react';
import * as echarts from 'echarts';
// import PropTypes from 'prop-types';
import $ from 'jquery';

class PageComponent extends Component {
  // constructor(props) {
  //   super(props);
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
    const tempArry = [];
    param.serrydata.map((item, index) => {
      const tempObj = {};
      tempObj.type = 'bar';
      tempObj.areaStyle = item.areaStyle === null ? null : {
        normal: {
          color: '#EFF9FC'
        }
      };
      tempObj.smooth = item.smooth ? item.smooth : false;
      tempObj.symbolSize = item.symbolSize ? item.symbolSize : 5;
      tempObj.name = item.name;
      tempObj.barWidth = item.barWidth === undefined ? 18 : item.barWidth;// x轴柱状的宽度
      tempObj.label = {
        normal: {
          show: true,
          color: '#fff',
          fontSize: 12,
          position: 'top', // 显示在头部的每条y轴的值
          formatter: '{c}%',
        }
      };
      if (item.yAxisIndex !== undefined) {
        tempObj.yAxisIndex = item.yAxisIndex;
      }
      tempObj.itemStyle = {

        normal: {
          // 柱形图圆角，初始化效果
          // barBorderRadius: [5, 5, 5, 5],
          // color: new echarts.graphic.LinearGradient(
          //   0, 0, 0, 1,
          //   param.LinearGradientColors === undefined ? [
          //     { offset: 0, color: '#0F6CFF' },
          //     { offset: 0.5, color: '#0A35FF' },
          //     { offset: 1, color: '#0603FF' }
          //   ] : param.LinearGradientColors[index]
          // )

          color(params) {
            // build a color map as your need.

            const colorList = param.ColorsList === undefined ? ['#04FC46', '#D54AF6', '#09D1F1', '#f9715f', '#ecb031', '#6973c2', '#43AEA8', '#E8D418', '#60B1CC', '#CFA448', '#6ED6C2', '#6C85BD', '#BAC3D2', '#F45C47']
              : param.ColorsList;

            return colorList[params.dataIndex];
          },


          label: {
            show: true, // 是否展示
            position: 'top',
            textStyle: {
              // fontWeight: 'bolder',
              fontSize: 12,
              color: '#fff',
              fontFamily: '微软雅黑'
            }
          }
        }
      };
      tempObj.data = item.data;
      tempArry.push(tempObj);
      return tempArry;
    });
    const option = {
      title: {
        text: param.title,
        x: 'left',
        y: param.titleY !== undefined ? param.titleY : '0',
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      legend: param.legend,
      color: ['#2EBDFF', '#53FED9', '#60B1CC', '#CFA448', '#6ED6C2', '#6C85BD', '#BAC3D2', '#F45C47'],
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '4%',
        right: '8%',
        bottom: param.gridBottom !== undefined ? param.gridBottom : '1%',
        top: param.gridTop !== undefined ? param.gridTop : '10%',
        containLabel: true,
        borderWidth: 0,
        borderColor: '#666666'
      },
      xAxis: [{
        type: param.xAxisType === undefined ? 'category' : param.xAxisType,
        axisLabel: {
          textStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.xTxtColor // x轴，y轴的数字颜色，如图1
          },
          interval: 0,
          rotate: param.rotate === undefined ? 0 : param.rotate
          // rotate: 40,
          // formatter(value) {
          //   let valueTxt = '';
          //   if (value.length > 5) {
          //     valueTxt = `${value.substring(0, 8)}...`;
          //   } else {
          //     valueTxt = value;
          //   }
          //   return valueTxt;
          // }
        },
        boundaryGap: true, // x轴不从0点开始
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          onZero: true,
          lineStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.xLineColor,
            width: 1,
            type: 'solid'
          }
        },
        splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  竖线
          show: false,
          lineStyle: {
            color: param.colorOption === undefined ? '#666666' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        },
        data: param.xdata
      }],
      yAxis: param.yAxis === undefined ? [{
        type: param.yAxisType === undefined ? 'value' : param.yAxisType,
        // min: param.yMin ? param.yMin : 0,
        // max: param.yMax ? param.yMax : 0,

        axisLabel: {
          textStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.yTxtColor,
            fontSize: '12',
            extraCssText: 'line-height:30px'
          }

        },
        axisLine: { // 坐标轴样式
          show: false,
          onZero: true,
          lineStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.yLineColor,
            width: 1,
            type: 'solid'
          }
        },
        // axisLine: {
        //   show: true,
        //   minInterval: 1,
        //   lineStyle: {
        //     type: 'solid',
        //     color: '#E2E2E5',//左边线的颜色
        //     width: '1'//坐标线的宽度
        //   }
        // },
        // axisTick: { // 刻度
        //   show: false
        // },
        splitLine: { // 置表格中分割线线条  这个是x跟y轴轴的线
          show: false,
          lineStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        },
        minInterval: param.yminInterval === undefined ? 1 : param.yminInterval
      }] : param.yAxis,
      series: tempArry, // param.serrydata
      dataZoom: [
        { // 区域缩放
          type: 'inside',
          show: true,
          xAxisIndex: [0],
          start: 1,
          end: 100,
          startValue: 1,
          endValue: 2000
        }
      ]
    };

    // LineChart.setOption(option);
    window[this.props.id].setOption(option);
  }

  render() {
    const { id } = this.props;
    return (
      <div id={id} style={{ width: '98%', height: '100%' }} />
    );
  }
}

// PageComponent.propTypes = {
// param: PropTypes.object().isRequired
// };
export default PageComponent;
