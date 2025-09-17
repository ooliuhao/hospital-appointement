import axios from "@/axios/axios";
const scope = 'server'

function createExaminationAppointment(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/createExaminationAppointment',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function createVaccineAppointment(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/createVaccineAppointment',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function createVaccineAppointmentforNew (param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/createVaccineAppointmentforNew ',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
function getAllExaminationAppointment(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getAllExaminationAppointment',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getVaccineAppointmentByCustomer(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getVaccineAppointmentByCustomer',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getExamAppointmentByCustomer(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getExamAppointmentByCustomer',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getExaminationAppointmentByDoctor(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getExaminationAppointmentByDoctor',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}


function getDepartments(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getDepartments',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getDoctors(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getDoctors',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getDoctorbyid(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getDoctorbyid',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}


function getDateTimePeriodByDoctorAndDate(param) {
  const grant_type = 'password'
  return axios({
    url: '/appointment/getDateTimePeriodByDoctorAndDate',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getTimePeriodByDate(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getTimePeriodByDate',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getDictItems(param) {
  return axios({
    url: '/appointment/getDictItems',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function changeStatus(param) {
  return axios({
    url: '/appointment/changeStatus',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function changeVaccineAppointmentStatus(param) {
  return axios({
    url: '/appointment/changeVaccineAppointmentStatus',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}
function getExamAppointmentByParam(param) {
  return axios({
    url: '/appointment/getExamAppointmentByParam',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}


function getVaccineAppointmentByParam(param) {
  return axios({
    url: '/appointment/getVaccineAppointmentByParam',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

async function getVaccines(param) {
  return await axios({
    url: '/appointment/getVaccines',
    headers: {
      isToken: true,
    },
    method: 'post',
    //data: "username="+username+ "&password="+password+"&grant_type="+grant_type+"&randomStr="+randomStr+"&code="+code+"&scope="+scope
    data: param
  })
}

function getPhysicalExamAppointmentByParam(param) {
  return axios({
    url: '/appointment/getPhysicalExamAppointmentByParam',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function getPhysicalExam(param) {
  return axios({
    url: '/appointment/getPhysicalExam',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
function getPhysicalTimePeriodByDate(param) {
  return axios({
    url: '/appointment/getPhysicalTimePeriodByDate',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function getPhysicalDateTimePeriodByPhysicalAndDate(param) {
  return axios({
    url: '/appointment/getPhysicalDateTimePeriodByPhysicalAndDate',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function getVaccineDateTimePeriodByPhysicalAndDate(param) {
  return axios({
    url: '/appointment/getVaccineDateTimePeriodByPhysicalAndDate',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function createPhysicalExamAppointmentforNew(param) {
  return axios({
    url: '/appointment/createPhysicalExamAppointmentforNew',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
function createPhysicalExamAppointment(param) {
  return axios({
    url: '/appointment/createPhysicalExamAppointment',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function createExaminationAppointmentforNew(param) {
  return axios({
    url: '/appointment/createExaminationAppointmentforNew',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
function changePhysicalExamAppointmentStatus(param) {
  return axios({
    url: '/appointment/changePhysicalExamAppointmentStatus',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function getCreatedbyUserNames(param) {
  const grant_type = 'password'

  return axios({
    url: '/appointment/getCreatedbyUserNames',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
function getPackageByType(param) {
  return axios({
    url: '/appointment/getPackageByType',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
function getAllAppointment(param) {
  return axios({
    url: '/appointment/getAllAppointment',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
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


function cancelAppointment(param) {
  return axios({
    url: '/appointment/cancelAppointment',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}

function getPreviousPersonCount(param) {
  return axios({
    url: '/appointment/getPreviousPersonCount',
    headers: {
      isToken: true,
    },
    method: 'post',
    data: param
  })
}
export default {
  cancelAppointment,
  createExaminationAppointment,
  createExaminationAppointmentforNew,
  createVaccineAppointment,
  createVaccineAppointmentforNew,
  getAllExaminationAppointment,
  getExamAppointmentByCustomer,
  getVaccineAppointmentByCustomer,
  getExaminationAppointmentByDoctor,
  getDepartments,
  getDoctors,
  getDateTimePeriodByDoctorAndDate,
  getTimePeriodByDate,
  getDictItems,
  changeStatus,
  changeVaccineAppointmentStatus,
  getExamAppointmentByParam,
  getVaccineAppointmentByParam,
  getVaccines,
  getPhysicalExamAppointmentByParam,
  getPhysicalExam,
  getPhysicalTimePeriodByDate,
  getPhysicalDateTimePeriodByPhysicalAndDate,
  createPhysicalExamAppointment,
  createPhysicalExamAppointmentforNew,
  changePhysicalExamAppointmentStatus,
  getDoctorbyid,
  getCreatedbyUserNames,
  getPackageByType,
  getPersonsByCreatedfor,
  getAllAppointment,
  getVaccineDateTimePeriodByPhysicalAndDate,
  getPreviousPersonCount
}