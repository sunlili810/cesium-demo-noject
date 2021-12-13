import React, { Component } from 'react';
import './index.less';
import { Pagination } from 'antd';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import tabStore from 'store/tablestore';


const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1
    };
    this.player = null;
  }

  componentDidMount() {
    const options = {
      autoplay: true,
      controls: true,
      fluid: true,
      aspectRatio: '16:9'
      // poster: this.props.poster,
      // techOrder: ["flash"],
      //  flash: {
      //  swf: videojsFlash
      // }
    };
    this.player = videojs('video1', options);
    this.player.src({
      // src:'rtmp://msp01.eatuo.com:1935/claalive/C8129684080495802577T20200615200042',
      src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
      type: 'rtmp/flv'
    });

    this.player.load();
  }

  componentWillMount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  fetchSummary(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/huadian/heavy/summary',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({
          summaryData: data.data
        });

        if (that.timer2) {
          clearTimeout(that.timer2);
        }
        // that.timer2 = setTimeout(()=>{
        //  that.fetchSummary();
        // },5*60*1000);
      }
    };
    store.handleNormal(param);
  }

  paginationChange = (page) => {
    console.log(page);
    this.setState({
      current: page
    });
  };


  render() {
    const { videoSrc, id } = this.props;

    return (
      <div className="videoPage">
        <Pagination simple defaultCurrent={1} total={5} defaultPageSize={1} />
        <div data-vjs-player>
          <video id="video1" className="video-js" />
        </div>
      </div>
    );
  }
}

export default PageComponent;
