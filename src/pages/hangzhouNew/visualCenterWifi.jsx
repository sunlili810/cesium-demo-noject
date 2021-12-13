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
  Button, Col, Divider, Form, Input, Radio, Row, Select, Slider
} from 'antd';
import modal from 'components/modal/modal';
import modalConfigWifi from './deviceModal/modalConfigWifi';
// import BottomFloat from './bottomFloat';
// import RightFloat from './rightFloat';
// import CommonRightFloat from './commonRight/commonRightFloat';
import PublicWifi from './commonRight/publicWifi';
// import Emergency from './commonRight/emergency';
// import MsgDelivery from './commonRight/msgDelivery';
// import Monitor from './commonRight/monitor';
// import Environment from './commonRight/environment';
import LeftTee from './leftTree/index';
import Markhover from './markhoverui';

const store = new tabStore();
const randomPath = () => ({
  longitude: 100 + Math.random() * 50,
  latitude: 10 + Math.random() * 40
});
let count = 0;

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [], // path,//[]
      mapCenter: { longitude: 119.98878805960753, latitude: 31.995686526654644 },
      path: Array(4).fill(true).map(randomPath),
      treeData: [],
      treeDataArry: [],
      baseData: null,
      wifiId: '',
      size: '2d'

    };
    this.instance = null;// 全局地图实例
    this.markerInstance = null;// mark实例
    this.tempMarkers = [];
    this.fetchBasedata = this.fetchBasedata.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    // 地图设置
    this.amapEvents = {
      created: (instance) => {
        this.instance = instance;
        // this.initMap(instance);
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
        this.fetchBasedata(marker.getExtData().position);


        // this.setState({videoSrc:'rtmp://58.200.131.2:1935/livetv/hunantv'});
        // // const {markclickFn}=this.props;
        // const tempVideoSrc ='rtmp://58.200.131.2:1935/livetv/hunantv';
        // markclickFn(tempVideoSrc);

        // const {markerClick}=this.props;
        // markerClick(marker.getExtData().position.deveui);
      },
      mouseover: (e, marker) => {
        marker.render(this.renderMarkerDefaultHover);
      },
      mouseout: (e, marker) => {
        marker.render(this.renderMarkerLayout);
      }
    };
  }


  componentDidMount() {
    this.fetchTreeData();
    //this.fetchTreeDataArry();
    // this.initMap();
    // this.showDeviceModal();
  }

  componentWillUnmount() {
    this.setState = () => false;
    count = 0;
    this.instance = null;
  }


  fetchTreeData() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/project/place/reactrestree',
      method: 'post',
      data: {
        devtype: 'claa_public_wifi'
      },
      successFn(data) {
        that.initMarkers([data]);
        that.setState({
          treeData: [data],
          markers: that.tempMarkers,
          // selectedSite: that.tempMarkers.length ? that.tempMarkers[0].position : '',
          mapCenter: that.tempMarkers.length ? that.tempMarkers[0].position : { longitude: 119.98878805960753, latitude: 31.995686526654644 }
        });
      }
    };
    store.handleNormal(param);
  }

  fetchTreeDataArry() {
    const that = this;
    const param = {
      loadingFlag: false,
      // url: '/project/project/place/reactrestree',
      url: '/appm/grpm/groupTreeListWithSon',
      method: 'post',
      data: {
        // devtype: ''
      },
      successFn(data) {
       // that.initMarkers([data]);
        that.setState({
          treeDataArry: [data]
          // markers: that.tempMarkers,
          // selectedSite: that.tempMarkers.length ? that.tempMarkers[0].position : '',
          // mapCenter: that.tempMarkers.length ? that.tempMarkers[0].position : { longitude: 119.98878805960753, latitude: 31.995686526654644 }
        });
      }
    };
    store.handleNormal(param);
  }

  bgps_gps(bd_lng, bd_lat) {
    const X_PI = Math.PI * 3000.0 / 180.0;
    const x = bd_lng - 0.0065;
    const y = bd_lat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    const gg_lng = z * Math.cos(theta);
    const gg_lat = z * Math.sin(theta);
    return { lng: gg_lng, lat: gg_lat };
  }

  initMarkers(tempMarkets) {
    const tempPath = Array.from(tempMarkets).map((item, index) => {
      if (item.children && item.children.length) {
        this.initMarkers(item.children);
      } else if (item.type === 1) {
        count++;
        this.tempMarkers.push({
          position: {
            index: count,
            longitude: item.gpslon !== null ? this.bgps_gps(item.gpslon, item.gpsLat).lng : 0,
            latitude: item.gpsLat !== null ? this.bgps_gps(item.gpslon, item.gpsLat).lat : 0,
            deveui: item.key,
            devname: item.title,
            // devtype: item.devtype,
            lamp_holder: item?.ext?.lamp_holder
          }
        });
      }
    });
  }

  fetchBasedata(position,treeFlag) {
    if (position === undefined) {
      return;
    }
    this.markerInstance.map((item) => {
      item.render(this.renderMarkerDefault);
    });
    const currentMarker = this.markerInstance.filter(item => item.getExtData().position.deveui === position.deveui);
    currentMarker?.[0]?.render(this.renderMarkerClick);

    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appext/lamppost/basedataqry',
      method: 'post',
      data: {
        resid: position.deveui
      },
      successFn(data) {
        if(treeFlag){
          that.setState({
            wifiId: position.deveui,
            baseData: data,
            mapCenter: {
              longitude: position.longitude !== null ? that.bgps_gps(position.longitude, position.latitude).lng  : 0,
              latitude: position.latitude !== null ? that.bgps_gps(position.longitude, position.latitude).lat : 0
            }
          }, () => {
            if (!position.treeFlag) {
              that.showDeviceModal(position);
            }
          });
        }else{
          that.setState({
            wifiId: position.deveui,
            baseData: data,
          }, () => {
            if (!position.treeFlag) {
              that.showDeviceModal(position);
            }
          });
        }
        // that.setState({
        //   wifiId: position.deveui,
        //   baseData: data,
        //   mapCenter: {
        //     longitude: position.longitude !== null ? that.bgps_gps(position.longitude, position.latitude).lng  : 0,
        //     latitude: position.latitude !== null ? that.bgps_gps(position.longitude, position.latitude).lat : 0
        //   }
        // }, () => {
        //   if (!position.treeFlag) {
        //     that.showDeviceModal(position);
        //   }
        // });
      }
    };
    store.handleNormal(param);
  }


  showDeviceModal = (markData) => {
    const that = this;
    const { baseData } = this.state;
    modal.showModel({
      type: 'dialog',
      title: '',
      width: '560px',
      background: 'rgba(6,28,54,0.9)',
      Dialog: modalConfigWifi,
      ok: (value) => {
        const params = {
          loadingFlag: false,
          url: '/parking/spotcfg/add',
          method: 'POST',
          data: {
            ...value
          },
          successFn() {
            that.fetch();
          }
        };
        store.handleNormal(params);
      },
      param: {
        baseData,
        markData
        // fetchBasedata: that.fetchBasedata
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
    if (extData.position.index === 1) {
      return (
        <div>
          <div style={{
            color: '#D6D6D6', marginLeft: '-33px', minWidth: '80px', fontSize: '12px'
          }}
          >
            {/*{extData.position.devname}WIFI*/}
          </div>
          <span className="icon iconfont icon-a-zu1860" style={{ color: '#22B3C4', fontSize: '24px' }} />
          {/* <img src={ltIconActive} style={{ width: '20px' }} /> */}
        </div>
      );
    }
    return (
      <div>
        <div style={{
          color: '#D6D6D6', marginLeft: '-33px', minWidth: '80px', fontSize: '12px'
        }}
        >
          {/*{extData.position.devname}WIFI*/}
        </div>
        <span className="icon iconfont icon-a-zu1860" style={{ color: '#22B3C4', fontSize: '24px' }} />
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }

  renderMarkerDefault(extData) {
    return (
      <div>
        <div style={{
          color: '#D6D6D6', marginLeft: '-33px', minWidth: '80px', fontSize: '12px'
        }}
        >
          {/*{extData.position.devname}WIFI*/}
        </div>
        <span className="icon iconfont icon-a-zu1860" style={{ color: '#22B3C4', fontSize: '24px' }} />
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }

  renderMarkerDefaultHover(extData) {
    return (
      <div>
        <div className="popDiv"
        >
          <Markhover type='wifi' lightdev={extData.position.deveui} lightdevname={extData.position.devname} />
        </div>
        <span className="icon iconfont icon-a-zu1860" style={{ color: '#22B3C4', fontSize: '24px' }} />
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }


  renderMarkerClick(extData) {
    // return <div><img src={ltIconActive} style={{ width: '18px' }} /></div>;
    return (
      <div>
        <div style={{
          color: '#D6D6D6', marginLeft: '-33px', minWidth: '80px', fontSize: '12px'
        }}
        >
          {/*{extData.position.devname}WIFI*/}
        </div>
        <span className="icon iconfont icon-a-zu1860" style={{ color: '#22B3C4', fontSize: '24px' }} />
        {/* <img src={ltIconActive} style={{ width: '20px' }} /> */}
      </div>
    );
  }

  handleSizeChange=(e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const {
      treeData, treeDataArry,mapCenter, wifiId, size
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

          <div className="mapDiv2" style={{ display: size === '2d' ? 'block' : 'none', height: '100%' }}>
            <Map
              center={mapCenter}
              amapkey="73047727a9793863ef0ac4af5b682cb5"
              mapStyle="amap://styles/6742bc63ee7c1aadf17977c31a689aa2"
              expandZoomRange
              useAMapUI
              // id="container"
              zoom={17}
              events={this.amapEvents}
              // plugins={['ControlBar']}
              // viewMode="3D"
              // pitchEnable
              // rotateEnable
              // buildingAnimation
              // pitch={70}
            >
              <Markers
                markers={this.state.markers}
                events={this.markerEvents}
                render={this.renderMarkerLayout}
                // useCluster
              />
            </Map>
          </div>

          <div
            className="mapDiv"
            style={{
              display: size === '3d' ? 'block' : 'none', height: '100%'
            }}
          >
            {
              size === '3d' ? (
                <Map
                  center={mapCenter}
                  amapkey="73047727a9793863ef0ac4af5b682cb5"
                  mapStyle="amap://styles/6742bc63ee7c1aadf17977c31a689aa2"
                  expandZoomRange
                  useAMapUI
                // id="container"
                  zoom={17}
                  events={this.amapEvents}
                // plugins={['ControlBar']}
                  viewMode="3D"
                  pitchEnable
                // rotateEnable
                // buildingAnimation
                  pitch={50}
                >
                  <Markers
                    markers={this.state.markers}
                    events={this.markerEvents}
                    render={this.renderMarkerLayout}
                  />
                </Map>
              ) : ''
            }

          </div>



          <div
            className="viewDiv"
            style={{
              position: 'fixed', right: '10px', top: '86px', zIndex: '999'
            }}
          >
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button type="primary" size="small" value="2d">2D</Radio.Button>
              <Radio.Button type="primary" size="small" value="3d">3D</Radio.Button>
            </Radio.Group>
          </div>

          {/* <BottomFloat baseData={baseData} /> */}
          {/* <RightFloat /> */}

          {/* 智慧照明 */}
          {/* <CommonRightFloat /> */}

          {/* 公共广播 */}
          {/* <PublicBroadcasting /> */}

          {/* 紧急报警 */}
          {/* <Emergency /> */}

          {/* 信息发布 */}
          {/* <MsgDelivery /> */}

          {/* 视频监控可视化 */}
          {/* <Monitor /> */}

          {/* 环境气象可视化 */}
          {/* <Environment /> */}

          {/* 公共WIFI */}
          <PublicWifi wifiId={wifiId} />


        </div>
      </Layout>
    );
  }
}

export default PageComponent;