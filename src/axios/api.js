import request from './index'
 
//获取用户信息接口
export const getUserInfo = (data) => request.get('/getUserInfo', { params: data })
export const getSqlInfo = (data) => request.get('/getSqlInfo', { params: data })