<!--  -->
<template>
  <div class="mainPage">
    <div class="innerClass">
      <avue-crud :data="appointmentList" :option="option" :page.sync="page" @search-change="handleSearch"
        @size-change="sizeChange" @current-change="currentChange" :row-class-name="tableRowClassName" class="inside-table">
        <template slot-scope="{type,size,row,index}" slot="menu">
          <el-button  v-if="row.status === 'Open'" class="iconfont hospital-iconcancel1 cancel-icon-class" :size="size" :type="type" @click="handleCancel(row,index)">Cancel</el-button>
        </template>
      </avue-crud>

      <div class="account-card">
        <el-collapse>
          <el-collapse-item
            v-for="(examintion, index) in appointmentList"
            :title="examintion.appointmentName + '  ('+ examintion.status + ')'"
            :name="index"
          >
            <div class="user-detail-list">
              <div>
                <span class="title-label"> patient:</span>
                {{ examintion.patient }}
              </div>
              <div>
                <span class="title-label"> Type:</span>
                {{ examintion.type }}
              </div>
              <div>
                <span class="title-label">Date:</span>
                {{ examintion.appointmentDate }}
              </div>
              <div>
                <span class="title-label">Created At:</span>
                {{ examintion.createdTime }}
              </div>
              <div>
                <span class="title-label">Period:</span>
                {{ examintion.appointmentTime }}
              </div>

              <div>
                <span class="title-label">Status:</span>
                {{ examintion.status }}
              </div>


              <!-- <div class="edit_delete_button">
                <el-button
                  @click="handleView(examintion)"
                  type="text"
                  size="small"
                >
                  View
                </el-button>
                <el-button
                  @click="handleEdit(examintion)"
                  type="text"
                  size="small"
                >
                  Edit
                </el-button>
                <el-button
                  v-if="
                    loginInUserInfo.roles[0] != 'ROLE_USER' &&
                    examintion.status == 'Open'
                  "
                  type="text"
                  size="small"
                  @click="openChangeToOnGoing(examintion)"
                >
                  On Going
                </el-button>
                <el-button
                  v-if="
                    loginInUserInfo.roles[0] != 'ROLE_USER' &&
                    examintion.status == 'On Going'
                  "
                  type="text"
                  size="small"
                  @click="openChangeToComplete(examintion)"
                >
                  Complete
                </el-button>
              </div> -->
            </div>
          </el-collapse-item>
        </el-collapse>
        
      </div>
      <div style="margin-top: 20px; padding-bottom: 20px" class="account-card">
        <el-pagination
          background
          layout="total,  prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="page.pageSize"
          :current-page.sync="page.currentPage"
        
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/index.js'
import store from '@/store/index.js'

