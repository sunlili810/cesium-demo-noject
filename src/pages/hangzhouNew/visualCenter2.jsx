import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Map, Markers, Marker, Circle, GroundImage, Polygon
} from 'react-amap';
import Layout from 'components/layout/layout';
import './middleMap.less';
// import ltIcon from 'images/location.png';
// import ltIconActive from 'images/locationActive.png';
import tabStore from 'store/tablestore';
import {
  Button, Col, Divider, Form, Input, Row, Select, Slider
} from 'antd';
import modal from 'components/modal/modal';
import myIcon from 'iconfonts/iconfont.js';
import modalConfigLight from './deviceModal/modalConfigLight';
import BottomFloat from './bottomFloat';
import RightFloat from './rightFloat';
// import CommonRightFloat from './commonRight/commonRightFloat';
// import PublicBroadcasting from './commonRight/publicBroadcasting';
// import Emergency from './commonRight/emergency';
// import MsgDelivery from './commonRight/msgDelivery';
// import Monitor from './commonRight/monitor';
// import Environment from './commonRight/environment';
import LeftTee from './leftTree/index1';
import AlamStatics from './alamStatics';

const store = new tabStore();

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [], // path,//[]
      mapCenter: { longitude: 120.31398, latitude: 29.93857 },
      treeData: [],
      baseData: null,
      showFlag: false

    };
    this.markerClick = this.markerClick.bind(this);
    this.instance = null;// 全局地图实例
    this.markerInstance = null;// mark实例

    this.globalMap = null;

    this.tempMarkers = [];
    this.fetchBasedata = this.fetchBasedata.bind(this);
    // 地图设置
    this.amapEvents = {
      created: (instance) => {
        this.instance = instance;
        this.initMap(instance);
      }
    };
    this.markerEvents = {
      created: (markerInstance) => {
        this.markerInstance = markerInstance;
        // this.instance.setFitView();
      },
      click: (MapsOption, marker) => {
        this.markerInstance.map((item, index) => {
          item.render(this.renderMarkerDefault);
        });
        marker.render(this.renderMarkerClick);
        // this.setState({
        //   selectedPosition: marker.getExtData().position
        // });

        this.fetchBasedata(marker.getExtData().position);


        // this.setState({videoSrc:'rtmp://58.200.131.2:1935/livetv/hunantv'});
        // // const {markclickFn}=this.props;
        // const tempVideoSrc ='rtmp://58.200.131.2:1935/livetv/hunantv';
        // markclickFn(tempVideoSrc);

        // const {markerClick}=this.props;
        // markerClick(marker.getExtData().position.deveui);
      }
    };
  }


  componentDidMount() {
    const that = this;
    this.fetchTreeData();
    // this.initMap();
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  initMap(map) {
    // const map = new AMap.Map('container', {
    //   viewMode: '3D',
    //   pitch: 50,
    //   zoom: 11,
    //   center: [120.31398, 29.93857],
    //   mapStyle: 'amap://styles/6742bc63ee7c1aadf17977c31a689aa2'
    // });
    // this.globalMap = map;

    let object3Dlayer;

    window.AMap.plugin(['AMap.Lights','AMap.Object3DLayer','AMap.DistrictSearch', 'AMap.Object3D'], () => {
      console.log(1111);
      // 设置光照
      map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
      map.DirectionLight = new AMap.Lights.DirectionLight([0, 0, 1], [1, 1, 1], 1);

      object3Dlayer = new AMap.Object3DLayer();
      map.add(object3Dlayer);

      new AMap.DistrictSearch({
        subdistrict: 0, // 返回下一级行政区
        extensions: 'all', // 返回行政区边界坐标组等具体信息
        level: 'city' // 查询行政级别为 市
      }).search('朝阳区', (status, result) => {
        const bounds = result.districtList[0].boundaries;
        const height = 5000;
        const color = '#0088ffcc'; // rgba


        // window.AMap.plugin(["AMap.Object3D"],function(){
        const prism = new AMap.Object3D.Prism({
          path: bounds,
          height,
          color
        });

        prism.transparent = true;
        object3Dlayer.add(prism);
        // });

        const text = new AMap.Text({
          text: `${result.districtList[0].name}</br>(${result.districtList[0].adcode})`,
          verticalAlign: 'bottom',
          position: [116.528261, 39.934313],
          height: 5000,
          style: {
            'background-color': 'transparent',
            '-webkit-text-stroke': 'red',
            '-webkit-text-stroke-width': '0.5px',
            'text-align': 'center',
            border: 'none',
            color: 'white',
            'font-size': '24px',
            'font-weight': 600
          }
        });

        text.setMap(map);
      });

    });


  }


  fetchTreeData() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/project/place/reactrestree',
      method: 'post',
      data: {
      },
      successFn(data) {
        that.initMarkers([data]).then(result=>{
            console.log(result);
        });
        //that.initMarkers([data]);
        that.setState({
          treeData: [data],
          markers: that.tempMarkers
          // selectedSite: that.tempMarkers.length ? that.tempMarkers[0].position : '',
          // mapCenter: that.tempMarkers.length ? that.tempMarkers[0].position : ''
        });


        // AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker) => {
        //   console.log(that.globalMap.getCenter());
        //   that.tempMarkers.map((item, index) => {
        //     const marker = new SvgMarker(
        //       new SvgMarker.Shape.IconFont({
        //       // 已经加载了相关的js文件my-iconfont2
        //         symbolJs: myIcon, // './iconfont.js',
        //         icon: 'icon-a-zu2005',
        //         size: 30,
        //         offset: [0, 0]
        //       // fillColor: 'orange'
        //       }), {
        //         map: that.globalMap,
        //         position: [item.position.longitude, item.position.latitude]
        //         // showPositionPoint: true
        //       }
        //     );
        //     marker.setTitle(item.position.devname);
        //     // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        //     marker.setLabel({
        //       offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
        //       content: `<div style='border:0;'>${item.position.devname}</div>`, // 设置文本标注内容
        //       direction: 'top' // 设置文本标注方位
        //     });
        //     marker.content = item.position.devname;
        //
        //     marker.setMap(that.globalMap);
        //     marker.on('click', that.markerClick);
        //   });
        // });
      }
    };
    store.handleNormal(param);
  }

  markerClick(e) {
    const infoWindow = new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      content: '发嘎嘎',
      offset: new AMap.Pixel(16, -45)
    });
    infoWindow.setContent(e.target.content);// e.target.content
    infoWindow.open(this.globalMap, e.target.getPosition());
  }

  async initMarkers(tempMarkets) {
    const tempPath = Array.from(tempMarkets).map((item, index) => {
      if (item.children && item.children.length) {
        this.initMarkers(item.children);
      } else {
        this.tempMarkers.push({
          position: {
            index,
            longitude: item.gpslon !== null ? item.gpslon : 0,
            latitude: item.gpsLat !== null ? item.gpsLat : 0,
            deveui: item.key,
            devname: item.title,
            // devtype: item.devtype,
            lamp_holder: item?.ext?.lamp_holder
          }
        });
      }
    });
    return this.tempMarkers;
  }

  fetchBasedata(position) {
    const that = this;
    if (position === undefined) {

    } else if (position !== 'refresh') {
      this.setState({
        selectedPosition: position
      }, () => {
        const { selectedPosition } = that.state;

        that.markerInstance.map((item) => {
          item.render(that.renderMarkerDefault);
        });
        const currentMarker = that.markerInstance.filter(item => item.getExtData().position.deveui === selectedPosition.deveui);
        currentMarker?.[0]?.render(that.renderMarkerClick);
        const param = {
          loadingFlag: false,
          url: '/appext/lamppost/basedataqry',
          method: 'post',
          data: {
            resid: selectedPosition.deveui
          },
          successFn(data) {
            that.setState({ baseData: data, mapCenter: { longitude: selectedPosition.longitude !== null ? selectedPosition.longitude : 0, latitude: selectedPosition.latitude !== null ? selectedPosition.latitude : 0 } }, () => {
              if (!selectedPosition.treeFlag) {
                that.showDeviceModal(selectedPosition);
              }
            });
          }
        };
        store.handleNormal(param);
      });
    } else {
      const { selectedPosition } = that.state;

      that.markerInstance.map((item) => {
        item.render(that.renderMarkerDefault);
      });
      const currentMarker = that.markerInstance.filter(item => item.getExtData().position.deveui === selectedPosition.deveui);
      currentMarker?.[0]?.render(that.renderMarkerClick);
      const param = {
        loadingFlag: false,
        url: '/appext/lamppost/basedataqry',
        method: 'post',
        data: {
          resid: selectedPosition.deveui
        },
        successFn(data) {
          that.setState({ baseData: data });
        }
      };
      store.handleNormal(param);
    }
  }


  showDeviceModal = (markData) => {
    const that = this;
    this.setState({ showFlag: true });

    const { baseData } = this.state;
    modal.showModel({
      type: 'dialog',
      classname: 'vcentermodal',
      title: '',
      width: '560px',
      background: 'rgba(6,28,54,0.9)',
      Dialog: modalConfigLight,
      ok: (value) => {
        // const params = {
        //   loadingFlag: false,
        //   url: '/parking/spotcfg/add',
        //   method: 'POST',
        //   data: {
        //     ...value
        //   },
        //   successFn() {
        //     that.fetch();
        //   }
        // };
        // store.handleNormal(params);
      },
      cancel: () => {
        that.setState({ showFlag: false });
      },
      param: {
        baseData,
        markData,
        fetchBasedata: that.fetchBasedata
      }
    });
  };


  renderMarkerLayout(extData) {
    // switch (extData.position.devtype) {
    //   case 'claa_lamppost':
    //     return <div><img src={require('images/cangniao_meter.png')} style={{ width: '24px' }} /></div>;
    //     break;
    //   case 'claa_door':
    //     return <div><img src={require('images/claa_door.png')} style={{ width: '24px' }} /></div>;
    //     break;
    //   default:
    //     // return <div ><img src={require(`images/${extData.position.devtype}.png`)} style={{width:'24px'}} /></div>
    //
    //     return <div><img src={ltIcon} style={{ width: '24px' }} /></div>;
    //     break;
    // }
    if (extData.position.index === 0) {
      return (
        <div>
          <div style={{ color: '#fff', marginLeft: '-33px', minWidth: '80px' }}>{extData.position.devname}</div>
          <span className="icon iconfont icon-a-zu2005" style={{ color: '#FA83E0', fontSize: '33px' }} />
          {/* <img src={ltIconActive} style={{ width: '20px' }} /> */}
        </div>
      );
    }
    return (
      <div>
        <div style={{ color: '#fff', marginLeft: '-33px', minWidth: '80px' }}>{extData.position.devname}</div>
        <span className="icon iconfont icon-a-zu2005" style={{ color: '#87ECF7', fontSize: '33px' }} />
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }

  renderMarkerDefault(extData) {
    return (
      <div>
        <div style={{ color: '#fff', marginLeft: '-33px', minWidth: '80px' }}>{extData.position.devname}</div>
        <span className="icon iconfont icon-a-zu2005" style={{ color: '#87ECF7', fontSize: '33px' }} />
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }

  renderMarkerClick(extData) {
    // return <div><img src={ltIconActive} style={{ width: '18px' }} /></div>;
    return (
      <div>
        <div style={{ color: '#fff', marginLeft: '-33px', minWidth: '80px' }}>{extData.position.devname}</div>
        <span className="icon iconfont icon-a-zu2005" style={{ color: '#FA83E0', fontSize: '33px' }} />
        {/* <img src={ltIconActive} style={{ width: '20px' }} /> */}
      </div>
    );
  }

  render() {
    const {
      treeData, baseData, mapCenter, showFlag
    } = this.state;

    return (
      <Layout name="visualCenter">
        <div
          className="midMap"
          style={{
            position: 'absolute', left: 0, top: 0, right: 0, bottom: 0
          }}
        >
          <LeftTee treeData={treeData} fetchBasedata={this.fetchBasedata} />
          {/* <div id="container" style={{ width: '100%', height: '95%' }} /> */}
          <Map
            center={mapCenter}
            amapkey="73047727a9793863ef0ac4af5b682cb5"
            mapStyle="amap://styles/6742bc63ee7c1aadf17977c31a689aa2"
            expandZoomRange
            useAMapUI
            // id="container"
            zoom={6}
            // zooms={[1, 20]}
            events={this.amapEvents}
            plugins={['ControlBar']}
            viewMode="3D"
            pitchEnable
            rotateEnable
            buildingAnimation
            pitch={70}
          >
            <Markers
              markers={this.state.markers}
              events={this.markerEvents}
              render={this.renderMarkerLayout}
            />

          </Map>
          {
            showFlag ? (<BottomFloat baseData={baseData} fetchBasedata={this.fetchBasedata} />) : ''
          }
          <RightFloat />

          {/* 智慧照明 */}
          {/* <CommonRightFloat /> */}

          {/* 公共广播 */}
          {/* <PublicBroadcasting/> */}

          {/* 紧急报警 */}
          {/* <Emergency /> */}

          {/* 信息发布 */}
          {/* <MsgDelivery /> */}

          {/* 视频监控可视化 */}
          {/* <Monitor /> */}

          {/* 环境气象可视化 */}
          {/* <Environment /> */}


        </div>
      </Layout>
    );
  }
}

export default PageComponent;
