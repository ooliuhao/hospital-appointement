<!--  -->
<template>
  <div class="main-page">
  <el-form :model="orderForm" :disabled="isView" :rules="rules" ref="orderForm" label-width="150px" class="demo-orderForm">
    <el-form-item label="Vaccines" prop="vaccine">
      <el-select v-model="orderForm.vaccine" placeholder="Please select vaccine" style="width: 100%">
        <el-option v-for="(item, index) in vaccinesList" :label="item.name" :value="item.id" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item  label="Patient Name" prop="patientName">
        <el-select  v-model="orderForm.patientName"  placeholder="Please input name" style="width: 90%">
          <el-option v-for="previously_created in userNames"  :key="previously_created.id"  :label="previously_created.name"
            :value="previously_created.name" ></el-option>
        </el-select>
        <el-button  icon="el-icon-plus" type="primary" @click="createProfile = !createProfile"  style="width: 10%"></el-button>
      </el-form-item>

      <div class="other-patient-form-wrapper">
        <el-form v-if="createProfile" :model="OtherPatientForm" :rules="OtherPatientFormRules" ref="OtherPatientFormRef"
          class="other-patient-form" label-width="120px">
          <el-form-item label="Phone Number" prop="phoneNumber">
            <el-input v-model="OtherPatientForm.phoneNumber" ></el-input>
          </el-form-item>
      
          <el-form-item label="Full Name" prop="fullName">
            <el-input v-model="OtherPatientForm.fullName" ></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="OtherPatientForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Birthday" prop="birthday">
            <el-date-picker v-model="OtherPatientForm.birthday" type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="Gender" prop="gender">
            <el-select v-model="OtherPatientForm.gender">
              <el-option label="Male" value="m"></el-option>
              <el-option label="Female" value="f"></el-option>
            </el-select>
          </el-form-item>
          
          <el-button type="danger" @click="handleDialogCheckboxChange">cancel</el-button>
          
    
          
        </el-form>
      </div>
    <el-form-item label="Appointment Time" required>
      <el-col :span="9">
        <el-form-item prop="date">
          <el-date-picker @change="handleDataChange" type="date" placeholder="Select date" v-model="orderForm.date" style="width: 100%;" value-format="yyyy-MM-dd" :pickerOptions="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="9">
        <el-form-item prop="period">
          <el-select v-model="orderForm.period" placeholder="Select period" style="width: 100%" @change="handlePeriodChange">
            <el-option v-for="(item, index) in periodList" :label="item.period" :value="item.period" :key="index" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <span style="color: red" v-if="avaliableCount == 0">{{ avaliableCount }}</span>
        <span v-if="avaliableCount != 0">{{ avaliableCount }}</span>
        available
      </el-col>
    </el-form-item>
    <el-form-item label="Description" prop="desc">
      <el-input type="textarea" v-model="orderForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleCancel('orderForm')">Cancel</el-button>
      <el-button type="primary" @click="handleCreate('orderForm')">Appointment</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>

import { mapState} from 'vuex'
import store from '@/store/index.js'
import API from '../api/index.js'
import { deepClone } from '@/util/util'

