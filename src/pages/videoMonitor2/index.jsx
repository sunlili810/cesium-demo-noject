import React, { Component } from 'react';
import { observer } from 'mobx-react';
import modal from 'components/modal/modal';
import tabstore from 'store/tablestore';
import {
  Table, Modal, Divider,Button, Radio, Image,message
} from 'antd';
import './index.less';
import phoneIcon from 'images/phoneIcon.png';


import Flvjs from 'flv.js';

const store = new tabstore();

//let flvPlayer;
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        videoList:[],
        resid:null,
        statusObj:null
    };
    this.loadingDialog = null;
  }

    componentDidUpdate(nextProps, prevState) {
        if (nextProps.currentResid !== this.props.currentResid) {
            this.fetch(this.props.currentResid);
            this.fetchStatus(this.props.currentResid);
        }
    }
    componentDidMount() {
        const {greenhouseList,currentResid}=this.props;
        // this.fetch(greenhouseList?.[0].resid);
        // this.fetchStatus(greenhouseList?.[0].resid);

        this.fetch(currentResid);
        this.fetchStatus(currentResid);
    }

    fetch = (resid) => {
        const that = this;
        this.setState({
            resid
        });
        this.distroyFn();
        const queryParam = {
            loadingFlag: false,
            url: '/appext/farm/disaster/startipcs',
            method: 'post',
            data: {
                resid:resid,//'R1623399625728653'//
            },
            successFn(data){

                that.setState({
                    videoList:data.appdata
                },()=>{
                    data?.appdata?.length? data.appdata.map((item,index)=>{
                        that.fetchKeepAlive(item.devid,`timer${index+1}`);
                        that.initFlv(`video${index+1}`,item.url,item.devid);

                      }):'';
                });

            }
        };
        store.handleNormal(queryParam);
    };
    fetchKeepAlive = (videoId,timer) => {
        const that = this;
        const queryParam = {
            loadingFlag: false,
            url: '/appext/vediomoni/keepalive',
            method: 'post',
            data: {
                devid:videoId
            },
            successFn(data){
                if(window[`${timer}`]){
                    clearTimeout(window[`${timer}`])
                }
                window[`${timer}`]=setTimeout(()=>{
                    that.fetchKeepAlive(videoId,timer);
                },3000)
            }
        };
        store.handleNormal(queryParam);
    };

    initFlv = (id,tempurl) => {
        const {videoList}=this.state;
            if (Flvjs.isSupported()) {
                var videoElement = document.getElementById(id);
                 this[`flvPlayer${id}`] = Flvjs.createPlayer({
                    type: 'flv',// 指定视频类型
                    url: tempurl,//videoList?.[0]?.url,//'http://msp01.eatuo.com:8035/live?port=1935&app=claalive&stream=C5579363874026061084T20210611161633', // 指定流链接
                    isLive: true,// 开启直播
                    hasAudio: false,  // 关闭声音
                    aspectRatio:'16:9',
                    height: 475,
                    // cors: true,  // 开启跨域访问
                    // duration:0,
                    // currentTime:0,
                }
                ,{
                    // autoCleanupSourceBuffer:true,//对SourceBuffer进行自动清理
                    // autoCleanupMaxBackwardDuration:12,//    当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
                    // autoCleanupMinBackwardDuration:8,//指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
                    // enableStashBuffer: true, //关闭IO隐藏缓冲区
                    // enableWorker: true, // 是否多线程工作
                    // isLive: true,
                    // lazyLoad: false,
                    //reuseRedirectedURL: true, //重用301/302重定向url，用于随后的请求，如查找、重新连接等。
                }
                );
                this[`flvPlayer${id}`].attachMediaElement(videoElement);
                this[`flvPlayer${id}`].load();
                this[`flvPlayer${id}`].play();
                 //this.fetchKeepAlive(videoList?.[0]?.devid);


                 this[`timer${id}`] =setInterval(() => { // ->注意：这里的定时器，在中断视频时，要清理哦
                    if (this[`flvPlayer${id}`]?.buffered && this[`flvPlayer${id}`]?.buffered?.length) {
                        let end = this[`flvPlayer${id}`].buffered.end(0);//获取当前buffered值
                        let diff = end - this[`flvPlayer${id}`].currentTime;//获取buffered与currentTime的差值
                        if (diff >= 60) {//如果差值大于等于60s 手动跳帧 这里可根据自身需求来定
                            //单个视频用
                            // flvPlayer.currentTime = end;//手动跳帧
                            // flvPlayer.currentTime = flvPlayer.buffered.end(0);//手动跳帧

                            //多个视频用
                            clearInterval(this[`timer${id}`])
                            this[`flvPlayer${id}`].pause();
                            this[`flvPlayer${id}`].unload();
                            this[`flvPlayer${id}`].detachMediaElement();
                            this[`flvPlayer${id}`].destroy();
                            this[`flvPlayer${id}`]= null;
                            //重新加载当前停止的视频流，根据个人的方法来配置
                        }
                    }
                }, 1000);



                this[`flvPlayer${id}`].on(Flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
                    if(this.timer4){
                        clearTimeout(this.timer4)
                    }
                   this.timer4= setTimeout(()=>{
                        //视频出错后销毁重新创建
                        if (this[`flvPlayer${id}`]) {
                            clearInterval(this[`timer${id}`])
                            this[`flvPlayer${id}`].pause();
                            this[`flvPlayer${id}`].unload();
                            this[`flvPlayer${id}`].detachMediaElement();
                            this[`flvPlayer${id}`].destroy();
                            this[`flvPlayer${id}`]= null;
                            //重新加载当前停止的视频流，根据个人的方法来配置
                            //this.initFlv("video1")
                            this.fetch(this.state.resid);
                        }
                    },10*60*1000)


                });


            }

    }

    componentWillUnmount() {
        this.distroyFn();
    }
    distroyFn(){
        if( window.timer1){
            clearTimeout(window.timer1);
        }
        if( window.timer2){
            clearTimeout(window.timer2);
        }
        if( window.timer3){
            clearTimeout(window.timer3);
        }
        if(this.timer4){
            clearTimeout(this.timer4)
        }

        if (this.flvPlayervideo1) {
            this.flvPlayervideo1.pause();
            this.flvPlayervideo1.unload();
            this.flvPlayervideo1.detachMediaElement();
            this.flvPlayervideo1.destroy();
            this.flvPlayervideo1= null;
        }
        if (this.flvPlayervideo2) {
            this.flvPlayervideo2.pause();
            this.flvPlayervideo2.unload();
            this.flvPlayervideo2.detachMediaElement();
            this.flvPlayervideo2.destroy();
            this.flvPlayervideo2= null;
        }
        if (this.flvPlayervideo3) {
            this.flvPlayervideo3.pause();
            this.flvPlayervideo3.unload();
            this.flvPlayervideo3.detachMediaElement();
            this.flvPlayervideo3.destroy();
            this.flvPlayervideo3= null;
        }
    }

    fetchStatus(tresid) {
        const that = this;
        const params = {
            loadingFlag: false,
            url: '/appext/farm/disaster/summary',
            method: 'post',
            data: {
                resid: tresid
            },
            successFn(data) {
                that.setState({
                    statusObj:data.appdata
                })
            }
        };
        store.handleNormal(params);
    }
  fetchCanmeraList(type) {
   const that = this;
   const {resid}=this.state;
   const params = {
     loadingFlag: false,
     url: '/appext/farm/disaster/control',
     method: 'post',
     data: {
       resid: resid,
       type:1//type
     },
     successFn(data) {
         message.success('指令发送成功！');
     }
   };
   store.handleNormal(params);
  }
  render() {
    const { videoList,statusObj } = this.state;

    return (
        <div className="videoMonitor">
          <div className="vmTop">
            <div className="vmTopL">
                <div className="tit">智能控制</div>
                <div className="vmControlDiv">
                    <div className="listOne">
                        <div className="iconDiv">
                            <div className="tit">遮阳棚</div>
                            <div className="iconF"><span className="icon iconfont">&#xeb25;</span></div>
                        </div>
                        <div className="controlDiv">
                            <div className="time">已开启{statusObj?.sunshade?.workhours}小时</div>
                            <div className="status">当前状态 <b>{statusObj?.sunshade?.status === 0 ? '收起':'展开'}</b></div>
                            <div className="ControlBtn"> <Button onClick={this.fetchCanmeraList.bind(this,1)}>{statusObj?.sunshade?.status === 0?'点击开启':'点击放下' }</Button></div>
                        </div>
                    </div>


                    {/*<div className="listOne listOneWind">*/}
                    {/*    <div className="iconDiv">*/}
                    {/*        <div className="tit">通风风机</div>*/}
                    {/*        <div className="iconF"><span className="icon iconfont">&#xe623;</span></div>*/}
                    {/*    </div>*/}
                    {/*    <div className="controlDiv">*/}
                    {/*        <div className="time">已开启4.2小时</div>*/}
                    {/*        <div className="status">当前状态 <b>收起</b></div>*/}
                    {/*        <div className="ControlBtn"> <Button>点击放下</Button></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    {/*<div className="listOne listOneDg">*/}
                    {/*    <div className="iconDiv">*/}
                    {/*        <div className="tit">滴灌系统</div>*/}
                    {/*        <div className="iconF"><span className="icon iconfont">&#xeb36;</span></div>*/}
                    {/*    </div>*/}
                    {/*    <div className="controlDiv">*/}
                    {/*        <div className="time">已开启4.2小时</div>*/}
                    {/*        <div className="status">当前状态 <b>收起</b></div>*/}
                    {/*        <div className="ControlBtn"> <Button>点击放下</Button></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
            <div className="vmTopR">
                <div className="rightConT">
                    <div className="tit">自动调度策略</div>
                    <div className="statics">
                        <div className="staticOne">
                            <div>遮阳棚</div>
                            <div className="rangeClock">
                            {/*每天8:30-15:30*/}
                                {
                                    statusObj?.sunshade?.policies.map((item,index)=>{
                                        return (<div key={index} className="tip">{item.remark}</div>)
                                    })
                                }
                            </div>
                        </div>
                        <div className="staticOne">
                            <div>通风风机</div>
                            <div className="rangeClock">开启时段1：<br/>每天8:30-15:30<br/>开启时段1：<br/>每天8:30-15:30</div>
                        </div>
                        {/*<div className="staticOne">*/}
                        {/*    <div>滴灌系统</div>*/}
                        {/*    <div className="rangeClock">开启时段1：<br/>每天8:30-15:30</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
          </div>
          <div className="vmBottom">
              <div className="tit">实时监控</div>
              <div className="vmBCont">
                  <div className="vmBContL" style={{height:'475px'}}>

                      {/*<div style={{ width: '100%', height: '100%' }}>*/}
                          {
                              videoList?.length>=1?(
                                <video
                                  className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
                                  id="video1"
                                  controls
                                  autoPlay
                                  muted
                                  style={{ width: '100%', height: '96%', 'objectFit': 'fill' }}
                                />
                              ):(<img src={phoneIcon} alt="" />)
                          }


                      {/*</div>*/}

                  </div>
                  <div className="vmBContR">
                      <div className="vmBContROne">
                          {
                              videoList?.length>=2?(<video
                                id="video2"
                                controls
                                autoPlay
                                muted
                                style={{ width: '100%', height: '96%', 'objectFit': 'fill' }}
                              />):(<img src={phoneIcon} alt="" />)
                          }

                      </div>
                      <div className="vmBContRTwo">
                          {
                              videoList?.length>=3?(<video
                                id="video3"
                                controls
                                autoPlay
                                muted
                                style={{ width: '100%', height: '96%', 'objectFit': 'fill' }}
                              />):(<img src={phoneIcon}  alt="" />)
                          }

                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
  }
}
export default PageComponent;
