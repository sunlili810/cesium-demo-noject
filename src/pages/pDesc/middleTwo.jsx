import React, { Component } from 'react';
import { Carousel,Select } from 'antd';
import './middleTwo.less';
import './pie.less';
import kaoq from 'images/ic_01.png';
import Pie from './piecircle';
import tabStore from 'store/tablestore';
import LineWrap from 'pages/middleBottom/index';
import Bar from 'components/echart/bar';



const store = new tabStore();
const { Option } = Select;
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serrydata1: [],
      serrydata2: [],
      xData:[],
      lineData:null,
      deveui:'',
      resourseList:[]
    };
    this.handlePieData = this.handlePieData.bind(this);
    this.fetch = this.fetch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.fetchList();
   this.fetch();
  }
  componetWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer);
    }
  }

  fetchList(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/resource/list',
      method: 'GET',
      data: {
        restype:'res_powerhouse'
      },
      successFn(data){
        that.setState({
          resourseList:data.data
        });
        that.fetch(data.data.length?data.data[0].resid:'')
      }
    };
    store.handleNormal(param);
  }

  fetch(resid='') {
    //this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/electric/substation/status',
      method: 'get',
      data: {
        resid
      },
      successFn: this.handlePieData
    };
    store.handleNormal(param);
  }
  // 处理饼图数据
  handlePieData(data) {
    const that = this;
    const colors = ['#00FCFF', '#8700DC', '#002CBC', '#FB7328', '#47AEDE', '#6c85bd', '#bac3d2', '#f45c47'];

    //const alarmstatus= [{
    //  "deveui": "0@004a77006200031c",
    //  "devname": "MD_2F_211",
    //  "devtype": "sensor_swireless_tempmonitor_v2",
    //  "total": 0
    //}, {
    //  "deveui": "0@004a770062000325",
    //  "devname": "WJ_市容整改_1#_XB",
    //  "devtype": "sensor_swireless_tempmonitor_v2",
    //  "total": 0
    //}, {
    //  "deveui": "0@004a770062000327",
    //  "devname": "WJ_市容整改_3#",
    //  "devtype": "sensor_swireless_tempmonitor_v2",
    //  "total": 0
    //}, {
    //  "deveui": "0@004a770062000329",
    //  "devname": "未安装MD_民主米泉路路口_0829B019#",
    //  "devtype": "sensor_swireless_tempmonitor_v2",
    //  "total": 0
    //}, {
    //  "deveui": "0@004a77006200032b",
    //  "devname": "WJ_人民公园_1#_XB",
    //  "devtype": "sensor_swireless_tempmonitor_v2",
    //  "total": 0
    //}]



    that.setState({
      serrydata1: Array.from(data.data.alarmstatus, x => x.total=== 0),
      serrydata2: Array.from(data.data.alarmstatus, x => x.total!== 0),
      xData:Array.from(data.data.alarmstatus,x=>x.devname),

      //serrydata1: Array.from(alarmstatus, x => x.total=== 0),
      //serrydata2: Array.from(alarmstatus, x => x.total!== 0),
      //xData:Array.from(alarmstatus,x=>x.devname),

      //seriesData: Array.from(data.data.business, x => ({
      //  name: x.name,
      //  value: x.percent,
      //  color: colors[data.data.business.indexOf(x)]
      //
      //}))
      lineData:data.data.humitures
    });
    if(that.timer1){
      clearTimeout(that.timer1)
    }

    that.timer1 = setTimeout(()=>{
      that.fetch(that.state.deveui);
    },5*60*1000);
  }
  handleSelect(resid){
    this.fetch(resid)
  }

  render() {
    const {lineData,resourseList,serrydata1,serrydata2,xData}=this.state;
   // const {markDeveui}=this.props;

    const param = {
      //xdata: ['一月','二月','三月','四月','五月','六月'],//xData,
      gridTop:'25%',
      gridBottom: '3%',
      titleY:15,
      legend: {
        itemHeight: 8,
        itemWidth: 10,
        top: 0,
        right: 10,
        textStyle:{//图例文字的样式
          color:'#fff',
          fontSize:12
        },
        data: ['正常', '异常']
      },
      title:'电缆终端温度',
      colorOption: {
        yLineColor: '#fff',
        xLineColor: '#fff',
        yTxtColor:'#fff',
        xTxtColor:'#fff'

      },
      xAxisType:'value',
      yAxisType:'category',
      LinearGradientColors:[
        [

          { offset: 0, color: '#8DFBA1' },
          { offset: 0.1, color: '#4AE2CF' },
          { offset: 1, color: '#0CCBFA' }

        ],
        [

          { offset: 0, color: '#F8C922' },
          { offset: 0.1, color: '#F88010' },
          { offset: 1, color: '#F83700' }

        ]
      ],
      serrydata: [
        {
          name: '正常',
          type: 'bar',
          barWidth: '5',
          data: serrydata1   //[80,60,70,30,70,10]//yData
        },
        {
          name: '异常',
          type: 'bar',
          barWidth: '5',
          data:serrydata2   //[10,90,20,50,30,90] //yData2
        }
      ],
      yAxis: [
        {
          yAxisIndex: 1,
          splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
            show: false
          },
          type: 'category',
          data: xData,//['一月','二月','三月','四月','五月','六月'],
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '12',
              extraCssText: 'line-height:30px'
            },
            formatter: function (name) {
              return (name.length > 4 ? (name.slice(0, 4) ) : name);
            },
          },
          axisLine: {//y轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid"
            },
          },

        },
        //双y轴
        //{
        //  name: '电线沟',
        //  yAxisIndex: 2,
        //  splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线
        //    show: false,
        //
        //  },
        //}
      ]
    };

    //const totalPieValue = pieParam.seriesData[0].value+pieParam.seriesData[1].value+pieParam.seriesData[2].value;
    const defaultVal = resourseList.length?resourseList[0].resname:'';
    return (
      <div className="middletwoSub" style={{height:'100%'}}>

        <div className="lineDiv">
          <div className="commonTit"><img src={kaoq} />动环监测</div>
          <LineWrap id="linechart2" lineData={lineData}  style={{height:'80%'}} />
        </div>
        <div className="pieDiv" style={{height:'100%'}}>

          <div className="leftTopOneWrap leftBorder" style={{ height: '100%', width: '100%' }}>
            <div style={{ width: '100%', height: '100%', display: 'inline-block',textAlign:'right' }}>
              {/*<Pie id="peiCircle" param={pieParam} />*/}
              <Select allowClear className="barSelect" key={defaultVal} defaultValue={defaultVal} onChange={this.handleSelect}  style={{ width:"80%",textAlign:'left' ,margin:'5px 10px 0px 0' }}>
                {
                  resourseList.map((item,index)=>(
                    <Option className="barselectOption" key={index}  value={item.resid}>{item.resname}</Option>
                  ))
                }
              </Select>
              <div className="bar" style={{height:'78%',marginTop:'2%'}}>
                <Bar id="bar2" param={param} />
              </div>
            </div>
            {/*<div className="legendCircle" >*/}
              {/*<div className="legendContent">*/}

                {/*{*/}
                  {/*pieParam.seriesData.map((item, index) => (*/}
                    {/*<div className="project-type" key={index} style={{ color: '#fff' }}>*/}
                      {/*<span className="listSquare" style={{ backgroundColor: item.color }} />*/}
                      {/*{item.name}&nbsp;&nbsp;(<span className="percentCircle">{totalPieValue=== 0 ? 0 :parseInt((item.value/totalPieValue)*100) }%</span>)*/}
                    {/*</div>*/}
                  {/*))*/}
                {/*}*/}

              {/*</div>*/}
            {/*</div>*/}
          </div>
        </div>

      </div>
    );
  }
}

export default PageComponent;
