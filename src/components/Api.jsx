import React, { useState } from 'react'
import axios from 'axios'
import List from './List'

// import { Button } from 'antd'
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'

const Api = () => {
  const [lists, setLists] = useState([])
  const [status, setStatus] = useState('?')
  // 后改造的另外一台IOT设备ID：K60EBCC210100300001

  const url_post = 'https://iotcloud.kalerm.com/devmgnt/interface/setDeviceSettings'
  const url_get = 'https://iotcloud.kalerm.com/devmgnt/interface/getDevicestatusById?deviceId=K60EIBCC210103960001'
  const url_postLog = 'https://iotcloud.kalerm.com/analysis/interface/getDrinkInfoByCondition'

  const postApi = async () => {
    try {
      await axios.post(url_post, {
        'deviceId': 'K60EIBCC210103960001',
        'type': '1601',
        'cmd': [
          { 'cmdType': '0', 'cmdNo': '3', 'delay': '' }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getLog = async () => {
    try {
      await axios.post(url_postLog, {
        // 'deviceId': 'K60EIBCC210103960001',
        // 'deviceName': 'IOT_西安工业咖啡机01',
        // "drinkName": "美式",
        // "startTime": "2021 01 01 14:10:00",
        // "endTime": "2021 01 26 14:10:00",
        "owner": "北京华晟经世信息技术有限公司",
        "username": "zhaohonglee",
        "pageSize": 40,
        "pageNum": 1,
        "dataType": "0"
      }).then(res => {
        console.log(res, '获取到的咖啡机制作饮品记录数据JSON数据')
        const lists = res.data.data.list
        setLists(lists)
        console.log(lists, '获取到的制作记录数组*********')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getApi = async () => {
    try {
      await axios.get(url_get).then((res) => {
        setStatus(res.data.data.status)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick_post = () => {
    postApi()
  }

  const handleClick_get = () => {
    getApi()
  }

  const handleClick_getLog = () => {
    getLog()
  }

  return (
    <div>
      <h3>Api模块</h3>
      <Button onClick={handleClick_post} type="primary" >点击我制作咖啡</Button>
      <Button onClick={handleClick_get} type="primary"  >点击我反馈咖啡机状态</Button>
      <h5>咖啡机当前状态码为：{status}</h5>
      <Button onClick={handleClick_getLog} type="primary" >点击我获取咖啡机制作饮品的记录</Button>
      <List lists={lists} />
    </div>
  )
}

export default Api
