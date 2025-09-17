<!--  -->
<template>
  <div class="mainPage">
    <div class="operation-class">
    </div>
    <transition name="fade-order">
      <div class="card-wall" v-if="!isOrder">
        <div style="margin-bottom: 20px" v-for="(card, index) in cardList" :key="index" class="card-item">
          <description-card :cardInfo="card" @openOrderPage="openOrderPage"></description-card>
        </div>
      </div>
    </transition>
    <transition name="fade-order">
      <div v-if="isOrder">
        <order-form @closeOrder="closeOrder" :card="transCardInfo"></order-form>
      </div>
    </transition>
  </div>
</template>
<script>
import store from "@/store/index.js"
import orderForm from "./component/form.vue"
import API from "../api/index"
import {
  deepClone
} from "@/util/util"
import descriptionCard from "./component/descriptionCard.vue"
export default {
  name: "physicalPage",
  data() {
    return {
      isOrder: false,
      cardList: [],
      transCardInfo: {},
      loginInUserInfo: {},
      searchDoctorName: '',
      searchPatientName: '',
      isCreated: false,
      isView: true,
      doctorsDepartement: '',
      isChangeStatus: false,
      currentStatus: 'Open',
      appointmentId: '',
      tableData: [],
      pageInfo: {
        total: 200,
        currentPage: 1,
        pageSizes: [10, 20, 50],
        pageSize: 10
      },
      appointmentInfo: {
        department: '',
        doctor: '',
        patientName: '',
        date: '',
        period: '',
        symptom: [],
        desc: '',
        date_time_period_id: ''
      },
      role: "",
      rowCardList: [],
    }
  },

  components: {
    orderForm,
    descriptionCard,
  },

  computed: {},

  mounted() {
    this.loginInUserInfo = store.state.auth.user
    this.role = this.loginInUserInfo.roles[0]
    let doctor = ''
    let departement = ''
    let checker = 'noquery'
    let param
    // console.log('this.$route.query.department', this.$route.query.departement)
    if (this.$route.query.department) {
      checker = ''
      // console.log(this.$route.query.department)
      departement = this.$route.query.department
      param = {
        department: departement,
        doctor: '',
        patientName: '',
        date: '',
        period: '',
        symptom: [],
        desc: '',
        date_time_period_id: ''
      }
      this.openCreateOrderDialog(param, checker)
    } else if (this.$route.query.doctor) {
      checker = ''
      doctor = this.$route.query.doctor
      API.getDoctorbyid({
        doctor_id: doctor
      }).then(res => {
        this.doctorsDepartement = res.doctor[0].department_id
        departement = res.doctor[0].department_id
        param = {
          department: departement,
          doctor: doctor,
          patientName: '',
          date: '',
          period: '',
          symptom: [],
          desc: '',
          date_time_period_id: '',
        }
        this.openCreateOrderDialog(param, checker)
      })
    }
    this.generateRowCardList()
    this.getPackageByType()
  },

  methods: {
    getPackageByType() {
      API.getPackageByType({
        type: 'examination'
      }).then(res => {
        this.cardList = res.packageList
        for (var i = 0; i < this.cardList.length; i++) {
          this.cardList[i].iconImage = require('@/assets/image/background/' + this.cardList[i].type + '/logo/' + this.cardList[i].iconImage)
          this.cardList[i].backgroundImage = require('@/assets/image/background' + this.cardList[i].backgroundImage)
        }
        this.generateRowCardList()
      })
    },
    closeOrder() {
      this.isOrder = false
    },
    openOrderPage(transCardInfo) {
      this.isOrder = true
      this.transCardInfo = transCardInfo
    },
    handleClick() {
      this.rowCardList = []
      this.generateRowCardList()
    },
    generateRowCardList() {
      const limit = 3
      var tempList = []
      for (var i = 0; i < this.cardList.length; i++) {
        tempList.push(this.cardList[i])
        if (tempList.length % 3 == 0) {
          this.rowCardList.push(deepClone(tempList))
          tempList = []
        } else if (i == this.cardList.length - 1) {
          this.rowCardList.push(deepClone(tempList))
          tempList = []
        }
      }
    },


    getDoctorbyid(param) {
      API.getDoctorbyid(param).then(res => {
        this.doctorsDepartement = res.doctor[0].department_id
        let tempdata = res.doctor[0].department_ids
        return (tempdata)
      })
    },
    generateGetExamAppointmentParam() {
      var param = {
        pageInfo: {
          currentPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }
      }
      if (this.role == 'ROLE_USER') {
        param.user = {
          cust_id: store.state.auth.user.id,
        }
      } else if (this.role == 'ROLE_DOCTOR') {
        param.user = {
          doctor_id: store.state.auth.user.id,
        }
      } else if (this.role == 'ROLE_ADMIN') {
        param.user = {
          admin_id: store.state.auth.user.id,
        }
      } else {
        param.user = {
          cust_id: ''
        }
      }
      if (this.searchDoctorName == '' || this.searchDoctorName == null) {
        param.doctor_name = null
      } else {
        param.doctor_name = this.searchDoctorName
      }
      if (this.searchPatientName == '' || this.searchPatientName == null) {
        param.patient_name = null
      } else {
        param.patient_name = this.searchPatientName
      }
      return param
    },
    getExamAppointmentByParam() {
      const param = this.generateGetExamAppointmentParam()
      API.getExamAppointmentByParam(param).then(res => {
        var tableDataTmp = res.resMap.appointmentList
        tableDataTmp.forEach(item => {
          item.symptom = item.symptomStr.split(',')
        })
        this.tableData = tableDataTmp
        this.pageInfo.total = res.resMap.total[0].total
      }).catch(e => {
        console.log(e)
      })
    },
    tableRowClassName({
      row,
      rowIndex
    }) {
      if (row.status === 'Expired') {
        return 'expired-row'
      } else if (row.status === 'Complete') {
        return 'complete-row'
      }
      return ''
    },
    handleView(item) {
      this.$nextTick(() => {
        this.isCreated = true
        this.isView = true
      })
      this.appointmentInfo = item
    },
    openChangeStatusDialog(item) {
      this.isChangeStatus = true
      this.currentStatus = item.status
      this.appointmentId = item.id
    },
    handleCloseChangeStatusDialog(done) {
      this.appointmentId = ''
      done()
    },
    openCreateOrderDialog(param, checker) {
      this.isOrder = false
      this.$nextTick(() => {
        this.isOrder = true
      })
      this.transCardInfo.id = param.department
      this.transCardInfo.doctor = param.doctor
      
    },
    handleCloseForm() {
      this.isCreated = false
      this.getExamAppointmentByParam()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getExamAppointmentByParam()
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.getExamAppointmentByParam()
    },
    handleStatusChange(item) {
      console.log(item)
    },
    openChangeToOnGoing(item) {
      const param = {
        currentStatus: 'On Going',
        id: item.id,
        updated_by: this.loginInUserInfo.id,
      }
      this.$confirm('Are you sure change the status', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        API.changeStatus(param).then(res => {
          this.$message({
            type: 'success',
            message: 'Update Success!'
          })
          this.isChangeStatus = false
          this.appointmentId = ''
          this.getExamAppointmentByParam()
        }).catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            message: 'Update Failed!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel Success'
        })
      })

    },
    openChangeToComplete(item) {
      const param = {
        currentStatus: 'Complete',
        id: item.id,
        updated_by: this.loginInUserInfo.id,
      }
      this.$confirm('Are you sure change the status', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        API.changeStatus(param).then(res => {
          this.$message({
            type: 'success',
            message: 'Update Success!'
          })
          this.isChangeStatus = false
          this.appointmentId = ''
          this.getExamAppointmentByParam()
        }).catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            message: 'Update Failed!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel Success'
        })
      })

    },
    handleConfirmStatusChange() {
      const param = {
        currentStatus: this.currentStatus,
        id: this.appointmentId
      }
      this.$confirm('Are you sure change the status', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        API.changeStatus(param).then(res => {
          this.$message({
            type: 'success',
            message: 'Update Success!'
          })
          this.isChangeStatus = false
          this.appointmentId = ''
          this.getExamAppointmentByParam()
        }).catch(e => {
          console.log(e)
          this.$message({
            type: 'error',
            message: 'Update Failed!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel Success'
        })
      })

    },
    searchByParam() {

      var param = {
        pageInfo: {
          currentPage: 1,
          pageSize: 10
        },
        user: {
          cust_id: store.state.auth.user.id,
        }
      }
      API.getExamAppointmentByParam(param).then(res => {
        this.tableData = res.resMap.appointmentList
        this.pageInfo.total = res.resMap.total[0].total
      }).catch(e => {
        console.log(e)
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.mainPage {
  padding: 50px;
  margin: 20px auto;
  @media (max-width: 600px) {
    padding: 8px;
  }
}
.operation-class {
  margin-bottom: 20px;
  text-align: right;
  
}
 .el-table .expired-row {
  background: #aaa;
}

 .el-table .complete-row {
  background: #f0f9eb;
}
.tableData {
  background-color: #fff;
}

.card-wall {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.card-item {
 
  break-inside: avoid-column; /* 避免分隔到不同列 */
  margin-bottom: 10px; /* 行间距 */
  @media (min-width: 600px) {
    margin-right: 20px;
  }
  
}

.card {
  width: 100%;
  height: auto;
  display: block;
}

/*淡入淡出效果*/
/*Opacity为0的状态*/
.fade-order-enter,
.fade-order-leave-to {
  opacity: 0;
}

/*淡入淡出效果*/
/*Opacity为1的状态*/
.fade-order-enter-to,
.fade-order-leave {
  opacity: 1;
}

/*淡入淡出效果*/
/*过渡*/
.fade-order-enter-active,
.fade-order-leave-active {
  transition: opacity 0.3s;
}
</style>