export default {
  name: 'history',
  data() {
    return {
      appointmentList: [],
      innerWidth: window.innerWidth,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      searchParam: {
        type: []
      },
      option: {
        header: false,
        searchShowBtn: false,
        refreshBtn: false,
        // columnBtn: false,
        overHidden: true,
        searchMenuSpan: 6,
        searchLabelWidth: 150,
        searchSpan: 9,
        menu: true,
        delBtn: false,
        editBtn: false,
        addBtn: false,
        viewBtn: true,
        index: true,
        column: [{
          label: 'Appointment Name',
          prop: 'appointmentName',
          overHidden: true,
          width: 150,
        }, {
          label: 'Patient',
          prop: 'patient',
          search: true,
        }, {
          label: 'Type',
          prop: 'type',
          search: true,
          type:'cascader',
          dicData: [{
            label: 'Physical',
            value: 'physical'
          }, {
            label: 'Vaccine',
            value: 'vaccine'
          }, {
            label: 'Examination',
            value: 'examination'
          }, ]
        }, {
          label: 'Appointment Date',
          prop: 'appointmentDate',
          sortable: true,
        }, {
          label: 'Appointment Time',
          prop: 'appointmentTime',
        }, {
          label: 'Status',
          prop: 'status',

        }, {
          label: 'Create Time',
          prop: 'createdTime',
          sortable: true,
        }, {
          label: 'Description',
          prop: 'description',
          sortable: true,
          overHidden: true,
          width: 100,
        },
      ],
      
      }
    }
  },
  components: {},

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      var param = this.generateGetExamAppointmentParam({})
      this.getData(param)
    },
    generateGetExamAppointmentParam(searchForm) {
      var param = {
        pageInfo: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      }
      param.searchInfo = this.searchParam
      // console.log('this.searchParam.type',this.searchParam.type == 'undefined')
      
      if (this.searchParam.type == 'undefined' || this.searchParam.type == undefined) {
        this.searchParam.type = []
      }
      param.searchInfo.type = this.searchParam.type[0]
      param.searchInfo.cust_id = store.state.auth.user.id
      return param
    },
    getData(param) {
      API.getAllAppointment(param).then(res => {
        this.appointmentList = res.result.allAppointmentList
        this.page.total = res.result.total
      }).catch(e => {
        console.log(e)
      })
    },
    handleSearch(form, done) {
      this.searchParam = form
      this.page.currentPage = 1
      var param = this.generateGetExamAppointmentParam(form)
      done()
      this.getData(param)
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      var param = this.generateGetExamAppointmentParam({})
     
      this.getData(param)
    },

    handleCurrentChange(val) {
      this.page.currentPage = val;
      var param = this.generateGetExamAppointmentParam({})
   
      this.getData(param)
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      var param = this.generateGetExamAppointmentParam({})
      this.getData(param)
      this.$message.success('行数' + val)
    },
    currentChange(val) {
      this.page.currentPage = val
      var param = this.generateGetExamAppointmentParam({})
      this.getData(param)
      this.$message.success('页码' + val)
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.status === 'Expired') {
        return 'expired-row'
      } else if (row.status === 'Complete') {
        return 'complete-row'
      }
      return ''
    },
    handleCancel(appointment,index) {
     let param = {}
     param=appointment
     this.$confirm('Cancel The Appointment?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
     
        API.cancelAppointment(param).then(resp =>{
          this.appointmentList[index].status = 'Cancelled';
         this.$message({
          type:'success',
          message:'Appointment Has Been Cancelled'
         })
         loading.close()
      }).catch(err =>{
        console.log(err)
      })
      }).catch(() => {
    
      })
 
    },
    tip(row,index){
      // console.log('row',row,'index',index)
    }
  }
}

</script>
<style lang='scss' scoped>
  .mainPage {
  width: 100%;

  margin: 0 auto;
}


.innerClass {
  padding: 0px;
}

::v-deep .expired-row {
  background: #aaa;
}

::v-deep .complete-row {
  background: #f0f9eb;
}

.cancel-icon-class {
  &::before {
    margin-right: 4px;
    font-size: 12px;
  }
  // margin-right: 4px
}






.el-collapse {
  width: 90%;
}
.el-collapse-item {
  border: none;

  margin-top: 10px;
  border-radius: 20px;
}
::v-deep .el-collapse-item__header {
  display: flex;
  align-items: center;
 
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
  border-radius: 10px;
  padding: 20px;
}
.el-pagination {
  max-width: 375px;
  overflow: hidden;
}

.account-card {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
}

.title-label {
  font-weight: bold;
  margin-right: 5px;
}

.inside-table {
  background-color: #fff;
  display: none;
}

.user-detail-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-left: 15px;
  margin-top: 10px;
}
.user-detail-list > div{
  white-space:normal;
}
.edit_delete_button {
  align-self: flex-end;
  margin-right: 15px;
}

@media (min-width: 800px) {
  .inside-table {
    display: block;
  }

  .mainPage {
    width: 90%;
    min-width: 600px;
  }

  .account-card {
    display: none;
  }
  .el-pagination {
    max-width: 1500px;
    overflow: hidden;
  }
}

</style>
