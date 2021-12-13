import React, { Component } from 'react';
import './leftOne.less';
import './rightone.less';
import kaoq from 'images/kaoq.png';
import botIcon from 'images/pic_05.png';
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
    //this.fetch();
    //this.props.onRef(this);
  }

  componentWillUnmount(){
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  //shouldComponentUpdate(nextProps,nextState){
  //  console.log(nextProps);
  //  //if(nextProps.refresh!== this.props.markDeveui){
  //  //
  //  //  return true;
  //  //}else {
  //  //  return false;
  //  //}
  //}

  componentWillReceiveProps(nextProps) {

    //if (this.props !== nextProps) {
    //  this.props = nextProps;
    //  this.initPie();
    //}
  }

  fetch(deveui) {
    const that = this;
    this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/agriculture/overview/summary',
      method: 'POST',
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
          that.fetch(that.state.deveui);
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
    const paramOption={
      data:[0.2],
      color:['#DD982F'],
      refresh:true
    }
    return (
      <div className="leftone rightOne">

        {/*<div className="commonTit"><img src={kaoq} />告警总览</div>*/}
        <div className="pListWrap">

          {/*<div className="listOne">*/}
          {/*<div className="tit"><img src={circleIcon} />系统运行天数</div>*/}
          {/*<div className="descVal">{summaryData!== null ? summaryData.runday?summaryData.runday:0:0}</div>*/}
          {/*</div>*/}
          <div className="liquidWrap">
            <LiquidChar id={this.props.id?this.props.id:'liquid2'} param={this.props.refresh?Object.assign(paramOption,{refresh:true}):paramOption} style={{width:'100%',height:'100%',margin:'0 auto 8px auto'}} />
            <div className="liqTxt">设备告警率</div>
          </div>
          <div className="msgWrap">
            <div className="total">
              <div className="online">全部告警<br/> <img className="threeBarIcon" src={botIcon} alt="" /><b>340</b></div>
              <div className="offline">已处理<br/><img className="threeBarIcon" src={botIcon} alt="" /> <b>13</b></div>

            </div>
            <div>
              <div className="online">已确认<br/><img className="threeBarIcon" src={botIcon} alt="" /> <b>340</b></div>
              <div className="offline">未确认<br/><img className="threeBarIcon" src={botIcon} alt="" /> <b>13</b></div>
            </div>
          </div>




        </div>

      </div>
    );
  }
}

export default PageComponent;
