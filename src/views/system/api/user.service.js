import axios from '@/axios/axios'
import authHeader from './auth-header'

class UserService {
  getPublicContent() {
    return axios({
      url: '/test/all',
      headers: {
        isToken: true,
      },
      method: 'get',
      //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    })
  }

  getUserBoard() {
    return axios({
      url: '/test/user',
      headers: {
        isToken: true
      },
      method: 'get',
    })
  }

  getModeratorBoard() {
    return axios({
      url: '/test/mod',
      method: 'get',
      headers: {
        isToken: true
      },
    })
  }

  getAdminBoard() {
    return axios({
      url: '/test/admin',
      method: 'get',
      headers: {
        isToken: true
      },
    })
  }
}

export default new UserService()