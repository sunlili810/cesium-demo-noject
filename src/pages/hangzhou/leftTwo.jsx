import React, { Component } from 'react';
import { Carousel } from 'antd';
import './index.less';
import {
  BarsOutlined
} from '@ant-design/icons';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: [],
      onlineData: null
    };
  }

  componentDidMount() {
    this.fetchSummary();
    this.fetch();
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
      url: '/appm/home/qrydevtotalnumperdevtp',
      method: 'post',
      data: {

      },
      successFn(data) {
        that.setState({
          summaryData: data
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

  fetch() {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/appm/home/qrystatisticsnum',
      method: 'post',
      data: {
        // days:7
      },
      successFn(data) {
        that.setState({ onlineData: data });
      }
    };
    store.handleNormal(param);
  }

  onChange(a, b, c) {
    console.log(a, b, c);
  }


  render() {
    const { summaryData, onlineData } = this.state;
    const result = [];
    // const pics = [{
    //   devtpId: 'claa_gsp',
    //   devtpNm: 'GSP/SSP',
    //   devtpCategory: '智慧城市',
    //   devNum: 627
    // }, {
    //   devtpId: 'sensor_raw_digitalcard_dio20v30',
    //   devtpNm: '裸数字子卡DIO20(V30).GSP/SSP ',
    //   devtpCategory: '工业物联网应用',
    //   devNum: 194
    // }, {
    //   devtpId: 'xinshanying_smoke_v2',
    //   devtpNm: '智能烟雾感应器V2.X.S.Y',
    //   devtpCategory: '智慧消防',
    //   devNum: 68
    // }, {
    //   devtpId: 'sensor_aic_crackdetector_zj_v0',
    //   devtpNm: 'AIC智能裂缝探测.Z.J.V0',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 54
    // }, {
    //   devtpId: 'sensor_noise_monitor',
    //   devtpNm: '噪声检测传感器',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 41
    // }, {
    //   devtpId: 'sensor_co2_monitor',
    //   devtpNm: '二氧化碳CO2检测',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 33
    // }, {
    //   devtpId: 'sensor_pressure_humiture',
    //   devtpNm: '微型气压/温湿度 ATH10',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 33
    // }, {
    //   devtpId: 'sensor_md_airswitch_v2',
    //   devtpNm: '曼顿智能空开V2.M.D',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 31
    // }, {
    //   devtpId: 'sensor_ll_lxlgy_watermeter',
    //   devtpNm: '智能水表(LXLGY系列).L.L',
    //   devtpCategory: '智慧园区',
    //   devNum: 29
    // }, {
    //   devtpId: 'sensor_ws_pyroelecmod_zrd09',
    //   devtpNm: 'ZRD09热释电模组.W.S',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 26
    // }, {
    //   devtpId: 'claa_temp_humd',
    //   devtpNm: '温湿度计.CLAA',
    //   devtpCategory: '智慧城市',
    //   devNum: 24
    // }, {
    //   devtpId: 'claa_watersensor',
    //   devtpNm: '智能水感.CLAA',
    //   devtpCategory: '智慧城市',
    //   devNum: 23
    // }, {
    //   devtpId: 'sensor_aio12_photosyneffectradia',
    //   devtpNm: '光合有效辐射传感器（AIO12）',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 23
    // }, {
    //   devtpId: 'sensor_dpkj_soil_ph',
    //   devtpNm: '土壤PH值监测D.P.K.J',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 22
    // }, {
    //   devtpId: 'sensor_liquid_level_v2',
    //   devtpNm: '液位监测传感器V2（PR10）',
    //   devtpCategory: '通用物联网应用',
    //   devNum: 22
    // }];

    for (let i = 0, len = summaryData.length; i < len; i += 10) {
      result.push(summaryData.slice(i, i + 10));
    }
    return (
      <div className="leftTwoPage">
        <div className="comTit"><BarsOutlined />设备总览</div>
        <div className="carouselWrap">
          <Carousel autoplay={false}>

            {
              result.map((item, index) => {
                const tempHtml = item.map(item2 => (
                  <div className="listOne" key={item2.devtpId}>
                    <div className="tit">{item2.devtpNm}</div>
                    <div className="num"><span>{item2.devNum}</span>个</div>
                  </div>
                ));
                return (
                  <div key={index}>
                    {tempHtml}
                    <div className="listOne listOneLight">
                      <div className="tit">亮灯率</div>
                      <div className="num"><span>{onlineData !== null ? (onlineData.lightupnum / onlineData.lightnum * 100).toFixed(1) : 0}</span>%</div>
                      <div className="lightPer">亮灯数:{onlineData !== null ? onlineData.lightupnum : 0} 总数:{onlineData !== null ? onlineData.lightnum : 0}</div>
                    </div>
                  </div>
                );
              })
            }


            {/* <div className="listOne"> */}
            {/*  <div className="tit">灯杆</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">照明</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">监控</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">气象</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">大屏</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">广播</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">报警</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">充电桩</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}

            {/* <div className="listOne"> */}
            {/*  <div className="tit">WIFI</div> */}
            {/*  <div className="num"><span>20</span>个</div> */}
            {/* </div> */}


          </Carousel>
        </div>

      </div>
    );
  }
}

export default PageComponent;
