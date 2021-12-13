import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './toiletImg.less';
import tabStore from 'store/tablestore';
import 'animate.css';

const store = new tabStore();
@observer
class PageComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toeletlist: []
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appext/lavatory/monitor/toiletstatus',
      method: 'POST',
      data: {

      },
      successFn(data) {
        that.setState({ toeletlist: data.data });
        if (that.timer1) {
          clearTimeout(that.timer1);
        }
        that.timer1 = setTimeout(() => {
          that.fetch();
        }, 60*1000);
      }
    };
    store.handleNormalt(param);
  }

  render() {
    const { monitorBg,rightData } = this.props;
   const { toeletlist } = this.state;
   // const toeletlist = [
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 68,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 91,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 113,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 136,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 159,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 181,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 203,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:15,
   //     topy: 226,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:68,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:91,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:114,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:136,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:159,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:181,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:204,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:227,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:359,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:381,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:403,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:426,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:449,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:472,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:494,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:517,
   //     topy: 17,
   //     occupied:0,
   //     sos:0
   //   }
   //   ,
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 389,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 412,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 434,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 457,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 480,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 502,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 525,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 547,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:637,
   //     topy: 412,
   //     occupied:0,
   //     sos:0
   //   }
   //
   //   ,
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 392,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 415,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 437,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 459,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 481,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 503,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 525,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:869,
   //     topy: 547,
   //     occupied:0,
   //     sos:0
   //   }
   //
   //   ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:746,
   //     topy: 571,
   //     occupied:0,
   //     sos:0
   //   } ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:769,
   //     topy: 571,
   //     occupied:0,
   //     sos:0
   //   } ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:791,
   //     topy: 571,
   //     occupied:0,
   //     sos:0
   //   } ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:746,
   //     topy: 620,
   //     occupied:0,
   //     sos:0
   //   } ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:768,
   //     topy: 620,
   //     occupied:0,
   //     sos:0
   //   } ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:791,
   //     topy: 620,
   //     occupied:0,
   //     sos:0
   //   }
   //
   //   ,
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 671,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 693,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 716,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 739,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 761,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 784,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 807,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:639,
   //     topy: 830,
   //     occupied:0,
   //     sos:0
   //   }
   //
   //   ,
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 671,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 693,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 716,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 739,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 761,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 784,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 807,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 45,
   //     height: 18,
   //     lineHeight: 18,
   //     topx:876,
   //     topy: 830,
   //     occupied:0,
   //     sos:0
   //   }
   //
   //   ,
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:692,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:716,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:737,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:760,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:782,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:805,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:828,
   //     topy: 851,
   //     occupied:0,
   //     sos:0
   //   },
   //   {
   //     width: 18,
   //     height: 45,
   //     lineHeight: 45,
   //     topx:851,
   //     topy: 851,
   //     occupied:1,
   //     sos:0
   //   }
   // ]
    return (
      <div id="imgWrap" className="toilet">
        <img id="monitorBg" className="monitorBg" src={monitorBg} alt="" />
        <div className="Identification">
          <div className="IdentificationOne">
            <span className="spColor" style={{background:'#FA6067'}}></span>正在使用
          </div>
          <div className="IdentificationOne">
            <span className="spColor" style={{background:'#00FFAE'}}></span>空闲
          </div>
          <div className="IdentificationOne">
            <span className="spColor" style={{background:'#FF8400'}}></span>清洁呼叫
          </div>
        </div>
        <div className="desc">
          <div className="descLeft">
            <div className="descLeftMan">
                <span className="descLeftIcon">
                  <img src={require('images/ic_men.png')} />
                </span>
                <span className="descLeftTxt">
                  <span className="descLeftTxtTop">男厕剩余</span>
                  <span className="descLeftTxtBottom">{rightData!==null ?rightData.male:''}</span>
                </span>
            </div>
            <div className="descLeftWoman">
              <span className="descLeftIcon">
                  <img src={require('images/ic_women.png')} />
                </span>
              <span className="descLeftTxt">
                  <span className="descLeftTxtTop">女厕剩余</span>
                  <span className="descLeftTxtBottom">{rightData!==null ?rightData.female:''}</span>
                </span>
            </div>

          </div>
          <div className="descRight">
            <div className="descRightTit">清洁呼叫信息</div>
            {/*<div className="descRightNum">F011</div>*/}
          </div>
        </div>
        <div className="womanList">
          {
            toeletlist.length ? toeletlist.map((item, index) => {
              const tempFont = item.width * 0.3 < 16 ? 16 : item.width * 0.3;
              const tempStyle = {
                width: `${item.width}px`,
                height: `${item.height}px`,
                lineHeight: `${item.height}px`,
                left: `${item.topx}px`,
                top: `${item.topy}px`,
                fontSize: `${tempFont}px`,
                background: item.occupied ? '#FA6067' : '#00FFAE',
                color: item.sos ? '#D2EB26' : '#021545'
              };


              return (<div key={index}><span className="signalSp" style={tempStyle}></span><span style={Object.assign({}, tempStyle, { display: item.sos ? 'inline-block' : 'none' })} className="sosSp animated infinite flash delay-2s">SOS</span></div>);
            }) : ''
          }

        </div>
        <div className="manList" />
      </div>

    );
  }
}

PageComponent.propTypes = {
  monitorBg: PropTypes.string.isRequired
};

export default PageComponent;
