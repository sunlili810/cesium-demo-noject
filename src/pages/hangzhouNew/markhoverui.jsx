import React, { useState, useEffect } from 'react';
import img02 from 'images/img02.png';
import img04 from 'images/img04.png';
import tabStore from 'store/tablestore';

const store = new tabStore();

function hoverrender(props) {
  const [list, setList] = useState();
  useEffect(() => {
    function fetchTreeData() {
      const param = {
        loadingFlag: false,
        url: '/appext/lamppost/basedataqry',
        method: 'post',
        data: {
          resid: props.lightdev
        },
        successFn(data) {
          setList({
            devname: data[`${props.type}`]?.[0]?.info?.devname,
            deveui: data[`${props.type}`]?.[0]?.info?.deveui,
            light: props.lightdevname,
            status: data[`${props.type}`]?.[0]?.eqstate
          });
        }
      };
      store.handleNormal(param);
    }
    fetchTreeData();
  }, [props.lightdev]);
  return (
    <div className="markoutWrap" style={{ position: 'relative' }}>
      <img className="boderLTop" src={img02} alt="" />
      <img className="boderRBottom" src={img04} alt="" />
      <div className="markhCont">
        {
              props.type === 'lightonly' ? (
                <div>
                  <div className='listone'>设备名称：{props?.lightdevname}</div>
                  <div className='listone'>设备编号：{props?.lightdev}</div>
                </div>

              ) : (
                <div>
                  <div className='listone'>设备名称：{list?.devname}</div>
                  <div className='listone'>设备编号：
                    {list?.deveui}
                  </div>
                  <div className='listone'>所属灯杆编号：
                    {props?.lightdev}
                  </div>
                  <div className='listone'>设备状态：
                    {list?.status === 1 || list?.status === '1' ? '在线' : list?.status === 0 || list?.status === '0' ? '离线' : ''}
                  </div>
                </div>
              )
          }

      </div>
    </div>
  );
}


export default hoverrender;
