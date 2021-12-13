const myIndex = `${window.routername}/hindex`;
const viscenterrouter = `${window.routername}/viscenter`;
const viscenterVideoRouter = `${window.routername}/viscenterVideo`;
const viscenterWisdomlightRouter = `${window.routername}/viscenterWisdomLight`;
const viscenterInfoRouter = `${window.routername}/viscenterInfo`;
const viscenterEnvRouter = `${window.routername}/viscenterEnv`;
const viscenterBroadRouter = `${window.routername}/viscenterBroad`;
const viscenterAlarmRouter = `${window.routername}/viscenterAlarm`;
const viscenterWifiRouter = `${window.routername}/viscenterWifi`;
const operationRouter = `${window.apiUrl}/appext/reactbaseapp/jump?projectid=${window.projectid}`;
export default {
  result: 0,
  list: [{
    key: myIndex,
    name: '首页',
    icon: 'icon-home'
  }, {
    key: viscenterrouter,
    name: '可视化运营',
    icon: 'icon-leftbar_icon_homepage_default'
  }, {
    key: viscenterWisdomlightRouter,
    name: '智慧照明',
    icon: 'icon-a-zu1632'
  }, {
    key: viscenterVideoRouter,
    name: '视频监控',
    icon: 'icon-a-lujing2057'
  }, {
    key: viscenterEnvRouter,
    name: '环境气象',
    icon: 'icon-a-lujing2058'
  },
  {
    key: viscenterInfoRouter,
    name: '信息发布',
    icon: 'icon-a-zu1633'
  },
  {
    key: viscenterBroadRouter,
    name: '公共广播',
    icon: 'icon-a-lujing2062'
  },
  {
    key: viscenterAlarmRouter,
    name: '紧急报警',
    icon: 'icon-a-lujing2063'
  },
  {
    key: '7',
    name: '充电桩',
    icon: 'icon-a-lujing2064'
  }, {
    key: viscenterWifiRouter,
    name: '公共WIFI',
    icon: 'icon-a-zu1634'
  }
  //   {
  //   key: operationRouter,
  //   name: '运维中心',
  //   icon: 'icon-a-lujing2068'
  // }
  ]
};
