/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-12-11 16:46:17
 */
import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : process.env.NODE_ENV === 'testing' ? config.baseUrl.test : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)
export default axios
