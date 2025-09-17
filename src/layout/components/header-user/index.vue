<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{ loginName }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="changePassword">
        <i class="iconfont hospital-iconpassword d2-mr-5" ></i>
        Change Password
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <i class="iconfont hospital-iconpower-off d2-mr-5" ></i>
        Logout
      </el-dropdown-item>
    </el-dropdown-menu>
    <el-dialog class="rounded-dialog" :visible.sync="dialogVisible" title="Change Password"
      @close="resetPasswordChangeForm">
      <el-form class="op-left-label" ref="changePasswordForm" :model="form" :rules="rules" label-position="top"
        label-width="120px">
        <el-form-item label="Current Password" prop="currentPassword">
          <el-input v-model="form.currentPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="newPassword">
          <el-input v-model="form.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPasswordChangeForm">Cancel</el-button>
        <el-button type="primary" @click="submitPasswordChangeForm">Save</el-button>
      </div>
    </el-dialog>
  </el-dropdown>

 
</template>

<script>
import store from '@/store/index'
import UserApi from '@/views/profile/api/index'
export default {
  computed: {
    // ...mapState('basicInfo/auth', [
    //   'info'
    // ])
    loginName() {
      if(this.info) {
        if (this.info.name == null) {
          return 'Hello Dear Patient'
        } else {
          return 'Hello ' + this.info.name
        }
      } else {
        return 'Unlogin'
      }
    }
  },

  data() {
    return {
      info: store.state.auth.user,
      dialogVisible: false,
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        currentPassword: [{ required: true, message: 'Please enter your current password', trigger: 'blur' }],
        newPassword: [{ required: true, message: 'Please enter a new password', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: 'Please confirm your new password', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    // console.log(this.info)
  },
  methods: {
    logOff () {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    changePassword() {
      this.dialogVisible = true;
    },
    resetPasswordChangeForm() {
      this.$refs.changePasswordForm.resetFields();
      this.dialogVisible = false;
    },
    submitPasswordChangeForm() {
      this.$refs.changePasswordForm.validate(valid => {
        if (valid) {
          this.form.id = store.state.auth.user.id;
          UserApi.changeUserPassword(this.form)
            .then(() => {
              this.$message.success('Password changed successfully');
              this.resetPasswordChangeForm()
              setTimeout(() => {
               this.logOff()
              }, 2000)
            })
            .catch(error => {
              console.log(error)
              this.$message.error('Failed to change password: ' + (error.response.data.message === undefined) ? error.response.data : error.response.data.messages );
            });
        }
      });
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error('The passwords do not match'));
      } else {
        callback();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.d2-mr {
  margin-right: 20px !important;
}

.btn-text {
  &:hover {
    color: #000
  }
  
}
.btn-text{
  @media  (max-width: 500px) {
    line-height: 15px;
 

  }
}
.d2-header-right .btn-text{
  @media  (max-width: 500px) {
    
  padding: 0px!important;
  margin-left: 15px!important;

  }
}

</style>

<style>
.rounded-dialog .el-dialog {
  width: 400px !important;
  /* Adjust the width as needed */
  border-radius: 30px !important;
}

.top-left-label .el-form-item__label {
  text-align: left;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0, -100%);
}
</style>