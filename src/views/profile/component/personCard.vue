<!--  -->
<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="profile-header-left">
        <span
          style="text-align: left; font-size: 20px; font-weight: bold; display: inline-block;">{{ createprofile ? '' : editing ? 'Edit Profile' : 'Profile' }}</span>
      </div>
      <div class="profile-header-center"></div>
      <div class="profile-header-right">
        <el-button v-if="!editing &&!createprofile" @click="editProfile" type="primary" icon="el-icon-edit" circle>
        </el-button>
        <el-button v-if="(loggeduser.id != user.id)&&(loggedstate!= user.id )" @click="deleteProfile" type="danger"
          icon="el-icon-delete" circle></el-button>
      </div>
    </div>
    <div class="profile-class" v-if="!editing&&!creating&&!createprofile">
      <div class="introduce-class">
        <div class="wrapper">
          <div class="name-class item">
            <div class="sub-wrapper">
              <div class="title-class">Name:</div>
              <div class="value-class">{{ user.name }}</div>
            </div>
          </div>
          <div class="gender-class item">
            <div class="sub-wrapper">
              <div class="title-class">Gender:</div>
             <div class="value-class" v-if="user.gender == 'm'" ><label>Male</label></div> 
             <div class="value-class" v-if="user.gender == 'f'" ><label>Female</label></div> 
              <!-- <div class="value-class">{{ user.genderValue }}</div> -->
            </div>
          </div>

          <div class="birthday-class item">
            <div class="sub-wrapper">
              <div class="title-class">Birthday:</div>
              <div class="value-class">{{ user.birthday }}</div>
            </div>
          </div>
          <div class="phone-class item">
            <div class="sub-wrapper">
              <div class="title-class">Phone:</div>
              <div class="value-class">{{ user.phone_num }}</div>
            </div>
          </div>
          <div class="email-class item">
            <div class="sub-wrapper">
              <div class="title-class">Email:</div>
              <div class="value-class">{{ user.email }}</div>
            </div>
          </div>
          <div class="nationality-class item">
            <div class="sub-wrapper">
              <div class="title-class">Nationality:</div>
              <div class="value-class">{{ user.nationality }}</div>
            </div>
          </div>
          <!-- <div class="address-class item">
            <div class="sub-wrapper">
              <div class="title-class">Address:</div>
              <div class="value-class">{{ user.address }}</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="image-class">
        <div class="profile-photo-wrapper item">
          <div v-if="user.picture">
            <img class="profile-photo" :src="user.picture" />
          </div>
          <div v-if="!user.picture">
            <img class="profile-photo" v-if="user.gender == 'm'" src="@/assets/image/profile/main_admin.png" />
            <img class="profile-photo" v-if="user.gender == 'f'" src="@/assets/image/profile/girl_admin.png" />
          </div>
        </div>
      </div>
    </div>

    <div class="profile-class" v-if="editing">
        <div class="introduce-class">
          <div class="wrapper">
            <div class="name-class item">
              <div class="sub-wrapper">
                <div class="title-class"><span style="color: red">* </span>Name:</div>
                <el-input v-model="user.name" @blur="handleNameChange"></el-input>
                <div v-if="nameError"></div>
                <div v-if="nameError" class="test">
                  Please input name
                </div>
              </div>
            </div>
            <div class="gender-class item">
              <div class="sub-wrapper">
                <div class="title-class"><span style="color: red">* </span>Gender:</div>
                <el-select v-model="user.gender" @change="handleGenderChange">
                  <el-option label="Male" value="m"></el-option>
                  <el-option label="Female" value="f"></el-option>
                </el-select>
                <div v-if="genderError"></div>
                <div v-if="genderError" class="test">
                  Please select 
                </div>
              </div>
            </div>

            <div class="birthday-class item">
              <div class="sub-wrapper">
                <div class="title-class"><span style="color: red">* </span>Birthday:</div>
                <el-date-picker @change="handleBirthdayChange" v-model="user.birthday" type="date"
                  value-format="yyyy-MM-dd" placeholder="Please Select Date">
                </el-date-picker>

                <div v-if="birthdayError"></div>
                <div v-if="birthdayError" class="test">
                  Please select birthday
                </div>
              </div>
            </div>
            <div v-if="amPatient" class="phone-class item">
              <div class="sub-wrapper">
                <div class="title-class"><span style="color: red">* </span>Phone:</div>
                <el-input v-model="user.phone_num" @blur="handlePhoneChange"></el-input>
                <div v-if="phoneError"></div>
                <div v-if="phoneError" class="test">
                  Please input phone number
                </div>
              </div>
            </div>
            <div v-if="amPatient" class="email-class item">
              <div class="sub-wrapper">
                <div class="title-class">Email:</div>
                <el-input v-model="user.email"></el-input>
              </div>
            </div>
            <div class="nationality-class item">
              <div class="sub-wrapper">
                <div class="title-class"><span style="color: red">* </span>Nationality:</div>
                <!-- <el-select v-model="user.nationality" @change="handleNationalityChange">
                  <el-option label="Ethiopian" value="4001"></el-option>
                  <el-option label="Foreigner" value="4002"></el-option>
                </el-select> -->
                <el-select v-model="user.nationality" @change="handleNationalityChange">
                  <el-option v-for="nationality in nationalities" :key="nationality" :label="nationality" :value="nationality"></el-option>
                </el-select>
                <div v-if="nationalityError"></div>
                <div v-if="nationalityError" class="test">
                  Please select nationality
                </div>
              </div>
            </div>
            <!-- <div class="address-class item">
              <div class="sub-wrapper">
                <div class="title-class">Address:</div>
                <el-input v-model="user.address"></el-input>
              </div>
            </div> -->
          
          </div>
        </div>
        <div class="image-class" @click="handleClickPicChangeDialog">
          <div class="profile-photo-wrapper item">
            <div v-if="user.picture">
              <img class="profile-photo" :src="user.picture" />
            </div>
            <div v-if="!user.picture">
              <img class="profile-photo" v-if="user.gender == 'm'" src="@/assets/image/profile/main_admin.png" />
              <img class="profile-photo" v-if="user.gender == 'f'" src="@/assets/image/profile/girl_admin.png" />
            </div>
          </div>
        </div>
        <div class="save-button-class item">
              <el-button type="warning" @click="handleCancel">Cacel</el-button>
              <el-button type="primary" @click="handleSaveProfile">Save</el-button>
            </div>
    </div>


    <div v-if="createprofile" class="createprofile-patient-form-wrapper">

      <el-form :model="createprofileForm" :rules="createprofileFormRules" ref="createprofileformref"
        class="createprofile-patient-form" label-width="150px">
        <el-form-item label="Phone Number" prop="phone_num" style="margin-top: 20px;">
          <el-input v-model="createprofileForm.phone_num"></el-input>
        </el-form-item>

        <el-form-item label="Full Name" prop="name" style="margin-top: 20px;">
          <el-input v-model="createprofileForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email" style="margin-top: 20px;">
          <el-input v-model="createprofileForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Birthday" prop="birthday" style="margin-top: 20px;">
          <el-date-picker v-model="createprofileForm.birthday" value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="Gender" prop="gender" style="margin-top: 20px;">
          <el-select v-model="createprofileForm.gender">
            <el-option label="Male" value="m"></el-option>
            <el-option label="Female" value="f"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nationality" prop="nationality" style="margin-top: 20px;">
          <!-- <el-select v-model="createprofileForm.nationality" @change="handleNationalityChange">
            <el-option label="Ethiopian" value="4001"></el-option>
            <el-option label="Foreigner" value="4002"></el-option>
          </el-select> -->
          <el-select v-model="createprofileForm.nationality" @change="handleNationalityChange">
            <el-option v-for="nationality in nationalities" :key="nationality" :label="nationality" :value="nationality"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Picture">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handlePicChangeForCreate">
            <img v-if="createprofileForm.imageUrl" :src="createprofileForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-button type="danger" @click="handlecreationcancel">cancel</el-button>
        <el-button type="primary" @click="handleprofilecreate"> save</el-button>
      </el-form>
    </div>
    <el-dialog :visible.sync="isOpenPicUploadDialog">
      <el-upload
      class="avatar-uploader"
        ref="upload"
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handlePicChange">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button @click="handleCloseChangeProfilePictureDialog">Cancel</el-button>
      <el-button @click="handleSaveProfilePicture" type="primary">Save</el-button>
    </el-dialog>
  </div>
