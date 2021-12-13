import React, { Component } from 'react';
import { Carousel } from 'antd';
import './leftTwo.less';
import kaoq from 'images/kaoq.png';
import dept from 'images/ic_01.png';
import botIcon from 'images/pic_05.png';
import circleIcon from 'images/circleIcon.png';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deveui:'',
      pics:[]
    };
  }

  componentDidMount(){
    this.fetch()
  }

  componentWillUnmount(){
    if(this.timer1){
      clearTimeout(this.timer1)
    }
  }
  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/combo/project/devtype/distribution',
      method: 'GET',
      data: {
        //devtype:deveui,
        topn:5
      },
      successFn(data) {
        that.setState({
          pics: data.data
        });
        if(that.timer1){
          clearTimeout(that.timer1)
        }
        that.timer1 = setTimeout(()=>{
          //that.fetch(that.state.deveui);
          that.fetch();
        },5*60*1000);
      }
    };
    store.handleNormal(param);
  }

  render() {
    const contentStyle = {
      width: '100%',
      color: '#fff',
      height: '220px',
      textAlign: 'center',
      overflow:'hidden'
    };
    const {pics}=this.state;
    const temppics=new Array(8).fill(7);
    var result = [];
    for(var i=0,len=pics.length;i<len;i+=6){
      result.push(pics.slice(i,i+6));
    }
    return (
      <div className="lefttwoSub">

        <div className="commonTit"><img src={dept} />设备类型</div>
        <div className="pListWrap">
          <div className="imgList">
            <Carousel autoplay={true}>
              {
                result.map((item,index)=>{
                 const tempHtml= item.map((item2,index2)=>{
                    return (
                      <div className="listOne" key={index2}>
                        <div className="tit">{item2.shortname}</div>
                        <div className="descVal"><img className="threeBarIcon" src={botIcon} alt="" />{item2.devnum}</div>
                      </div>
                    )
                  });
                  return (
                    <div key={index}>{tempHtml}</div>
                  );

                })
              }

            </Carousel>
          </div>

        </div>

      </div>
    );
  }
}

export default PageComponent;
