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

    };
  }

  componentDidMount() {
    // this.fetchSummary();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetchSummary(deveui) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/huadian/heavy/summary',
      method: 'get',
      data: {

      },
      successFn(data) {
        that.setState({
          summaryData: data.data
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

  onChange(a, b, c) {
    console.log(a, b, c);
  }


  render() {
    return (
      <div className="leftOnePage">
        {/* <div className="comTit">项目概况</div> */}
        <div className="carouselWrap">
          <Carousel afterChange={this.onChange}>
            <div>
              <img src={img1} />
            </div>
            <div>
              <img src={img2} />
            </div>
          </Carousel>
        </div>

      </div>
    );
  }
}

export default PageComponent;
