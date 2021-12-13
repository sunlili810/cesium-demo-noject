import React, { Component } from 'react';
import {
  AlertOutlined
} from '@ant-design/icons';
import './index.less';
import moment from 'moment';
import tabStore from 'store/tablestore';

const store = new tabStore();
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmsData: []
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
      url: '/appm/qos/alarm/current/pagequeryalarm',
      method: 'post',
      data: {
        startdate: moment(moment().valueOf() - 604800000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn(data) {
        that.setState({
          alarmsData: data.alarms
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
    const { alarmsData } = this.state;

    const tempData = alarmsData.length && alarmsData.length >= 4 ? alarmsData.slice(0, 4) : alarmsData;

    // const alarmsData = [{
    //   alarmid: 'A8470809888936880324',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: '井盖翻转角度超过阈值',
    //   deveui: '004a770064c00007',
    //   devtype: 'claa_dc20_xx_xxxx_v0',
    //   typename: 'DC智能井盖(DC20).V0',
    //   alarmtime: '2021-03-15 14:05:02',
    //   descp: '',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: null,
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: '004a770064c00007',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A8645269842679548374',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: '井盖翻转角度超过阈值',
    //   deveui: '004a77006200ffbb',
    //   devtype: 'claa_dc20_xx_xxxx_v0',
    //   typename: 'DC智能井盖(DC20).V0',
    //   alarmtime: '2021-03-05 10:29:10',
    //   descp: '',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: null,
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: '004a77006200ffbb',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A5951481173944143738',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: 'cat.1gb10pt位置变动超过12701971米',
    //   deveui: '004a7700620008e7',
    //   devtype: 'gprs_claa_temp_tgr10',
    //   typename: 'GPRS.CAT1定位测温终端.CLAA',
    //   alarmtime: '2021-02-23 14:53:41',
    //   descp: 'cat.1gb10pt位置变动超过12701971米',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: '原来坐标[0.0, 0.0], 新坐标[31.978039, 118.780098].',
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: 'cat.1gb10pt',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A9204827965430438383',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: 'cat.1gb10pt位置变动超过985米',
    //   deveui: '004a7700620008e7',
    //   devtype: 'gprs_claa_locanchor',
    //   typename: 'GPRS.CAT1蓝牙定位锚点.CLAA',
    //   alarmtime: '2021-02-04 09:14:46',
    //   descp: 'cat.1gb10pt位置变动超过985米',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: '原来坐标[-0.006004, -0.006505], 新坐标[0.0, 0.0].',
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: 'cat.1gb10pt',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A8619379842938872143',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: '水浸告警',
    //   deveui: '1@004a77006200054a',
    //   devtype: 'sensor_watersense',
    //   typename: '水浸监测',
    //   alarmtime: '2021-01-15 16:31:18',
    //   descp: '',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: null,
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: 'slot1_54a',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A6044717671998805419',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: 'Have persons',
    //   deveui: '0@004a770062c001a1',
    //   devtype: 'sensor_ws_pyroelecmod_zrd09',
    //   typename: 'ZRD09热释电模组.W.S',
    //   alarmtime: '2020-12-30 15:38:59',
    //   descp: '',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: null,
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: 'slot0_1a1',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A7483905483669597984',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: '004a770062000786位置变动超过12701961米',
    //   deveui: '004a770062000786',
    //   devtype: 'gprs_claa_locanchor',
    //   typename: 'GPRS.CAT1蓝牙定位锚点.CLAA',
    //   alarmtime: '2020-12-16 15:34:53',
    //   descp: '004a770062000786位置变动超过12701961米',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: '原来坐标[0.0, 0.0], 新坐标[31.978056, 118.779999].',
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: '004a770062000786',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: null,
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A8779056721272547415',
    //   alarmlevel: 1,
    //   alarmcode: '1',
    //   typeflag: 1,
    //   title: 'Have persons',
    //   deveui: '0@004a770062c000d4',
    //   devtype: 'sensor_ws_pyroelecmod_zrd09',
    //   typename: 'ZRD09热释电模组.W.S',
    //   alarmtime: '2020-09-10 18:05:44',
    //   descp: '',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: null,
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: '0000',
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: '',
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }, {
    //   alarmid: 'A6050341276188032920',
    //   alarmlevel: 1,
    //   alarmcode: '2',
    //   typeflag: 1,
    //   title: 'current is overstep:610.16',
    //   deveui: '004a7728ba00042d',
    //   devtype: 'yadian_airswitch',
    //   typename: '空气开关V0.Y.D',
    //   alarmtime: '2020-09-07 11:21:07',
    //   descp: '',
    //   cleartime: null,
    //   confirmstate: 0,
    //   confirmtime: null,
    //   confirmer: null,
    //   remark: null,
    //   codetype: 1,
    //   projectid: 'T20180724P1001',
    //   devname: null,
    //   confirmrst: 0,
    //   confirmmsg: null,
    //   relaobjid: null,
    //   relaobjtype: 0,
    //   relaobjname: null,
    //   extattr: null,
    //   addr: null,
    //   gpslon: 0.0,
    //   gpslat: 0.0
    // }];
    return (
      <div className="alarmListPage">
        <div className="comTit"><AlertOutlined />历史告警列表</div>
        <div className="alarmListCont">
          {
            tempData.map(item => (
              <div className="listOne" key={item.alarmid}>
                <div className="time"><span className="tipColor" style={{ background: item.confirmstate === 2 || item.confirmstate === 3 || item.confirmstate === 4 ? '#7E7E7E' : '#D95A5A' }} />{item.alarmtime}</div>
                <div className="tip">
                  <div className="tipCont">{item.title}</div>
                  <div className="status">当前状态：{item.confirmstate === 0 ? '未确认' : item.confirmstate === 1 ? '告警' : item.confirmstate === 2 ? '误报' : item.confirmstate === 3 ? '已恢复' : item.confirmstate === 4 ? '其它' : ''}</div>
                </div>
                <div className="desc">预警内容：{item.descp}</div>
              </div>
            ))
          }

        </div>
      </div>
    );
  }
}

export default PageComponent;
