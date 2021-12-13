import React, { Component } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import $ from 'jquery';

let pieChart = echarts;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
    this.resizePie = this.resizePie.bind(this);
  }
  componentDidMount() {
    pieChart = echarts.init(document.getElementById(this.state.id));
    this.initPie();
    $(window).on('resize', this.resizePie);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initPie();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
  }
  resizePie() {
    const pieInstance = echarts.getInstanceByDom(document.getElementById(this.props.id));
    pieInstance.resize();
  }

  initPie() {
    const { param } = this.props;

    const option = {
      title: {
        text: '',
        padding: 10
      },
      color: ['#67FAF2', '#FDE102', '#3F79FE', '#FE99E3', '#28DDFC', '#6c85bd', '#bac3d2', '#f45c47'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // 圆环中间字
      graphic: {
        show: true,
        type: 'text',
        top: 'center',
        left: 'center',
        style: {
          text: '100%',
          fill: '#fff',
          fontSize: 20, // 字体大小
          fontFamily: 'fzcq',
          fontStyle: 'italic'
        }
      },
      // legend: {
      //   orient: 'vertical',
      //   right: '20%',
      //   y: 'center',
      //   data: param.legendData,
      //   // 图例图形
      //   itemWidth: 10,
      //   itemHeight: 10,
      //   itemGap: 10,
      //   // 图例文字两种样式处理
      //   formatter(name) {
      //     let total = 0;
      //     let target;
      //     for (let i = 0, l = param.seriesData.length; i < l; i += 1) {
      //       total += parseFloat(param.seriesData[i].value);
      //       if (param.seriesData[i].name === name) {
      //         target = param.seriesData[i].value;
      //       }
      //     }
      //     const arr = [
      //       `{a|${name}}`,
      //       `{b|  (${((target / total) * 100).toFixed(2)}%)}`
      //     ];
      //     return arr.join('');
      //   },
      //   textStyle: {

      //     color: '#fff',
      //     fontFamily: 'fzcq',
      //     rich: {
      //       a: {
      //         padding: 7,
      //         fontSize: 14
      //       },
      //       b: {
      //         fontSize: 18,
      //         fontFamily: 'fzcq',
      //         fontStyle: 'italic',
      //         color: '#00F4FE'
      //       }
      //     }
      //   }

      // },
      series: [
        {
          name: '业务数量',
          type: 'pie',
          radius: ['50%', '72%'],
          center: ['50%', '50%'],
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          data: param.seriesData,
          itemStyle: {
            // 饼图区域间距
            normal: {
              borderColor: '',
              borderWidth: 0
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    pieChart.setOption(option);
  }

  render() {
    return (
      <div id={this.state.id} style={{ width: '100%', height: '180px' }} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};
export default PageComponent;
