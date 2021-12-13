import React, { Component } from 'react';
import img02 from 'images/img02.png';
import img03 from 'images/img03.png';
import img04 from 'images/img04.png';




class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
  }


  render() {
    return (
      <div className="borderLine">
        <img src={img02} style={{position:'absolute',left:'0',top:'0',width:'68px',height:'55px'}} />
        <img src={img03} style={{position:'absolute',right:'0',top:'0',width:'76px',height:'57px'}} />
        <img src={img04} style={{position:'absolute',right:'0',bottom:'0',width:'64px',height:'55px'}} />

      </div>
    );
  }
}

export default PageComponent;
