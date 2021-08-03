import Main from '@/components/main'

export default [{
    path: '/user-manage',
    name: 'user-manage',
    meta: {
      icon: "icon-icon-yhgl",
      notCache: true,
      // access: ['backstage:user:management'],
      access: ['operate:user-manage:path'],
      title: '用户管理'
    },
    component: Main,
    children: [{
        path: 'identity-upgrade',
        name: 'identity-upgrade',
        meta: {
          access: ['operate:user-manage:menu'],
          title: '用户列表'
        },
        component: () => import('@/view/user-manage/user-list/index')
      },
      {
        path: 'user-list',
        name: 'user-list',
        meta: {
          access: ['operate:upgrade-application:menu'],
          title: '身份升级申请'
        },
        component: () => import('@/view/user-manage/identity-upgrade/index')
      },
    ]
  },
  {
    path: '/applyManager',
    name: 'applyManager',
    meta: {
      icon: 'icon-icon-yysqgl',
      access: ['operate:application-apply:path'],
      title: '应用申请管理'
    },
    component: Main,
    children: [{
      path: 'app-apply-manager',
      name: 'app-apply-manager',
      meta: {
        // icon: 'iconradio-button-on-outline',
        access: ['operate:application-apply:menu'],
        title: '应用申请审核'
      },
      component: () => import('@/view/app-apply-manager/index')
    }]
  },
  {
    path: '/agent',
    name: 'agent',
    meta: {
      icon: 'icon-icon-dlsgl',
      access: ['operate:agent-management:path'],
      title: '代理商管理'
    },
    component: Main,
    children: [{
      path: 'agent-manage',
      name: 'agent-manage',
      meta: {
        access: ['operate:agent-management:menu'],
        title: '代理商列表'
      },
      component: () => import('@/view/agent-manage/index')
    }]
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      icon: 'icon-icon-cpsgl',
      access: ['operate:product-manage:path'],
      title: '产品商管理'
    },
    component: Main,
    children: [{
      path: 'product-manage',
      name: 'product-manage',
      meta: {

        access: ['operate:product-manage:menu'],

        // icon: 'iconradio-button-on-outline',
        title: '产品商列表'
      },
      component: () => import('@/view/product-manage/index')
    }]
  },
  // {
  //   path: '/verifier',
  //   name: 'verifier',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['verifier-admin'],
  //     title: '核验商管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'verifier-manage',
  //       name: 'verifier-manage',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '核验商列表'
  //       },
  //       component: () => import('@/view/verifier-manage/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/serve',
  //   name: 'serve',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['server-admin'],
  //     title: '服务管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'serve-manage',
  //       name: 'serve-manage',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '公共服务'
  //       },
  //       component: () => import('@/view/serve-manage/public-server/index'),

  //     }
  //   ]
  // },


  {
    path: '/message',
    name: 'message',
    meta: {
      icon: 'icon-icon-xtgg',
      access: ['message-template'],
      title: '消息模板管理'
    },
    component: Main,
    children: [{
        path: 'message-mobile',
        name: 'message-mobile',
        meta: {
          // icon: 'iconradio-button-on-outline',
          title: '短信模板'
        },
        component: () => import('@/view/message-template/message-mobile/index')
      },
      {
        path: 'message-Standinside',
        name: 'message-Standinside',
        meta: {
          // icon: 'iconradio-button-on-outline',
          title: '站内信模板'
        },
        component: () => import('@/view/message-template/message-Standinside/index')
      },
      {
        path: 'message-mail',
        name: 'message-mail',
        meta: {
          // icon: 'iconradio-button-on-outline',
          title: '邮件模板'
        },
        component: () => import('@/view/message-template/message-mail/index')
      }
    ]
  },

  {
    path: '/document-management',
    name: 'document-management',
    meta: {
      icon: 'icon-icon-wdgl',
      // access: ['operate:document:path'],
      title: '文档管理'
    },
    component: Main,
    children: [{
      path: 'document-management',
      name: 'document-management',
      meta: {
        access: ['operate:document:manage'],

        // icon: 'iconradio-button-on-outline',
        title: '文档模板配置'
      },
      component: () => import('@/view/document-management/index')
    }]
  },
  // {
  //   path: '/package',
  //   name: 'package',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['package-admin'],
  //     title: '套餐管理'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'package-manage',
  //       name: 'package-manage',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '套餐管理'
  //       },
  //       component: () => import('@/view/package-manage/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/oder',
  //   name: 'oder',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['order-setting'],
  //     title: '订单配置'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'order-config',
  //       name: 'order-config',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '订单配置'
  //       },
  //       component: () => import('@/view/order-config/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/payment',
  //   name: 'payment',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['pay-setting'],
  //     title: '支付配置'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'payment-config',
  //       name: 'payment-config',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '支付配置'
  //       },
  //       component: () => import('@/view/payment-config/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/contract',
  //   name: 'contract',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['contract-config'],
  //     title: '合同发票配置'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'contract-config',
  //       name: 'contract-config',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '合同发票配置'
  //       },
  //       component: () => import('@/view/contract-config/index')
  //     }
  //   ]
  // },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'icon-icon-xxmkgl',
      // access: ['system-notice'],
      title: '系统公告'
    },
    component: Main,
    children: [{
      path: 'system-notice',
      name: 'system-notice',
      meta: {
        // icon: 'iconradio-button-on-outline',
        title: '系统公告'
      },
      component: () => import('@/view/system-notice/index')
    }]
  },
  // {
  //   path: '/keyword',
  //   name: 'keyword',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['key-word'],
  //     title: '关键词过滤'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'keyword-filte',
  //       name: 'keyword-filte',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '关键词过滤'
  //       },
  //       component: () => import('@/view/keyword-filte/index')
  //     }
  //   ]
  // },
  {
    path: '/userback',
    name: 'userback',
    meta: {
      icon: 'icon-tengxunyunchanpinzonglan-2',
      // access: ['userback'],
      title: '用户反馈'
    },
    component: Main,
    children: [{
      path: 'user-feedback',
      name: 'user-feedback',
      meta: {
        // icon: 'iconradio-button-on-outline',
        title: '用户反馈'
      },
      component: () => import('@/view/user-feedback/index')
    }]
  },
  {
    path: '/appointment',
    name: 'appointment',
    meta: {
      icon: 'icon-icon-yhyy',
      // access: ['userback'],
      title: '用户预约'
    },
    component: Main,
    children: [{
      path: 'user-appointment',
      name: 'user-appointment',
      meta: {
        // icon: 'iconradio-button-on-outline',
        title: '用户预约'
      },
      component: () => import('@/view/user-appointment/index')
    }]
  },
  // {
  //   path: '/sched',
  //   name: 'sched',
  //   meta: {
  //     icon: 'iconpricetags-outline',
  //     // access: ['sched'],
  //     title: '调度设置'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'sched-setting',
  //       name: 'sched-setting',
  //       meta: {
  //         icon: 'iconradio-button-on-outline',
  //         title: '调度设置'
  //       },
  //       component: () => import('@/view/sched-setting/index')
  //     }
  //   ]
  // },
  {
    path: '/wechat',
    name: 'wechat',
    meta: {
      access: ['operate:wechat:path'],
      icon: 'icon-icon-qywxgl',
      title: '企业微信管理'
    },
    component: Main,
    children: [{
      path: 'wechat-manage',
      name: 'wechat-manage',
      meta: {
        access: ['operate:wechat:menu'],
        title: '企业微信管理'
      },
      component: () => import('@/view/wechat-manage/index')
    }]
  },
]
