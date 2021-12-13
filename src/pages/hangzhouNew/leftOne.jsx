import React, { Component } from 'react';
import { Carousel, Button } from 'antd';
import './index.less';
import tabStore from 'store/tablestore';
import img1 from 'images/confirm-icon.png';
import img2 from 'images/error-icon.png';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: []
    };
  }

  componentDidMount() {
    this.fetchSummary();
  }


  fetchSummary(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/light/dashboard/carousel',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({
          summaryData: data.appdata
        });
      }
    };
    store.handleNormal(param);
  }

  componentWillUnmount() {
    this.setState = () => false;
  }


  render() {
    const { summaryData } = this.state;
    return (
      <div className="leftOnePage">
        {/* <div className="comTit">项目概况</div> */}
        <div className="carouselWrap">
          <Carousel autoplay>
            {
              summaryData?.length ? summaryData.map((item => (
                <div key={item.id}>
                  <img src={`${item.imageUrl}`} alt="" />
                </div>
              ))) : ''
            }
            {/* <div> */}
            {/*  <img src={img1} /> */}
            {/* </div> */}
            {/* <div> */}
            {/*  <img src={img2} /> */}
            {/* </div> */}
          </Carousel>
        </div>

      </div>
    );
  }
}

export default PageComponent;
