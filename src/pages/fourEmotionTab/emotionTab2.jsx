import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Layout from 'components/layout/layout';
import modal from 'components/modal/modal';
import tabstore from 'store/tablestore';
import {
  Table, Modal, Divider,Button, Radio
} from 'antd';
import modalConfig from './modalConfig';
import TabHead from './tabHead';
import './index.less';

import ImgPage from './imgPage';

const store = new tabstore();

const tempList= [ {
  key: "11",
  name: "测试演示棚",
  icon: "BankOutlined"
}, {
  key: "22",
  name: "1号棚",
  icon: "BankOutlined"
}, {
  key: "33",
  name: "2号棚",
  icon: "BankOutlined"
}
];

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: null,
      selectedRowKeys: [],
      selectedRows: [],
      cameraList: [],
      radioVal:'1'
    };
    this.loadingDialog = null;
    this.instance = null;
    this.handleRadioChange = this.handleRadioChange.bind(this);

    this.columns = [{
      title: '排序',
      dataIndex: 'typename',
      key: 'typename'
    }, {
      title: '区域',
      dataIndex: 'addr',
      key: 'addr'
    }, {
      title: '设备名称',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '害虫数量',
      dataIndex: 'title',
      key: 'title'
    },{
      title: '采集时间',
      dataIndex: 'alarmtime',
      key: 'alarmtime'
    },
    {
      title: '操作',
      dataIndex: 'key',
      key: 'key',
      width: 150,
      render: (text, record, index) => (
        <span>
          {
            record.confirmstate!==0 ? (<a className="unconfirmOp" onClick={() => { this.showEdit(text, record, index); }}>已处理</a>):(<a className="confirmOp" onClick={() => { this.showEdit(text, record, index); }}>未处理</a>)
          }
        </span>
      )
    }
    ];
  }

  componentDidMount() {
    //this.fetchCanmeraList();
    this.fetch();
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

  //fetchCanmeraList() {
  //  const that = this;
  //  const params = {
  //    loadingFlag: false,
  //    url: `/combo/dev/list?devtype=${window.devtype}`,
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
  //}
  //
  //addUser = () => {
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
  //};
  //
  //showEdit = (text, record) => {
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
  //};
  //
  //deletUser = (text, record) => {
  //  const that = this;
  //  const param = {
  //    url: '/parking/spotcfg/delete',
  //    method: 'POST',
  //    data: {
  //      id: record.id
  //    },
  //    successFn() {
  //      that.fetch();
  //      that.setState({ selectedRowKeys: [] });
  //    }
  //  };
  //  modal.showModel({
  //    type: 'confirm',
  //    message: '确认删除吗？',
  //    ok: () => {
  //      store.handleNormal(param);
  //    }
  //  });
  //};
  //
  //deletMany = () => {
  //  const that = this;
  //  const { selectedRows } = this.state;
  //  if (selectedRows.length === 0) {
  //    Modal.warning({
  //      title: '请选择删除项'
  //    });
  //  } else {
  //    const tempArry = Array.from(selectedRows, (x) => x.id);
  //    const param = {
  //      url: '/parking/spotcfg/delete',
  //      method: 'POST',
  //      data: {
  //        id: tempArry
  //      },
  //      successFn() {
  //        that.fetch();
  //        that.setState({ selectedRowKeys: [] });
  //      }
  //    };
  //    modal.showModel({
  //      type: 'confirm',
  //      message: '确认删除吗？',
  //      ok: () => {
  //        store.handleNormal(param);
  //      }
  //    });
  //  }
  //};

  searchFn = (value) => {
    store.dataObj.pagination.current = 1;
    this.setState({
      searchFilter: {
        ...value
      }
    }, () => {
      this.fetch();
    });
  };

  onSelectChange = (record, selected, selectedRows) => {
    this.setState({ selectedRowKeys: record, selectedRows: selected });
  };

  handleMenuClick(key){
    console.log(key);
  }
  handleRadioChange(e){
    this.setState({
      radioVal:e.target.value
    })
  }

  render() {
    const { selectedRowKeys,radioVal } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const datasorce = store.dataObj.list.slice();
    const tempDataList = Array.from(datasorce, (item) => ({
      ...item
    }));

    return (
      <Layout name="fourEmotion" layoutList={tempList} handleMenuClick={this.handleMenuClick}>
        <div className="fourEmotion">
          <ImgPage />
          <div className="container-out">

            {/*<div className="nav-right">*/}
              {/*<TabHead addUser={this.addUser} deletMany={this.deletMany} searchFn={this.searchFn} param={[]} />*/}
            {/*</div>*/}


            <Radio.Group value={radioVal} onChange={this.handleRadioChange}>
              <Radio.Button value="1">苗情</Radio.Button>
              <Radio.Button value="2">虫情</Radio.Button>
              <Radio.Button value="3">灾情</Radio.Button>
              <Radio.Button value="4">墒情</Radio.Button>
            </Radio.Group>


            <Table
              className="deviceConfigTab"
              columns={this.columns}
              bordered
              dataSource={tempDataList}
              pagination={store.dataObj.pagination}
              // scroll={{ x: 2400, y: 'calc(80vh - 140px)' }}
              onChange={this.handleTableChange}
            />
          </div>
        </div>
      </Layout>
    );
  }
}
export default PageComponent;
