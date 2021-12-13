import React, { Component } from 'react';
import {
  StockOutlined
} from '@ant-design/icons';
import './index.less';
import tabStore from 'store/tablestore';
import LocationMap from './locationMap';
// import ParkOverview from './parkOverview';


const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: {
        gpslng:'120.21201',
        gpslat:'30.2084'
      }
    };
  }

  componentDidMount() {
    this.fetchSummary();
  }


  fetchSummary() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/newproject/basedataqry',
      method: 'post',
      data: {
      },
      successFn(data) {
        that.setState({
          projectData: data
        });
      }
    };
    store.handleNormal(param);
  }

  componentWillUnmount() {
    this.setState = () => false;
  }

  render() {
    const { projectData } = this.state;

    return (
      <div className="rightOnePage" style={{ height: '100%' }}>
        <div className="comTit" style={{ marginLeft:'15px',marginBottom:'5px' }}>
          {/* <StockOutlined /> */}
        项目定位
        </div>
        <div className="rightOneL" style={{ width: '100%', height: '90%' }}>
          <LocationMap projectData={projectData} />
        </div>
        {/* <div className="rightOneR"> */}
        {/*  /!* <ParkOverview /> *!/ */}
        {/*  <div className="leftTwoPage"> */}
        {/*    { */}

        {/*      <span key={projectData?.projectid} className="listOne"> */}
        {/*        {projectData?.descp} */}
        {/*      </span> */}

        {/*    } */}

        {/*  </div> */}
        {/* </div> */}

      </div>
    );
  }
}

export default PageComponent;
