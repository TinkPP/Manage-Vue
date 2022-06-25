import axios from "axios";

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

export const deleteUser = (params) => {
    return axios.request({
        url: '/user/deleteUser',
        method: 'post',
        params
    })
}

//用户登录请求
export const userLogin = (params) => {
    return axios.request({
        url: '/permission/userLogin',
        method: 'post',
        data: params
    })
}