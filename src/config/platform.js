/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-10-13 11:38:06
 */
const platform = {

  SSO: 'sso', // 开放平台验证服务
  AUTH: 'auth', // 【权限中心：用户，资源（菜单资源，按钮资源）】
  BBS: 'bbs', // 【论坛微服务】
  CAPITAL: 'capital', // 【账户微服务】
  COMMON: 'common', // 【公共功能微服务】
  ENTITY: 'entity', // 【持久化类基础服务层】
  FILE: 'file', // 【文件系统微服务】
  ID: 'id', // 【ID生成微服务】
  ID_SERVER: 'id-SERVER', // 【ID生成微服务】
  INFO: 'info', // 【信息服务微服务】
  INVOICE: 'invoice', // 【发票微服务】
  MARKETING: 'marketing', // 【市场营销微服务】
  MSGS: 'msgs', // 【消息微服务：短信，微信，钉钉，MQ通知等】
  ORDER: 'order', // 【订单微服务】
  PAY: 'pay', // 【支付微服务】
  PRODUCT: 'product', // 【产品微服务】
  TOOLS: 'tools', // 【系统工具类】
  WORK_ORDER: 'work-order', // 【工单中心微服务】
  JOB_SERVER: 'job-server', // 【job微服务】
  JOB_MANAGER: 'job-manager', // 【job后台微服务】
  OPERATE: 'operate', // 【job后台微服务】
}
Object.keys(platform).map(key => {
  platform[key] = '/platform-' + platform[key]
})

export default platform
