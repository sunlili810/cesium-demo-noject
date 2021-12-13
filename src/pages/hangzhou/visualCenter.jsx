import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Map, Markers, Marker, Circle, GroundImage, Polygon
} from 'react-amap';
import './middleMap.less';
import ltIcon from 'images/location.png';
import ltIconActive from 'images/locationActive.png';
import tabStore from 'store/tablestore';
import {
  Button, Col, Divider, Form, Input, Row, Select, Tree, Slider
} from 'antd';
import modal from 'components/modal/modal';
import modalConfigLight from './deviceModal/modalConfigLight';
import BottomFloat from './bottomFloat';
import RightFloat from './rightFloat';
import CommonRightFloat from './commonRight/commonRightFloat';
import PublicBroadcasting from './commonRight/publicBroadcasting';
import Emergency from './commonRight/emergency';
import MsgDelivery from './commonRight/msgDelivery';
import Monitor from './commonRight/monitor';
import Environment from './commonRight/environment';

const FormItem = Form.Item;
const { Option } = Select;
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
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [], // path,//[]
      mapCenter: { longitude: 120.31398, latitude: 29.93857 },
      path: Array(4).fill(true).map(randomPath),
      videoSrc: '',
      selectedSite: '',
      treeData: []

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
        // this.markerInstance.map((item,index)=>{
        //  item.render(this.renderMarkerDefault);
        // })
        // marker.render(this.renderMarkerClick);
        this.setState({
          selectedSite: marker.getExtData().position.devname
        });
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
    this.fetchTreeData();
    this.fetch();
    this.showDeviceModal();
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
      url: '/project/resrelation/queryresshadow',
      method: 'post',
      data: {
        restypeid: 'claa_lamppost'
      },
      successFn(data) {
        const tempPath = Array.from(data).map((item, index) => ({
          position: {
            index,
            longitude: item.gpslng,
            latitude: item.gpslat,
            deveui: item.resid,
            devname: item.resname,
            devtype: item.restype
          }
        }));

        // if(tempPath.length!==0){
        //  const {markerClick}=that.props;
        //  markerClick(tempPath[0].position.deveui);
        // }

        that.setState({
          markers: tempPath,
          selectedSite: tempPath.length ? tempPath[0].position.devname : '',
          mapCenter: tempPath.length ? tempPath[0].position : ''
        });

        // if (that.timer1) {
        //   clearTimeout(that.timer1);
        // }
        // that.timer1 = setTimeout(() => {
        //   that.fetch();
        // }, 5 * 60 * 1000);
      }
    };
    store.handleNormal(param);
  }

  fetchTreeData() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/project/place/reacttree',
      method: 'post',
      data: {
        projectid: ''
      },
      successFn(data) {
        that.setState({ treeData: data });
      }
    };
    store.handleNormal(param);
  }

  showDeviceModal = () => {
    const that = this;
    const { cameraList } = this.state;
    modal.showModel({
      type: 'dialog',
      title: '',
      width: '504px',
      Dialog: modalConfigLight,
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
        cameraList
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

    return <div><img src={ltIcon} style={{ width: '20px' }} /></div>;
  }

  renderMarkerDefault(extData) {
    return <div><img src={ltIcon} style={{ width: '18px' }} /></div>;
  }

  renderMarkerClick(extData) {
    return <div><img src={ltIconActive} style={{ width: '18px' }} /></div>;
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const data = {
      ...values,
      channel: values.channel === undefined ? undefined : values.channel
    };
    const { searchFn } = this.props;
    searchFn(data);
  };


  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys[0]);
    this.fetch(selectedKeys);
  };

  render() {
    // const treeData = [
    //   {
    //     key: '#root',
    //     title: '全部',
    //     children: [
    //       {
    //         key: 'PL1618885780621721',
    //         title: '测试3',
    //         children: []
    //       },
    //       {
    //         key: 'PL1618799390428902',
    //         title: '测试',
    //         children: [
    //           {
    //             key: 'PL1618885856818937',
    //             title: '测试444',
    //             children: []
    //           },
    //           {
    //             key: 'PL1618883508579658',
    //             title: '测试2',
    //             children: []
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ];

    const { selectedSite, treeData } = this.state;
    return (
      <div className="midMap" style={{ position: 'relative' }}>
        {/* { */}
        {/*  selectedSite!== '' ? <div className="defalultSite">当前站点：{selectedSite}</div>:'hshsh' */}
        {/* } */}
        <div style={{ width: '100%' }}>
          <Form
            layout="horizontal"
            onFinish={this.onFinish}
            className="defalultSite"
            style={{
              width: '99%', padding: '0', margin: '0'
            }}
          >
            <Row gutter={24}>
              <Col span={2}>
                <FormItem
                  label=""
                  name="channel"
                  {...{
                    labelCol: {
                      span: 0
                    },
                    wrapperCol: {
                      span: 24
                    }
                  }}
                >
                  <Tree
                    defaultExpandedKeys={['PL1618885780621721']} // {['PL1618799390428902']}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    treeData={[treeData]}
                  />
                  {/* <Select> */}
                  {/*  <Option key="1" value="1">城区一</Option> */}
                  {/*  <Option key="2" value="1">城区二</Option> */}
                  {/* </Select> */}
                </FormItem>
              </Col>
              {/* <Col span={2} style={{ padding: '0px' }}> */}
              {/*  <FormItem */}
              {/*    label="" */}
              {/*    name="devtype" */}
              {/*    {...{ */}
              {/*      labelCol: { */}
              {/*        span: 0 */}
              {/*      }, */}
              {/*      wrapperCol: { */}
              {/*        span: 24 */}
              {/*      } */}
              {/*    }} */}
              {/*  > */}
              {/*    <Select> */}
              {/*      <Option key="1" value="1">街道一</Option> */}
              {/*      <Option key="2" value="1">街道二</Option> */}
              {/*    </Select> */}
              {/*  </FormItem> */}
              {/* </Col> */}
              {/* <Col span={3} style={{ paddingRight: '0px' }}> */}
              {/*  <FormItem */}
              {/*    label="" */}
              {/*    name="name" */}
              {/*    {...{ */}
              {/*      labelCol: { */}
              {/*        span: 0 */}
              {/*      }, */}
              {/*      wrapperCol: { */}
              {/*        span: 24 */}
              {/*      } */}
              {/*    }} */}
              {/*  > */}
              {/*    <Input /> */}
              {/*  </FormItem> */}
              {/* </Col> */}
              {/* <Col span={3}> */}
              {/*  <FormItem */}
              {/*    wrapperCol={{ span: 24 }} */}
              {/*    className="footer" */}
              {/*  > */}
              {/*    <Button className="btn-add" htmlType="submit" type="primary">搜索</Button> */}
              {/*    <Divider type="vertical" /> */}
              {/*    <Button className="btn-add" type="primary">重置</Button> */}
              {/*  </FormItem> */}
              {/* </Col> */}
            </Row>

          </Form>
        </div>

        <Map
          center={this.state.mapCenter}
          amapkey="ee19e68261c9a7e1231a9cb175283e2f"
          mapStyle="amap://styles/6ac7cbe6ce3938118d514c856e16ad71"
          expandZoomRange
          useAMapUI
          zoom={6}
          zooms={[1, 20]}
          events={this.amapEvents}
        >
          <Markers
            markers={this.state.markers}
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

        <BottomFloat />
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
    );
  }
}

export default PageComponent;
