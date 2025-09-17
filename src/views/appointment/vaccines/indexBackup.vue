<!--  -->
<template>
  <div class="mainPage">
    <div class="operateFunction" style="height: 50px; background-color: #eee;">
      <el-form label-width="80px">
        <el-col :span="8" v-if="role == 'ROLE_ADMIN'">
          <el-form-item label="Patient">
            <el-input placeholder="Please input patient name" v-model="searchPatientName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="role == 'ROLE_ADMIN'">
          <el-form-item label="Vaccine">
            <el-input placeholder="Please input vaccine name" v-model="searchVaccineName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="role == 'ROLE_ADMIN'">
          <el-form-item>
            <el-button style="float: right;" type="primary" circle @click="openCreateOrderDialog" icon="el-icon-plus">
            </el-button>
            <el-button v-if="role == 'ROLE_ADMIN'" style="float: right; margin-right: 20px;" type="primary" circle @click="searchByParam"
              icon="el-icon-search"></el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="role != 'ROLE_ADMIN'">
          <el-form-item>
            <el-button style="float: right;" type="primary" circle @click="openCreateOrderDialog" icon="el-icon-plus">
            </el-button>
            <el-button v-if="role == 'ROLE_ADMIN'" style="float: right; margin-right: 20px;" type="primary" circle @click="searchByParam"
              icon="el-icon-search"></el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="tableData">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column prop="vaccine" label="Vaccine" width="180">
        </el-table-column>
        <el-table-column prop="patientName" label="Patient">
        </el-table-column>
        <el-table-column prop="date" label="Date">
        </el-table-column>
        <el-table-column prop="period" label="Period">
        </el-table-column>
        <el-table-column prop="status" label="Status">
        </el-table-column>
        <el-table-column fixed="right" label="Operation" width="120">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">
              View
            </el-button>
            <el-button v-if="loginInUserInfo.roles[0] != 'ROLE_USER' && scope.row.status == 'Open'" type="text" size="small"
              @click="openChangeToOnGoing(scope.row)">
              On Going
            </el-button>
            <el-button v-if="loginInUserInfo.roles[0] != 'ROLE_USER' && scope.row.status == 'On Going'" type="text" size="small"
              @click="openChangeToComplete(scope.row)">
              Complete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; padding-bottom: 20px;">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageInfo.pageSizes"
          :page-size="pageInfo.pageSize"
          :current-page.sync="pageInfo.currentPage"
          :total="pageInfo.total"
          >
        </el-pagination>
      </div>

    </div>
    <el-dialog :visible.sync="isCreated" title="Appointment" width="70%" :before-close="handleCloseAppointmentDialog">
      <div v-if="isCreated">
        <formCreated @closeFormDialog="handleCloseForm" :isView="isView" :appointmentInfo="appointmentInfo"></formCreated>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isChangeStatus" title="Operation" width="50%" :before-close="handleCloseChangeStatusDialog">
      <div v-if="isChangeStatus" style="padding: 0 20px 0 20px">
        <el-form label-width="200px">
          <el-form-item label="Change Appointment Status">
            <el-select v-model="currentStatus" style="width: 100%" @change="handleStatusChange">
              <el-option v-for="(item, index) in statusList" :value="item.key" :label="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span v-if="statusTip">Tip: {{ statusTip }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="handleCancel">Cancel</el-button> -->
        <el-button type="primary" @click="handleConfirmStatusChange">Confirm</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import axios from "@/axios/axios";

import { mapState} from 'vuex'
import store from '@/store/index.js'
import formCreated from './form.vue'
import API from '../api/index'

