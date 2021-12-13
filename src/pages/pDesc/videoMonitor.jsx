import React, { Component } from 'react';
import './videoMonitor.less';
import Videojs from 'video.js';
import 'video.js/dist/video-js.css';
// 添加hls插件，以保证播放m3u8格式的视频
import 'videojs-contrib-hls';
window.videojs = Videojs;



class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.player = null;
  }

  // 初始化内容
  UNSAFE_componentWillReceiveProps(props) {
    try {
      const { videoSrc } = props;
      // if (!videoSrc || videoSrc === this.props.videoSrc) return;
      this.initVideo(videoSrc);
    } catch (error) {
      console.log(error);
    }
  }


  componentWillUnmount() {
    // 销毁播放器
    if (this.player) {
      this.player.dispose();
    }
  }

  // 初始化
  initVideo(src) {
    const { id } = this.props;
    this.player = Videojs(id, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      // width:800,
      height: 580,
      aspectRatio: '16:9',
      fluid: true
    });

    this.player.src({ src });
  }


  render() {
    const { id } = this.props;

    return (
      <div className="videoMonitor" style={{ width: '98%', height: '85%' }}>

        <div data-vjs-player style={{ width: '100%', height: '100%' }}>
          <video id={id} className="video-js" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    );
  }
}

export default PageComponent;
