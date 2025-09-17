<template>
  <div class="loginContainer">
    <div class="container">
      <input type="checkbox" id="flip">
      <div class="cover">
        <div class="front">
          <img src="@/assets/login_page/Login_page.png" alt="">
        </div>
      </div>
      <div class="forms">
        <div class="form-content">
          <div class="login-form">
            <div class="title">Login</div>

            <div class="input-boxes">
              <el-form ref="LoginForm" :model="LoginForm" :rules="rules">
                <!-- <el-form-item label="Phone Number" prop="email">
                  <el-input v-model="LoginForm.phone_num" autocomplete="off" :prefix-icon="phoneIcon"></el-input>
                </el-form-item> -->
                <el-form-item  label="Email" prop="email" :rules="emailRules">
                        <el-input v-model="LoginForm.email" ></el-input>
                  </el-form-item>

                
                <el-form-item label="Password" prop="password">
                  <el-input type="password" v-model="LoginForm.password" autocomplete="off" :prefix-icon="passwordIcon">
                  </el-input>
                </el-form-item>
              </el-form>
              <div class="button input-box">
                <input type="button" value="Login" @click="login" />
              </div>

              <div class="text"><a href="#">Forgot password?</a></div>

              <div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
            </div>
          </div>
          <div class="signup-form">
            <div class="title">Register</div>

            <div class="input-boxes">
              <div class="my-form-container">
                <el-form :model="Registerform" ref="Registerform" class="my-form">
                
               <el-form-item  label="Email" prop="email" :rules="emailRules">
                        <el-input v-model="Registerform.email" ></el-input>
                  </el-form-item><br />
         
                  <VuePhoneNumberInput :required=true  default-country-code="ET" v-model="phoneNumberH" @update="handlePhoneNumberUpdate"  />
                  <label v-if="isValidPhone==false" style="color:red;font-size:small;display: flex;justify-content: left; font-weight: 300;" > {{errorMessage}}</label>
                
                
                  <el-form-item label="Password" prop="password" :rules="passwordRules">
                    <el-input type="password" v-model="Registerform.password" :prefix-icon="passwordIcon"></el-input>
                  </el-form-item>

                  <el-form-item label="Confirm Password" prop="checkPass" :rules="checkRules">
                    <el-input type="password" v-model="Registerform.checkPass" :prefix-icon="passwordIcon"></el-input>
                  </el-form-item>

                  <div class="button input-box">
                    <input type="button" value="Register" @click="submitRegisterform" />
                  </div>
                </el-form>
              </div>

              <div class="text sign-up-text">Already Registered? <label for="flip">Login now</label></div>
            </div>
          </div>
        </div>



      </div>

    </div>

    <el-dialog title="" :visible.sync="ResultVisible" width="30%" class="transparent-dialog">
      <span>{{ message }}</span>
    </el-dialog>

    <!-- Success dialog -->
    <el-dialog title="Registration Successful" :visible.sync="successDialogVisible" :close-on-click-modal="false"
      :show-close="false">
      <el-card v-if="registrationStatus" class="success-card">
        <div slot="header" class="success-header">
          <i class="fas fa-check-circle"></i>
          <span class="success-text">Success</span>
        </div>
        <div class="success-content">
          user has successfully registerd
        </div>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>
import UserService from './api/auth.service'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import axios from 'axios';


