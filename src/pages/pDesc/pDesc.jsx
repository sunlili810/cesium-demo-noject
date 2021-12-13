import React, { Component } from 'react';
import './pDesc.less';
import commontit from 'images/sbei.png';
import Leftone from './leftOne';
import Lefttwo from './leftTwo';
import Mtwo from './middleTwo';
//import VideoMon from './warningStation';
import MidMap from './middleMap';
import Leftthree from './leftThree';
import BorderLine from './borderLine';
import tabStore from 'store/tablestore';
import RightOne from './rightOne';
import RightTwo from './rightTwoPie'
import RightThreeBar from './rightThreeBar';
import kaoq from 'images/kaoq.png';
import CommonWarning from './commonWarning';


const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  //fetch(deveui) {
  //  const that = this;
  //  const param = {
  //    loadingFlag: false,
  //    url: '/agriculture/overview/env',
  //    method: 'POST',
  //    data: {
  //      deveui
  //    },
  //    successFn(data) {
  //      that.setState({
  //        envData: data.data
  //      });
  //      if(that.timer1){
  //        clearTimeout(that.timer1)
  //      }
  //      that.timer1 = setTimeout(()=>{
  //        that.fetch(that.state.markDeveui);
  //      },5*60*1000);
  //    }
  //  };
  //  store.handleNormal(param);
  //}
  //markerClick=(deveui)=>{
  //  this.setState({
  //    markDeveui:deveui
  //  },()=>{
  //    this.fetch(deveui);
  //    this.child.fetch(deveui);
  //
  //    this.refs.getSwordButton.handlemarkclick(deveui);
  //    this.refs.middltwo.handlemarkclick(deveui);
  //    this.refs.lefttwo.handlemarkclick(deveui);
  //
  //
  //  })
  //}
  //onRef = (ref) => {
  //  this.child = ref
  //}

  render() {
    return (
      <div className="pDesc">
        <div className="cont">
          <div className="topWrap">
            <div className="topOne">
              <div className="leftOne">
                <BorderLine />
                <Leftone   />
              </div>
              <div className="leftTwo">
                <BorderLine />
                <Lefttwo   ref="lefttwo"  />
              </div>
              <div className="leftThree">
                <BorderLine />
                <Leftthree  />
              </div>
            </div>
            <div className="topTwo">
              <div className="middleOne" style={{position:'relative'}}>
                <MidMap  markerClick={this.markerClick} />
                {/*<div className="videoLine" >*/}
                  {/*<BorderLine />*/}
                  {/*<div className="commonTit"><img src={commontit} />视频监控</div>*/}
                  {/*<VideoMon  id="littleVideo" videoSrc={videoSrc} />*/}
                {/*</div>*/}
              </div>
              <div className="middleTwo">
                <BorderLine />
                <Mtwo  ref="middltwo"   />
              </div>
            </div>
            <div className="topThree" >
              <div className="topThreeInnerOne">
                <CommonWarning />
                {/*<BorderLine />*/}
                {/*/!*<div className="commonTit"><img src={commontit} />环境实时监测</div>*!/*/}
                {/*<div className="rightTwo">*/}
                  {/*<div className="commonTit"><img src={kaoq} />告警总览</div>*/}
                    {/*<div className="brOne">*/}
                      {/*<RightOne />*/}
                    {/*</div>*/}

                    {/*<div className="brTwo">*/}
                      {/*<RightTwo />*/}
                    {/*</div>*/}


                {/*</div>*/}
              </div>

              <div className="topThreeInnerTwo">
                <BorderLine />
                <RightThreeBar/>
              </div>


            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default PageComponent;