export default {
  name: 'vaccinesPage',
    data() {
      return {
        searchVaccineName: '',
        searchPatientName: '',
        isCreated: false,
        isView: true,
        isChangeStatus: false,
        currentStatus: 'Open',
        appointmentId: '',
        // statusTip: '',
        statusList: [],
        tableData: [],
        pageInfo: {
          total: 0,
          currentPage: 0,
          pageSizes: [10, 20, 50],
          pageSize: 10
        },
        appointmentInfo: {
          vaccine: '',
          patientName: '',
          date: '',
          period: '',
          desc: '',
          date_time_period_id: '',
          type: 'vaccine',
        },
        role: ''
      }
    },

    components: {
      formCreated,
      // ...mapState(store.state.auth, {
      //   loginInUserInfo(store) {
      //     return store.state.user
      //   }
      // }),
    },

    computed: {
      statusTip() {
        const status = this.statusList.filter(item => {
          return item.key == this.currentStatus
        })
        return status[0].description
      }
    },

    mounted() {
      this.loginInUserInfo = store.state.auth.user
      this.role = this.loginInUserInfo.roles[0]
      const vaccine = this.$route.query.vaccine
      if(vaccine) {
        this.getDictItems()
        var param = {
          vaccine: vaccine,
          patientName: '',
          date: '',
          period: '',
          desc: '',
          date_time_period_id: '',
          type: 'vaccine'
        }
        this.openCreateOrderDialog(param)
      } else {
        this.getVaccineAppointmentByParam()
        this.getDictItems()
        this.getVaccines()
      }
    },

    methods: {
      async getVaccines() {
        await API.getVaccines({}).then(res => {
          this.vaccinesList = res.resData
          // console.log(1)
        }) .catch(e => {
          console.log(e)
        })
      },
      getDictItems() {
        const param = {
          dict_id: '1000'
        }
        API.getDictItems(param).then(res => {
          // console.log(res)
          this.statusList = res.statusList
        }) .catch(e => {
          console.log(e)
        })
      },
      generateGetExamAppointmentParam() {
        var param = {
          pageInfo: {
            currentPage: this.pageInfo.currentPage,
            pageSize: this.pageInfo.pageSize
          }
        }
        if(this.role == 'ROLE_USER') {
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
        if(this.searchVaccineName == '' || this.searchVaccineName == null) {

        } else {
          param.vaccine = this.searchVaccineName
        }
        if(this.searchPatientName == '' || this.searchPatientName == null) {

        } else {
          param.patient_name = this.searchPatientName
        }
        return param
      },
      getVaccineAppointmentByParam() {
        const param = this.generateGetExamAppointmentParam()
        // console.log(param)
        API.getVaccineAppointmentByParam(param).then(res => {
         
          this.tableData = res.resMap.appointmentList
          this.pageInfo.total = res.resMap.total[0].total
          // console.log(res)
        }).catch(e => {
          console.log(e)
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (row.status === 'Expired') {
          return 'expired-row'
        } else if (row.status === 'Complete') {
          return 'complete-row'
        }
        return '';
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
          API.changeVaccineAppointmentStatus(param).then(res => {
            this.$message({
              type: 'success',
              message: 'Update Success!'
            });
            this.isChangeStatus = false
            this.appointmentId = ''
            this.getVaccineAppointmentByParam()
          }) .catch(e => {
            console.log(e)
            this.$message({
              type: 'error',
              message: 'Update Failed!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel Success'
          });          
        });

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
          API.changeVaccineAppointmentStatus(param).then(res => {
            this.$message({
              type: 'success',
              message: 'Update Success!'
            });
            this.isChangeStatus = false
            this.appointmentId = ''
            this.getVaccineAppointmentByParam()
          }) .catch(e => {
            console.log(e)
            this.$message({
              type: 'error',
              message: 'Update Failed!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel Success'
          });          
        });

      },
      handleView(item) {
        this.$nextTick(() => {
          this.isCreated = true
          this.isView = true
        })
        this.appointmentInfo = item
        // console.log(item)
      },
      openChangeStatusDialog(item) {
        this.isChangeStatus = true
        this.currentStatus = item.status
        this.appointmentId = item.id
        // console.log(item)
      },
      handleCloseChangeStatusDialog(done) {
        this.appointmentId = ''
        done()
      },
      openCreateOrderDialog(param) {
        this.$nextTick(() => {
          this.isCreated = true
          this.isView = false
        })
        if(param.vaccine == undefined || param.vaccine == null || param.vaccine == '') {
          this.appointmentInfo = {
            vaccine: '',
            patientName: '',
            date: '',
            period: '',
            desc: '',
            type: 'vaccine',
            date_time_period_id: ''
          }
        } else {
          this.appointmentInfo = param
        }
   
      }
      ,
      handleCloseForm() {
        this.isCreated = false
        
        this.getVaccineAppointmentByParam()
      },
      handleSizeChange(val) {
        this.pageInfo.pageSize = val
        this.getVaccineAppointmentByParam()
      },
      handleCurrentChange(val) {
        this.pageInfo.currentPage = val
        this.getVaccineAppointmentByParam()
      },
      handleStatusChange(item) {
        // console.log(item)
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
          API.changeVaccineAppointmentStatus(param).then(res => {
            this.$message({
              type: 'success',
              message: 'Update Success!'
            });
            this.isChangeStatus = false
            this.appointmentId = ''
            this.getVaccineAppointmentByParam()
          }) .catch(e => {
            console.log(e)
            this.$message({
              type: 'error',
              message: 'Update Failed!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel Success'
          });          
        });

      },
      searchByParam() {
        const param = this.generateGetExamAppointmentParam()
        // console.log(param)

        API.getVaccineAppointmentByParam(param).then(res => {
          // console.log(res)
          this.tableData = res.resMap.appointmentList
          this.pageInfo.total = res.resMap.total[0].total
        }).catch(e => {
          console.log(e)
        })
      },
      handleCloseAppointmentDialog(done) {
        this.generateGetExamAppointmentParam()
        this.getVaccineAppointmentByParam()
        done()

      }
    }
  }

</script>
<style scoped>
.mainPage {
  width: 90%;
  min-width: 600px;
  margin:auto;
  margin-top: 100px;
}
::v-deep .el-table .expired-row {
    background: #aaa;
  }
::v-deep .el-table .complete-row {
    background: #f0f9eb;
  }
.tableData {
  background-color: #fff;
}
</style>
