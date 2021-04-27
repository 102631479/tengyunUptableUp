module.exports = [
    /**
     * 根据id查询用户信息
    */
    {
        method: 'get',
        path: '/platform-auth/user/1252135521128419328',
        res: {
            code: 1,
            data: {
                "id": 1252135521128419328,
                "dataCreateTime": "2020-04-20 15:22:26",
                "dataUpdateTime": "2020-04-20 15:22:26",
                "dataVersion": 1,
                "userCode": "test4",
                "userName": "test4",
                "email": "123@12301100.com",
                "password": "test4",
                "phone": "18395606805",
                "userStatus": 1,
                "userType": 1,
                "adminFlag": false
            },
            "errorcode": 0,
            "msg": "success",
            "ret": 0
        }
    },
    /**
     * 登录
    */
   {
        method: 'post',
        path: '/login',
        res: {
            code: 1,
            data: {
                token: 'lkjdsagkldshfkjlsdngfdslj124lkds'
            },
            "errorcode": 0,
            "msg": "success",
            "ret": 0
        }
    },
    /**
     * 获取用户信息
    */
    {
        method: 'get',
        path: '/user/info',
        res: {
            code: 1,
            data: {
                username: 'wangding',
                access: [],
                sex: 1
            },
            "errorcode": 0,
            "msg": "success",
            "ret": 0
        }
    }
]