export default {
  components:{
    VuePhoneNumberInput
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.Registerform.checkPass !== '') {
          this.$refs.Registerform.validateField('checkPass');
        }
        // console.log("validate1", value)
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.Registerform.password) {
        // console.log("validate2", value)
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      registrationStatus: false,
      successDialogVisible: false,
      ResultVisible: false,
      ResultMessage: '',
      message: '',
      errorMessage:'',
      activeTab: 'loginPage',
      LoginForm: {
        // phone_num: '',
        email:'',
        password: '',

      },
      phoneNumberH:'',
      phoneNumber:'',
      isValidPhone:'',
      nationalities: [],
      selectedCountry:'',
      countries: [],
      rules: {
        phone_num: [{
            required: true,
            message: 'Please enter your phone number',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{9}$/,
            message: 'Phone number must be 9 digits',
            trigger: 'blur'
          }
        ],
        password: [{
            required: true,
            message: 'Please enter your password',
            trigger: 'blur'
          },

        ]
      },
      emailIcon: 'el-icon-user', // Customize the icon class for the email field
      passwordIcon: 'el-icon-lock',
      phoneIcon: 'el-icon-phone',
      Registerform: {
        password: '',
        confirm: '',
        phone_num: '',
        email:''
      },
      icons: {

      },
      passwordRules: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        },
        {
          min: 8,
          message: 'Password must be at least 8 characters',
          trigger: 'blur'
        },
        {
          pattern: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
          message: 'Password must contain both letters and numerics',
          trigger: 'blur'
        }
      ],
      emailRules: [
                    {
                      required: true,
                      message: 'Email is required',
                      trigger: 'blur'
                    },
                    {
                      type: 'email',
                      message: 'Please enter a valid email address',
                      trigger: ['blur', 'change']
                    }
                  ],
      checkRules: [{
        required: true,
        validator: validatePass2,
        trigger: 'blur'
      }],

      phoneNumRules: [{
          required: true,
          message: 'Phone number is required',
          trigger: 'blur'
        },
        {
          pattern: /^0[0-9]{9}$/,
          message: 'Phone number must start with 0 and be 10 digits',
          trigger: 'blur'
        }
      ],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted(){
  
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handlePhoneNumberUpdate(updatedValue) {

      //  console.log('Updated Phone number:', updatedValue);


         const phoneNumber = updatedValue.formattedNumber;
       this.isValidPhone=updatedValue.isValid;
      //  console.log("truth",updatedValue.isValid==false && updatedValue.formattedNumber == null)

       if(this.isValidPhone){
        this.phoneNumber=phoneNumber;
      }else if(updatedValue.isValid==false && updatedValue.formattedNumber == null){

        this.errorMessage="phone number is required"

      }else if(updatedValue.isValid==false && updatedValue.formattedNumber){
        this.errorMessage="invalid phone number"

      }



        // const countryCode = updatedValue.country.dialCode;

        // console.log('Updated Phone number:', phoneNumber);
        // console.log('Updated Country code:', countryCode);
      },
   
  formatLabel(option) {
    return `${option.name} (${option.code})`;
  },
    test() {
      this.ResultVisible = true

    },
    reloadPage() {
      window.location.reload();
    },
    submitRegisterform() {
      if(!this.isValidPhone){
        return
      }else{
        this.Registerform.phone_num=this.phoneNumber;
      }
      
      this.$refs.Registerform.validate((valid) => {
        if (valid) {
          // Form is valid, you can submit the data to your backend or perform further actions
       
          this.handleRegister(this.Registerform)
        }
      });
    },
    showSuccessDialog() {
      this.successDialogVisible = true;
      setTimeout(() => {
        this.successDialogVisible = false;
      }, 2000); // Hide the dialog after 3 seconds
    },
    handletest() {
      UserService.getUserBoard().then(
        (response) => {
          // console.log(response.data);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );

    },
    login() {

      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          // Perform login request
          // console.log('Logging in...', this.LoginForm);
          this.handleLogins(this.LoginForm)
        }
      });
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // Perform register request
          this.handleRegister()
        }
      });
    },
    handleLoginSuccess() {
      this.$router.push('/home')
    },

    handleRegister(param) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      this.$store.dispatch("auth/register", param).then(response => {
          // console.log("response",response)
          setTimeout(() => {
            loading.close();

            this.$message({
              showClose: true,
              message:"successfully Registerd",
              type: 'success'
            });
            this.reloadPage()
          }, 1000);




        },
        (error) => {
          loading.close();
          this.$message({
            showClose: true,
            message: (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString(),
            type: 'error'
          });
          this.ResultMessage = 'Login failed: ' + error.message;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    handleLogins(user) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });


      this.$store.dispatch("auth/login", user).then(
        () => {
          loading.close();
          this.$router.push("/");
        },
        (error) => {
          loading.close();
          this.ResultMessage = 'Login failed: ' + error.message;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.$message({
            showClose: true,
            message: this.message,
            type: 'error'
          });
        }
      );
    },

  }
};
</script>


