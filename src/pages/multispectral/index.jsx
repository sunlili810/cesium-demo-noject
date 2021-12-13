import React, { Component } from 'react';
import { Carousel,Button, Radio } from 'antd';
import './index.less';
import playIcon from 'images/playIcon.png';
import stopIcon from 'images/stopIcon.png';
import searchIcon from 'images/searchIcon.png';
import multiIcon from 'images/multiIcon.png';
import Query from './query';
import BorderLine from 'pages/pDesc/borderLine';
import tabStore from 'store/tablestore';
import DevType from './deviceType';
import MapLocation from './mapLocation';
import PlaceTree from './placeTree';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeList:[],
      devsList:[],
      currentab:'1'
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDevType = this.handleDevType.bind(this);
  }

  componentDidMount(){
    this.fetch();
    this.fetchDevs();
  }
  componentWillUnmount(){
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  fetch(deveui) {
    const that = this;
    //const { searchFilter } = this.state;
    const param = {
      loadingFlag: false,
      url: '/combo/place/list',
      method: 'get',
      data: {
        //...searchFilter
      },
      successFn(data) {
        that.setState({
          treeList: data.data
        });
        if(that.timer1){
          clearTimeout(that.timer1)
        }
        //that.timer1 = setTimeout(()=>{
        //  that.fetch(that.state.deveui);
        //},5*1000);
      }
    };
    store.handleNormal(param);
  }

  fetchDevs(placeid='') {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/place/dev/list',
      method: 'get',
      data: {
        placeid
      },
      successFn(data) {
        that.setState({
          devsList: data.data
        });
        //if(that.timer1){
        //  clearTimeout(that.timer1)
        //}
        //that.timer1 = setTimeout(()=>{
        //  that.fetch(that.state.deveui);
        //},5*1000);
      }
    };
    store.handleNormal(param);
  }

  fetchTypeDevs(devtype='') {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/dev/list',
      method: 'get',
      data: {
        devtype
      },
      successFn(data) {
        that.setState({
          devsList: data.data
        });
      }
    };
    store.handleNormal(param);
  }

  handletabChange= e => {
    this.setState({ currentab: e.target.value });
  };
  handleSelect(placeid){
    console.log(placeid);
    this.fetchDevs(placeid.length ? placeid[0] : '');
  }
  handleDevType(type){
    console.log(type);
    this.fetchTypeDevs(type);
  }


  render() {
    const contentStyle = {
      width:'100%',
      height:'720px',
      color: '#fff',
      textAlign: 'center',
    };
    const {treeList,currentab,devsList}=this.state;
    return (
      <div className="multispectralDiv">

        <div className="cont">
          <div className="topWrap">
            <div className="topTwo">
              <BorderLine />
              <MapLocation devsList={devsList} />
            </div>

            <div className="topOne">
              <BorderLine />
              <div className="radioBarDev" style={{width:'100%'}}>
                <Radio.Group value={currentab} onChange={this.handletabChange}>
                  <Radio.Button value="1">设备类型</Radio.Button>
                  <Radio.Button value="2">场景</Radio.Button>
                </Radio.Group>
              </div>
              <div className="radioContDev" style={{width:'100%'}}>
                {
                  currentab === '1'?(<DevType clickFn={this.handleDevType} />):(<PlaceTree seletedFn={this.handleSelect} param={treeList} />)
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
