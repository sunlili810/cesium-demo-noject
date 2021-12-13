import React, { Component } from 'react';
import { observer } from 'mobx-react';
import modal from 'components/modal/modal';
import tabstore from 'store/tablestore';
import {
  Table, Modal, Image
} from 'antd';
import TabHead from './tabHead';
import './index.less';

import moment from 'moment';

const store = new tabstore();

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      radioVal: '1',
      searchFilter: {
        startTime: moment().startOf('day').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      resid: null,
      photoList: []
    };

    this.loadingDialog = null;
    this.handleRadioChange = this.handleRadioChange.bind(this);

    this.columns = [{
      title: '排序',
      dataIndex: 'key',
      key: 'key'
    }, {
      title: '区域',
      dataIndex: 'areaName',
      key: 'areaName'
    }, {
      title: '设备名称',
      dataIndex: 'devname',
      key: 'devname'
    }, {
      title: '害虫数量',
      dataIndex: 'bugNum',
      key: 'bugNum'
    }, {
      title: '采集时间',
      dataIndex: 'collecttime',
      key: 'collecttime'
    }
    // {
    //   title: '操作',
    //   dataIndex: 'key',
    //   key: 'key',
    //   width: 150,
    //   render: (text, record, index) => (
    //     <span>
    //       {/*<a className="unconfirmOp" onClick={() => { this.showEdit(text, record, index); }}>分析</a>*/}
    //       {/*<Divider type="vertical" />*/}
    //       {/*<a className="unconfirmOp" onClick={() => { this.deletRow(text, record, index); }}>删除</a>*/}
    //     </span>
    //   )
    // }
    ];
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentResid !== this.props.currentResid) {
  //     this.fetch(nextProps.currentResid)
  //   }
  // }
  componentDidUpdate(nextProps, prevState) {
    if (nextProps.currentResid !== this.props.currentResid) {
      this.fetch(this.props.currentResid);
    }
  }

  componentDidMount() {
    const { greenhouseList, currentResid } = this.props;
    // this.fetch(greenhouseList?.[0].resid);
    this.fetch(currentResid);
  }

  fetch = (resid) => {
    const that = this;
    this.setState({
      resid
    });
    const { searchFilter } = this.state;
    const queryParam = {
      loadingFlag: false,
      url: '/appext/smartfarm/fourinfo/insects',
      method: 'post',
      data: {
        numPerPage: 10,
        page: store.dataObj.pagination.current,
        // filter: searchFilter,
        ...searchFilter,
        resid,
        restype: searchFilter.restype === '' ? '' : searchFilter.restype ? searchFilter.restype : this.myRef.current.state.restype
      },
      querySuccess(data) {
        that.setState({ photoList: [] });
        data?.appdata?.bugdata.map((item) => {
          that.fetchPhoto(item.pictureid);
        });
      }
    };
    store.fetchTabDataComo(queryParam);
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

  fetchPhoto = (photoid) => {
    const that = this;
    const queryParam = {
      loadingFlag: false,
      url: '/appext/smartfarm/bigscreen/photorawdataUrlqry',
      method: 'post',
      data: {
        photoid
      },
      successFn(data) {
        const { photoList } = that.state;
        photoList.push({ url: data.url, collecttime: data.collecttime });
        that.setState({
          photoList
        });
      }
    };
    store.handleNormal(queryParam);
  };

  // fetchCanmeraList() {
  //  const that = this;
  //  const params = {
  //    loadingFlag: false,
  //    url: `/combo/dev/list?`,
  //    method: 'get',
  //    data: {
  //      devtype: window.devtype
  //    },
  //    successFn(data) {
  //      that.setState({
  //
  //        cameraList: data.data
  //      });
  //    }
  //  };
  //  store.handleNormal(params);
  // }

  // addUser = () => {
  //  const that = this;
  //  const { cameraList } = this.state;
  //  modal.showModel({
  //    type: 'dialog',
  //    title: '新增',
  //    width: '750px',
  //    Dialog: modalConfig,
  //    ok: (value) => {
  //      const params = {
  //        loadingFlag: false,
  //        url: '/parking/spotcfg/add',
  //        method: 'POST',
  //        data: {
  //          ...value
  //        },
  //        successFn() {
  //          that.fetch();
  //        }
  //      };
  //      store.handleNormal(params);
  //    },
  //    param: {
  //      cameraList
  //    }
  //  });
  // };
  //
  // showEdit = (text, record) => {
  //  const that = this;
  //  const { cameraList } = this.state;
  //  modal.showModel({
  //    type: 'dialog',
  //    title: '编辑',
  //    width: '750px',
  //    Dialog: modalConfig,
  //    ok: (value) => {
  //      const params = {
  //        loadingFlag: false,
  //        url: '/parking/spotcfg/mod',
  //        method: 'POST',
  //        data: {
  //          ...value
  //        },
  //        successFn() {
  //          that.fetch();
  //          // that.fetch({ filter: that.searchList.filter });
  //        }
  //      };
  //      store.handleNormal(params);
  //    },
  //    param: {
  //      ...record,
  //      cameraList
  //    }
  //  });
  // };
  //
  deletRow = (text, record) => {
    const that = this;
    const param = {
      url: '/parking/spotcfg/delete',
      method: 'POST',
      data: {
        id: record.id
      },
      successFn() {
        that.fetch();
        that.setState({ selectedRowKeys: [] });
      }
    };
    modal.showModel({
      type: 'confirm',
      message: '确认删除吗？',
      ok: () => {
        store.handleNormal(param);
      }
    });
  };

  deletMany = () => {
    const that = this;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      Modal.warning({
        title: '请选择删除项'
      });
    } else {
      const tempArry = Array.from(selectedRows, (x) => x.id);
      const param = {
        url: '/parking/spotcfg/delete',
        method: 'POST',
        data: {
          id: tempArry
        },
        successFn() {
          that.fetch();
          that.setState({ selectedRowKeys: [] });
        }
      };
      modal.showModel({
        type: 'confirm',
        message: '确认删除吗？',
        ok: () => {
          store.handleNormal(param);
        }
      });
    }
  };

  searchFn = (value) => {
    store.dataObj.pagination.current = 1;
    this.setState({
      searchFilter: {
        ...value
      }
    }, () => {
      this.fetch(this.state.resid);
    });
  };

  onSelectChange = (record, selected, selectedRows) => {
    this.setState({ selectedRowKeys: record, selectedRows: selected });
  };

  handleRadioChange(e) {
    this.setState({
      radioVal: e.target.value
    });
  }

  render() {
    const {
      selectedRowKeys, radioVal, resid, photoList
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const datasorce = store.dataObj.list.slice();
    // const tempDataList = Array.from(datasorce, (item,index) => ({
    //   ...item
    // }));
    return (
      <div className="fourEmotion">
        {/* <ImgPage /> */}

        <div className="nav-right">
          <TabHead ref={this.myRef} addUser={this.addUser} deletMany={this.deletMany} searchFn={this.searchFn} resid={resid} param={[]} />
        </div>

        {/* <Radio.Group value={radioVal} onChange={this.handleRadioChange}> */}
        {/*  <Radio.Button value="1">苗情</Radio.Button> */}
        {/*  <Radio.Button value="2">虫情</Radio.Button> */}
        {/*  <Radio.Button value="3">灾情</Radio.Button> */}
        {/*  <Radio.Button value="4">墒情</Radio.Button> */}
        {/* </Radio.Group> */}
        <div className="contWrap">
          <div className="leftCont">
            <div className="tit">虫情照片</div>
            <div className="imgs">
              <Image.PreviewGroup>
                {
                    photoList.length ? photoList.map((item, index) => (
                      <div className="imgOne" key={index}>
                        <Image
                            // src={`${window.apiUrl}/${item.url}`}
                          src={`/${item.url}`}
                        />
                        <div>{index + 1}. {item.collecttime}</div>
                      </div>
                    )) : ''
                  }

              </Image.PreviewGroup>
            </div>
          </div>
          <div className="rightCont">
            <div className="tit">分析结果</div>
            <Table
              className="deviceConfigTab"
              columns={this.columns}
              bordered
              dataSource={datasorce}
              pagination={store.dataObj.pagination}
                // scroll={{ x: 2400, y: 'calc(80vh - 140px)' }}
              onChange={this.handleTableChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default PageComponent;
