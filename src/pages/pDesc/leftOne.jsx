import React, { Component } from 'react';
import './leftOne.less';
import kaoq from 'images/ic_01.png';
import tabStore from 'store/tablestore';
import LiquidChar from 'components/echart/liquidfill';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData:null,
      deveui:''
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
    //this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/combo/project/summary',
      method: 'get',
      data: {
        deveui
      },
      successFn(data) {
        that.setState({
          summaryData: data.data
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
  handlemarkclick(deveui){
    this.fetch(deveui)
  }


  render() {
    const {summaryData}=this.state;
    const onlineratio= summaryData!== null ? summaryData.onlineratio!==0 ? (summaryData.onlineratio/100).toFixed(1):0:0;
    const param={
      data:[onlineratio],
      color:['#F96376']
    }
    return (
      <div className="leftone">

        <div className="commonTit"><img src={kaoq} />设备总览</div>
        <div className="pListWrap">

          {/*<div className="listOne">*/}
            {/*<div className="tit"><img src={circleIcon} />系统运行天数</div>*/}
            {/*<div className="descVal">{summaryData!== null ? summaryData.runday?summaryData.runday:0:0}</div>*/}
          {/*</div>*/}
          <div className="liquidWrap">
            <LiquidChar id="liquid" param={param} style={{width:'100%',height:'100%',margin:'0 auto 5px auto'}} />
            <div className="liqTxt">设备在线率</div>
          </div>
          <div className="msgWrap">
            <div className="total">设备总数 <b>{summaryData!== null ?summaryData.devnum:0}</b></div>
            <div>
              <div className="online">
                <div>在线设备</div>
                <div className="liquidmg"> <b>{summaryData!== null ?summaryData.onlinenum:0}</b></div>
              </div>
              <div className="offline">
                <div>离线设备</div>
                <div className="liquidmg"><b>{summaryData!== null ?(summaryData.devnum-summaryData.onlinenum):0}</b></div>
              </div>
            </div>
          </div>




        </div>

      </div>
    );
  }
}

export default PageComponent;
