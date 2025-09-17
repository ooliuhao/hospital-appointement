import axios from '@/axios/axios'




 function sendMessage(message) {
    const contact={
      message:message,
      phone:'',
      subject:'',
      email:'',
      fullName:''
    }
    return axios({
      url: '/contact/putMessage',
      method: 'post',
      data: contact
    })
  }
  function subscribe(email) {
    const body={email:email}
    return axios({
      url: '/subscribe',
      method: 'post',
      data: body
    })
  }


export default {
  sendMessage,
  subscribe

}