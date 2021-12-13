import React, { Component,useState,useEffect } from 'react';
import { observer } from 'mobx-react';
import { Carousel } from 'antd';
import './index.less';
import { Tree, Switch } from 'antd';
import { CarryOutOutlined, FormOutlined ,PlusOutlined, MinusOutlined ,DownOutlined } from '@ant-design/icons';


//const treeData = [
//  {
//    title: 'parent 1',
//    key: '0-0',
//    icon: <CarryOutOutlined />,
//    children: [
//      {
//        title: 'parent 1-0',
//        key: '0-0-0',
//        icon: <CarryOutOutlined />,
//        children: [
//          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
//        ],
//      }
//    ],
//  }
//];

const tempTreelist=[
  {
    "placeid": "0-0",
    "pid": "string",
    "placename": "parent 1",
    "children": [
      {
        "placeid":"0-0-0",
        "placename": "parent 1-0",
        children:[
            {
              "placeid":"0-0-0-2",
              "placename": "leaf",
            }
          ]
      }
    ]
  }
];

function recursionTree(data) {
  const treeList = Array.from(data).map((item,index)=>{
    if(item.chidren){
      return {
        title: item.placename,
        key: item.placeid,
        icon: <CarryOutOutlined />,
        children:recursionTree(item.chidren)
      }
    }else{
      return {
        title: item.placename,
        key: item.placeid,
        icon: <CarryOutOutlined />
      }
    }
  });
  return treeList;
}

const placeTree = (props) => {
  const finalTreeData= recursionTree(props.param);//recursionTree(tempTreelist);
  const [showLine, setShowLine] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [showLeafIcon, setShowLeafIcon] = useState(true);

  const onSelect = (selectedKeys, info) => {
    //console.log('selected', selectedKeys, info);
    props.seletedFn(selectedKeys);
  };


  return (
    <div className="placeTreePage">

      <Tree
        //showLine={showLine}PlusOutlined

        showIcon={showIcon}
        showLine={{showLeafIcon:false}}
        //showLine
        //switcherIcon={<PlusOutlined  />}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={finalTreeData}
      />
    </div>
  );
};




export default placeTree;

