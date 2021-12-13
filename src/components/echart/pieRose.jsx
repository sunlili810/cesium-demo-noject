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
        text: param.titleTxt === undefined ? '':param.titleTxt,
        padding: 10,
        x:'center',
        y:10,
        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
          fontFamily: 'Microsoft YaHei',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: 'normal',
          color:'#fff'
        },
      },
      legend: {
         orient: 'vertical',
        // top: 'middle',
       // icon:"circle",
        itemHeight: 8,
        itemWidth: 10,
        bottom: 10,
        y: 'center',
        left: 10,
        textStyle:{//图例文字的样式
          color:'#fff',
          fontSize:12
        },
        formatter: function (name) {
          return (name.length > 14 ? (name.slice(0, 14) + "...") : name);
        },
        data: param.legendData === undefined ? []:param.legendData
      },
      color: param.colors === undefined ? ['#365D7F', '#349FB7', '#E1944C', '#F6E570', '#25E38E', '#EC60FE', '#CBD34C', '#f45c47']:param.colors,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '半径模式',
          type: 'pie',
          radius: [40, 75],
          center: ['70%', 'center'],
          roseType: 'radius',
          label: {
            show: false
          },
          data:param.data=== undefined ? []:param.data
        }
      ]
    };

    pieChart.setOption(option);
  }

  render() {
    return (
      <div id={this.state.id} style={this.props.style} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};
export default PageComponent;
