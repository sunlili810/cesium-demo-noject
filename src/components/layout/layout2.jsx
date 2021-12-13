import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import menus from 'localData/menulist.json';
import './layout.less';
import  * as Icon from '@ant-design/icons';
import $ from 'jquery';


const {
  Content, Sider
} = Layout;
const { SubMenu } = Menu;

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menusList: menus
    };
  }

  componentWillMount() {
    // const tempObj = localStorage.getItem('menuObj');

    // const tempMenu = tempObj === 'undefined' ? {} : JSON.parse(localStorage.getItem('menuObj'));
    const menusList = menus;

    this.setState({
      menusList
    });
  }

   onCollapse = (collapsed) => {
     this.setState({ collapsed });
   };

   render() {
     // const project = window.apiUrl.split('/')[3];
     const { menusList, collapsed } = this.state;
     const { children, name } = this.props;
     const layoutBgc = name === 'dashboard' ? { margin: '14px', backgroundColor: '#e7ebee' } : {
       margin: '14px',
       // padding: '20px'
     };
     const tempPath = window.location.pathname.split('/');
     const subRouter = `${tempPath[1]}/${tempPath[2]}`;
     let defaultKey = '';
     if (subRouter && subRouter !== '/undefined' && subRouter !== 'doorguard/undefined') {
       defaultKey = subRouter.substr(0, 6) === 'device'
         ? window.location.search.substr(1, window.location.search.length - 1) : subRouter;
     } else if (subRouter === '/undefined') {
       defaultKey = 'doorguard/organization';
     } else {
       defaultKey = 'doorguard/organization';
     }
     const defaultOpenKeys = '';
     const menuList = menusList.list;
     return (

       <Layout style={{ minHeight: '100vh', overflowY: 'auto' }} className="main-layout">
         {<Sider
           className="main-slider"
           collapsible
           collapsed={collapsed}
           onCollapse={this.onCollapse}
         >
           {/* <Link to="/dashboard"> */}
           {/* <div className="logo" style={{ background: `url(${layoutLogo}) no-repeat` }} /> */}
           {/* </Link> */}
           <div style={{color:'rgba(0, 0, 0, 0.85)',paddingLeft:'24px',height:'45px',lineHeight:'45px',background:'#E3F0FF',fontWeight:'600'}}>监控点管理</div>
           <Menu
             theme="light"
             mode="inline"
             defaultSelectedKeys={[defaultKey]}
             defaultOpenKeys={[defaultOpenKeys]}
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
                 {/*<Link to={`/${item.key}`}>*/}
                   {
                     React.createElement(
                       Icon[`${item.icon}`],
                       // {
                       //   style:{ fontSize: '16px' }
                       // }
                     )

                   }
                   <span className="nav-text">{item.name}</span>
                 {/*</Link>*/}
               </Menu.Item>
             )))
               : ''}
           </Menu>

          </Sider>
        }
         <Layout className="layout-right" style={{ width: '90%' }}>
           {/* <Header className="header"> */}
           {/* {layoutTitle} */}
           {/* </Header> */}
           <Content style={layoutBgc}>
             <div className="content-layout" id="right-content" style={{  overflow: 'hidden',height:'100%' }}>
               {children}
             </div>
           </Content>
         </Layout>
       </Layout>
     );
   }
}

PageComponent.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired
};

export default PageComponent;
