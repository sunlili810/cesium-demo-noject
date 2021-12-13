import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './brTwo.less';
import daqi from 'images/daqi.png';
import C02 from 'images/C02.png';
import zdu from 'images/zdu.png';
import PH from 'images/PH.png';
import tdiao from 'images/tdiao.png';
import dan from 'images/dan.png';
import jia from 'images/jia.png';
import ling from 'images/ling.png';
import shidu from 'images/shidu.png';






class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
  }


  render() {
    const {earth,water,weather}=this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="brTwoSub">
        <div className="pListWrap">
          <div className="listOne">
            <div className="imgWrap"><img src={daqi} /></div>
            <div className="descVal">
              <div className="type">大气压</div>
              <div className="unit">{weather=== ''|| weather.press=== null  ? '':(weather.press).toFixed(1)}hpa</div>
            </div>
          </div>

          <div className="listOne">
            <div className="imgWrap"><img src={C02} /></div>
            <div className="descVal">
              <div className="type">CO2浓度</div>
              <div className="unit" style={{color:'#00DC7C'}}>{weather=== ''|| weather.co2=== null  ? '': (weather.co2).toFixed(1)}ppm</div>
            </div>
          </div>

          <div className="listOne">
            <div className="imgWrap"><img src={zdu} /></div>
            <div className="descVal">
              <div className="type">水质浊度</div>
              <div className="unit" style={{color:'#FF981E'}}>{water=== '' || weather.zs=== null? '':(water.zs).toFixed(1)}ntu</div>
            </div>
          </div>

          <div className="listOne">
            <div className="imgWrap"><img src={PH} /></div>
            <div className="descVal">
              <div className="type">水质PH</div>
              <div className="unit" style={{color:'#0ABAED'}}>{water=== ''|| weather.ph === null ? '':(water.ph).toFixed(1)}ph</div>
            </div>
          </div>

        </div>

        <div className="commonTit">

          {/*<Dropdown overlay={menu} >*/}
            {/*<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>*/}
              {/*所有土壤检测<Icon type="down" />*/}
            {/*</a>*/}
          {/*</Dropdown>*/}

          <a className="ant-dropdown-link">
            所有土壤检测
          </a>

        </div>

        <div className="pListWrap">
          <div className="listOne">
            <div className="imgWrap"><img src={tdiao} /></div>
            <div className="descVal">
              <div className="type">土壤温度1#</div>
              <div className="unit" style={{color:'#3682FB'}}>{earth=== ''|| earth.temp === null ? '':parseInt(earth.temp)}℃</div>
            </div>
          </div>

          {/*<div className="listOne">*/}
            {/*<div className="imgWrap"><img src={tdiao} /></div>*/}
            {/*<div className="descVal">*/}
              {/*<div className="type">土壤温度2#</div>*/}
              {/*<div className="unit" style={{color:'#3682FB'}}>{earth=== '' ? '':earth.temp}℃</div>*/}
            {/*</div>*/}
          {/*</div>*/}

          <div className="listOne">
            <div className="imgWrap"><img src={shidu} /></div>
            <div className="descVal">
              <div className="type">土壤湿度</div>
              <div className="unit" style={{color:'#ED09E0'}}>{earth=== ''|| earth.humd === null ? '':parseInt(earth.humd)}%</div>
            </div>
          </div>

          <div className="listOne">
            <div className="imgWrap"><img src={dan} /></div>
            <div className="descVal">
              <div className="type">土壤氮含量</div>
              <div className="unit" style={{color:'#7BFB36'}}>{earth=== ''|| earth.n === null  ? '':parseInt(earth.n)}mg/kg</div>
            </div>
          </div>



          <div className="listOne">
            <div className="imgWrap"><img src={jia} /></div>
            <div className="descVal">
              <div className="type">土壤钾含量</div>
              <div className="unit" style={{color:'#FB3664'}}>{earth=== ''|| earth.k === null ? '':parseInt(earth.k)}mg/kg</div>
            </div>
          </div>

          <div className="listOne">
            <div className="imgWrap"><img src={ling} /></div>
            <div className="descVal">
              <div className="type">土壤磷含量</div>
              <div className="unit" style={{color:'#ED550A'}}>{earth=== ''|| earth.p === null ? '':parseInt(earth.p)}mg/kg</div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default PageComponent;
