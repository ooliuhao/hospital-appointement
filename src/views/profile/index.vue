<!--  -->
<template>
  <div class="main-page">
    <div class="operation-class">
      <el-button @click="openCreatePersonPage" type="primary" circle icon="iconfont hospital-iconlianxiren" title="Create New Person"></el-button>
      <el-button @click="openHistoryAppointment" type="primary" circle icon="iconfont hospital-iconico_yuyueguanli_fangjianyuyue" title="History Appointment"></el-button>
    </div>
    <el-collapse accordion v-model="activeName" @change="personChange">
      <el-collapse-item v-if="refresh" :title="currentLoginInfo.name + ' (Me)'" :name="currentLoginInfo.id">
        <person-card :personInfo="currentLoginInfo" ref="personCardRef" :isLoginUser="true" @reloadData="reloadData" ></person-card>
      </el-collapse-item>
      <el-collapse-item v-for="(item, index) in personList" :key="index" :title="item.name" :name="item.id" >
        <person-card :personInfo="item" :amPatient="true"></person-card>
      </el-collapse-item>
      <el-collapse-item v-if="openCreateProfile"  title="New Profile" name="new" >
        <person-card ref="creationref" :personInfo="form" :createprofile='true' @closecreation="closecreation" ></person-card>
      </el-collapse-item>
    </el-collapse>

  </div>

  
</template>

<script>
import personCard from './component/personCard.vue'
import API from './api/index'
import store from "@/store/index.js"


export default {
  name: '',
  data () {
    return {
      openCreateProfile:false,
      user: store.state.auth.user,
      personList: [],
      currentLoginInfo: {},
      activeName: '',
      refresh: true,
      dialogVisible: false,
      amPatient:true,
      form: {
        name: '',
        gender: '',
        birthday: '',
        email: '',
        phoneNumber: '',
        nationality: '',
        address: '',
      },
      formRules: {
        name: [
          { required: true, message: 'Please enter a name', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'Please select a gender', trigger: 'change' }
        ],
        birthday: [
          { required: true, message: 'Please select a birthday', trigger: 'change' }
        ],
        email: [
          { required: true, message: 'Please enter an email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ],
        phoneNumber: [
          { required: true, message: 'Please enter a phone number', trigger: 'blur' },
          { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: ['blur', 'change'] }
        ]
      }
    }
  },

  components: {
    personCard
  },

  computed: {},

  mounted () {
    this.init()
  },

  methods: {
    async init() {
      const param = {
        created_by: this.user.id,
        userid: this.user.id,
        role: this.user.roles[0]
      }
     
      await API.getPersonsByCreatedBy(param).then(res => {
     
        this.personList = res.resData
        this.amPatient=true;
        for(var i=0; i<this.personList.length; i++) {
          this.personList[i].phone_num = this.personList[i].phone
        }
      }).catch(e => {
        console.log(e)
      })
  
      await API.getUserByid(param).then(res => {
   
        this.refresh = false; // 隐藏子组件
        this.$nextTick(() => {
          this.refresh = true; // 显示子组件，触发重新渲染
        });
        this.currentLoginInfo = res[0]
        if(res[0].name == null) {
          this.currentLoginInfo.name = 'Undefined'
        }
        this.currentLoginInfo.nationalityValue = res[0].nationalityValue,
        this.activeName = this.currentLoginInfo.id

      }).catch(e => {
        console.log(e)
      })
    },
    closecreation(){
      this.openCreateProfile=false
    },
    personChange(val) {
      // console.log(val)
    },
    openCreatePersonPage() {
      API.checkGetThePatientLimit({id: store.state.auth.user.id}).then(res => {
        if(res.total >= 20) {
          this.$message({
            showClose: true,
            message: "Sorry, your contacts have reached the upper limit of 20. If you need to create new contacts, please delete unnecessary ones.",
            type: 'warning'
          });
        } else {
          this.openCreateProfile=true
          // console.log(this.$refs.creationref)
          this.$refs.creationref.openCreateProfile()
        }
      }) .catch(e => {
        console.log(e)
      })


    },
    openHistoryAppointment() {
      this.$router.push({path: '/appointment/history'})
  
    },
    handleClose(done) {
      // Any additional actions before closing the dialog
      done();
    },
    submitForm() {
      // Handle form submission
      this.$refs.Myform.validate(valid => {
        if (valid) {
    
          // console.log(this.form);
          this.dialogVisible = false;
        } else {
         
          return false;
        }
      })
    },
    reloadData() {
      this.init()
    }
  }
}

</script>
<style lang='scss' scoped>
.main-page {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: transparent;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0px;
    padding-left: 5px;
   
  }
}

::v-deep .el-collapse-item__header {
  font-size: 20px;
  font-weight: bold;
  
}
::v-deep .el-collapse-item__wrap{
  background-color: transparent;
}
.operation-class {
  margin-bottom: 20px;
  text-align: right;
  padding-right: 10px;
  
}
.dialog-content {
  position: relative;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {

  font-weight: bold;
}

.dialog-buttons {
  text-align: right;
  margin-top: 20px;
}




</style>