</template>
<script>
import API from '../api/index'
import store from "@/store/index.js"
import nationalities from '@/util/nationalities'
import {
  deepClone
} from '@/util/util'

export default {

  name: 'profilepage',
  props: {
    personInfo: Object,
    id: String,
    createprofile: Boolean,
    isLoginUser: {
      type: Boolean,
      default () {
        return false
      }
    },
    amPatient:Boolean
  },
  data() {
    return {
      isOpenPicUploadDialog: false,
      imageUrl: '',
      profileImagePath: '',
      picServerLink: process.env.VUE_APP_SERVER_URL + '/images',
      createprofileForm: {
        name: null,
        email: null,
        phone_num: null,
        birthday: null,
        gender: null,
        imageUrl: null,
        picture: null,
        nationality: null,
      },
      nationalities:nationalities,
    
      createprofileFormRules: {
        name: [{
          required: true,
          message: 'Please enter your full name',
          trigger: 'blur'
        }],
        email: [{
            required: true,
            message: 'Please enter your email',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Invalid email format',
            trigger: 'blur'
          },
        ],
        phone_num: [{
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
        nationality: [{
          required: true,
          message: 'Please select your nationality',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: 'Please select your gender',
          trigger: 'change'
        }],
      },
      creating: false,
      nameError: false,
      genderError: false,
      birthdayError: false,
      phoneError: false,
      nationalityError: false,
      user: {
        fullName: null,
        email: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
      },
      editForm: {
        fullName: null,
        email: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
      },
      createForm: {
        fullName: null,
        email: null,
        phone_num: null,
        birthday: null,
        gender: null,
      },
      editing: false,
      changingPassword: false,
      editFormRules: {
        fullName: [{
          required: true,
          message: 'Please enter your full name',
          trigger: 'blur'
        }],
        email: [{
            required: true,
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
        oldPassword: [{
          required: true,
          message: 'Please enter your old password',
          trigger: 'blur'
        }],
        newPassword: [{
            required: true,
            message: 'Please enter your new password',
            trigger: 'blur'
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters long',
            trigger: 'blur'
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
            message: 'Password must contain both letters and numerics',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.editForm.confirmPassword) {
                callback(new Error('Passwords do not match'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
        confirmPassword: [{
            required: true,
            message: 'Please confirm your new password',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.editForm.newPassword) {
                callback(new Error('Passwords do not match'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
      createFormRules: {
        fullName: [{
          required: true,
          message: 'Please enter your full name',
          trigger: 'blur'
        }],
        email: [{
            required: true,
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
        oldPassword: [{
          required: true,
          message: 'Please enter your old password',
          trigger: 'blur'
        }],
        newPassword: [{
            required: true,
            message: 'Please enter your new password',
            trigger: 'blur'
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters long',
            trigger: 'blur'
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
            message: 'Password must contain both letters and numerics',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.editForm.confirmPassword) {
                callback(new Error('Passwords do not match'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
        confirmPassword: [{
            required: true,
            message: 'Please confirm your new password',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.editForm.newPassword) {
                callback(new Error('Passwords do not match'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
      loggeduser: localStorage.getItem('user'),
      loggedstate: store.state.auth.user.id,
      tempProfile: {},
    };
  },

  methods: {
    
    handleprofilecreate() {
      this.$refs.createprofileformref.validate((valid) => {
        if (valid) {
          this.createprofileForm.created_by = store.state.auth.user.id
   
          this.$confirm('Are you sure submit this Profile', 'Tips', {
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

            API.createProfileforother(this.createprofileForm).then(res => {
              if(res.message == 'success') {
                this.$refs.createprofileformref.resetFields();
                this.$emit('closecreation')
                setTimeout(() => {
                  loading.close();
                  this.$message({
                    showClose: true,
                    message: "Profile Created",
                    type: 'success'
                  });
                  location.reload()
                }, 1000)
              } else {
                this.$message({
                  type: 'error',
                  message: 'New Patient Add Failed'
                });
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
              message: 'Profile Creation Cancel!'
            });
          })
        }
      })
    },
    handlecreationcancel() {
      this.$refs.createprofileformref.resetFields();
      this.$emit('closecreation')
    },
    openCreateProfile() {
      this.creating = true;
    },
    init() {
      this.user = deepClone(this.personInfo)
      this.tempProfile = deepClone(this.personInfo)
    },
    editProfile() {
      this.editing = true;
    },
    deleteProfile() {
      const param = {
        creator_id: store.state.auth.user.id,
        created_for: this.personInfo.id
      }

      this.$confirm('Are you sure Delete this profile', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        API.deleteProfile(param).then(res => {
          this.$message({
            message: 'successfully deleted',
            type: 'success'
          })
          setTimeout(() => {
            location.reload()
          }, 1000);

        }).catch(e => {
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: 'Delete Cancel!'
        });
      });

    },
    handleCancel() {
      
      this.user = deepClone(this.tempProfile)
      this.editing = false
    },
    handlecreateCancel() {
      this.creating = false
    },
    handleSaveProfile() {
      var flag = this.handleBirthdayChange() + this.handleGenderChange() + this.handleNameChange() +
        this.handleNationalityChange() + this.handlePhoneChange()
      if (this.isLoginUser) {
        this.updateCurrentLoginUser(flag)
      } else {
        this.updatePatient(flag)
      }
    },
    updateCurrentLoginUser(flag) {
      if (flag) {
        this.$message({
          message: 'Please fullfill all information.',
          type: 'warning'
        })
      } else {
        this.user.role = store.state.auth.user.roles[0]
        API.updateCurrentLoginUser(this.user).then(res => {
          if (res.resData.affectedRows > 0) {
            this.$message({
              message: 'Update persoanl information successfully',
              type: 'success'
            })
            this.$store.dispatch("auth/updateLoginInfoMu", {
              name: this.user.name
            })
            let user = JSON.parse(localStorage.getItem('user'));
            user.name=this.user.name;
            localStorage.setItem('user',JSON.stringify(user))
            this.editing = false
            this.$emit('reloadData')
          } else {
            this.$message({
              message: 'No Change',
              type: 'warning'
            })
          }
        }).catch(e => {
          console.log(e)
        })

      }
    },
    updatePatient(flag) {
      if (flag) {
        this.$message({
          message: 'Please fullfill all information.',
          type: 'warning'
        })
      } else {
        API.updatePatient(this.user).then(res => {
          if (res.resData.affectedRows > 0) {
            this.$message({
              message: 'Update persoanl information successfully',
              type: 'success'
            })
            this.editing = false
            this.$emit('reloadData')
          } else {
            this.$message({
              message: 'No Change',
              type: 'warning'
            })
          }
        }).catch(e => {
          console.log(e)
        })
        this.$message({
          message: 'Update patient information successfully',
          type: 'success'
        })
      }
    },
    handlecreateprofile() {
      var flag = this.handleBirthdayChange() + this.handleGenderChange() + this.handleNameChange() +
        this.handleNationalityChange() + this.handlePhoneChange()
      if (flag) {
        this.$message({
          message: 'fill the form correctly',
          type: 'warning'
        })
      } else {
        API.createProfileforother(this.createForm).then(res => {
          this.$message({
            message: "Profile created successfully",
            type: "success"
          })
        }).catch(err => {
          console.log(err)
        })
      }

    },
    checkNull(val) {
      return val == null || val == 'undefined' || val == '' || val == 'null' || val == undefined
    },
    handleBirthdayChange() {
      if (this.checkNull(this.user.birthday)) {
        this.birthdayError = true
        return 1
      } else {
        this.birthdayError = false
        return 0
      }
    },
    handleGenderChange() {
      // console.log(this.user.gender)
      if (this.checkNull(this.user.gender)) {
        this.genderError = true
        return 1
      } else {
        this.genderError = false
        return 0
      }
    },
    handleNameChange() {
      // console.log(this.user.name)
      if (this.checkNull(this.user.name)) {
        this.nameError = true
        return 1
      } else {
        this.nameError = false
        return 0
      }
    },
    handlePhoneChange() {
      if (this.checkNull(this.user.phone_num)) {
        this.phoneError = true
        return 1
      } else {
        this.phoneError = false
        return 0
      }
    },
    handleNationalityChange() {
      if (this.checkNull(this.user.nationality)) {
        this.nationalityError = true
        return 1
      } else {
        this.nationalityError = false
        return 0
      }
    },
    handleClickPicChangeDialog() {
      this.isOpenPicUploadDialog = true
    },
    handlePicChange(file, fileList) {
      const checkResult = this.beforeAvatarUpload(file)
      if(checkResult) {
        this.imageUrl = window.URL.createObjectURL(file.raw)
        // 发送file文件，需要使用FormData进行传输
        let formData = new FormData();
        // file对应的是一个file对象
        formData.append("file", file.raw, "filename.png"); //很重要 data.append("file", file);不成功
        formData.append("title", "filename.png");
        formData.append("id", this.personInfo.id);
        API.uploadProfilePic(formData) .then(res => {
          this.profileImagePath = res.picturePath
        }) .catch(e => {
          console.log(e)
        })
      }
      
    },

    beforeAvatarUpload(file) {
      const isJPG =  file.raw.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleSaveProfilePicture() {
      this.isOpenPicUploadDialog = false
      this.user.picture = this.picServerLink + this.profileImagePath
     
    },
    handleCloseChangeProfilePictureDialog() {
      this.isOpenPicUploadDialog = false
      this.deleteUploadFile()
    },
    deleteUploadFile() {
      var param = {
        type: 'profile',
        name: '1687779959059.jpg',
      }
      API.deleteUploadFile(param).then(res => {
        this.$message.success('Cancel edit picture success');
      }).catch(e => {
        console.log(e)
      })
    },
    handlePicChangeForCreate(file, fileList) {
      const checkResult = this.beforeAvatarUpload(file)
      if(checkResult) {
        this.createprofileForm.imageUrl = window.URL.createObjectURL(file.raw)
        // 发送file文件，需要使用FormData进行传输
        let formData = new FormData();
        // file对应的是一个file对象
        formData.append("file", file.raw, "filename.png"); //很重要 data.append("file", file);不成功
        formData.append("title", "filename.png");
        formData.append("id", this.personInfo.id);
        API.uploadProfilePic(formData) .then(res => {
          this.profileImagePath = res.picturePath
          this.createprofileForm.picture = this.picServerLink + this.profileImagePath
          this.createprofileForm.id = res.id
        }) .catch(e => {
          console.log(e)
        })
      }
      
    },

  },
  mounted() {
    this.init()

  },
}

</script>
<style lang="scss" scope>
.createprofile-patient-form-wrapper {
  display: flex;
  justify-content: center;
  

}
.createprofile-patient-form {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
  width:500px;
}
.profile-page {
  width: 100%;
  background-color: transparent !important;
   @media (min-width: 1400px) {
    width: 90%;
  }
}

.profile-page h2 {
  margin-bottom: 20px;
  text-align: center;
}

.profile-page .el-form-item__label {
  font-weight: bold;
   @media (max-width: 600px) {
    text-align: left;
   
  }
}
::v-deep .el-date-editor{
  @media (max-width: 600px) {
     width: 100%!important;
   }
}
::v-deep .el-select {
  @media (max-width: 600px) {
    margin: 0; 
    width: 100%;
  }}
.profile-page .el-form-item__content {
  margin-left: 30px; 
   @media (max-width: 600px) {
    margin-left: 10px!important;
    width: 90%;
    display: flex;
   
  }
}

.profile-page .el-form-item {
  margin-bottom: 10px !important;
  @media (max-width: 600px) {
    /* Styles for screen sizes up to 600px */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0;
    margin: 0;
    width: 100%;
  }
}

.profile-page .el-button {
  margin: 20px 0px;
}

// .profile-page .el-input,
// .profile-page .el-date-picker,
// .profile-page .el-select {
//   width: 600px;
// }

.profile-page .el-form-item__error {
  color: red;
}

.profile-page .el-button--primary {
  margin-right: 10px;
}

.profile-page .el-button--text {
  color: #409eff;
}

.profile-page .el-button--text:hover {
  color: #66b1ff;
}

.profile-page .el-form--readonly .el-form-item__content {
  color: #555;
  font-style: italic;
   @media (max-width: 600px) {
    margin-left: 10px!important;
    width: 90%;
   
  }
}

/* .profile-page .el-input, .profile-page .el-date-picker, .profile-page .el-select {
  width: 315px;
} */

.wrapper {
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 20px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  /* grid-template-columns: repeat(3, 30%); */
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;

  /*  声明行间距和列间距  */
  /* grid-gap: 20px; */
  /*  声明行的高度  */
  /* grid-template-rows: 50px 50px 50px ; */
  grid-template-rows: auto auto auto ;
  /* align-items: center;
  align-content: center; */
  /* justify-items: center;  
  justify-content: center; */
  
 @media (max-width: 900px) {
     display: flex;
     flex-direction: column;
  }
 
}
.name-class {
  /* align-self: center;  */
  /* justify-self: center; */
}
.gender-class { 
}

.birthday-class {
}
.phone-class {
}
.email-class {
}
.nationality-class {
}
.address-class {
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
}
.save-button-class {
  
  justify-content: center;
  min-width: 90%;
  
}
.item {
  text-align: center;
  font-size: 18px;
  color: #0a0808;
  border: 1px solid #eee;
  line-height: 46px;
  border-radius: 6px;
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
}
.profile-photo {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
}
.profile-class {
  display: flex;
  border-radius: 6px;
  align-content: center;
  flex-wrap: wrap;
  // align-items: center;
  justify-content: center;
  
}
.introduce-class {
  width: 100%;
  max-width: 705px;
 
}
.image-class {
  min-width: 300px;
  max-width: 300px;

  max-height: 400px;
  .profile-photo-wrapper {
    height: 100%;
    padding: 20px 20px;
  }
}
.sub-wrapper {
  display: grid;
  grid-template-columns: 110px auto;
  width: 100%;
}
.title-class {
  text-align: left;
  padding-left: 4px;
}
.value-class {
  text-align: left;
  color: #555;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .profile-header-left {
    width: 200px;
    text-align: left;
  }
  .profile-header-center {
    flex-grow: 1;
  }
  .profile-header-right {
    width: 400px;
    text-align: right;
    padding-right: 10px;
  }
}
.test {
  color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    text-align: left;
    // position: absolute;
    // top: 100%;
    // left: 0;
  // &:after {
  //   content: 'asdasd';
   
  // }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  line-height: 6 !important;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}




</style>
