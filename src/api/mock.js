import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from '@/api/mockServeData/user'
import permissionApi from '@/api/mockServeData/permission'

Mock.mock('/home/getData', homeApi.getStatisticalData)

//拦截用户table请求
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock('/user/edit', 'post', userApi.updateUser)
Mock.mock(/user\/deleteUser/, 'post', userApi.deleteUser)
Mock.mock(/user\/add/, 'post', userApi.createUser)

//拦截登录接口
Mock.mock(/permission\/userLogin/, 'post', permissionApi.getMenu)