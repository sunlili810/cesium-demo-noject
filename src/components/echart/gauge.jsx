import React, { Component } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import $ from 'jquery';


class PageComponent extends Component {
  static resizePie(chartid) {
    window[chartid] = echarts.getInstanceByDom(document.getElementById(chartid));
    window[chartid].resize();
  }

  componentDidMount() {
    window[this.props.id] = echarts.init(document.getElementById(this.props.id));
    this.initPie();
    const that = this;
    $(window).on('resize', () => {
      window[that.props.id].resize();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initPie();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
    window[this.props.id] = null;
  }

  initPie() {
    const { param } = this.props;
    const startGau = param.start ? param.start : 0.1;
    let maxNumLimit = param.maxLimit ? param.maxLimit / param.maxNum : 0.8;
    const minNumLimit = param.minLimit ? param.minLimit / param.maxNum : startGau;
    maxNumLimit = maxNumLimit < minNumLimit ? (minNumLimit + 0.01) : maxNumLimit;
    const minColor = param.minLimit ? '#E6EBF8' : '#E6EBF8';
    const maxColor = param.maxLimit ? '#E6EBF8' : '#E6EBF8';

    const dataPercent = 50 / 100;
    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}kwh'
      },
      series: [
        {
          name: '总耗能',
          type: 'gauge',
          radius: '100%',
          min: param.minNum ? param.minNum : 0,
          max: param.maxNum ? param.maxNum : 100,
          axisTick: {
            show: false,
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [0.5, '#2EDDF2'],
                [1, '#E6EBF8']
              ],
              width: 8
              // shadowColor: '#fff', //默认透明
              // shadowBlur: 10
            }
          },
          detail: {
            formatter: `${param.data}kwh`,
            offsetCenter: [0, '60%'],
            textStyle: {
              color: '#fff',
              fontSize: 10
            },
            // formatter: function (value) {
            //   return value + '分';
            // },
          },
          data: [{ value: `${param.data}`, name: '总耗能' }],
          pointer: {
            length: '50%',
            width: 2,
            color: 'auto'
          },
          axisLabel: {
            show: false
          },
          splitLine: { // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            length: 7, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#eee',
              width: 1,
              type: 'solid',
              fontSize: 9
            }
          },
          // title: {
          //   show: true,
          //   textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          //     color: '#fff',
          //     offsetCenter: [0, '-40%'],
          //     fontSize: 12
          //   }
          // },
          title: {
            offsetCenter: [0, '30%'],
            fontSize: 9,
            color: '#fff'
          },
        }
      ]
    };
    window[this.props.id].setOption(option, true);
  }

  render() {
    return (
      <div id={this.props.id} style={{ width: '100%', height: '100%' }} />
    );
  }
}

PageComponent.propTypes = {
  // param: PropTypes.number.isRequired
};
export default PageComponent;
