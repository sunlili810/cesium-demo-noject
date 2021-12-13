import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import './index.less';
import 'iconfonts/iconfont.css';
import tabStore from 'store/tablestore';
import LeftOne from './leftOne';
import LeftTwo from './parkOverview2';
import LeftThree from './leftThree';
import AlamStatics from './alamStatics';
import AlamList from './alarmList';
import LocationMap from './locationMap';

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
      <div className="indexWrap">
        <div className="cont">
          <div className="leftCont" >
            <div className="leftOne">
              <LeftOne />
            </div>
            <div className="leftTwo">
              <LeftTwo />
            </div>
            <div className="leftThree">
              <LeftThree />
            </div>
          </div>
          <div className="middleCont" >
            <div className="midOne"></div>
            <div className="midTwo"></div>
            <div className="midThree"></div>

          </div>
          <div className="rightCont" >
            <div className="rightOne">
              <AlamList />
            </div>
            <div className="rightTwo">
              <AlamStatics />
            </div>
            <div className="rightThree">
               <LocationMap />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default PageComponent;
