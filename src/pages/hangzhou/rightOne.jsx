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
      projectData: null
    };
  }

  componentDidMount() {
    this.fetchSummary();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
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

        if (that.timer2) {
          clearTimeout(that.timer2);
        }
        // that.timer2 = setTimeout(()=>{
        //  that.fetchSummary();
        // },5*60*1000);
      }
    };
    store.handleNormal(param);
  }


  render() {
    const { projectData } = this.state;

    return (
      <div className="rightOnePage">
        <div className="comTit"><StockOutlined />项目简介</div>
        <div className="rightOneL">
          <LocationMap projectData={projectData} />
        </div>
        <div className="rightOneR">
          {/* <ParkOverview /> */}
          <div className="leftTwoPage">
            {

              <span key={projectData?.projectid} className="listOne">
                {projectData?.descp}
              </span>

            }

          </div>
        </div>

      </div>
    );
  }
}

export default PageComponent;
