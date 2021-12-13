import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Carousel,Image
} from 'antd';
import './ipInput.less';
import circle from 'images/circle.png';
import confirm_icon from 'images/confirm-icon.png';
import confirm_close from 'images/confirm-close.png';
import partial_discharge_sensor from 'images/partial_discharge_sensor.png';


class pageComponent extends Component {
  constructor(props) {
    super(props);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.myRef = React.createRef();

  }
  componentDidMount() {

  }

  handlePrev=(e)=>{

    this.myRef.current.prev();
  }

  handleNext = (e) => {
    console.log(e);
    this.myRef.current.next();
  }


  render() {
    const { initialValue } = this.props;
    const tempInitvalue = initialValue !== undefined ? initialValue.split('.') : ['', '', '', ''];
    return (
      <div className="imgviewpage">
        <div onClick={this.handlePrev}>上一个</div>
        <div onClick={this.handleNext}>下一个</div>
        <div className="imgList">
          <Carousel autoplay={false} ref={this.myRef}>

            <div  style={{ height: '100%' }}>
              <Image.PreviewGroup>
                <Image
                  width={200}
                  src={circle}
                />
                <Image
                  width={200}
                  src={confirm_icon}
                />
                <Image
                  width={200}
                  src={confirm_close}
                />
              </Image.PreviewGroup>
            </div>
            <div  style={{ height: '100%' }}>
              <img
                width={200}
                src={partial_discharge_sensor}
              />

            </div>

          </Carousel>
        </div>
      </div>
    );
  }
}

pageComponent.propTypes = {

};
export default pageComponent;
