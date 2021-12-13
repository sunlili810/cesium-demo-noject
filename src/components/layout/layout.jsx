import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import menus from 'localData/menulist.jsx';
import './layout.less';
import $ from 'jquery';
import claaLogo from 'images/luolaiLogo.png';
import changeLogo from 'images/stopIcon.png';
import user from 'images/yonghu.jpg';
import exit from 'images/exit.jpg';
import tabStore from 'store/tablestore';
import { withRouter } from 'react-router-dom';
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';

const store = new tabStore();

const {
  Content, Sider, Header
} = Layout;
const { SubMenu } = Menu;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menusList: menus,
      visible: false,
      prolist: [],
      fullScreen: false
    };
    this.proClick = this.proClick.bind(this);
    this.handleScreen = this.handleScreen.bind(this);
    this.exitFullScreen = this.exitFullScreen.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentWillMount() {
    // const tempObj = localStorage.getItem('menuObj');
    this.fetchprolist();
    // const tempMenu = tempObj === 'undefined' ? {} : JSON.parse(localStorage.getItem('menuObj'));
    const menusList = menus;

    this.setState({
      menusList
    });
  }


  componentDidMount() {

  }

  proClick = (e) => {
    const myIndex = `${window.routername}/hindex?projectid=${e.key}&projectname=${e.item.props.value}`;
    this.props.history.push(myIndex);
    location.reload();
    localStorage.setItem('projectid', e.key);
    localStorage.setItem('projectname', e.item.props.value);
  };

  handleMenuClick = (e) => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  fetchprolist= () => {
    const that = this;
    const param = {
      loadingFlag: false,
      url: '/project/project/userProjectList',
      method: 'post',
      data: {
        userid: localStorage.getItem('userflag')

      },
      successFn(data) {
        that.setState({
          prolist: data.pList
        });
      }
    };
    store.handleNormal(param);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  fullScreen() {
    const el = document.documentElement;
    const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    let wscript;

    if (typeof rfs !== 'undefined' && rfs) {
      rfs.call(el);
      return;
    }

    if (typeof window.ActiveXObject !== 'undefined') {
      wscript = new ActiveXObject('WScript.Shell');
      if (wscript) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  exitFullScreen() {
    const el = document;
    const cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
    let wscript;

    if (typeof cfs !== 'undefined' && cfs) {
      cfs.call(el);
      return;
    }

    if (typeof window.ActiveXObject !== 'undefined') {
      wscript = new ActiveXObject('WScript.Shell');
      if (wscript != null) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  handleScreen() {
    const that = this;
    const { fullScreen } = this.state;
    this.setState({ fullScreen: !fullScreen }, () => {
      const { fullScreen } = that.state;
      if (fullScreen) {
        this.fullScreen();
      } else {
        this.exitFullScreen();
      }
    });
  }

  render() {
    // const project = window.apiUrl.split('/')[3];
    const { menusList, collapsed ,fullScreen} = this.state;
    const { children, name } = this.props;
    const layoutBgc = name === 'hangzhou' ? { margin: '0px', backgroundColor: '#132230', height: '100%' } : {
      margin: '0px', height: '100%'
    };
    const tempPath = window.location.pathname.split('/');
    const subRouter = `/${tempPath[1]}/${tempPath[2]}`;
    let defaultKey = '';
    const myIndex = `${window.routername}`;


    if (subRouter && subRouter !== '/undefined' && subRouter !== '/hangzhou/undefined') {
      // defaultKey = subRouter.substr(0, 6) === 'device'
      //   ? window.location.search.substr(1, window.location.search.length - 1) : subRouter;
      defaultKey = subRouter;
    } else if (subRouter === 'hangzhou/undefined') {
      defaultKey = myIndex;
    } else if (subRouter === '/undefined') {
      defaultKey = myIndex;
    } else {
      defaultKey = myIndex;
    }
    const defaultOpenKeys = '';
    const menuList = menusList.list;

    const menu = (
      <Menu className="profile-menu" onClick={this.handleProfileClick} style={{ background: 'rgba(7,27,54,0.9)', border: '1px solid #078997' }}>
        <Menu.Item key="exit" style={{ padding: '0 7px' }}>
          <img src={exit} style={{ margin: '0px' }} /><div style={{ display: 'inline', lineHeight: '' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>退出登录</Link>
        </div>
        </Menu.Item>
      </Menu>
    );
    const promenu = (
      <Menu style={{ background: 'rgba(7,27,54,0.9)', border: '1px solid #078997' }}>{ this.state.prolist.length ? this.state.prolist.map(subItem => (
        <Menu.Item key={subItem.projectid} value={subItem.title} style={{ textDecoration: 'none', color: '#fff' }} onClick={this.proClick}>
          {subItem.title}
        </Menu.Item>
      )) : ''}
      </Menu>
    );
    return (

      <Layout style={{ minHeight: '100vh', overflowY: 'auto', background: '#132230' }} className="layout">
        <Header style={{ paddingRight: '30px' }}>
          <div
            className="logo"
            style={{
              display: 'inline-block', fontSize: '24px', fontWeight: 'bold', color: '#fff'
            }}
          >
            <img src={claaLogo} alt="" style={{ marginRight: '20px', width: '100px' }} />
            {localStorage.getItem('projectname')}
            {(localStorage.getItem('userflag')) === '1'
              ? (
                <Dropdown overlay={promenu}>
                  <span className="icon iconfont icon-a-lujing2034" alt="" style={{ marginLeft: '10px', height: '16px' }} />
                </Dropdown>
              ) : ''}

          </div>

          <div
            style={{
              display: 'inline-block', cursor: 'pointer', color: '#fff', float: 'right', height: '60px', lineHeight: '23px', marginTop: '14px', marginLeft: '10px'
            }}
            onClick={this.handleScreen}
          >
            <div style={{ textAlign: 'center' }}>

              {/* <span className="icon iconfont icon-a-lujing2068" /> */}
              {fullScreen ? (<FullscreenExitOutlined style={{ fontSize: '20px' }} />) : (<FullscreenOutlined style={{ fontSize: '20px' }} />)}

            </div>

            <span className="nav-text">{fullScreen ? '退出全屏' : '全屏'}</span>
          </div>

          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[defaultKey]}
            defaultOpenKeys={[defaultOpenKeys]}
            style={{ display: 'inline-block', float: 'right', background: 'transparent' }}
          >
            {menuList.length ? menuList.map(item => (item.sub ? (
                <SubMenu
                  key={item.key}
                  title={(
                    <span>
                     <Icon />
                     <span>{item.name}</span>
                   </span>
                  )}
                >
                  {item.sub.length ? item.sub.map(subItem => (
                    <Menu.Item key={subItem.key} className="main-sub">
                      {subItem.name}
                    </Menu.Item>
                  )) : ''}
                </SubMenu>
              ) : (
                <Menu.Item key={item.key} className="main-menu">
                  <Link to={`${item.key}`}>
                    {/* <Icon type={item.icon} /> */}

                    <div style={{ height: '23px', textAlign: 'center' }}>
                      {/* { */}
                      {/*      React.createElement( */}
                      {/*        Icon[`${item.icon}`], */}
                      {/*        { */}
                      {/*          style: { */}
                      {/*            fontSize: '16px' */}

                      {/*          } */}
                      {/*        } */}
                      {/*      ) */}

                      {/*    } */}

                      <span className={`icon iconfont ${item.icon}`} />

                    </div>

                    <span className="nav-text">{item.name}</span>
                  </Link>
                </Menu.Item>
              )))
              : ''}

            <Menu.Item className="main-menu">
              <a href={`${window.apiUrl}/appext/reactbaseapp/jump?projectid=${localStorage.getItem('projectid')}`} target="_blank">
                <div style={{ height: '23px', textAlign: 'center' }}>

                  <span className="icon iconfont icon-a-lujing2068" />

                </div>

                <span className="nav-text">运维中心</span>
              </a>
            </Menu.Item>

            <Menu.Item className="main-menu">
              <Dropdown
                overlay={menu}
                onVisibleChange={this.handleVisibleChange}
                visible={this.state.visible}
              >
                <div style={{ height: '61px', lineHeight: '21px', textAlign: 'center' }}>
                  <div className="icon iconfont icon-head_icon_admin_default" style={{ color: '#BCC4CC' }} />
                  <div className="nav-text" style={{ color: '#fff' }}>{localStorage.getItem('username') || ''}</div>
                </div>


              </Dropdown>
            </Menu.Item>


          </Menu>
        </Header>


        {/*         {<Sider */}
        {/*           className="main-slider" */}
        {/*           collapsible */}
        {/*           collapsed={collapsed} */}
        {/*           onCollapse={this.onCollapse} */}
        {/*         > */}
        {/*           /!* <Link to="/dashboard"> *!/ */}
        {/*           /!* <div className="logo" style={{ background: `url(${layoutLogo}) no-repeat` }} /> *!/ */}
        {/*           /!* </Link> *!/ */}
        {/*           */}

        {/*           <Menu */}
        {/*             theme="light" */}
        {/*             mode="inline" */}
        {/*             defaultSelectedKeys={[defaultKey]} */}
        {/*             defaultOpenKeys={[defaultOpenKeys]} */}
        {/*           > */}
        {/*             {menuList.length ? menuList.map(item => (item.sub ? ( */}
        {/*               <SubMenu */}
        {/*                 key={item.key} */}
        {/*                 title={( */}
        {/*                   <span> */}
        {/*                     <Icon /> */}
        {/*                     <span>{item.name}</span> */}
        {/*                   </span> */}
        {/* )} */}
        {/*               > */}
        {/*                 {item.sub.length ? item.sub.map(subItem => ( */}
        {/*                   <Menu.Item key={subItem.key} className="main-sub"> */}
        {/*                     {subItem.name} */}
        {/*                   </Menu.Item> */}
        {/*                 )) : ''} */}
        {/*               </SubMenu> */}
        {/*             ) : ( */}
        {/*               <Menu.Item key={item.key} className="main-menu"> */}
        {/*                 <Link to={`/${item.key}`}> */}
        {/*                   <Icon type={item.icon} /> */}
        {/*                   <span className="nav-text">{item.name}</span> */}
        {/*                 </Link> */}
        {/*               </Menu.Item> */}
        {/*             ))) */}
        {/*               : ''} */}
        {/*           </Menu> */}

        {/*          </Sider> */}
        {/*        } */}


        {/* <Layout className="layout-right" style={{ width: '90%' }}> */}
        {/*  /!* <Header className="header"> *!/ */}
        {/*  /!* {layoutTitle} *!/ */}
        {/*  /!* </Header> *!/ */}
        {/*  <Content style={layoutBgc}> */}
        {/*    <div className="content-layout" id="right-content" style={{ overflow: 'hidden' }}> */}
        {/*      {children} */}
        {/*    </div> */}
        {/*  </Content> */}
        {/* </Layout> */}


        <Content style={layoutBgc} style={{display:'flex'}}>
          <div
            id="right-content"
            style={{
              //minHeight: '93.22vh', overflowY: 'auto', position: 'relative'
              flex: 1, overflowY: 'auto', position: 'relative'
            }}
          >
            {children}
          </div>
        </Content>


      </Layout>
    );
  }
}

PageComponent.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};
export default withRouter(PageComponent);