<style scoped>
/* Google Font Link */
/* Override default dialog styles */
/* ::v-deep .input-tel__label{
  top:0px;
}
::v-deep .input-tel__input{
  padding-top: 0px;
} */
.errorLabel {
  color:red;
  font-size: small;
}
::v-deep .vs__dropdown-toggle{
  width:120px;
}
.phone-input-container {
  display: flex;
}

.country-select {
  flex: 1;
  margin-right: 10px;
}

.phone-input {
  flex: 2;
}
.success-card {
  background-color: #E6F7E2;
  border-color: #67C23A;
  color: #67C23A;
}

.success-header {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.success-text {
  margin-left: 10px;
}

.success-content {
  margin-top: 20px;
}

.success-icon {
  font-size: 48px;
  color: green;
}

.blue-button {
  background-color: blue;
  color: white;
}

.input-boxes .el-form-item {
  margin-bottom: 5px;

}

.my-form-container {
  margin-top: 10px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-row .el-form-item {
  flex-basis: 48%;
}


.loginContainer {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/login_page/loginBackground.jpg');
  padding: 30px;
}

.container {
  position: relative;
  max-width: 1000px;
  width: 100%;
  background: #fff;
  padding: 40px 30px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  perspective: 2700px;
}

.container .cover {
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 50%;
  z-index: 98;
  transition: all 1s ease;
  transform-origin: left;
  transform-style: preserve-3d;
}

.container #flip:checked~.cover {
  transform: rotateY(-180deg);
}

.container .cover .front,
.container .cover .back {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cover .back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

.container .cover::before,
.container .cover::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0%;
  background: #1839cb;
  opacity: 0.5;
  z-index: 12;
}

.container .cover::after {
  opacity: 0.3;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

.container .cover img {
  position: absolute;
  height: 100%;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: 10;
}

.container .cover .text {
  position: absolute;
  z-index: 130;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cover .text .text-1,
.cover .text .text-2 {
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  text-align: center;
}

.cover .text .text-2 {
  font-size: 15px;
  font-weight: 500;
}

.container .forms {
  height: 100%;
  width: 100%;
  background: #fff;
}

.container .form-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-content .login-form,
.form-content .signup-form {
  width: calc(100% / 2 - 25px);
}

.forms .form-content .title {
  position: relative;
  font-size: 24px;
  font-weight: 500;
  color: #333;
}

.forms .form-content .title:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 25px;
  background: #1839cb;
}

.forms .signup-form .title:before {
  width: 20px;
}

.forms .form-content .input-boxes {
  margin-top: 30px;
}

.forms .form-content .input-box {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  position: relative;
}

.forms .form-content .custome {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  position: relative;
}

.form-content .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.form-content .input-box input:focus,
.form-content .input-box input:valid {
  border-color: #1839cb;
}

.form-content .input-box i {
  position: absolute;
  color: #1839cb;
  font-size: 17px;
}

.forms .form-content .text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.forms .form-content .text a {
  text-decoration: none;
}

.forms .form-content .text a:hover {
  text-decoration: underline;
}

.forms .form-content .button {
  color: #fff;
  margin-top: 40px;
}

.forms .form-content .button input {
  color: #fff;
  background: #1839cb;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s ease;
}

.forms .form-content .button input:hover {
  background: #1839cb;
}

.forms .form-content label {
  color: #1839cb;
  cursor: pointer;
}

.forms .form-content label:hover {
  text-decoration: underline;
}

.forms .form-content .login-text,
.forms .form-content .sign-up-text {
  text-align: center;
  margin-top: 25px;
}

.container #flip {
  display: none;
}

@media (max-width: 730px) {
  .container .cover {
    display: none;
  }

  .form-content .login-form,
  .form-content .signup-form {
    width: 100%;
  }

  .form-content .signup-form {
    display: none;
  }

  .container #flip:checked~.forms .signup-form {
    display: block;
  }

  .container #flip:checked~.forms .login-form {
    display: none;
  }
}
</style>
 <style>
.form-content {
  margin: 0px;
}
.transparent-dialog .el-dialog__wrapper {
  background-color: transparent !important;
}

.transparent-dialog .el-dialog {
  background-color: transparent !important;
}
</style>
