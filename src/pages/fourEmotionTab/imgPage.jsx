import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel, Image
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ipInput.less';
import circle from 'images/circle.png';
import confirm_icon from 'images/confirm-icon.png';
import confirm_close from 'images/confirm-close.png';
import partial_discharge_sensor from 'images/partial_discharge_sensor.png';
import sensor_3phase_current_paras from 'images/sensor_3phase_current_paras.png';

const imglists = [
  {
    src: circle,
    index: 0
  },
  {
    src: confirm_icon,
    index: 1
  },
  {
    src: confirm_close,
    index: 2
  },
  {
    src: partial_discharge_sensor,
    index: 3
  },
  {
    src: sensor_3phase_current_paras,
    index: 4
  }
];

class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0
    };
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {

  }

  handlePrev=() => {
    let { imgIndex } = this.state;
    if (imgIndex % 3 === 0 && imgIndex !== 0) {
      this.myRef.current.prev();
    }
    imgIndex--;
    if (imgIndex <= 0) {
      imgIndex = 0;
    }

    this.setState({
      imgIndex
    });
  }

  handleNext = () => {
    let { imgIndex } = this.state;
    imgIndex++;
    if (imgIndex >= imglists.length) {
      imgIndex = imglists.length - 1;
    }
    if (imgIndex % 3 === 0) {
      this.myRef.current.next();
    }

    this.setState({
      imgIndex
    });
  }

  render() {
    const { imgIndex } = this.state;

    const result = [];
    for (let i = 0, len = imglists.length; i < len; i += 3) {
      result.push(imglists.slice(i, i + 3));
    }

    return (
      <div className="imgviewpage">

        <div className="imgList">
          <div onClick={this.handlePrev} className="prevBtn"><LeftOutlined style={{ fontSize: '30px' }} /></div>
          <div onClick={this.handleNext} className="nextBtn"><RightOutlined style={{ fontSize: '30px' }} /></div>

          <Carousel autoplay={false} ref={this.myRef}>
            {
              result.map((item, index) => {
                const tempHtml = item.map((item2) => (
                  <img
                    width={200}
                    src={item2.src}
                    key={item2.index}
                    className={imgIndex === item2.index ? 'active' : ''}
                  />
                ));
                return (
                  <div key={index} className="imgCar" style={{ height: '100%' }}>{tempHtml}</div>
                );
              })

            }

          </Carousel>
          <div className="bigImg"> <img src={imglists[imgIndex].src} /></div>
        </div>
      </div>
    );
  }
}

pageComponent.propTypes = {

};
export default pageComponent;
