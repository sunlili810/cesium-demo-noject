import React, { Component } from 'react';
import * as echarts from 'echarts';
// import  'echarts-gl';
import 'echarts-liquidfill';
import $ from 'jquery';
import PropTypes from 'prop-types';


class PageComponent extends Component {
  static resizePie(chartid) {
    window[chartid] = echarts.getInstanceByDom(document.getElementById(chartid));
    window[chartid].resize();
    echarts.init(document.getElementById(chartid));
    //initPieStatic();
  }

  componentDidMount() {
    window[this.props.id]=null;
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
    if (window[this.props.id]) {
      window[this.props.id].dispose();
    }
    window[this.props.id] = null;
  }

  initPie() {
    const { param } = this.props;
    //const tempData = (param.data).toString() === '0' ? [] : param.data;

    const option = {
      series: [{
        type: 'liquidFill',
        center: ['50%', '50%'],
        data: param.data,
        radius: '80%',
        amplitude: param.amplitude === undefined ? '2%' : param.amplitude,
        waveAnimation: param.waveAnimation === undefined ? true : param.waveAnimation,
        color: param.color === undefined ? ['#42B8F9'] : param.color,
        label: {
          normal: {
            //formatter:function(param){
            //  return param.value+'%';
            //},
            // textStyle: {
            // color: 'red',
            // insideColor: 'yellow',
            fontSize: 18,
            color:'#fff'
            // }
          }
        },
        shape: 'circle',

        //outline: {
        //  show: false
        //},
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 15,
            borderColor: 'rgba(6, 49, 102, 0.6)',
            shadowBlur: 10,
            shadowColor: 'rgba(6, 49, 102, 0.8)'
          }
        },
        itemStyle: {
          shadowBlur: 0,
          opacity: 0.9
        },
        backgroundStyle: {
          color: 'rgba(7,20,52,.8)',
          borderColor: '#022F50',
          borderWidth: 0,
          shadowColor: 'rgba(255, 255, 255, 0.9)',
          shadowBlur: 5
        },
        emphasis: {
          itemStyle: {
            opacity: 0.95
          }
        }
      }]
    };
    window[this.props.id].setOption(option);
  }

  render() {
    return (
      <div ref="liquid" id={this.props.id} style={this.props.style} />
    );
  }
}

PageComponent.propTypes = {
  // param: PropTypes.number.isRequired
};
export default PageComponent;

function  initPieStatic() {
  PageComponent.initPie();
}
