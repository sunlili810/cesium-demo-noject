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
      markers: randomMarker(10),
      mapCenter:{longitude: 117.25766, latitude: 34.212308},

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
        console.log('比如：');

      }
    }


  }


  componentDidMount(){

  }

  componentWillMount() {

  }

  renderMarkerLayout(extData){
    console.log(extData);
    if (extData.myIndex === 3){
      return <div ><img src={ltIconActive} style={{width:'18px'}} /></div>
    }
    return <div ><img  src={ltIcon} style={{width:'18px'}} /></div>
  }

  render() {
    return (
      <div className="midMap">
        <Map
          center={this.state.mapCenter}
          amapkey="1b68388db445108ea7d8a7036ae16cef"
          mapStyle="amap://styles/029597c4cd51f08b1fb1b23bd4ce9e1c"
          expandZoomRange
          useAMapUI
          zoom={8}
          zooms={[1, 20]}
          events={this.amapEvents}
        >
          <Markers
            events={this.markerEvents}
            render={this.renderMarkerLayout}
            markers={this.state.markers}

          />
        </Map>

      </div>
    );
  }
}

export default PageComponent;

