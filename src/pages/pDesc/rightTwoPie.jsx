import React, { Component } from 'react';
import './rightTwoPie.less';
import kaoq from 'images/kaoq.png';
import circleIcon from 'images/circleIcon.png';
import tabStore from 'store/tablestore';
import Piecircle from 'components/echart/piecircle';
import Piecircle2 from 'components/echart/piecircle2';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData:null,
      devtypeData:null,
      deveui:''
    };
  }

  componentDidMount() {
    this.fetch();
    this.fetchSummary();
  }

  componentWillUnmount(){
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/project/devtype/distribution?',
      method: 'get',
      data: {
        topn:2
      },
      successFn(data) {
        const tempLegend = [];
        const tempData = Array.from(data.data).map((item)=>{
          tempLegend.push(item.devtypename);
          return   {
            name: item.devtypename,
            value: item.devnum
          }
        })
        that.setState({
          devtypeData: {
            seriesData:tempData,
            legendData:tempLegend
          }
        });
        if(that.timer1){
          clearTimeout(that.timer1)
        }
        that.timer1 = setTimeout(()=>{
          //that.fetch(that.state.deveui);
          that.fetch();
        },5*60*1000);
      }
    };
    store.handleNormal(param);
  }

  fetchSummary(deveui) {
    const that = this;
    //this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/combo/alarm/statis/summary',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({
          summaryData:data.data
        });

        if(that.timer2){
          clearTimeout(that.timer2)
        }
        //that.timer2 = setTimeout(()=>{
        //  that.fetchSummary();
        //},5*60*1000);
      }
    };
    store.handleNormal(param);
  }


  handlemarkclick(deveui){
    this.fetch(deveui)
  }


  render() {
    const {summaryData,devtypeData}=this.state;
    // 获得饼图数据
    const pieParam = {
      legendData: devtypeData!== null ? devtypeData.legendData:[],//['一类告警','二类告警','三类告警'],
      radius: '60%',
      titleTxt:'告警级别分布',
      colors:['#9A0E82','#E77A4A','#B2EAFE','#67FAF2', '#FDE102', '#3F79FE', '#FE99E3', '#28DDFC', '#6c85bd', '#bac3d2', '#f45c47'],
      //colors:['#B3EAFE','#A4C7F2','#E77749','#E77B4C', '#A40D81', '#870E86', '#FE99E3', '#28DDFC', '#6c85bd', '#bac3d2', '#f45c47'],
      paddingWidth:3,
      seriesData: devtypeData!== null ? devtypeData.seriesData:[]
      //  [
      //  {
      //    name: '一类告警',
      //    value: 10
      //  },
      //  {
      //    name: '二类告警',
      //    value: 20
      //  },
      //  {
      //    name: '三类告警',
      //    value: 30
      //  }
      //]

      //this.state.seriesData
    };

    // 获得环形饼图数据
    const confirmNum = summaryData!== null ? summaryData.confirmnum:0;
    const unConfirmNum = summaryData!== null ? summaryData.clearnum:0;
    const pieParamCircle = {
      legendData: ['已处理','未处理'],
      radius: confirmNum=== 0 && unConfirmNum === 0 ? ['25%','80%']:['30%','60%'],
      titleTxt:'告警处理率',

      colors:['#E2FFFD','#F2FFFE','#F8690B','#F8A219', '#E1FFFF', '#3F79FE', '#FE99E3', '#28DDFC', '#6c85bd', '#bac3d2', '#f45c47'],
      seriesData: [
        {
          name: '已处理',
          value: confirmNum
        },
        {
          name: '未处理',
          value: unConfirmNum
        }
      ]

      //this.state.seriesData
    };

    return (
      <div className="rightTwoPie" style={{height:'100%'}}>
        <div className="pie" style={{height:'100%'}}>
          {/*<Piecircle id={this.props.pid1?this.props.pid1:'pie'} param={pieParam} style={{width:"100%",height:'100%'}} />*/}
          <Piecircle id='pie' param={pieParam} style={{width:"100%",height:'100%'}} />
        </div>
        <div className="pieCircle" style={{height:'100%'}}>
          {/*<Piecircle id={this.props.pid2?this.props.pid2:'pieCircle'} param={pieParamCircle} style={{width:"100%",height:'100%'}} />*/}
          <Piecircle2 id='pieCircle' param={pieParamCircle} style={{width:"100%",height:'100%'}} />
        </div>

      </div>
    );
  }
}

export default PageComponent;
