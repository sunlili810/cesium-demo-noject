import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import './index.less';
import 'iconfonts/iconfont.css';
import Header from 'pages/header/header';
import tabStore from 'store/tablestore';
import PDesc from '../pDesc/pDesc';
import WarningStation from '../warningStation/index';
import Multispectral from '../multispectral';

import LiquidChar from 'components/echart/liquidfill';
import Piecircle from 'components/echart/piecircle';
import Localtimes from '../header/locaTimes';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: '1',

    };
  }
  handleChange(){
    LiquidChar.resizePie('liquid3');
    Piecircle.resizePie('pie2')
  }
  handleSizeChange = e => {
    this.setState({ currentpage: e.target.value });
  };

  render() {
    const { currentpage } = this.state;
    return (
      <div className="indexDiv">        <div className="headCont" style={{position:"relative"}}>
          <Header className="headContent" devname={window.headTitle}  />
          <div className="cont">
          <div className="ant-tabs-nav radioBar" style={{width:'100%'}}>
              <Radio.Group value={currentpage} onChange={this.handleSizeChange}>
                <Radio.Button value="1">系统概况</Radio.Button>
                <Radio.Button value="2">告警台</Radio.Button>
                <Radio.Button value="3">设备管理</Radio.Button>
              </Radio.Group>
              <Localtimes />
          </div>
            <div className="radioCont" style={{width:'100%'}}>
            {
              currentpage === '1'?(<PDesc />):currentpage=== '2'?(<WarningStation />):(<Multispectral />)
            }
            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
