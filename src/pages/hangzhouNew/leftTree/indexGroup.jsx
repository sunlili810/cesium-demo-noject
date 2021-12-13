import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import { Menu, Item, MenuProvider } from 'react-contexify';
// import 'react-contexify/dist/ReactContexify.min.css';
import '../middleMap.less';
import tabStore from 'store/tablestore';
import {
  Button, Col, Divider, Form, Input, Radio, Row, Tree, Drawer, Modal
} from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';

const FormItem = Form.Item;
const { Search } = Input;
const store = new tabStore();


const dataList = [];
// const treeData = [
//   {
//     key: '#root',
//     title: '路段',
//     children: [
//       {
//         key: 'PL1618885780621721',
//         title: '路灯3'
//       },
//       {
//         key: 'PL1618799390428902',
//         title: '测试',
//         children: [
//           {
//             key: 'PL1618885856818937',
//             title: '测我444'
//           },
//           {
//             key: 'PL1618883508579658',
//             title: '测试2'
//           }
//         ]
//       }
//     ]
//   }
// ];

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['#root'],
      searchValue: '',
      autoExpandParent: true,
      size: '1',
      Visible: true,
      rightClickNodeTreeItem: {
        pageX: '',
        pageY: '',
        id: '',
        categoryName: ''
      }
    };
    this.onSelect = this.onSelect.bind(this);
    this.getNodeTreeRightClickMenu = this.getNodeTreeRightClickMenu.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.treeDataArry !== this.props.treeDataArry) {
      this.generateList(nextProps.treeDataArry);
    }
  }

  componentDidMount() {
    // this.fetchTreeData();

    // this.generateList(this.props.treeData);
  }

  componentWillMount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  // fetchTreeData() {
  //   const that = this;
  //   const param = {
  //     loadingFlag: false,
  //     url: '/project/project/place/placetreeandres',
  //     method: 'post',
  //     data: {
  //     },
  //     successFn(data) {
  //       that.setState({ treeData: data });
  //     }
  //   };
  //   store.handleNormal(param);
  // }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const data = {
      ...values,
      channel: values.channel === undefined ? undefined : values.channel
    };
    const { searchFn } = this.props;
    searchFn(data);
  };


  onSelect = (selectedKeys, info) => {
    // this.fetch(selectedKeys[0]);
    const { fetchBasedata } = this.props;
    const tempList = dataList.filter(item => item.key === selectedKeys[0]);
    fetchBasedata(tempList?.[0]?.position);
    this.setState({
      rightClickNodeTreeItem: {
        pageX: '',
        pageY: '',
        id: '',
        categoryName: ''
      }
    });
  };


  generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      const { title } = node;
      // dataList.push({ key, title: key });
      dataList.push({
        key,
        title,
        position: {
          treeFlag: true, latitude: data[i].gpsLat, longitude: data[i].gpslon, deveui: key
        }
      });
      if (node.children) {
        this.generateList(node.children);
      }
    }
  };


  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  }

  onChangeSearch = (treeData, e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return this.getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => (item && self.indexOf(item) === i));
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  }

  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value,
      rightClickNodeTreeItem: {
        pageX: '',
        pageY: '',
        id: '',
        categoryName: ''
      }

    });
  };

  showDrawer = () => {
    const { Visible } = this.state;
    this.setState({ Visible: !Visible });
  };

  onClose = () => {
    this.setState({ Visible: false });
  };

  // tree列表上右键事件
  onRightClick = (e) => {
    this.setState({
      rightClickNodeTreeItem: {
        pageX: e.event.pageX,
        pageY: e.event.pageY,
        id: e.node.key,
        categoryName: e.node
      }
    });
    // console.log(e);
  };

  operat(tempArry, flag) {
    const that = this;
    tempArry.map((item, index) => {
      const param = {
        loadingFlag: false,
        url: '/lamp/light/cmd/lightctr',
        method: 'post',
        data: {
          lightid: item,
          lightno: 1,
          status: flag,
          level: 0
        },
        successFn(data) {
          if (tempArry.length === index + 1) {
            Modal.success({
              content: '指令已下发！'
            });
          }
          //
          // const { fetchBasedata } = that.props.param;
          // fetchBasedata('refresh');
        }
      };
      store.handleNormal(param);
    });
  }

  // 自定义右键菜单内容
  getNodeTreeRightClickMenu = () => {
    const {
      pageX, pageY, id, categoryName
    } = { ...this.state.rightClickNodeTreeItem };
    const tmpStyle = {
      position: 'absolute',
      left: `${pageX + 50}px`,
      top: `${pageY - 148}px`,
      zIndex: '999',
      background: 'rgba(8,29,56,0.9)',
      padding: '2px 10px',
      border: '1px solid #068A97'
    };
    const tempArry = [];
    tempArry.push(categoryName.key);

    if (categoryName?.children) {
      categoryName?.children.map((item, index) => {
        tempArry.push(item.key);
      });
    }
    const menu = (
      <div style={tmpStyle} className="self-right-menu">
        <a onClick={this.operat.bind(this, tempArry, 1)} style={{ color: '#fff', marginRight: '5px' }}>开启</a>
        <a onClick={this.operat.bind(this, tempArry, 0)} style={{ color: '#fff' }}>关闭</a>
      </div>
    );
    return this.state.rightClickNodeTreeItem !== null ? menu : '';
    // return 123;
  };

  render() {
    // const { treeData, baseData,searchValue, expandedKeys, autoExpandParent } = this.state;
    const {
      searchValue, expandedKeys, autoExpandParent, size, Visible, rightClickNodeTreeItem
    } = this.state;

    const { treeDataArry } = this.props;
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span className="site-tree-search-value">{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      );
      if (item.children) {
        return {
          title, key: item.key, type: item.type, children: loop(item.children)
        };
      }

      return {
        title,
        key: item.key
      };
    });

    return (

      <div className="leftTree" style={{ width: '270px' }}>
        {
          Visible ? (<DoubleLeftOutlined className="arrowLR arrowLSideOut" onClick={this.showDrawer} />) : (<DoubleRightOutlined className="arrowLR arrowRSideIn" onClick={this.showDrawer} />)
        }

        <Drawer
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={Visible}
          mask={false}
          width={285}
          className="leftTreeDrawer"
        >
          <div style={{ margin: '10px 0 10px 30px' }}>
            <Radio.Group size="small" value={size} onChange={this.handleSizeChange}>
              <Radio.Button value="1" style={{ padding: '0px 15px' }}>区域</Radio.Button>
              <Radio.Button value="2" style={{ padding: '0px 15px' }}>分组</Radio.Button>
            </Radio.Group>
          </div>

          <div className="formDiv" style={{ position: 'relative', height: '100%' }}>
            <img className="boderLTop" src={img02} alt="" style={{ width: '50px' }} />
            <img className="boderRBottom" src={img04} alt="" style={{ width: '50px' }} />
            <Form
              layout="horizontal"
              onFinish={this.onFinish}
              className="defalultSite"
              style={{
                width: '263px', padding: '0', margin: '0'
              }}
            >
              <Row gutter={24}>
                <Col span={24}>
                  {/* <div style={{ margin: '10px 0 10px 10px' }}> */}
                  {/*  <Radio.Group size="small" value={size} onChange={this.handleSizeChange}> */}
                  {/*    <Radio.Button value="1">区域</Radio.Button> */}
                  {/*    /!*<Radio.Button value="2">分组</Radio.Button>*!/ */}
                  {/*  </Radio.Group> */}
                  {/* </div> */}
                  <Search style={{ marginBottom: 8, marginTop: '15px' }} placeholder="" onChange={this.onChangeSearch.bind(this, treeDataArry)} />
                  {/*{size === '2' && rightClickNodeTreeItem.categoryName.type >= 1 ? this.getNodeTreeRightClickMenu() : ''}*/}
                  {/* {this.getNodeTreeRightClickMenu()} */}
                  <FormItem
                    label=""
                    {...{
                      labelCol: {
                        span: 0
                      },
                      wrapperCol: {
                        span: 24
                      }
                    }}
                    className="treeForm"
                  >
                    {
                      treeDataArry.length ? (
                        <Tree
                        // defaultExpandedKeys={['PL1630910349616288']} // {['PL1618799390428902']}

                          onSelect={this.onSelect}
                          onExpand={this.onExpand}
                          expandedKeys={expandedKeys}
                          autoExpandParent={autoExpandParent}
                          treeData={loop(treeDataArry)}
                          defaultExpandAll
                          onRightClick={this.onRightClick}
                        />
                      ) : null
                    }


                  </FormItem>
                </Col>
                {/* <Col span={2} style={{ padding: '0px' }}> */}
                {/*  <FormItem */}
                {/*    label="" */}
                {/*    name="devtype" */}
                {/*    {...{ */}
                {/*      labelCol: { */}
                {/*        span: 0 */}
                {/*      }, */}
                {/*      wrapperCol: { */}
                {/*        span: 24 */}
                {/*      } */}
                {/*    }} */}
                {/*  > */}
                {/*    <Select> */}
                {/*      <Option key="1" value="1">街道一</Option> */}
                {/*      <Option key="2" value="1">街道二</Option> */}
                {/*    </Select> */}
                {/*  </FormItem> */}
                {/* </Col> */}
                {/* <Col span={3} style={{ paddingRight: '0px' }}> */}
                {/*  <FormItem */}
                {/*    label="" */}
                {/*    name="name" */}
                {/*    {...{ */}
                {/*      labelCol: { */}
                {/*        span: 0 */}
                {/*      }, */}
                {/*      wrapperCol: { */}
                {/*        span: 24 */}
                {/*      } */}
                {/*    }} */}
                {/*  > */}
                {/*    <Input /> */}
                {/*  </FormItem> */}
                {/* </Col> */}
                {/* <Col span={3}> */}
                {/*  <FormItem */}
                {/*    wrapperCol={{ span: 24 }} */}
                {/*    className="footer" */}
                {/*  > */}
                {/*    <Button className="btn-add" htmlType="submit" type="primary">搜索</Button> */}
                {/*    <Divider type="vertical" /> */}
                {/*    <Button className="btn-add" type="primary">重置</Button> */}
                {/*  </FormItem> */}
                {/* </Col> */}
              </Row>

            </Form>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default PageComponent;