export default {
  name: 'vaccinesPage',
  props: {
    appointmentInfo: {
      type: Object,
      default() {
        return {
          vaccine: '',
          patientName: '',
          date: '',
          period: '',
          symptom: [],
          desc: '',
        }
      }
    },
    isView: Boolean,
    card: Object,
    // vaccinesList: Array,
  },
    data() {
      return {
        userInfo: store.state,
        username: store.state.auth.user.name,
        userNames: [{ id: store.state.auth.user.id, name: store.state.auth.user.name }],
        createProfile: false,
        vaccinesList: [],
        userInfo: store.state,
        periodList: [],
        orderForm: {
          vaccine: '',
          patientName: '',
          date: '',
          period: '',
          symptom: [],
          desc: '',
        },
        OtherPatientForm: {
        fullName: null,
        email: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
      },
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
      },
        rules: {
          vaccine: [{
            required: true,
            message: 'Please select vaccine',
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
          desc: [{
            required: true,
            message: 'Please input symptom description',
            trigger: 'blur'
          }]
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        avaliableCount: 0,
        datePeriod: [],
        doctorDatePeriod: [],
      }
    },

    components: {
      // ...mapState(store, ['count']),
    },

    computed: {},

    mounted() {
      // console.log("this.appointmentInfo")
      // console.log(this.appointmentInfo)
      this.orderForm = this.appointmentInfo
      this.getVaccines()
      this.getCreatedbyUserNames()
    },

    methods: {
      getCreatedbyUserNames() {
      API.getCreatedbyUserNames({ creator_id: this.userInfo.auth.user.id })
      .then(data => {
        this.orderForm.patientName=this.userNames[0].name
        const newNames = data.createdbyUsers.map(user => ({
          id: user.id,
          name: user.name
        }));
        this.userNames = this.userNames.concat(newNames);
      })
      .catch(error => {
        console.error('Error fetching user names:', error);
      });
    },
    handleDialogCheckboxChange(value) {
      this.profileExist=true
      this.getOrCreateProfile=false
    },
      async getVaccines() {
        await API.getVaccines({}).then(res => {
          this.vaccinesList = res.resData
          this.vaccinesList.filter(item => {
            if(item.name == this.orderForm.vaccine) {
              this.orderForm.vaccine = item.id
            }
          })
        }) .catch(e => {
          console.log(e)
        })
        // await axios({
        //   url: '/appointment/getVaccines',
        //   headers: {
        //     isToken: true,
        //   },
        //   method: 'post',
        // }).then(res => {
        //   this.vaccinesList = res.resData
        //   console.log(1)
        // }) .catch(e => {
        //   console.log(e)
        // })
      },
      getCountAvailable() {

      },
      getCustomerByPhone() {
      this.$refs.OtherPatientFormRef.validateField('phoneNumber', (errorMessage) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        // Validation passed, 
        API.getCustomerByPhone({phone_num:this.OtherPatientForm.phoneNumber}).then(res => {
        // console.log(res.user.length)
        if(res.user.length>0){
          this.profileExist=true
          // this.getOrCreateProfile=false
          let idExists = this.userNames.some(user => user.id === res.user[0].id);
          if(idExists){
            this.$message({
                    type: 'warn',
                    message: 'patient already Exist,Please select the name from the dropdown'
                  });
          }else{
            this.userNames.push({id:res.user[0].id , name:res.user[0].name})
           this.orderForm.patientName=res.user[0].name
          }
         
        }else{
          this.$message({
                    type: 'error',
                    message: 'Patient profile does not exist, Please Fill the profile'
                  });
        this.profileExist=false
        }
      }).catch(err =>{
        console.log(err)
      })
      }
    });
    },
    handleCreate(formName) {
      if (!this.createProfile) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const selected_patient=this.userNames.find(user => user.name === this.orderForm.patientName)
            this.orderForm.cust_id = selected_patient.id
            this.orderForm.created_by = this.userInfo.auth.user.id
            this.$confirm('Are you sure submit this appointment', 'Tips', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              API.createVaccineAppointment(this.orderForm).then(res => {
                // console.log(res)
                if (res.resData.affectedRows > 0) {
                  // console.log('asaa')
                  this.handleReset('orderForm', 'OtherPatientFormRef')
                  this.$emit('closeFormDialog')
                  this.$message({
                    type: 'success',
                    message: 'Appointment Success!'
                  });
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
                this.orderForm.otherPatient = this.OtherPatientForm
                this.$confirm('Are you sure submit this appointment', 'Tips', {
                  confirmButtonText: 'Confirm',
                  cancelButtonText: 'Cancel',
                  type: 'warning'
                }).then(() => {
                  // console.log(this.orderForm)
                  API.createVaccineAppointmentforNew(this.orderForm).then(res => {
                    // console.log(res)
                    if (res.resData.affectedRows > 0) {
                      // console.log('asaa')
                      this.handleReset('orderForm', 'OtherPatientFormRef')
                      this.$emit('closeFormDialog')
                      this.$message({
                        type: 'success',
                        message: 'Appointment Success!'
                      });
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
    
      handleDataChange(data) {
        this.orderForm.period = ''
        this.avaliableCount = 0
        API.getTimePeriodByDate({
          date: data
        }).then(res => {
          var tmp = res.periodList
          tmp.forEach(item => {
            if(item.vaccineCount == 0) {
              item.disabled = true
            }
          })
          this.periodList = tmp
        }) .catch(e => {
          console.log(e)
        })
      },
      handlePeriodChange() {
        var data = this.periodList.filter((item) => {
          return item.period == this.orderForm.period
        })
        // console.log(data)
        if(data.length != 0) {
          this.avaliableCount = data[0].vaccineCount
          this.orderForm.date_time_period_id = data[0].date_time_period_id
        } else {
          this.avaliableCount = 0
          this.orderForm.date_time_period_id = ''
        }
      }
    }
  }

</script>
<style scoped lang="scss">
.main-page {
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

</style>
