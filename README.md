 - 本项目使用技术
 1. [vue](https://cn.vuejs.org/ "vue框架") 
 2. [iview组件库](http://v1.iviewui.com/docs/guide/start "iview组件库地址") 
 3. [axios请求库](http://www.axios-js.com/)
 4. [lodash工具库](https://www.lodashjs.com/)
 5. [form-create(表单生成器)](http://jsrun.net/7ehKp/edit)
 6. [iview-admin(脚手架)](https://gitee.com/icarusion/iview-admin?_from=gitee_search)
 6. [echarts(可视化首页)](https://echarts.apache.org/)

 - 项目运行命令
 1. npm run dev 开发模式
 2. npm run build 打包成生产资源
 3. cnpm install  **or** npm install 安装项目所需依赖
 4. npm run muck 开启模拟接口
 
 - 项目遵守规范 
 1. [vue风格指南](https://cn.vuejs.org/v2/style-guide/)


- 路由配置示例
``` javascript
/**
 * 路由配置
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
 ```

- 图标使用示例
 ```html
 // 具体图标库参考iconfont
<i class="iconfont 图标class"></i>
 ```

 - 模拟接口配置示例
 ```
 // muck/admin/index.js
 module.exports = [
     {
        method: 'get', // 请求类型
        path: '/platform-auth/user/1252135521128419328', // 请求路径
        res: { // 相应数据
            code: 1, 
            data: {},
            "errorcode": 0,
            "msg": "success",
            "ret": 0
        }
     }
 ]

 ```

 - 按钮配置
 1. 通过设置type为primary、ghost、dashed、text、info、success、warning、error