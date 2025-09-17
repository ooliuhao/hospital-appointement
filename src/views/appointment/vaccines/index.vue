<!--  -->
<template>
  <div class="mainPage">
    <!-- <el-row :gutter="24" style="margin-bottom: 20px;" v-for="(item, index) in rowCardList" :key="index">
        <el-col :span="8" v-for="(card, subIndex) in item" :key="subIndex" :ref="index">
          <description-card :cardInfo="card"></description-card>
        </el-col>
      </el-row> -->
      <div class="operation-class">
      <!-- <el-button @click="openOrderPage" type="primary" circle icon="iconfont hospital-iconlianxiren" title="Create New Vaccine Appointement"></el-button> -->
      <!-- <el-button @click="openHistoryAppointment" type="primary" circle icon="iconfont hospital-iconico_yuyueguanli_fangjianyuyue" title="History Appointment"></el-button> -->
    </div>
    <transition name="fade-order">
      <div class="card-wall" v-if="!isOrder">
        <div
          style="margin-bottom: 20px"
          v-for="(card, index) in cardList"
          :key="index"
          class="card-item"
        >
          <description-card
            :backgroundImageProp="card.backgroundImageProp" 
            :iconImageProp="card.iconImageProp" 
            :type="type" :cardInfo="card" 
            @openOrderPage="openOrderPage" 
            @openPdfDialog="openPdfDialog"
            ></description-card>
        </div>
      </div>
    </transition>
    <transition name="fade-order">
      <div v-if="isOrder">
        <order-form @closeOrder="closeOrder" :card="transCardInfo"></order-form>
      </div>
    </transition>
    <transition name="fade-order">
      <el-dialog title="" :visible.sync="dialogVisible" width="80%">
        <!-- <iframe src="/docs/physical/Physical Examination Package A.pdf" width="100%" height="100%">
          This browser does not support PDFs. Please download the PDF to view it: <a href="./index.pdf">Download PDF</a>
        </iframe> -->
        <a href="/docs/physical/Physical Examination Package A.pdf" width="100%" height="100%">
          This browser does not support PDFs. Please download the PDF to view it: <a href="./index.pdf">Download PDF</a>
        </a>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import {
  mapState
} from "vuex";
import store from "@/store/index.js";
import orderForm from "./component/form.vue";
import formCreated from './form.vue'
import API from "../api/index";
import {
  deepClone
} from "@/util/util";
import descriptionCard from "./component/descriptionCard.vue";
export default {
  name: "physicalPage",
  data() {
    return {
      isOrder: false,
      type: 'vaccine',
      cardList: [],
      transCardInfo: {},
      rowCardList: [],
      searchVaccineName: "",
      searchPatientName: "",
      isCreated: false,
      isView: true,
      isChangeStatus: false,
      currentStatus: "Open",
      appointmentId: "",
      // statusTip: '',
      statusList: [],
      tableData: [],
      pageInfo: {
        total: 0,
        currentPage: 0,
        pageSizes: [10, 20, 50],
        pageSize: 10,
      },
      appointmentInfo: {
        vaccine: "",
        patientName: "",
        date: "",
        period: "",
        desc: "",
        date_time_period_id: "",
        type: "vaccine",
      },
      role: "",
      dialogVisible: false
    };
  },

  components: {
    orderForm,
    descriptionCard,
    formCreated,
  },

  computed: {},

  mounted() {
    if(this.$route.query.vaccine) {
      this.transCardInfo.id = this.$route.query.vaccine
      this.openOrderPage(this.transCardInfo)
    }
    this.generateRowCardList();
    this.getPackageByType()
  },

  methods: {
    openPdfDialog() {
      this.dialogVisible = true
    },
    getPackageByType() {
      API.getPackageByType({
        type: 'vaccine'
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
      this.isOrder = false;
    },
    openOrderPage(transCardInfo) {
      this.isOrder = true;
      this.transCardInfo = transCardInfo;

    },
    handleClick() {
      this.rowCardList = [];
      this.generateRowCardList();
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

    async getVaccines() {
      await API.getVaccines({})
        .then((res) => {
          this.vaccinesList = res.resData;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDictItems() {
      const param = {
        dict_id: "1000",
      };
      API.getDictItems(param)
        .then((res) => {
          this.statusList = res.statusList;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    generateGetExamAppointmentParam() {
      var param = {
        pageInfo: {
          currentPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize,
        },
      };
      if (this.role == "ROLE_USER") {
        param.user = {
          cust_id: store.state.auth.user.id,
        };
      } else if (this.role == "ROLE_DOCTOR") {
        param.user = {
          doctor_id: store.state.auth.user.id,
        };
      } else if (this.role == "ROLE_ADMIN") {
        param.user = {
          admin_id: store.state.auth.user.id,
        };
      } else {
        param.user = {
          cust_id: "",
        };
      }
      if (this.searchVaccineName == "" || this.searchVaccineName == null) {} else {
        param.vaccine = this.searchVaccineName;
      }
      if (this.searchPatientName == "" || this.searchPatientName == null) {} else {
        param.patient_name = this.searchPatientName;
      }
      return param;
    },
    getVaccineAppointmentByParam() {
      // const param = this.generateGetExamAppointmentParam();
      var param = {
        pageInfo: {
          currentPage: 1,
          pageSize: 10
        },
        user: {
          cust_id: "2c8fd013-53e8-4417-b33d-94b01621c695"
        }
      }

      API.getVaccineAppointmentByParam(param)
        .then((res) => {

          this.cardList = res.resMap.appointmentList;
          for (let i = 0; i < this.cardList.length; i++) {
            this.cardList[i].icon = require('@/assets/image/background/physical/logo/older-care-logo.png'); //path/to/icon${i + 1}.png
            this.cardList[i].backgroundImage = require('@/assets/image/background/physical/basic-older-care.jpg'); //path/to/image${i + 1}.jpg
            const funcObj = [{
                text: this.cardList[i].vaccine,
                icon: ''
              },
              {
                text: this.cardList[i].date,
                icon: ''
              },
              {
                text: this.cardList[i].period,
                icon: ''
              },
              {
                text: this.cardList[i].status,
                icon: ''
              },
            ];
            this.cardList[i].functions = funcObj;
            this.cardList[i].price = `100`
            this.cardList[i].unit = 'ETB'
          }

          this.pageInfo.total = res.resMap.total[0].total;

        })
        .catch((e) => {
          console.log(e);
        });
    },
    tableRowClassName({
      row,
      rowIndex
    }) {
      if (row.status === "Expired") {
        return "expired-row";
      } else if (row.status === "Complete") {
        return "complete-row";
      }
      return "";
    },
    openChangeToOnGoing(item) {
      const param = {
        currentStatus: "On Going",
        id: item.id,
        updated_by: this.loginInUserInfo.id,
      };
      this.$confirm("Are you sure change the status", "Tip", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          API.changeVaccineAppointmentStatus(param)
            .then((res) => {
              this.$message({
                type: "success",
                message: "Update Success!",
              });
              this.isChangeStatus = false;
              this.appointmentId = "";
              this.getVaccineAppointmentByParam();
            })
            .catch((e) => {
              console.log(e);
              this.$message({
                type: "error",
                message: "Update Failed!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel Success",
          });
        });
    },
    openChangeToComplete(item) {
      const param = {
        currentStatus: "Complete",
        id: item.id,
        updated_by: this.loginInUserInfo.id,
      };
      this.$confirm("Are you sure change the status", "Tip", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          API.changeVaccineAppointmentStatus(param)
            .then((res) => {
              this.$message({
                type: "success",
                message: "Update Success!",
              });
              this.isChangeStatus = false;
              this.appointmentId = "";
              this.getVaccineAppointmentByParam();
            })
            .catch((e) => {
              console.log(e);
              this.$message({
                type: "error",
                message: "Update Failed!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel Success",
          });
        });
    },
    handleView(item) {
      this.$nextTick(() => {
        this.isCreated = true;
        this.isView = true;
      });
      this.appointmentInfo = item;
    },
    openChangeStatusDialog(item) {
      this.isChangeStatus = true;
      this.currentStatus = item.status;
      this.appointmentId = item.id;
    },
    handleCloseChangeStatusDialog(done) {
      this.appointmentId = "";
      done();
    },
    openCreateOrderDialog(param) {
      this.$nextTick(() => {
        this.isCreated = true;
        this.isView = false;
      });
      if (
        param.vaccine == undefined ||
        param.vaccine == null ||
        param.vaccine == ""
      ) {
        this.appointmentInfo = {
          vaccine: "",
          patientName: "",
          date: "",
          period: "",
          desc: "",
          type: "vaccine",
          date_time_period_id: "",
        };
      } else {
        this.appointmentInfo = param;
      }
    },
    handleCloseForm() {
      this.isCreated = false;

      this.getVaccineAppointmentByParam();
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getVaccineAppointmentByParam();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getVaccineAppointmentByParam();
    },
    handleStatusChange(item) {
      // console.log(item);
    },
    handleConfirmStatusChange() {
      const param = {
        currentStatus: this.currentStatus,
        id: this.appointmentId,
      };
      this.$confirm("Are you sure change the status", "Tip", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
        .then(() => {
          API.changeVaccineAppointmentStatus(param)
            .then((res) => {
              this.$message({
                type: "success",
                message: "Update Success!",
              });
              this.isChangeStatus = false;
              this.appointmentId = "";
              this.getVaccineAppointmentByParam();
            })
            .catch((e) => {
              console.log(e);
              this.$message({
                type: "error",
                message: "Update Failed!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel Success",
          });
        });
    },
    searchByParam() {
      const param = this.generateGetExamAppointmentParam();

      API.getVaccineAppointmentByParam(param)
        .then((res) => {
          this.tableData = res.resMap.appointmentList;
          this.pageInfo.total = res.resMap.total[0].total;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleCloseAppointmentDialog(done) {
      this.generateGetExamAppointmentParam();
      this.getVaccineAppointmentByParam();
      done();
    },
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
