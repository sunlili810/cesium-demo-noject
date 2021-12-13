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
      summaryDataStatics:null,
      deveui:''
    };
  }

  componentDidMount() {
    this.fetch();
    this.fetchStatis();
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

  fetchStatis(deveui) {
    const that = this;
    //this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/combo/alarm/statis/summary',
      method: 'get',
      data: {
        type:1
      },
      successFn(data) {
        that.setState({
          summaryDataStatics: data.data
        });
      }
    };
    store.handleNormal(param);
  }

  handlemarkclick(deveui){
    this.fetch(deveui)
  }


  render() {
    const {summaryData,summaryDataStatics}=this.state;
    const alarmratio= summaryData!== null ? summaryData.alarmratio!==0 ? (summaryData.alarmratio/100).toFixed(3):0:0;
    const paramOption={
      data:[alarmratio],
      color:['#DD982F']
    }
    console.log(alarmratio);
    return (
      <div className="leftone rightOne">

        {/*<div className="commonTit"><img src={kaoq} />告警总览</div>*/}
        <div className="pListWrap">

          {/*<div className="listOne">*/}
          {/*<div className="tit"><img src={circleIcon} />系统运行天数</div>*/}
          {/*<div className="descVal">{summaryData!== null ? summaryData.runday?summaryData.runday:0:0}</div>*/}
          {/*</div>*/}
          <div className="liquidWrap">
            <LiquidChar id={this.props.id?this.props.id:'liquid2'} param={paramOption} style={{width:'100%',height:'100%',margin:'0 auto 8px auto'}} />
            <div className="liqTxt">设备告警率</div>
          </div>
          <div className="msgWrap">
            <div className="total">
              <div className="online">
                <div>全部告警<br/></div>
                  <div className="liquidmg"><img className="threeBarIcon" src={botIcon} alt="" />
                    <b>{summaryDataStatics!==null ? summaryDataStatics.total:0}</b></div>
              </div>
              <div className="offline">
                <div>已处理</div>
                <div className="liquidmg"><img className="threeBarIcon" src={botIcon} alt="" />
                  <b>{summaryDataStatics!==null ? summaryDataStatics.confirmnum:0}</b></div>
              </div>

            </div>
            <div>
              <div className="online">
                <div>已确认</div>
                <div className="liquidmg"><img className="threeBarIcon" src={botIcon} alt="" />
                  <b>{summaryDataStatics!==null ? summaryDataStatics.confirmnum:0}</b></div>
              </div>
              <div className="offline">
                <div className="liquidmg">未确认</div>
                <div><img className="threeBarIcon" src={botIcon} alt="" />
                  <b>{summaryDataStatics!==null ? summaryDataStatics.clearnum:0}</b></div>
              </div>
            </div>
          </div>




        </div>

      </div>
    );
  }
}

export default PageComponent;
