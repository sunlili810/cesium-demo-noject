import React, { Component } from 'react';
import './index.less';
//import playIcon from 'images/playIcon.png';
//import stopIcon from 'images/stopIcon.png';
//import locationTit from 'images/locationTit.png';
import sbei from 'images/ic_01.png';
//import HistoryVideo from 'pages/pDesc/warningStation';
//import MidMap from './mapLocation';
//import Query from './query';
import BorderLine from 'pages/pDesc/borderLine';
import RightOne from '../pDesc/rightOne';
import RightThreeBar from '../pDesc/rightThreeBar';
import RightTwoPie from '../pDesc/rightTwoPie';
import WarningTable from '../warningTable/index';



class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc:''
    };
  }
  componentDidMount(){
  }
  componentWillMount() {
  }
  fetchList(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/alarm/current/list',
      method: 'GET',
      data: {
        deveui
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


  render() {
    const {videoSrc}=this.state;
    return (
      <div className="videoNav">
        {/*<Query />*/}
        <div className="cont">
          <div className="topWrap">
            <div className="topOne">
             <div className="topOneInner">
                <BorderLine />
                <div className="commonTit"><img src={sbei} />告警总览</div>
                <div className="liquidWar">
                  <RightOne id="liquid3" refresh={true} />
                </div>
                <div className="pieWar">
                  <RightTwoPie pid1="pie2" pid2="pie3" />
                </div>
             </div>
              <div className="barWar">
                <BorderLine />
                <RightThreeBar />
              </div>
            </div>


            <div className="topTwo">
              <BorderLine />
              <div className="commonTit"><img src={sbei} />告警异常</div>
              <WarningTable />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
