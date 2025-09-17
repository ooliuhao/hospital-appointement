import axios from "@/axios/axios";
import sha256 from 'crypto-js/sha256';
const scope = 'server'

function getUserByid(param) {
  const grant_type = 'password'
  return axios({
    url: '/v1/getUserByid',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function updatecustinfo(param) {
  const grant_type = 'password'
  return axios({
    url: '/v1/updatecustinfo',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function changeUserPassword(params) {

  const currentPassword = sha256(params.currentPassword).toString();
  const newPassword = sha256(params.newPassword).toString();
  const confirmPassword = sha256(params.confirmPassword).toString();
  return axios({
    url: '/v1/changePassword',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: {
      currentPassword,
      newPassword,
      confirmPassword,
      id: params.id
    }
  })
}



function getPersonsByCreatedBy(params) {
  return axios({
    url: '/account/getPersonsByCreatedBy',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}

function getPersonsByCreatedfor(params) {
  return axios({
    url: '/v1/getPersonsByCreatedfor',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}

function deleteProfile(params) {
  return axios({
    url: '/v1/deleteAppointementForOtherProfile',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}

function createProfileforother(params) {
  return axios({
    url: '/v1/createProfileforother',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}


function getUserJoinAccountByid(params) {
  return axios({
    url: '/v1/getUserJoinAccountByid',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}
function updatePatient(params) {
  return axios({
    url: '/account/updatePatient',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}
function updateCurrentLoginUser(params) {
  return axios({
    url: '/account/updateCurrentLoginUser',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}
function uploadProfilePic(params) {
  // console.log(params)
  return axios({
    url: '/account/uploadProfilePic',
    headers: {
      isToken: true,
      // "Content-Type": "application/octet-stream;charset=utf-8"
      "Content-Type": "multipart/form-data"
    },
    method: 'post',
    data: params
  })
}

function deleteUploadFile (params) {
  // console.log(params)
  return axios({
    url: '/account/deleteUploadFile ',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}

function checkGetThePatientLimit (params) {
  // console.log(params)
  return axios({
    url: '/account/checkGetThePatientLimit ',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: params
  })
}



export default {
  getUserByid,
  updatecustinfo,
  changeUserPassword,
  getPersonsByCreatedBy,
  deleteProfile,
  createProfileforother,
  getPersonsByCreatedfor,
  getUserJoinAccountByid,
  updatePatient,
  updateCurrentLoginUser,
  uploadProfilePic,
  deleteUploadFile,
  checkGetThePatientLimit,
}