import React, { Component } from 'react';
import { Select,Checkbox,Image } from 'antd';
import modal from 'components/modal/modal';
import './index.less';
import tabStore from 'store/tablestore';
import Piecircle2 from 'components/echart/piecircle2';
import BigimgFn from './bigImgModal';

const store = new tabStore();
const { Option } = Select;
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData:[],
      craneData:[],
      nextSelectVal:null
    };
    this.onChange = this.onChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  componentDidMount() {
    this.fetchCrane();
  }

  componentWillUnmount(){
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  fetchCrane() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/resource/list',
      method: 'get',
      data: {
        restype:'res_crane'
      },
      successFn(data) {
        that.setState({
          craneData:data.data
        });
        const {selectChange}=that.props;
        selectChange(data.data.length?data.data[0].resid:'');
        that.fetchSummary({resid:data.data.length?data.data[0].resid:''});
        if(that.timer2){
          clearTimeout(that.timer2)
        }
        //that.timer2 = setTimeout(()=>{
        //  that.fetchSummary();
        //},5*60*1000);
      }
    };
    store.handleNormal(param);
  }
  fetchSummary(filter) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/huadian/heavy/photolist',
      method: 'get',
      data: {
        ...filter
      },
      successFn(data) {
        that.setState({
          summaryData:data.data
        });

        //if(that.timer2){
        //  clearTimeout(that.timer2)
        //}
        //that.timer2 = setTimeout(()=>{
        //  that.fetchSummary();
        //},5*60*1000);
      }
    };
    store.handleNormal(param);
  }

  showBigImg = (Imgsrc) => {
    modal.showModel({
      type: 'dialog',
      title: '预览',
      width: '750px',
      Dialog: BigimgFn,
      //ok: (value) => {
      //  const params = {
      //    loadingFlag: false,
      //    url: '/parking/spotcfg/mod',
      //    method: 'POST',
      //    data: {
      //      ...value
      //    },
      //    successFn() {
      //      that.fetch();
      //      // that.fetch({ filter: that.searchList.filter });
      //    }
      //  };
      //  //store.handleNormal(params);
      //},
      param: Imgsrc
    });
  };


  onChange(value) {
    this.fetchSummary({resid:value});
    const {selectChange}=this.props;
    selectChange(value);
  }
  handleCheckBox(e){
    //nextSelectVal craneData
    const {craneData}=this.state;
    console.log(`checked = ${e.target.checked}`);
    const {selectChange}=this.props;
    if(e.target.checked=== true){
      if(this.timer2){
        clearInterval(this.timer2)
      }
      let tempi=0;
      this.timer2 = setInterval(()=>{
        this.fetchSummary({resid:craneData[tempi].resid});
        selectChange(craneData[tempi].resid);
        this.setState({
          nextSelectVal:craneData[tempi].resid
        });
        if(tempi<craneData.length-1){
          tempi++;
        }else{
          tempi=0;
        }
      },30*1000);

    }else{
      if(this.timer2){
        clearInterval(this.timer2)
      }
    }


  }


  render() {
    const {summaryData,craneData,nextSelectVal}=this.state;
    const defaultVal = nextSelectVal!== null ? nextSelectVal:craneData.length?craneData[0].resid:'';
    return (
      <div className="picsPage" style={{height:'100%'}}>
        <div className="orderTit">
          <span className="tit">裂纹图像</span>
          <Select
            showSearch
            style={{ width: 250 }}
            //optionFilterProp="children"
            onChange={this.onChange}
            key={defaultVal}
            defaultValue={defaultVal}
          >
            {
              craneData.map((item,index)=>{
                return (<Option key={item.resid} value={item.resid}>{item.resname}</Option>);
              })
            }

            {/*<Option key="1" value='R1608258830736702'>MDG63/10T堆541桁架门式起重机</Option>*/}
            {/*<Option key="2" value='R1608258830736703'>L10T*30m堆342箱梁门式起重机</Option>*/}
          </Select>
          <Checkbox style={{marginLeft:'10px'}} onChange={this.handleCheckBox}>30秒自动切换</Checkbox>
        </div>
        <div className="orderCont">
          {/*{*/}
            {/*summaryData.map((item,index22)=>{*/}
              {/*return (*/}
                {/*<div className="listOne" key={index22}>*/}
                {/*<img src={window.apiUrl+'/huadian/heavy/photoid?photoid='+item} onClick={this.showBigImg.bind(this,(window.apiUrl+'/huadian/heavy/photoid?photoid='+item))} className="listoneImg" />*/}
              {/*</div>)*/}
            {/*})*/}
          {/*}*/}
          <Image.PreviewGroup>
            {
              summaryData.map((item,index)=>{
                return (
                  <div className="listOne" key={index}>
                    <Image src={window.apiUrl+'/huadian/heavy/photoid?photoid='+item} className="listoneImg" />
                  </div>)
              })
            }

          </Image.PreviewGroup>
        </div>
      </div>
    );
  }
}

export default PageComponent;
