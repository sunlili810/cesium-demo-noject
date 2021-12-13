import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Map, Markers,Marker, Circle, GroundImage, Polygon  } from 'react-amap';
import 'pages/pDesc/middleMap.less';
import ltIcon from 'images/location.png';
import ltIconActive from 'images/locationActive.png';




const alphabet = 'ABCDEFGHIJKLMNOP'.split('');
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    myLabel: alphabet[idx],
    myIndex: idx + 1,
  }))
);


@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: randomMarker(10)

    };
    this.instance = null;// 全局地图实例
    // 地图设置
    this.amapEvents  = {
      created: (instance) => {
        this.instance = instance;

      }
    };
    this.markerEvents = {
      created: (markerInstance) => {
        //console.log('比如：');

      }
    }


  }


  componentDidMount(){

  }

  componentWillMount() {

  }

  renderMarkerLayout(extData){
    switch (extData.position.devtype){
      case 'cangniao_meter':
        return <div ><img src={require('images/cangniao_meter.png')} style={{width:'24px'}} /></div>
        break;
      case 'claa_door':
        return <div ><img src={require('images/claa_door.png')} style={{width:'24px'}} /></div>
        break;
      case 'claa_gpsloc':
        return <div ><img src={require('images/claa_gpsloc.png')} style={{width:'24px'}} /></div>
        break;
      case 'claa_gsp':
        return <div ><img src={require('images/claa_gsp.png')} style={{width:'24px'}} /></div>
        break;
      case 'claa_temp_humd':
        return <div ><img src={require('images/claa_temp_humd.png')} style={{width:'24px'}} /></div>
        break;
      case 'claa_watersensor':
        return <div ><img src={require('images/claa_watersensor.png')} style={{width:'24px'}} /></div>
        break;
      case 'haitong_Infrared':
        return <div ><img src={require('images/haitong_Infrared.png')} style={{width:'24px'}} /></div>
        break;
      case 'partial_discharge_sensor':
        return <div ><img src={require('images/partial_discharge_sensor.png')} style={{width:'24px'}} /></div>
        break;
      case 'sensor_3phase_current_paras':
        return <div ><img src={require('images/sensor_3phase_current_paras.png')} style={{width:'24px'}} /></div>
        break;
      case 'sensor_h2s_monitor':
        return <div ><img src={require('images/sensor_h2s_monitor.png')} style={{width:'24px'}} /></div>
        break;
      case 'sensor_hsd_inclination':
        return <div ><img src={require('images/sensor_hsd_inclination.png')} style={{width:'24px'}} /></div>
        break;

      case 'sichuang_trapdoor':
        return <div ><img src={require('images/sichuang_trapdoor.png')} style={{width:'24px'}} /></div>
        break;
      case 'xinshanying_smoke_v2':
        return <div ><img src={require('images/xinshanying_smoke_v2.png')} style={{width:'24px'}} /></div>
        break;
      case 'yadian_airswitch':
        return <div ><img src={require('images/yadian_airswitch.png')} style={{width:'24px'}} /></div>
        break;
      case 'sensor_fzny_emeter_fzdtsd':
        return <div ><img src={require('images/cangniao_meter.png')} style={{width:'24px'}} /></div>
        break;
      case 'sensor_swireless_tempmonitor_v2':
        return <div ><img src={require('images/claa_temp_humd.png')} style={{width:'24px'}} /></div>
        break;
      case 'sensor_hcho_monitor':
        return <div ><img src={require('images/sensor_h2s_monitor.png')} style={{width:'24px'}} /></div>
        break;
      default:
        // return <div ><img src={require(`images/${extData.position.devtype}.png`)} style={{width:'24px'}} /></div>

        return <div ><img src={ltIcon} style={{width:'24px'}} /></div>
        break;
    }
    //if (extData.myIndex === 3){
      //return <div ><img src={require(`images/${xx}.png`)} style={{width:'18px'}} /></div>
    //}
  }

  render() {
    const {devsList}=this.props;
    const tempPath = Array.from(devsList).map((item,index)=>{
      return {
        position:{
          index,
          longitude:item.gpslng,
          latitude:item.gpslat,
          deveui:item.deveui,
          devname:item.devname,
          devtype:item.devtype

        }
      }
    });
    let mapCenter={longitude: 87.628885, latitude: 43.83301}
    if(tempPath.length!==0){
      mapCenter=tempPath[0].position
    }
    return (
      <div className="midMap" >
        <Map
          center={mapCenter}
          amapkey="ee19e68261c9a7e1231a9cb175283e2f"
          mapStyle="amap://styles/6ac7cbe6ce3938118d514c856e16ad71"
          expandZoomRange
          useAMapUI
          zoom={6}
          zooms={[1, 20]}
          events={this.amapEvents}
        >
          <Markers
            events={this.markerEvents}
            render={this.renderMarkerLayout}
            markers={tempPath}
            useCluster={true}

          />
        </Map>

      </div>
    );
  }
}

export default PageComponent;

