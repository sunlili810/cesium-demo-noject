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
  Button, Col, Divider, Form, Input, Row, Select, Slider, Radio
} from 'antd';
import modal from 'components/modal/modal';
import lightIcon from 'images/lightIcon.png';
import modalConfigLight from './deviceModal/modalConfigLight';
import BottomFloat from './bottomFloat';
import RightFloat from './rightFloat';
// import CommonRightFloat from './commonRight/commonRightFloat';
// import PublicBroadcasting from './commonRight/publicBroadcasting';
// import Emergency from './commonRight/emergency';
// import MsgDelivery from './commonRight/msgDelivery';
// import Monitor from './commonRight/monitor';
// import Environment from './commonRight/environment';
import LeftTee from './leftTree/index';
import AlamStatics from './alamStatics';
import Markhover from './markhoverui';

const store = new tabStore();
let count = 0;
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [], // path,//[]gpsLat: "31.995686526654644"gpslon: "119.98878805960753"
      mapCenter: { longitude: 119.98878805960753, latitude: 31.995686526654644 },
      treeData: [],
      treeDataArry: [],
      baseData: null,
      showFlag: false,
      size: '2d'

    };
    this.mapRef = React.createRef();
    this.instance = null;// 全局地图实例
    this.markerInstance = null;// mark实例
    this.tempMarkers = [];
    this.fetchBasedata = this.fetchBasedata.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    // 地图设置
    this.amapEvents = {
      created: (instance) => {
        this.instance = instance;
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
  }

  componentWillUnmount() {
    this.setState = () => false;
    count = 0;
    this.instance = null;
  }

  initMap(map) {
    // var map = new AMap.Map('container', {
    //   viewMode: '3D',
    //   pitch: 50,
    //   zoom: 11,
    //   center: [116.480766, 39.932931]
    // });

    // 设置光照
    map.AmbientLight = new window.AMap.Lights.AmbientLight([1, 1, 1], 0.5);
    map.DirectionLight = new window.AMap.Lights.DirectionLight([0, 0, 1], [1, 1, 1], 1);

    const object3Dlayer = new window.AMap.Object3DLayer();
    map.add(object3Dlayer);

    new AMap.DistrictSearch({
      subdistrict: 0, // 返回下一级行政区
      extensions: 'all', // 返回行政区边界坐标组等具体信息
      level: 'city' // 查询行政级别为 市
    }).search('朝阳区', (status, result) => {
      const bounds = result.districtList[0].boundaries;
      const height = 5000;
      const color = '#0088ffcc'; // rgba
      const prism = new window.AMap.Object3D.Prism({
        path: bounds,
        height,
        color
      });

      prism.transparent = true;
      object3Dlayer.add(prism);

      const text = new window.AMap.Text({
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
  }


  fetchTreeData() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/project/place/reactrestree',
      method: 'post',
      data: {
        devtype: ''
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
            if(treeFlag){
              that.setState({ baseData: data,
                mapCenter: { longitude: selectedPosition.longitude !== null ? that.bgps_gps(selectedPosition.longitude, selectedPosition.latitude).lng : 0, latitude: selectedPosition.latitude !== null ? that.bgps_gps(selectedPosition.longitude, selectedPosition.latitude).lat : 0 },
              }, () => {
                if (!selectedPosition.treeFlag) {
                  that.showDeviceModal(selectedPosition);
                }
              });
            }else{
              that.setState({ baseData: data,
                //mapCenter: { longitude: selectedPosition.longitude !== null ? that.bgps_gps(selectedPosition.longitude, selectedPosition.latitude).lng : 0, latitude: selectedPosition.latitude !== null ? that.bgps_gps(selectedPosition.longitude, selectedPosition.latitude).lat : 0 },
              }, () => {
                if (!selectedPosition.treeFlag) {
                  that.showDeviceModal(selectedPosition);
                }
              });
            }

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
      width: '600px',
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
    // console.log(extData);
    if (extData.position.index === 1) {
      return (
        <div>
          <div style={{
            color: '#D6D6D6', marginLeft: '-33px', minWidth: '80px', fontSize: '12px'
          }}
          >
             {/*{extData.position.devname}*/}

          </div>
          <span
            // className="icon iconfont icon-a-zu2005"
            style={{ color: '#22B3C4', fontSize: '33px' }}
          >
            <img src={lightIcon} alt="" style={{ width: '46px' }} />
          </span>
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
           {/*{extData.position.devname}*/}
        </div>
        <span
          // className="icon iconfont icon-a-zu2005"
          style={{ color: '#22B3C4', fontSize: '33px' }}
        >
          <img src={lightIcon} alt="" style={{ width: '46px' }} />
        </span>
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }
  renderMarkerDefault(extData) {
    return (
      <div>
        <div className="popDiv"
        >
          {/*{extData.position.devname}*/}
        </div>
        <span
          // className="icon iconfont icon-a-zu2005"
          style={{ color: '#22B3C4', fontSize: '33px' }}
        >
          <img src={lightIcon} alt="" style={{ width: '46px' }} />
        </span>
        {/* <img src={ltIcon} style={{ width: '20px' }} /> */}
      </div>
    );
  }
  renderMarkerDefaultHover(extData) {
    return (
      <div>
        <div className="popDiv"
        >
           {/*{extData.position.devname}*/}
          <Markhover type='lightonly' lightdev={extData.position.deveui} lightdevname={extData.position.devname} />
        </div>
        <span
          // className="icon iconfont icon-a-zu2005"
          style={{ color: '#22B3C4', fontSize: '33px' }}
        >
          <img src={lightIcon} alt="" style={{ width: '46px' }} />
        </span>
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
           {/*{extData.position.devname}*/}
        </div>
        <span
          // className="icon iconfont icon-a-zu2005"
          style={{ color: '#22B3C4', fontSize: '33px' }}
        >
          <img src={lightIcon} alt="" style={{ width: '46px' }} />
        </span>
      </div>
    );
  }

  handleSizeChange=(e) => {
    this.setState({ size: e.target.value });
    // this.instance.reRender();
  }

  render() {
    const {
      treeData, treeDataArry, baseData, mapCenter, showFlag, size, markers
    } = this.state;
    return (
      <Layout name="visualCenter">
        <div
          className="midMap"
          style={{
            position: 'absolute', left: 0, top: 0, right: 0, bottom: 0
          }}
        >
          {/*<LeftTee treeData={treeData} treeDataArry={treeDataArry} fetchBasedata={this.fetchBasedata} />*/}
          <LeftTee treeData={treeData}  fetchBasedata={this.fetchBasedata} />
          {/* <div id="container" style={{ width: '100%', height: '95%' }} /> */}

          <div className="mapDiv2" style={{ display: size === '2d' ? 'block' : 'none', height: '100%' }}>
            <Map
              ref={this.mapRef}
              center={mapCenter}
              amapkey="73047727a9793863ef0ac4af5b682cb5"
              mapStyle="amap://styles/6742bc63ee7c1aadf17977c31a689aa2"
              expandZoomRange
              useAMapUI
              // id="container"
              zoom={17}
              // zooms={[1, 20]}
              events={this.amapEvents}
              pitch={70}
            >
              <Markers

                markers={markers}
                events={this.markerEvents}
                render={this.renderMarkerLayout}
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
                // zooms={[1, 20]}
                  events={this.amapEvents}
                // plugins={['ControlBar']}
                  viewMode="3D"
                  pitchEnable

                // buildingAnimation
                  pitch={50}
                  status={{
                    rotateEnable: true
                  }}
                >
                  <Markers
                    markers={markers}
                    events={this.markerEvents}
                    render={this.renderMarkerLayout}
                  />
                </Map>
              ) : ''
            }

          </div>


          {
            showFlag ? (<BottomFloat baseData={baseData} fetchBasedata={this.fetchBasedata} />) : ''
          }

          <div
            className="viewDiv btnBg"
            style={{
              position: 'fixed', right: '10px', top: '86px', zIndex: '999'
            }}
          >
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button type="primary" size="small" value="2d">2D</Radio.Button>
              <Radio.Button type="primary" size="small" value="3d">3D</Radio.Button>
            </Radio.Group>
          </div>
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
