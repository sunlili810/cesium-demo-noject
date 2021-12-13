import React, { Component } from 'react';
import {
  BrowserRouter, Route, Navigate, Routes
} from 'react-router-dom';


 import Cesiumdemo from 'pages/cesiumDemo/index';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>
            <Routes>

              <Route exact path="/" element={<Cesiumdemo />} />
              <Route exact path={window.routername} element={<Cesiumdemo />} />
              <Route exact path="hangzhoulight/cesium" element={<Cesiumdemo />} />

            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </div>
    );
  }
}

export default App;
// Navigate <Route path='/' render={() => <Redirect to={window.routername} />} />
