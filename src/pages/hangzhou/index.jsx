import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import Layout from 'components/layout/layout';
import './index.less';
import 'iconfonts/iconfont.css';
import tabStore from 'store/tablestore';
import LeftOne from './leftOne';
import LeftThree from './leftThree';
import AlamStatics from './alamStatics';
import AlamList from './alarmList';
import EnergyStatics from './energyStatics';
import RightOne from './rightOne';
import LeftTwo from './leftTwo';

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
              <div className="leftOne">
                <LeftOne />
              </div>
              <div className="leftTwo">
                <LeftTwo />
              </div>
              <div className="leftThree">
                <div className="lThreeOne">
                  <LeftThree />
                </div>
                <div className="lThreeTwo">
                  <EnergyStatics />
                </div>
              </div>
            </div>
            {/* <div className="middleCont" > */}
            {/*  <div className="midOne"></div> */}
            {/*  <div className="midTwo"></div> */}
            {/*  <div className="midThree"></div> */}

            {/* </div> */}
            <div className="rightCont">
              <div className="rightOne">
                <RightOne />
              </div>
              <div className="rightTwo">
                <AlamList />
              </div>
              <div className="rightThree">
                <AlamStatics />
              </div>

            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
