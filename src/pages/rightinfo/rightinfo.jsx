import React, { Component } from 'react';
import './rightinfo.less';
import Store from 'store/tablestore.js';
import { observer } from 'mobx-react';
import QRCode from 'qrcode.react';
const store = new Store();
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp:'',
      humidity: '',
      rate:'',
      num: '',
      male:'',
      female:'',
      arrlist:[]
    };
  }
  componentDidMount() {
    //this.getInfo();
    //this.getList()
    //this.interval = setInterval(() =>{this.getInfo();this.getList()}, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  getInfo = (params = {}) => {
    const that = this;
    const queryParam = {
      loadingFlag: false,
      url: '/appext/lavatory/monitor/lavatorystatuspad',
      method: 'post',
      data: {
        ...params
      },
      successFn(data) {
        that.setState({
          temp: data.data.temp,
          humidity: data.data.humidity,
          rate: data.data.rate,
          num: data.data.num,
          male:data.data.male,
          female:data.data.female
        });
      }
    };
    store.handleNormal(queryParam);
  };
  getList = (params = {}) => {
    const that = this;
    const queryParam = {
      loadingFlag: false,
      url: '/appext/lavatory/monitor/cleanrecord',
      method: 'post',
      data: {
        row:3,
        ...params
      },
      successFn(data) {
        let newarr=[];
        data.data.map((item, index) => {
          newarr.push({
            ...item,
          });
          return newarr;
        });
        that.setState({
          arrlist: newarr,
        });
        console.log(that.state.arrlist)
      }
    };
    store.handleNormal(queryParam);
  };

  handleNum (tempNum,totalNum){
    const tempArry = [...tempNum];
    const tempArryEmpty = Array.from(new Array(totalNum-tempArry.length), (n) => n || 0)
    return [...tempArryEmpty,...tempArry];
  }
  render() {
    const { devname,rightData,qrurl } = this.props;
    const tempNum = JSON.stringify(rightData!== null ? rightData.num: 0);
    const tempNumTotal = JSON.stringify(rightData!== null ? rightData.total: 0);
    const toiletVisitNum = this.handleNum(tempNum,4);
    const toiletVisitNumTotal = this.handleNum(tempNumTotal,6);
    return (
      <div className="bodywrap">
          <div className="wraptop">
            <div className="wrapTopTit">{devname}欢迎你</div>
            <div className="queWrap">
              <div className="queLeft" id="qrcode">
                {/*<img src={require('images/qrcode.png')} alt="" />*/}
                <QRCode value={qrurl} style={{width:'165px',height:'165px'}} />
              </div>
              <div className="queRight">
                <img src={require('images/pic_erweima.png')} alt="" />
              </div>
            </div>
          </div>
          <div className="wrapbottom">
            <div className="valueListOne">
              <div className="valueName">室内温度</div>
              <div className="valueV">{rightData!==null ?Number(rightData.temp).toFixed(1): ''} <b>℃</b></div>
            </div>

            <div className="valueListOne">
              <div className="valueName">室内湿度</div>
              <div className="valueV">{rightData!==null ?Number(rightData.humidity).toFixed(1): ''} <b>RH</b></div>
            </div>

            <div className="valueListOne">
              <div className="valueName">1号氨气浓度</div>
              <div className="valueV">{rightData!==null ?Number(rightData.nh4[0]).toFixed(1): ''} <b>mg/m³</b></div>
            </div>

            <div className="valueListOne">
              <div className="valueName">2号氨气浓度</div>
              <div className="valueV">{rightData!==null ?Number(rightData.nh4[1]).toFixed(1): ''} <b>mg/m³</b></div>
            </div>

            <div className="valueListOne">
              <div className="valueName">3号氨气浓度</div>
              <div className="valueV">{rightData!==null ?Number(rightData.nh4[2]).toFixed(1): ''} <b>mg/m³</b></div>
            </div>

            <div className="valueListOne">
              <div className="valueName">4号氨气浓度</div>
              <div className="valueV">{rightData!==null ?Number(rightData.nh4[3]).toFixed(1): ''} <b>mg/m³</b></div>
            </div>



            <div className="toiletStatistics" style={{}}>
              <div className="valueName">今日坑位流量</div>
              <div className="toiletVal">
                {
                  toiletVisitNum.map((item,index)=>{
                    return (<span key={index} className="letterToilet">{item}</span>)
                  })
                }
              </div><b>次</b>
            </div>
            <div className="toiletStatistics">
              <div className="valueName">累计坑位流量</div>
              <div className="toiletVal toiletValTotal">
                {
                  toiletVisitNumTotal.map((item,index)=>{
                    return (<span key={index} className="letterToilet">{item}</span>)
                  })
                }
              </div><b>次</b>
            </div>

          </div>
      </div>
    );
  }
}

export default PageComponent;
