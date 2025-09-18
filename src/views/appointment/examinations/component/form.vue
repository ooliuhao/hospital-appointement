<!--  -->
<template>
  <div class="main-Page">
    <div class="innerPage">
 
        <el-form :model="orderForm" :disabled="isView" :rules="rules" ref="orderForm" label-width="150px"
          class="demo-orderForm">

            <h5> {{ card.name }} </h5>
      
            <el-form-item label="Department" prop="department">
<!--            <el-select @change="handleDepartmentChange" v-model="orderForm.department" filterable-->
<!--              placeholder="Please select department" style="width: 100%">-->
<!--              <el-option-group v-for="group in departmentList" :key="group.label" :label="group.label">-->
<!--                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">-->
<!--              </el-option>-->
<!--              </el-option-group>-->
<!--            </el-select>-->

              <el-input v-model="orderForm.department" readonly></el-input>

          </el-form-item>
       
         
<!--          <el-form-item label="Doctor" prop="doctor">-->
<!--            <el-select @change="handleDoctorChange" v-model="orderForm.doctor" placeholder="Please select doctor"-->
<!--              style="width: 100%">-->
<!--              <el-option v-for="(item, index) in doctorList" :label="item.name" :value="item.id" :key="index"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="Applicant Name" prop="ApplicantName">
            <el-select v-model="orderForm.patientName" placeholder="Please input name" style="width: 90%">
              <el-option v-for="previously_created in userNames" :key="previously_created.id"
                :label="previously_created.name" :value="previously_created.id"></el-option>
            </el-select>
            <el-button icon="el-icon-plus" type="primary" @click="createProfile = !createProfile"
              style="width: 10%"></el-button>
          </el-form-item>

          <div class="other-patient-form-wrapper">
            <el-form v-if="createProfile" :model="OtherPatientForm" :rules="OtherPatientFormRules"
              ref="OtherPatientFormRef" class="other-patient-form" label-width="120px">
              <el-form-item label="Phone Number" prop="phoneNumber" >
                <el-input v-model="OtherPatientForm.phoneNumber" :disabled="!creating"></el-input>
              </el-form-item>
              <el-form-item label="Full Name" prop="fullName" >
                <el-input v-model="OtherPatientForm.fullName" :disabled="!creating"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email" >
                <el-input v-model="OtherPatientForm.email" :disabled="!creating"></el-input>
              </el-form-item>
              <el-form-item label="Birthday" prop="birthday">
                <el-date-picker v-model="OtherPatientForm.birthday" type="date" :disabled="!creating"> </el-date-picker>
              </el-form-item>
              <el-form-item label="Nationality" prop="nationality"  >
                      <!-- <el-select v-model="OtherPatientForm.nationality" :disabled="!creating" >
                        <el-option label="Ethiopian" value="4001"></el-option>
                        <el-option label="Foreigner" value="4002"></el-option>
                      </el-select> -->

                <el-select v-model="OtherPatientForm.nationality">
                        <el-option v-for="nationality in nationalities" :key="nationality" :label="nationality" :value="nationality"></el-option>
                      </el-select>
              </el-form-item>
              <el-form-item label="Gender" prop="gender">
                <el-select v-model="OtherPatientForm.gender" :disabled="!creating">
                  <el-option label="Male" value="m"></el-option>
                  <el-option label="Female" value="f"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="success" @click="handleSaveOrEdit">{{( createProfile && creating) ? 'Save' : 'Edit' }}</el-button>
              <el-button type="danger" @click="handleDialogCheckboxChange">cancel</el-button>
            </el-form>
          </div>
          <el-form-item label="Appointment Time" required>
            <el-col :span="9">
              <el-form-item prop="date">
                <el-date-picker @change="handleDataChange" type="date" placeholder="Select date" v-model="orderForm.date"
                  style="width: 100%;" value-format="yyyy-MM-dd" :pickerOptions="pickerOptions"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="9">
              <el-form-item prop="period">
  <el-select v-model="orderForm.period" placeholder="Select period" style="width: 100%"
    @change="handlePeriodChange">
    <el-option v-for="(item, index) in displayPeriodList" :label="item.displayPeriod" :value="item.period" :key="index"
      :disabled="item.disabled"></el-option>
  </el-select>
