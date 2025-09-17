import axios from '@/axios/axios'
import sha256 from 'crypto-js/sha256'


class AuthService {
  async login(user) {
    // console.log('api signin', user)
    const password = user.password
    const encryptedPassword = sha256(password).toString()
    return await axios({
      url: '/auth/signin',
      method: 'post',
      data: {
        // phone_num: user.phone_num,
        password: encryptedPassword,
        email:user.email
    
      }
    })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    const password = user.password
    const encryptedPassword = sha256(password).toString()

    return axios({
      url: '/auth/signup',
      method: 'post',
      data: {
        password: encryptedPassword,
        phone_num : user.phone_num,
        email:user.email
      }
    })
  }
}

export default new AuthService()