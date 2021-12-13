import React, { Component } from 'react';
import './leftThree.less';
import warningblue from 'images/warningBlue.png';
import warningorange from 'images/warningOrange.png';
import warningpurple from 'images/warningPurple.png';
import warningicon from 'images/ic_01.png';
import tabStore from 'store/tablestore';
import PieRose from 'components/echart/pieRose';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertData:[],
      lengedData:[],
      deveui:''
    };
  }
  componentDidMount(){
    this.fetch();
    //this.props.onRef(this)
  }

  componentWillMount() {
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/project/devtype/distribution?topn=5',
      method: 'get',
      data: {
        topn:5
      },
      successFn(data) {
       const tempData =  data.data.map((item,index)=>{
          return {
            value:item.devnum,
            name:item.devtypename
          }
        });
       const tempLegendData=[];
        data.data.map((item,index)=>{
          tempLegendData.push(item.devtypename);
        });
        that.setState({
          alertData: tempData,
          lengedData:tempLegendData
        });
        if(that.timer1){
          clearTimeout(that.timer1)
        }
        that.timer1 = setTimeout(()=>{
          that.fetch(that.state.deveui);
        },5*60*1000);
      }
    };
    store.handleNormal(param);
  }

  render() {
    const {alertData,lengedData}=this.state;
    const param={
      legendData: lengedData,//['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],

      data:alertData
      //  [
      //  {value: 10, name: 'rose1'},
      //  {value: 5, name: 'rose2'},
      //  {value: 15, name: 'rose3'},
      //  {value: 25, name: 'rose4'},
      //  {value: 20, name: 'rose5'},
      //  {value: 35, name: 'rose6'},
      //  {value: 30, name: 'rose7'},
      //  {value: 40, name: 'rose8'}
      //]
    }


    //const {markDeveui}=this.props;
    return (
      <div className="lefttwoSub" style={{height:'100%'}}>

        <div className="commonTit"><img src={warningicon} />设备统计</div>
        <div className="pListWrap" style={{height:'83%'}}>
          <PieRose id="rose" param={param} style={{height:'100%'}} />
        </div>
      </div>
    );
  }
}

export default PageComponent;
