// 对于用户操作的接口管理
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  register(params) {
    return axios.post('/passport/logon', params);
  },
  getCode(params) {
    return axios.post('/passport/getCode', params);
  },
  findBack(params) {
    return axios.post('/passport/findBack', params);
  },
};
