import Mock from 'mockjs'
export default {
    getMenu: config => {
        // console.log(config);
        const { username, password } = JSON.parse(config.body)
            //先判断用户是否存在
            //判断账号和密码是否对应
        if (username == 'admin' && password == 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "home/index",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "goods",
                            url: "mall/index",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "user",
                        },
                        {
                            label: "其他",
                            icon: "more",
                            children: [{
                                    path: "/pageOne",
                                    name: "pageOne",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "other/pageOne",
                                },
                                {
                                    path: "/pageTwo",
                                    name: "pageTwo",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "other/pageTwo",
                                },
                            ],
                        },
                    ],
                },
                token: 12345
            }
        } else if (username == 'shushu' && password === '123') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: "/",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home/Home",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "goods",
                            url: "mallManage/mallManage",
                        },
                    ],
                }
            }
        } else {
            return {
                code: 999,
                data: {
                    message: '用户名或者密码错误'
                }
            }
        }
    }
}