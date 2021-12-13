import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import Layout from 'components/layout/layout';
import './index.less';
import 'iconfonts/iconfont.css';
import tabStore from 'store/tablestore';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';
import LeftOne from './leftOne';
import LeftThree from './leftThree';
import AlamStatics from './alamStatics';
import AlamList from './alarmList';
import EnergyStatics from './energyStatics';
import RightOne from './rightOne';
import LeftTwo from './leftTwo';
import MiddleOne from './middleOne';
import MiddleTwo from './middleTwo';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentab: '-1',
      craneData: null

    };
    this.selectChange = this.selectChange.bind(this);
  }

  componentDidMount() {

  }

  handletabChange= (e) => {
    this.setState({ currentab: e.target.value });
  };

  selectChange(value) {
    this.setState({
      craneData: value
    });
  }

  render() {
    const { currentab, craneData } = this.state;
    return (
      <Layout name="hangzhou">
        <div className="indexWrap">
          <div className="cont">
            <div className="leftCont">
              <div className="leftTop" style={{ position: 'relative' }}>

                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />

                <div className="leftOne">
                  <div className="comTit" >项目概况</div>
                  <LeftOne />
                </div>
                <div className="leftTwoNew">
                  <LeftTwo />
                </div>
              </div>

              <div className="leftThree" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />

                <LeftThree />
              </div>
            </div>
            <div className="middleCont">
              <div className="midOne" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />
                <MiddleOne />
              </div>
              <div className="midTwo midOne" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />
                <MiddleTwo />
              </div>
              <div className="midThree lThreeTwo" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />
                <EnergyStatics />
              </div>

            </div>
            <div className="rightCont">
              <div className="rightOne" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />
                <RightOne />
              </div>
              <div className="rightTwo" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />
                <AlamStatics />
              </div>
              <div className="rightThree" style={{ position: 'relative' }}>
                <img className="boderLTop" src={img02} alt="" />
                <img className="boderRBottom" src={img04} alt="" />

                <AlamList />
              </div>

            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
