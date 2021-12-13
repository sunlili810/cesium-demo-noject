import React, { Component } from 'react';
import BorderLine from './borderLine';
import kaoq from 'images/ic_01.png';
import RightOne from './rightOne';
import RightTwo from './rightTwoPie'

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <BorderLine />
        {/*<div className="commonTit"><img src={commontit} />环境实时监测</div>*/}
        <div className="rightTwo">
          <div className="commonTit"><img src={kaoq} />告警总览</div>
          <div className="brOne">
            <RightOne />
          </div>

          <div className="brTwo">
            <RightTwo />
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default PageComponent;
