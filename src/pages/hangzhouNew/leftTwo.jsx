import React, { Component } from 'react';
import './index.less';
import tabStore from 'store/tablestore';
// import LocationMap from './locationMap';
// import ParkOverview from './parkOverview';


const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: null
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
      <div className="rightOnePage">
        {/* <div className="comTit"><StockOutlined />项目简介</div> */}
        {/* <div className="rightOneL"> */}
        {/*  <LocationMap projectData={projectData} /> */}
        {/* </div> */}
        <div className="rightOneR">
          {/* <ParkOverview /> */}
          <div className="leftTwoPage">
            {

              <span key={projectData?.projectid} className="listOne">
                {projectData?.remark}
              </span>

            }

          </div>
        </div>

      </div>
    );
  }
}

export default PageComponent;