</el-form-item>
            </el-col>
            <el-col :span="16">
              <span style="color: red" v-if="avaliableCount == 0">{{ avaliableCount }}</span>
              <span v-if="avaliableCount != 0">{{ avaliableCount }}</span>
              available
            </el-col>
            <el-col :span="16">
              There are 
              <span style="color: rgb(38, 255, 0)" v-if="personCount == 0">{{ personCount }}</span>
              <span v-if="personCount != 0">{{ personCount }}</span>
              Persons before you
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="Symptom" prop="symptom">
            <el-checkbox-group v-model="orderForm.symptom">
              <el-checkbox label="Fever" name="symptom"></el-checkbox>
              <el-checkbox label="Headache" name="symptom"></el-checkbox>
              <el-checkbox label="Diarrhea" name="symptom"></el-checkbox>
              <el-checkbox label="Vomit" name="symptom"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          <el-form-item label="Description" prop="desc">
            <el-input type="textarea" v-model="orderForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="float: right;" class="button-group">
              <el-button @click="handleReset('orderForm', 'OtherPatientFormRef')">Reset</el-button>
              <el-button @click="handleCancel('orderForm')" type="warning">Cancel</el-button>
              <el-button type="primary" @click="handleCreate('orderForm')">Appointment</el-button>
            </div>

          </el-form-item>

        </el-form>

     
    </div>

  </div>
</template>

<script>

import store from '@/store/index.js'
import API from '../../api/index'
import { deepClone } from '@/util/util'
import nationalities from '@/util/nationalities'

