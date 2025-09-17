<!--  -->
<template>
  <div class="mainPage">
    <div class="innerPage">
      <el-form :model="orderForm" :disabled="isView" :rules="rules" ref="orderForm" label-width="150px"
        class="demo-orderForm">
        <el-form-item label="Physical Exam" prop="physical_exam">
          <el-select v-model="orderForm.physical_exam" placeholder="Please select physical exam" style="width: 100%"
            @change="handlePhysicalExamChange">
            <el-option v-for="(item, index) in physicalExamsList" :label="item.name" :value="item.id" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Patient Name" prop="patientName">
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
              <el-form-item label="Phone Number" prop="phoneNumber">
                <el-input v-model="OtherPatientForm.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item label="Full Name" prop="fullName">
                <el-input v-model="OtherPatientForm.fullName"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input v-model="OtherPatientForm.email"></el-input>
              </el-form-item>
              <el-form-item label="Birthday" prop="birthday">
                <el-date-picker v-model="OtherPatientForm.birthday" type="date" value-format="yyyy-MM-dd"></el-date-picker>
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
              <el-date-picker @change="handleDataChange" type="date" placeholder="Select date" v-model="orderForm.date"
                style="width: 100%;" value-format="yyyy-MM-dd" :pickerOptions="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="9">
            <el-form-item prop="period">
              <el-select v-model="orderForm.period" placeholder="Select period" style="width: 100%"
                @change="handlePeriodChange">
                <el-option v-for="(item, index) in periodList" :label="item.period" :value="item.period" :key="index"
                  :disabled="item.disabled"></el-option>
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
          <div class="button-group">
            <el-button @click="handleCancel('orderForm')">Cancel</el-button>
          <el-button type="primary" @click="handleCreate('orderForm')">Appointment</el-button>
          </div>
         
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import store from '@/store/index.js'
import API from '../../api/index.js'
import {
  deepClone
} from '@/util/util'

export default {
  name: 'physicalFormPage',
  props: {
    appointmentInfo: {
      type: Object,
      default () {
        return {
          physical_exam: '',
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
    // physicalExamsList: Array,
  },
  data() {
    return {
      OtherPatientForm: {
        fullName: null,
        email: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
      },
      OtherPatientFormRules: {
        fullName: [{
          required: true,
          message: 'Please enter your full name',
          trigger: 'blur'
        }],
        email: [{
            required: false,
            message: 'Please enter your email',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Invalid email format',
            trigger: 'blur'
          },
        ],
        phoneNumber: [{
            required: true,
            message: 'Please enter your phone number',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{10}$/,
            message: 'Phone number must be 10 digits',
            trigger: 'blur'
          },
        ],
        birthday: [{
          required: true,
          message: 'Please select your birthday',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: 'Please select your gender',
          trigger: 'change'
        }],
      },
      createProfile: false,
      userNames: [{
        id: store.state.auth.user.id,
        name: store.state.auth.user.name
      }],
      physicalExamsList: [],
      userInfo: store.state,
      periodList: [],
      orderForm: {
        physical_exam: '',
        patientName: '',
        date: '',
        period: '',
        symptom: [],
        desc: '',
      },
      rules: {
        physical_exam: [{
          required: true,
          message: 'Please select physical exam',
          trigger: 'change'
        }],
        patientName: [{
          required: true,
          message: 'Please select patient name',
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
      physicalDatePeriod: [],
    }
  },

  components: {
    // ...mapState(store, ['count']),
  },

  computed: {},

  mounted() {
    this.userNames = [{ id: store.state.auth.user.id, name: store.state.auth.user.name }]
    const username = store.state.auth.user.name
    if(username == null) {
      this.userNames[0].name = 'Current Login Patient'
    }
    this.getPhysicalExam()
    this.orderForm.physical_exam = this.card.id,
    this.loginInUserInfo = store.state.auth.user
    this.role = this.loginInUserInfo.roles[0]
    const physical_examination = this.$route.query.id
    if (physical_examination) {
      var param = {
        physical_exam: physical_examination,
        patientName: '',
        date: '',
        period: '',
        desc: '',
        date_time_period_id: '',
        type: 'physical_exam'
      }
    } else {}
    this.getPersonsByCreatedfor()
  },

  methods: {
    getPersonsByCreatedfor() {
      API.getPersonsByCreatedfor({
          created_by: this.userInfo.auth.user.id
        })
        .then(data => {
          this.orderForm.patientName = this.userNames[0].id
          const newNames = data.resData.map(user => ({
            id: user.id,
            name: user.name
          }));
          this.userNames = this.userNames.concat(newNames);
        })
        .catch(error => {
          console.error('Error fetching user names:', error);
        });
    },
    handleDialogCheckboxChange() {
      this.createProfile = false
    },
    handleCancel() {
      this.$emit('closeOrder')
      // this.$router.push({path: '/appointment/physical-exam'})
    },

    async getPhysicalExam() {
      await API.getPhysicalExam({}).then(res => {
        this.physicalExamsList = res.resData
        this.physicalExamsList.filter(item => {
          if (item.name == this.orderForm.physical_exam) {
            this.orderForm.physical_exam = item.id
          }
        })
      }).catch(e => {
        console.log(e)
      })
    },
    getCountAvailable() {

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
              API.createPhysicalExamAppointment(this.orderForm).then(res => {
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
                  API.createPhysicalExamAppointmentforNew(this.orderForm).then(res => {
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
                }).catch((e) => {
                  console.log(e)
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
      if (this.createProfile) {
        this.$refs[OtherPatientFormRef].resetFields();
      }
    },
    handlePhysicalExamChange() {
      this.orderForm.period = ''
      this.avaliableCount = 0
      var param = {
        physical_exam: this.orderForm.physical_exam,
        date: this.orderForm.date
      }
      API.getPhysicalDateTimePeriodByPhysicalAndDate(param).then(res => {
        this.physicalDatePeriod = res.resData
        const tempPeriodList = deepClone(this.periodList)

        for (var i = 0; i < tempPeriodList.length; i++) {
          let index = this.physicalDatePeriod.findIndex(item => {
            return item.period == tempPeriodList[i].period && item.available_count > 0;
          })
          if (index < 0) {
            tempPeriodList[i].disabled = true
          } else {
            tempPeriodList[i].disabled = false
          }
        }
        this.periodList = tempPeriodList
      }).catch(e => {
        console.log(e)
      })
    },
    handleDataChange(data) {
      this.orderForm.period = ''
      this.avaliableCount = 0
      API.getPhysicalTimePeriodByDate({
        date: data
      }).then(res => {
        this.periodList = res.resData
        var param = {
          physical_exam: this.orderForm.physical_exam,
          date: this.orderForm.date
        }
        API.getPhysicalDateTimePeriodByPhysicalAndDate(param).then(res => {
          this.physicalDatePeriod = res.resData
          const tempPeriodList = deepClone(this.periodList)

          for (var i = 0; i < tempPeriodList.length; i++) {
            let index = this.physicalDatePeriod.findIndex(item => {
              return item.period == tempPeriodList[i].period && item.available_count > 0;
            })
            if (index < 0) {
              tempPeriodList[i].disabled = true
            } else {
              tempPeriodList[i].disabled = false
            }
          }
          this.periodList = tempPeriodList
        }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    handlePeriodChange() {
      var data = this.physicalDatePeriod.filter((item) => {
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
.mainPage {
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
