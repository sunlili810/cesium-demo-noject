import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Map, Markers, Marker, Circle, GroundImage, Polygon
} from 'react-amap';
import './middleMap.less';
import ltIcon from 'images/mapIcon.png';
import ltIconActive from 'images/locationActive.png';
import tabStore from 'store/tablestore';

const store = new tabStore();
const alphabet = 'ABCDEFGHIJKLMNOP'.split('');
const randomMarker = len => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20
    },
    myLabel: alphabet[idx],
    myIndex: idx + 1
  }))
);

const randomPath = () => ({
  longitude: 100 + Math.random() * 50,
  latitude: 10 + Math.random() * 40
});
const path = [
  { position: { longitude: 117.186514, latitude: 34.184958, deveui: '1' } },
  { position: { longitude: 117.206636, latitude: 34.185436, deveui: '2' } },
  { position: { longitude: 117.277063, latitude: 34.208606, deveui: '3' } },
  { position: { longitude: 117.226471, latitude: 34.18018, deveui: '4' } }
];
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [], // path,//[]
      mapCenter: { longitude: 120.21201, latitude: 30.2084 },
      path: Array(4).fill(true).map(randomPath),
      videoSrc: '',
      selectedSite: ''
    };
    this.instance = null;// 全局地图实例
    this.markerInstance = null;// mark实例
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
        this.setState({
          selectedSite: marker.getExtData().position.devname
        });
      }
    };
  }

  componentDidMount() {
    // this.fetch();
  }

  componentWillMount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/dev/list',
      method: 'get',
      data: {

      },
      successFn(data) {
        const tempPath = Array.from(data.data).map((item, index) => ({
          position: {
            index,
            longitude: item.gpslng,
            latitude: item.gpslat,
            deveui: item.deveui,
            devname: item.devname,
            devtype: item.devtype
          }
        }));


        that.setState({
          markers: tempPath,
          selectedSite: tempPath.length ? tempPath[0].position.devname : '',
          mapCenter: tempPath.length ? tempPath[0].position : ''
        });

        if (that.timer1) {
          clearTimeout(that.timer1);
        }
        that.timer1 = setTimeout(() => {
          that.fetch();
        }, 5 * 60 * 1000);
      }
    };
    store.handleNormal(param);
  }

  renderMarkerLayout(extData) {
    // switch (extData.position.devtype) {
    //   case 'cangniao_meter':
    //     return <div><img src={require('images/cangniao_meter.png')} style={{ width: '24px' }} /></div>;
    //     break;
    //   case 'claa_door':
    //     return <div><img src={require('images/claa_door.png')} style={{ width: '24px' }} /></div>;
    //     break;
    //
    //   default:
    //     // return <div ><img src={require(`images/${extData.position.devtype}.png`)} style={{width:'24px'}} /></div>
    //
    //     return <div><img src={ltIcon} style={{ width: '24px' }} /></div>;
    //     break;
    // }

    return (
      <div>
        <img src={ltIcon} style={{ width: '33px' }} />
      </div>
    );
  }

  renderMarkerDefault(extData) {
    return (
      <div>
        <img src={ltIcon} style={{ width: '33px' }} />
      </div>
    );
  }

  renderMarkerClick(extData) {
    return (
      <div>
        <img src={ltIconActive} style={{ width: '33px' }} />
      </div>
    );
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
  render() {
    const { projectData } = this.props;
    const tempMark = [{
      position: {
        longitude: this.bgps_gps(projectData?.gpslng, projectData?.gpslat).lng,
        latitude: this.bgps_gps(projectData?.gpslng, projectData?.gpslat).lat,
        projectid: projectData?.projectid
      }
    }];
    return (
      <div className="midMap" style={{ position: 'relative' }}>

        <Map
          center={tempMark?.[0]?.position}
          amapkey="73047727a9793863ef0ac4af5b682cb5"
          mapStyle="amap://styles/6742bc63ee7c1aadf17977c31a689aa2"
          expandZoomRange
          useAMapUI
          zoom={17}
          events={this.amapEvents}
        >
          <Markers
            markers={tempMark} // {this.state.markers}
            events={this.markerEvents}
            render={this.renderMarkerLayout}
            useCluster

          />
          {/* <Polygon */}
          {/* style={{ */}
          {/* //path: path, */}
          {/* strokeColor: "#10FFDB", */}
          {/* strokeWeight: 2, */}
          {/* strokeOpacity: 0.8, */}
          {/* fillOpacity: 0.08, */}
          {/* fillColor: '#10FFDB', */}
          {/* zIndex: 50, */}
          {/* }} */}
          {/* path={this.state.path} */}

          {/* /> */}
        </Map>

      </div>
    );
  }
}

export default PageComponent;