export default {
  name: 'vaccinesPage',
  props: {
    appointmentInfo: {
      type: Object,
      default() {
        return {
        department: '',
        doctor: '',
        patientName: '',
        date: '',
        period: '',
        symptom: [],
        desc: '',
        date_time_period_id: ''
        }
      }
    },
    isView: Boolean,
    card: Object,
  },
  data() {
    return {
      creating:true,
      userInfo: store.state,
      username: store.state.auth.user.name,
      userNames: [],
      createProfile: false,
      departmentList: [],
      doctorList: [],
      periodList: [],
      orderForm: {
        department: 'Land Bureau',
        doctor: '',
        patientName: '',
        date: '',
        period: '',
        symptom: [],
        desc: '',
        date_time_period_id: ''
      },
      OtherPatientForm: {
        fullName: null,
        email: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
        nationality:null
      },
      nationalities:nationalities,
      OtherPatientFormRules: {
        fullName: [{ required: true, message: 'Please enter your full name', trigger: 'blur' }],
        email: [
          { required: false, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Invalid email format', trigger: 'blur' },
        ],
        phoneNumber: [
          { required: true, message: 'Please enter your phone number', trigger: 'blur' },
          { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits', trigger: 'blur' },
        ],
        birthday: [{ required: true, message: 'Please select your birthday', trigger: 'change' }],
        gender: [{ required: true, message: 'Please select your gender', trigger: 'change' }],
        nationality: [{ required: true, message: 'Please select Nationality', trigger: 'change' }],
      },
      rules: {
        department: [{
          required: true,
          message: 'Please select department',
          trigger: 'change'
        }],
        doctor: [{
          required: true,
          message: 'Please select doctor',
          trigger: 'change'
        }],

        date: [{
          required: true,
          message: 'Please select date',
          trigger: 'change'
        }],
        period: [{
          required: true,
          message: 'Please select period',
          trigger: 'change'
        }],
        symptom: [{
          type: 'array',
          message: 'Please select at least one symptom',
          trigger: 'change'
        }],
        desc: [{
          required: false,
          message: 'Please input symptom description',
          trigger: 'blur'
        }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      avaliableCount: 16,
      datePeriod: [],
      doctorDatePeriod: [],
      personCount:0,


    }
  },

  components: {
  },

  computed: {
  displayPeriodList() {
    return this.periodList.map(item => {
      const [startTime, endTime] = item.period.split(' -- ');
      let startTimeWithPM;
      let endTimeWithPM;
      if(startTime == '08:30'){
         startTimeWithPM = startTime + 'AM';
          endTimeWithPM = endTime + ' PM';
      }else{
         startTimeWithPM = startTime + ' PM';
        endTimeWithPM = endTime + ' PM';
      }
      const displayTime = startTimeWithPM + ' -- ' + endTimeWithPM;
      return {
        period: item.period,
        displayPeriod: displayTime,
        disabled:item.disabled
      };
    });
  },
},

  mounted() {
    this.userNames = [{ id: store.state.auth.user.id, name: store.state.auth.user.name }]
    if(this.username == null) {
      this.userNames[0].name = 'Current Login Patient'
    }
    this.getDepartments()
    // this.orderForm.department = this.card.id
    this.orderForm.department = 'Land Bureau';
    this.orderForm.doctor = this.card.doctor
    this.getCreatedbyUserNames()
    this.getDoctors({ department_id: this.card.id })
    // this.handleDepartmentChange(this.card.id)
  },

  methods: {
    handleSaveOrEdit(){
     
      this.$refs.OtherPatientFormRef.validate((valid) => {
              if (valid) {
                this.creating=!this.creating
              } else {
                return false;
              }
            })
    },
    handleCancel() {
      this.$emit('closeOrder')
    },
    getCreatedbyUserNames() {
      API.getPersonsByCreatedfor({ created_by: store.state.auth.user.id })
        .then(data => {
          this.orderForm.patientName = this.userNames[0].name
          const newNames = data.resData.map(user => ({
            id: user.id,
            name: user.name
          }));
          this.userNames = this.userNames.concat(newNames);
          this.orderForm.patientName = this.userNames[0].id
        })
        .catch(error => {
          console.error('Error fetching user names:', error);
        });
    },
    handleDialogCheckboxChange() {
      this.createProfile = false
      this.creating=true
      this.$refs[OtherPatientFormRef].resetFields();
      
    },
    getDepartments() {
      API.getDepartments().then(res => {
        this.departmentList = res.departmentParent
      })
    },
    getDoctors(param) {
      API.getDoctors(param).then(res => {
        this.doctorList = res.doctors
        this.orderForm.doctor = this.card.doctor
      }).catch(err => {
        console.log(err)
      })
    },
    handleCreate(formName) {
      if (!this.createProfile) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const selected_patient = this.userNames.find(user => user.id === this.orderForm.patientName)
            this.orderForm.cust_id = selected_patient.id
            this.orderForm.patientName = selected_patient.name
            this.orderForm.created_by = this.userInfo.auth.user.id
            this.orderForm.symptomStr = this.orderForm.symptom.join(',')
            this.$confirm('Are you sure submit this appointment', 'Tips', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              API.createExaminationAppointment(this.orderForm).then(res => {
                if (res.resData.affectedRows > 0) {
                  this.handleReset('orderForm', 'OtherPatientFormRef')
                  this.$emit('closeFormDialog')
                  this.$message({
                    type: 'success',
                    message: 'Appointment Success!'
                  });
                  this.$emit('closeOrder')
                } else {
                  this.$message({
                    type: 'error',
                    message: res.resData.message
                  })
                  this.avaliableCount = 0
                }
              }).catch(e => {
                this.$message({
                  type: 'error',
                  message: e
                });
              })
            }).catch(() => {
              this.$message({
                type: 'warning',
                message: 'Appointment Cancel!'
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.OtherPatientFormRef.validate((valid) => {
              if (valid) {

                this.orderForm.created_by = this.userInfo.auth.user.id
                this.orderForm.symptomStr = this.orderForm.symptom.join(',')
                this.orderForm.otherPatient = this.OtherPatientForm
                this.$confirm('Are you sure submit this appointment', 'Tips', {
                  confirmButtonText: 'Confirm',
                  cancelButtonText: 'Cancel',
                  type: 'warning'
                }).then(() => {
                  // console.log(this.orderForm)
                  API.createExaminationAppointmentforNew(this.orderForm).then(res => {
                    // console.log(res)
                    if (res.resData.affectedRows > 0) {
                      this.handleReset('orderForm', 'OtherPatientFormRef')
                      this.$emit('closeFormDialog')
                      this.$message({
                        type: 'success',
                        message: 'Appointment Success!'
                      });
                      this.$emit('closeOrder')
                    } else {
                      this.$message({
                        type: 'error',
                        message: res.resData.message
                      })
                      this.avaliableCount = 0
                    }
                  }).catch(e => {
                    this.$message({
                      type: 'error',
                      message: e
                    });
                  })
                }).catch(() => {
                  this.$message({
                    type: 'warning',
                    message: 'Appointment Cancel!'
                  });
                });

              } else {
                return false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    },
    handleReset(formName, OtherPatientFormRef) {
      this.$refs[formName].resetFields();
      if (this.createProfile)
        this.$refs[OtherPatientFormRef].resetFields();
    },
    handleDepartmentChange(data) {
      this.orderForm.doctor = ''
      API.getDoctors({ department_id: data }).then(res => {
        this.doctorList = res.doctors
      }).catch(e => {
        console.log(e)
      })
    },
    handleDoctorChange(data) {
      this.orderForm.period = ''
      var param = {
        doctor_id: this.orderForm.doctor,
        date: this.orderForm.date == undefined ? '' : this.orderForm.date
      }
      API.getDateTimePeriodByDoctorAndDate(param).then(res => {
        this.doctorDatePeriod = res.resData
        const tempPeriodList = deepClone(this.periodList)
      
        for (var i = 0; i < tempPeriodList.length; i++) {
          let index = this.doctorDatePeriod.findIndex(item => {
            return item.period == tempPeriodList[i].period && item.available_count > 0;
          })
          if (index < 0) {
            tempPeriodList[i].disabled = true
          } else {
            tempPeriodList[i].disabled = false
          }
        }
        this.periodList = tempPeriodList.reverse()
        this.handlePeriodChange()
      }).catch(e => {
        console.log(e)
      })

      API.getPreviousPersonCount(param).then(resp =>{
             this.personCount=resp.resData[0].previousCount
      }).catch( e =>{
       console.log(e)
      })
    },
    handleDataChange(data) {
      this.orderForm.period = ''
      this.avaliableCount = 0
      API.getTimePeriodByDate({
        date: data
      }).then(res => {
        this.periodList = deepClone(res.periodList)
        var param = {
          doctor_id: this.orderForm.doctor,
          date: this.orderForm.date
        }
        API.getDateTimePeriodByDoctorAndDate(param).then(res => {
          this.doctorDatePeriod = res.resData
          const tempPeriodList = deepClone(this.periodList)

          for (var i = 0; i < tempPeriodList.length; i++) {
            let index = this.doctorDatePeriod.findIndex(item => {
              return item.period == tempPeriodList[i].period && item.available_count > 0;
            })
            if (index < 0) {
              tempPeriodList[i].disabled = true
            } else {
              tempPeriodList[i].disabled = false
            }
          }
          this.periodList =deepClone (tempPeriodList)
        }).catch(e => {
          console.log(e)
        })
        API.getPreviousPersonCount(param).then(resp =>{
             this.personCount=resp.resData[0].previousCount
      }).catch( e =>{
       console.log(e)
      })
      }).catch(e => {
        console.log(e)
      })
    },
    handlePeriodChange() {
      var data = this.doctorDatePeriod.filter((item) => {
        return item.period == this.orderForm.period
      })
      if (data.length != 0) {
        this.avaliableCount = data[0].available_count
        this.orderForm.date_time_period_id = data[0].date_time_period_id
      } else {
        this.avaliableCount = 0
        this.orderForm.date_time_period_id = ''
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.main-Page {
  width: 80%;
  margin: 20px auto;
  background-color: transparent;
  // opacity: 0.8;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    width: 100%;
    margin: 20px 0px;
    padding: 20px 0;
  }

}

.innerPage {
  // width: 60%;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media (max-width: 600px) {
    width: 100%;
    padding: 20px 0px;
  }
}

::v-deep .demo-orderForm {
  color: black;
}

::v-deep .el-form-item__label {
  color: black;
  font-size: 14px;
}

.other-patient-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
 
}

.other-patient-form {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
  
  @media (max-width: 600px) {
    width: 100%;
  }
}



::v-deep.el-form-item {
  @media (max-width: 600px) {
    display: flex;
  flex-direction: column; 
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  margin: 0;
  width: 100%;
  }
 /* Allow the form item to grow and take remaining space */
}
::v-deep .el-form-item__content{
  @media (max-width: 600px) {
    margin-left: 15px!important;
    width: 90%;
   
  }
 
}
::v-deep .el-form-item__label {
  @media (max-width: 600px) {
    text-align: left;
    margin: 15px;
  }
}

::v-deep .el-button{
  @media (max-width: 600px) {
    text-align: left;
    margin: 15px;
  }
}

::v-deep.el-select {
  @media (max-width: 600px) {
    margin: 0; 
    width: 100%;
  }
 /* Allow the input to grow and take remaining space */
}
.el-input{
  @media (max-width: 600px) {
    text-align: left;
    margin: 0;
  }
  
}


::v-deep.el-checkbox-group {
  
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      align-items: start;
   }
}
::v-deep.el-button {
  display: inline-block;
  @media (max-width: 600px) {
      display: flex;
     justify-content: center;
      align-items: start;
   }
}
.button-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep.el-date-editor{
  @media (max-width: 600px) {
     width: 100%!important;
   }
}
</style>
