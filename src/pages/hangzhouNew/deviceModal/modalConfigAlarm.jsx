import React, { Component } from 'react';
import {
  Modal,
  Radio, Slider, Switch, Table
} from 'antd';
import './deviceModal.less';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import dynamicTablestore from 'store/tablestore';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import Flvjs from 'flv.js';
import { CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import $ from 'jquery';
// import audioSrc from 'media/alert.mp3';
import VideoMonitor from '../videoMonitor';

const store = new dynamicTablestore();

// @observer

class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.mediaRef = React.createRef();
    this.state = {
      size: '1',
      videoVal: null,
      videoFlag: false,
      selectedRows: [],
      alarmData: [],
      showAudioFlag: false,
      playmediaData: null
    };
    this.media = null;
    this.columns = [{
      title: '序号',
      dataIndex: 'numb',
      key: 'numb'
    }, {
      title: '报警时间',
      dataIndex: 'alarmtime',
      key: 'alarmtime',
      width: 100
    }, {
      title: '设备编号',
      dataIndex: 'alarmcode',
      key: 'alarmcode'
    }, {
      title: '报警类型',
      dataIndex: 'typename',
      key: 'typename'
    }, {
      title: '确认状态',
      dataIndex: 'confirmstateDesc',
      key: 'confirmstateDesc'
    },
    {
      title: '操作',
      dataIndex: 'key',
      key: 'key',
      // width: 100,
      render: (text, record, index) => (
        <span>
          {/* { */}
          {/*  record.confirmstate!==0 ? (<a className="unconfirmOp" onClick={() => { this.showEdit(text, record, index); }}>已处理</a>):(<a className="confirmOp" onClick={() => { this.showEdit(text, record, index); }}>未处理</a>) */}
          {/* } */}
          {/* { */}
          {/*  record.descp !== ''&&record.descp !== null ? (<a className="unconfirmOp" onClick={() => { this.recordFn(text, record, index); }}>播放</a>):'' */}
          {/* } */}

          <a className="unconfirmOp" onClick={() => { this.recordFn(text, record, index); }}>播放</a>

        </span>
      )
    }
    ];
  }

  componentDidMount() {
    this.fetchSummary();
  }

  // componentWillUnmount() {
  //   if(this.media.play){
  //     this.media.pause();
  //   }
  //   console.log(222222)
  // }


  fetchSummary(deveui) {
    const that = this;
    // this.setState({deveui});
    const param = {
      loadingFlag: false,
      url: '/appm/qos/alarm/his/pagequeryalarm',
      // url: '/icpas/emergency/playmedia',
      method: 'get',
      data: {
        fm_curalarm_devtype: 'claa_emergency_alarm',
        startdate: moment(moment().valueOf() - 604800000).format('YYYY-MM-DD'),
        enddate: moment().format('YYYY-MM-DD')
      },
      successFn(data) {
        that.setState({
          alarmData: data.alarms
        });
      }
    };
    store.handleNormal(param);
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };


  handleVideoChange(e) {
    this.setState({
      videoVal: e.target.value
    });
  }


  onChangeSwitch(size, lightid, flag, checked) { // 开关请求
    // console.log(`size=====${size}`);
    // console.log(`lightid=====${lightid}`);
    // console.log(`checked=====${checked}`);
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/lamp/light/cmd/lightctr',
      method: 'post',
      data: {
        lightid,
        lightno: size,
        status: flag === 1 ? checked ? 1 : 0 : 0,
        level: flag !== 1 ? checked : 0
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props.param;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  fetch = (params = {}) => {
    const { searchFilter } = this.state;
    const queryParam = {
      loadingFlag: false,
      url: '/combo/alarm/current/list',
      method: 'get',
      data: {
        numPerPage: 10,
        page: store.dataObj.pagination.current,
        // filter: searchFilter,
        ...searchFilter,
        ...params
      }
    };
    store.fetchTabData(queryParam);
  };

  handleTableChange = (pagination, filters, sorter) => {
    store.dataObj.pagination.current = pagination.current;
    store.dataObj.pagination.pageSize = pagination.pageSize;
    this.fetch(sorter.field === undefined ? {} : {
      sort: [{
        name: sorter.field,
        sort: sorter.order === 'ascend' ? 'asc' : 'desc'
      }]
    });
  };

  recordFn(text, record, index) {
    const that = this;
    // const { showAudioFlag } = this.state;
    that.setState({ showAudioFlag: false });
    const param = {
      loadingFlag: false,
      url: '/icpas/emergency/playmedia',
      method: 'get',
      data: {
        alarmid: record.alarmid
      },
      successFn(data) {
        that.mediaRef.current.src = data.url;
        if (data.url !== null && data.url !== '') {
          that.setState({ showAudioFlag: true, playmediaData: data });
          that.play();
        } else {
          // $('#play').html('暂无!');
          that.pause();
        }
      }
    };
    store.handleNormal(param);
  }

  handleSlide(resid, value) {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/icpas/emergency/setvoice',
      method: 'post',
      data: {
        resid,
        level: value
      },
      successFn(data) {
        Modal.success({
          content: '指令已下发！'
        });
        const { fetchBasedata } = that.props.param;
        fetchBasedata('refresh');
      }
    };
    store.handleNormal(param);
  }

  play() {
    const that = this;
    const media = $('#media')[0].play();
    if (media !== undefined) {
      media.then((_) => {
        that.media.play();
      }).catch((error) => {
        // Autoplay was prevented.
      });
    }
  }

  pause() {
    const media = $('#media')[0];
    media.pause();
  }

  render() {
    const { baseData, markData } = this.props.param;
    const {
      selectedRowKeys, alarmData, showAudioFlag, playmediaData
    } = this.state;
    // const lamp_holder = parseInt(markData?.lamp_holder || 0);
    const tempData = baseData?.alarm;
    // const currentRad = videoVal === null ? baseData?.video?.[0]?.info?.deveui : videoVal;
    // const tempData = baseData?.video.filter(item => item.info.deveui === currentRad);


    // const datasorce = store.dataObj.list.slice();
    // const tempDataList = Array.from(datasorce, item => ({
    //   ...item
    // }));
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const tempDataList = Array.from(alarmData, (item, index) => ({
      numb: index + 1,
      key: item.alarmid,
      ...item,
      confirmstateDesc: item.confirmstate === 1 ? '已确认' : '未确认'
    }));


    return (
      <div className="deviceModal" style={{ position: 'relative' }}>
        <div style={{
          fontSize: '16px', fontWeight: 'bold', color: '#fff', height: '30px', lineHeight: '30px', marginBottom: '15px'
        }}
        >设备概览
        </div>
        <div className="rightM" style={{ width: '100%', margin: '0' }}>
          {/* <Radio.Group size="small" key={videoVal} value={currentRad} onChange={this.handleVideoChange}> */}
          {/*  { */}
          {/*    baseData?.video.length ? baseData.video.map(item => (<Radio.Button key={item?.info?.deveui} value={item?.info?.deveui}>{item?.info?.devname}</Radio.Button>)) : '' */}
          {/*   } */}
          {/* </Radio.Group> */}

          <div className="lightTwo">
            <div className="listonecont" style={{ color: '#fff' }}>

              <div style={{ display: 'inline-block', width: '48%', fontSize: '12px' }}>
                <div style={{
                  height: '35px', lineHeight: '35px', marginTop: '10px', overflow: 'hidden'
                }}
                >
                  {/* <span style={{ */}
                  {/*  display: 'inline-block', verticalAlign: 'top' */}
                  {/* }} */}
                  {/* >设备名称： */}
                  {/* </span> */}
                  {/* <div */}
                  {/*  title={tempData?.[0]?.info?.devname} */}
                  {/*  style={{ */}
                  {/*    display: 'inline-block', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' */}
                  {/*  }} */}
                  {/* > */}
                  {/*  {tempData?.[0]?.info?.devname} */}
                  {/* </div> */}


                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备名称：
                    <div className="modalTxt" title={tempData?.[0]?.info?.devname}>
                      {tempData?.[0]?.info?.devname}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>供应商：
                    <div className="modalTxt" title={tempData?.[0]?.info?.ext?.supplier}>
                      {tempData?.[0]?.info?.ext?.supplier}
                    </div>
                  </span>


                </div>

                <div style={{
                  height: '35px', lineHeight: '35px', overflow: 'hidden'
                }}
                >
                  {/* <span style={{ */}
                  {/*  display: 'inline-block', verticalAlign: 'top' */}
                  {/* }} */}
                  {/* >设备编号： */}
                  {/* </span> */}
                  {/* <div */}
                  {/*  title={tempData?.[0]?.info?.deveui} */}
                  {/*  style={{ */}
                  {/*    display: 'inline-block', maxWidth: '120px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' */}
                  {/*  }} */}
                  {/* > */}
                  {/*  {tempData?.[0]?.info?.deveui} */}
                  {/* </div> */}


                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备编号：
                    <div className="modalTxt" title={tempData?.[0]?.info?.deveui}>
                      {tempData?.[0]?.info?.deveui}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>
                    设备品牌：
                    <div className="modalTxt" style={{ maxWidth: '110px' }} title={tempData?.[0]?.info?.ext?.brand}>
                      {tempData?.[0]?.info?.ext?.brand}
                    </div>
                  </span>

                </div>

                <div style={{
                  height: '35px', lineHeight: '35px', overflow: 'hidden'
                }}
                >

                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备类型：
                    <div className="modalTxt" title={tempData?.[0]?.info?.devtypename}>
                      {tempData?.[0]?.info?.devtypename}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>
                    设备状态：
                    <div className="modalTxt" style={{ maxWidth: '110px' }}>
                      {tempData?.[0]?.eqstate === '1' || tempData?.[0]?.eqstate === 1 ? '在线' : tempData?.[0]?.eqstate === '2' || tempData?.[0]?.eqstate === 2 ? '离线' : ''}
                    </div>
                  </span>
                </div>

                <div style={{
                  height: '35px', lineHeight: '35px', overflow: 'hidden'
                }}
                >

                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >序列号：
                    <div className="modalTxt" title={tempData?.[0]?.info?.ext?.serialnum}>
                      {tempData?.[0]?.info?.ext?.serialnum}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>
                    电源状态：
                    <div className="modalTxt" style={{ maxWidth: '110px' }}>
                      {tempData?.[0]?.powerstate === '1' || tempData?.[0]?.powerstate === 1 ? '开' : tempData?.[0]?.powerstate === 0 || tempData?.[0]?.powerstate === '0' ? '关' : ''}
                    </div>
                  </span>
                </div>


                {/* <div style={{ lineHeight: '26px' }}> */}
                {/*  <span style={{ */}
                {/*    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top' */}
                {/*  }} */}
                {/*  >供应商：{tempData?.[0]?.info?.devname} */}
                {/*  </span> */}
                {/*  <span style={{ display: 'inline-block', width: '45%' }}>设备品牌：{tempData?.[0]?.info?.devname}</span> */}
                {/* </div> */}

                <div style={{ height: '35px', lineHeight: '35px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >所属灯杆编号：
                    <div className="modalTxt" title={markData?.devname} style={{ width: '110px' }}>
                      {markData?.devname}
                    </div>
                  </span>
                  <span style={{ display: 'inline-block', width: '45%' }}>
                    音量大小：
                    <div className="modalTxt" style={{ maxWidth: '110px' }}>
                      {tempData?.[0]?.meas?.level}
                    </div>
                  </span>
                </div>

                <div style={{ height: '35px', lineHeight: '35px' }}>
                  <span style={{
                    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top'
                  }}
                  >设备型号：
                    <div className="modalTxt" title={tempData?.[0]?.info?.ext?.eqmodel}>
                      {tempData?.[0]?.info?.ext?.eqmodel}
                    </div>
                  </span>
                </div>


                <div style={{ marginTop:'15px',fontSize:'16px' }}>音量调节

                </div>
                <div style={{ height: '35px', lineHeight: '35px' }}>
                  <div style={{
                    display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle'
                  }}
                  >
                    <Slider
                      min={0}
                      max={15}
                      defaultValue={tempData?.[0]?.meas?.level}
                      disabled={false}
                      onAfterChange={this.handleSlide.bind(this, tempData?.[0]?.info?.deveui)}
                    />
                  </div>
                </div>

                {/* <div style={{ margin: '10px 0', fontSize: '16px' }}>电源控制</div> */}
                {/* <div style={{ margin: '0 0 10px 0' }}> */}
                {/*  <Switch */}
                {/*    checkedChildren="开启" */}
                {/*    unCheckedChildren="关闭" */}
                {/*    // defaultChecked={currentLight?.[`workStatus${size}`] === 1} */}
                {/*    // onChange={this.onChangeSwitch.bind(this, size, markData?.deveui, 1)} */}
                {/*  /> */}

                {/*  <span */}
                {/*    className="btn-monitor" */}
                {/*    style={{ */}
                {/*      marginLeft: '15px', width: '50px', height: '24px', lineHeight: '24px' */}
                {/*    }} */}
                {/*  >重启 */}
                {/*  </span> */}

                {/* </div> */}

              </div>

              <div style={{
                display: 'inline-block', width: '50%', verticalAlign: 'top', fontSize: '12px'
              }}
              >
                {/* <div className="">音量控制：0~15 */}
                {/*  <div style={{ */}
                {/*    display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle', marginLeft: '15px' */}
                {/*  }} */}
                {/*  > */}
                {/*    <Slider */}
                {/*      min={0} */}
                {/*      max={15} */}
                {/*      defaultValue={tempData?.[0]?.meas?.status} */}
                {/*      disabled={false} */}
                {/*      onAfterChange={this.handleSlide.bind(this, tempData?.[0]?.info?.deveui)} */}
                {/*    /> */}
                {/*  </div> */}
                {/* </div> */}
                <div style={{ margin: '10px 0', fontSize: '13px' }}>报警记录</div>
                <div>
                  <Table
                    className="alarmTab"
                    columns={this.columns}
                    bordered
                    dataSource={tempDataList}
                    pagination={false}
                    style={{ fontSize: '11px' }}
                    // pagination={store.dataObj.pagination}
                    // scroll={{ x: 2400, y: 'calc(80vh - 140px)' }}
                    // onChange={this.handleTableChange}
                  />
                </div>
              </div>


              {/* <div style={{ lineHeight: '26px', marginTop: '10px' }}> */}
              {/*  <span style={{ */}
              {/*    display: 'inline-block', width: '100%', marginRight: '10px', verticalAlign: 'top' */}
              {/*  }} */}
              {/*  >设备名称：{tempData?.[0]?.info?.devname} */}
              {/*  </span> */}

              {/* </div> */}

              {/* <div style={{ lineHeight: '26px' }}> */}
              {/*  <span style={{ */}
              {/*    display: 'inline-block', width: '100%', marginRight: '10px', verticalAlign: 'top' */}
              {/*  }} */}
              {/*  >设备编号：{tempData?.[0]?.info?.deveui} */}
              {/*  </span> */}
              {/* </div> */}

              {/* <div style={{ lineHeight: '26px' }}> */}
              {/*  <span style={{ */}
              {/*    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top' */}
              {/*  }} */}
              {/*  >设备类型：{tempData?.[0]?.info?.devtypename} */}
              {/*  </span> */}
              {/*  <span style={{ display: 'inline-block', width: '45%' }}>状态：{tempData?.[0]?.meas?.status === 1 ? '正常' : '异常'}</span> */}
              {/* </div> */}

              {/* /!* <div style={{ lineHeight: '26px' }}> *!/ */}
              {/* /!*  <span style={{ *!/ */}
              {/* /!*    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top' *!/ */}
              {/* /!*  }} *!/ */}
              {/* /!*  >供应商：{tempData?.[0]?.info?.devname} *!/ */}
              {/* /!*  </span> *!/ */}
              {/* /!*  <span style={{ display: 'inline-block', width: '45%' }}>设备品牌：{tempData?.[0]?.info?.devname}</span> *!/ */}
              {/* /!* </div> *!/ */}

              {/* <div style={{ lineHeight: '26px' }}> */}
              {/*  <span style={{ */}
              {/*    display: 'inline-block', width: '50%', marginRight: '10px', verticalAlign: 'top' */}
              {/*  }} */}
              {/*  >音量大小： */}
              {/*  </span> */}
              {/* </div> */}


              {/* /!* <div style={{ margin: '10px 0', fontSize: '16px' }}>电源控制</div> *!/ */}
              {/* /!* <div style={{ margin: '0 0 10px 0' }}> *!/ */}
              {/* /!*  <Switch *!/ */}
              {/* /!*    checkedChildren="开启" *!/ */}
              {/* /!*    unCheckedChildren="关闭" *!/ */}
              {/* /!*    // defaultChecked={currentLight?.[`workStatus${size}`] === 1} *!/ */}
              {/* /!*    // onChange={this.onChangeSwitch.bind(this, size, markData?.deveui, 1)} *!/ */}
              {/* /!*  /> *!/ */}

              {/* /!*  <span *!/ */}
              {/* /!*    className="btn-monitor" *!/ */}
              {/* /!*    style={{ *!/ */}
              {/* /!*      marginLeft: '15px', width: '50px', height: '24px', lineHeight: '24px' *!/ */}
              {/* /!*    }} *!/ */}
              {/* /!*  >重启 *!/ */}
              {/* /!*  </span> *!/ */}

              {/* /!* </div> *!/ */}
              {/* <div className="">音量控制：0~15 */}
              {/*  <div style={{ */}
              {/*    display: 'inline-block', width: '30%', position: 'relative', verticalAlign: 'middle', marginLeft: '15px' */}
              {/*  }} */}
              {/*  > */}
              {/*    <Slider */}
              {/*      min={0} */}
              {/*      max={15} */}
              {/*      defaultValue={tempData?.[0]?.meas?.status} */}
              {/*      disabled={false} */}
              {/*      onAfterChange={this.handleSlide.bind(this, tempData?.[0]?.info?.deveui)} */}
              {/*    /> */}
              {/*  </div> */}
              {/* </div> */}


              {/* <div style={{ margin: '10px 0', fontSize: '16px' }}>报警记录</div> */}
              {/* <div> */}
              {/*  <Table */}
              {/*    className="alarmTab" */}
              {/*    columns={this.columns} */}
              {/*    bordered */}
              {/*    dataSource={tempDataList} */}
              {/*    pagination={false} */}
              {/*    // pagination={store.dataObj.pagination} */}
              {/*    // scroll={{ x: 2400, y: 'calc(80vh - 140px)' }} */}
              {/*    // onChange={this.handleTableChange} */}
              {/*  /> */}
              {/* </div> */}


            </div>
          </div>

        </div>


        <div className="audio" style={{ display: showAudioFlag ? 'block' : 'none', textAlign: 'right', paddingRight: '22px' }}>
          <div id="audioControl">
            <div className="play">
              <span id="play" style={{ color: '#fff', paddingTop: '5px' }} />
            </div>
          </div>
          {
            playmediaData?.retRemark === '.mp4' ? (
              <video ref={this.mediaRef} width="320" height="240" controls autoPlay src={playmediaData?.url}>
                <source src="" type="video/mp4" />
              </video>
            ) : playmediaData?.retRemark !== '' ? (
              <audio ref={this.mediaRef} src={playmediaData?.url} preload="auto" id="media" controls autoPlay style={{ width: '100px', height: '30px', marginTop: '10px' }}>
                <source src="" />
                {/* <source src="http://192.168.8.36:80/recordings/talk-3-1.2021-08-10-14-35-45.wav" /> */}
              </audio>
) : ''
          }


        </div>

      </div>
    );
  }
}

modalComponent.propTypes = {
  param: PropTypes.object.isRequired,
  onTrigger: PropTypes.func.isRequired
};

export default modalComponent;
