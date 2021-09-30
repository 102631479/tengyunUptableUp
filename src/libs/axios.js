/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2021-01-06 14:45:29
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import config from '@/config'
import {
  getToken
} from '@/libs/util'
import iView from 'iview'
import {
  lowerFirst
} from 'lodash'

// import { Spin } from 'iview'

class HttpRequest {
  /**
   * 定义实例参数
   */
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
    this.timer = null
  }

  /**
   * 请求参数配置
   */
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "Content-type": 'application/json;'
        //
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
  }

  /**
   * 拦截器
   */
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      getToken() ? config.headers["Authorization"] = getToken() : delete config.headers["Authorization"]
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      if (res.data.ret === 0) {
        // console.log(111);
        // console.log(res.data, '响应拦截器');
        return Promise.resolve(res.data)
      } else {
        // console.log(222);
        if (res.data.errorcode === 2002) {
          // console.log(res.data, '登录失败');

          // iView.Modal.confirm({
          //   title: '身份信息Token已过期！',
          //   content: '<p>请重新登录</p>',
          //     onOk: () => {
          store.commit('setToken', '')
          store.commit('setAccess', [])
          store.commit("setUserInfo", {})
          router.push('/login')
          // store.dispatch('handleLogOut').then(d => {
          //   router.push({
          //     name: 'login',
          //     query: {
          //       page: localStorage.getItem('loginUrl')
          //     }
          //   })
          // })
          //   },
          //   onCancel: () => {}
          // });

          // window.history.pushState({}, null, '/#/login')
        } else {
          return Promise.reject(res.data)
        }
      }
    }, error => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        iView.Message.warning('服务器状态异常')
      }, 500);
      return Promise.reject(error)
    })
  }

  /**
   * 请求对象
   * @param {object} options 请求配置
   * @param {boolean} muck 是否开启模拟数据
   * 
   */
  request(options, muck = false) {
    if (muck) this.baseUrl = config.baseUrl.muck
    const instance = axios.create({
      timeout: 1000 * 10
    })
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
