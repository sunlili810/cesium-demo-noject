import React, { Component } from 'react';
import './rightTwoPie.less';
import tabStore from 'store/tablestore';
import Bar from 'components/echart/bar';
import kaoq from 'images/ic_01.png';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xData:[],
      yData:[],
      serrydata:[],
      legend:[]
    };
  }

  componentDidMount() {
    this.fetch();
    //this.props.onRef(this);
  }

  componentWillUnmount(){
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  fetch(deveui) {
    const that = this;
    this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/combo/alarm/statis/daily',
      method: 'get',
      data: {
        days:7
      },
      successFn(data) {
        //const templist =  Array.from(data.data.alarms).map((item)=> {
        //  const tempdata = item.alarms.map ((item2, index2) => {
        //    return item2.alarms;
        //  });
        //  return {
        //    name: item.devtypename,
        //    type: 'bar',
        //    barWidth: '15',
        //    data: tempdata
        //  }
        //});
        //that.setState({
        //  xData: data.data.dates,
        //  serrydata:templist,
        //  legend:data.data.devtypenames
        //});



        const xData= [];
        const yData =[];
        const templist =  Array.from(data.data).map((item)=> {
          //const tempdata = item.alarms.map ((item2, index2) => {
          //  return item2.alarms;
          //});
          //return {
          //  name: item.devtypename,
          //  type: 'bar',
          //  barWidth: '15',
          //  data: tempdata
          //}
          xData.push(item.time);
          yData.push(item.total);
        });
        that.setState({
          xData: xData,
          yData:yData
          //serrydata:templist,
          //legend:data.data.devtypenames
        });

        //if(that.timer1){
        //  clearTimeout(that.timer1)
        //}
        //that.timer1 = setTimeout(()=>{
        //  that.fetch(that.state.deveui);
        //},5*60*1000);
      }
    };
    store.handleNormal(param);
  }
  handlemarkclick(deveui){
    this.fetch(deveui)
  }


  render() {
    const {xData,serrydata,legend,yData}=this.state;
    const param = {
      xdata: xData,//xData,
      colorOption: {
        yLineColor: '#fff',
        xLineColor: '#fff',
        yTxtColor:'#fff',
        xTxtColor:'#fff'

      },
      LinearGradientColors:[
        [
          { offset: 0, color: '#5A09FA' },
          { offset: 0.5, color: '#7B1AF2' },
          { offset: 1, color: '#9728EA' }
        ],
        [

          { offset: 0, color: '#23DA4F' },
           { offset: 0.5, color: '#8CE54B' },
          { offset: 1, color: '#EFEF46' }
         ],
        [

          { offset: 0, color: '#2EBDFF' },
          { offset: 0.5, color: '#2EBDFF' },
          { offset: 1, color: '#2EBDFF' }
        ],
        [

          { offset: 0, color: '#53FED9' },
          { offset: 0.5, color: '#53FED9' },
          { offset: 1, color: '#53FED9' }
        ],
        [

          { offset: 0, color: '#60B1CC' },
          { offset: 0.5, color: '#60B1CC' },
          { offset: 1, color: '#60B1CC' }
        ],
        [

          { offset: 0, color: '#CFA448' },
          { offset: 0.5, color: '#CFA448' },
          { offset: 1, color: '#CFA448' }
        ]
      ],
      serrydata: //serrydata
        [
        {
          name: '告警总量',
          type: 'bar',
          barWidth: '10',
          data: yData
        },
        //{
        //  name: '二级告警',
        //  type: 'bar',
        //  barWidth: '10',
        //  data:[10,90,20,50,30,90] //yData2
        //}
      ],
      //yAxis: [
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
      //]
    };
    console.log(param);
    return (
      <div className="rightThreeBar" style={{height:'100%'}}>
        <div className="commonTit"><img src={kaoq} />告警时间统计</div>
        <div className="bar" style={{height:'80%'}}>
          <Bar id="bar1" param={param} />
        </div>

      </div>
    );
  }
}

export default PageComponent;
