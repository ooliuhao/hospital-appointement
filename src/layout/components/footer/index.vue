<template>
  <div>
     <div v-if="showToast" class="toast-container">
      <div class="toast-modal">
        <i class="fas fa-check-circle toast-icon"></i>
        <p>{{ toastMessage }}</p>
      </div>
    </div>
    
      <footer class="footer1">
        <div class="footer1__top">
          <div class="content_box_100_50">
            <div class="container-fluid">
              <div class="row" >
                <div class="col-md-8 col-lg-4 " style="padding-top: 30px;">
                  <div class="footer1__item footer1__item--01 mb-50 " >
                    <div class="footer1__item--logo">
                      <img src="../../../assets/img/logo/silkroad.jpeg" alt="Logo" style="max-width: 40%; height: auto;">
                    </div>
                    <ul class="footer_list_1">
                      <li><a href="https://goo.gl/maps/73bvWr1F7x2TiRNS6" target="_blank" style="background-color: inherit; text-decoration: none;">
                        <i class="el-icon-location" style="font-size: 16px; color: white !important; margin-right:10px;"></i>
                        <span>Next to Sarbet Gibson Academy, opposite site of the Vatican Embassy, Egypt Road.</span></a></li>
                      <!-- <li><span>Addis Ababa, Ethiopia</span></li> -->
                      <li > <i class="el-icon-chat-square" style="font-size: 16px; color: white !important; margin-right:10px;"></i> <span>silkroadhospital@afeiholding.com</span></li>
                      <li>  <i class="el-icon-phone" style="font-size: 16px; color: white !important; margin-right:10px;"></i><span>Reception: +251 93 661 0666</span></li>
                      <li>  <i class="el-icon-phone" style="font-size: 16px; color: white !important; margin-right:10px;"></i> <span>Emergency: +251 96 904 4519</span></li>
                    </ul>
                   
                 
  
                  </div>
                </div>
                <div class="col-md-8 col-lg-4" style="padding-top: 30px;">
                  <div class="footer1__item footer1__item--02 mb-50">
                    <h3> Our Services.</h3>
                    <div style="display: flex; " class="list_services">
                    <ul style="" >
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Laparoscopy Surgery </a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Orthopedic Surgery</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Neurosurgery</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Urology</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Anesthesiology</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">ICU </a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Internal Medicine</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;"> Neurology</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Cardiology</a></li>
                    </ul>
                    <ul style="">
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Endocrinology </a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Gastroenterology</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">GYN/OB</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Pediatrics</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Dentistry</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Ophthalmology</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">ENT</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Dermatovenerology</a></li>
                      <li><a href="#" style="background-color: inherit; text-decoration: none;">Physiotherapy</a></li>
                    </ul>
                  </div>
                  </div>
                </div>
                <!-- <div class="col-md-6 col-lg-3">
                  <nav>
                    <div class="footer1__item footer1__item--03 mb-50">
                      <h3>Helpful Links.</h3>
                      <ul>
                        <li><a href="#" style="background-color: inherit;">Who We Are</a></li>
                        <li><a href="#" style="background-color: inherit;">Our Team Mission History</a></li>
                        <li><a href="#" style="background-color: inherit;">Awards since 1990 - 2023</a></li>
                        <li><a href="#" style="background-color: inherit;">Experience Purpose</a></li>
                        <li><a href="#" style="background-color: inherit;">Success Story</a></li>
                        <li><a href="#" style="background-color: inherit;">Specialized Support</a></li>
                      </ul>
                    </div>
                  </nav>
                </div> -->
                <div class="col-md-8 col-lg-4" style="padding-top: 30px;">
                  <div class="footer1__item footer1__item--04 mb-50">
                    <h3>Pictures.</h3>
                    <div class="footer1__item--instagram">
                      <a href="#"><img src="../../../assets/img/background/bg-06.jpg" alt="Image"></a>
                      <a href="#"><img src="../../../assets/img/background/bg-07.jpg" alt="Image"></a>
                      <a href="#"><img src="../../../assets/img/background/bg-08.jpg" alt="Image"></a>
                      <a href="#"><img src="../../../assets/img/background/bg-09.jpg" alt="Image"></a>
                      <a href="#"><img src="../../../assets/img/background/bg-10.jpg" alt="Image"></a>
                      <a href="#"><img src="../../../assets/img/background/bg-11.jpg" alt="Image"></a>
                    </div>
                  
  
  
                  </div>
                  <span class="subscribe" >Subscribe to Recieve updates</span>
         
                    
         <div class="footer1__item--email">
           <input v-model="email" placeholder="Email address" type="email" name="email">
           <button type="submit" @click="subscribe" style="font-weight: 80;font-size: x-large; height: 55px; width: 130px;">Subscribe</button>
           <div v-if="isLoading">
        
             <p >SilkRoad...</p>
           </div>
           <!-- <p v-if="succuss" style="color:white;margin-top: 5px;">--You subscribed successfully.--</p> -->
           <p v-if="errorHappen && !succuss" style="color:red;">{{ error }}</p>

         </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer1__bottom">
          <div class="container">
            <!-- <div class="row" style="display: flex;align-content: center;place-content: center space-around;" > -->
            <div class="row" style="display: flex;align-content: center;justify-content: space-around;">
              <div class="col-lg-6 text-center">
                <!-- <span style="color: aliceblue;">copyright@Silk Road Hospital</span><br> -->
                <span style="color: aliceblue; ">Powered by <img src="../../../assets/img/logo/footer_inspur.png" width="200px" height="" style="padding-left: 12px;  "/></span>
              </div>
              <!-- <div class="col-lg-6 text-center text-lg-left" >              
                <div class="footer1__social text-center text-lg-right">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
              </div> -->
  
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  <script >
  import API from '../../../views/system/api/message.service'
  export default {
    name: 'dlFooter',
    data(){
      return {
      email: '',
      isLoading: false,
      succuss: false, // Changed "succuss" to "success"
      errorHappen:false,
      error:'',
      showToast: false,
      message: '',

    };
    },
    methods:{
      subscribe(){
        this.succuss=false;
        this.isLoading=true;
        if(this.email!=''){
          API.subscribe(this.email).then(res=>{
            // console.log("succussfuly Subscribe",res);
            setTimeout(() => {
          this.isLoading = false;
          this.email = '';
          this.showToast = true;
           this.errorHappen=false;
          this.toastMessage = 'Subscription Successful';
          setTimeout(() => {
            this.showToast = false;
          }, 5000);
        }, 2000);
          }).catch(e=>{console.log(e.response.data.e.sqlMessage)
            this.isLoading=false;
            this.errorHappen=true;
            this.error=e.response.data.e.sqlMessage.slice(0, 35);
            setTimeout(() => {
        this.errorHappen = false;
      }, 4000); 
          
          }
            
            )

        }
      },
      clearModal(){
        this.succuss=false;
      },
      
    }
  }
  </script>
  <style scoped>
  
.containerMain{
  position:relative;
}
.content_box_pob_120_90 {
  padding-bottom: 90px;
}

@media only screen and (max-width: 1199px) {
  .content_box_pob_120_90 {
    padding-bottom: 70px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_pob_120_90 {
    padding-bottom: 50px;
  }
}

.content_box_pob_120_70 {
  padding-bottom: 70px;
}

@media only screen and (max-width: 1199px) {
  .content_box_pob_120_70 {
    padding-bottom: 50px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_pob_120_70 {
    padding-bottom: 30px;
  }
}

.content_box_pob_100_70 {
  padding-bottom: 70px;
}

@media only screen and (max-width: 1199px) {
  .content_box_pob_100_70 {
    padding-bottom: 50px;
  }
}

.content_box_pob_100_50 {
  padding-bottom: 50px;
}

@media only screen and (max-width: 1199px) {
  .content_box_pob_100_50 {
    padding-bottom: 30px;
  }
}

.content_box_pot_120 {
  padding-top: 120px;
}

@media only screen and (max-width: 1199px) {
  .content_box_pot_120 {
    padding-top: 100px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_pot_120 {
    padding-top: 80px;
  }
}

.content_box_pob_120 {
  padding-bottom: 120px;
}

@media only screen and (max-width: 1199px) {
  .content_box_pob_120 {
    padding-bottom: 100px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_pob_120 {
    padding-bottom: 80px;
  }
}

.content_box_pot_100 {
  padding-top: 100px;
}

@media only screen and (max-width: 767px) {
  .content_box_pot_100 {
    padding-top: 80px;
  }
}

.content_box_pob_100 {
  padding-bottom: 100px;
}

@media only screen and (max-width: 767px) {
  .content_box_pob_100 {
    padding-bottom: 80px;
  }
}

.content_box_120 {
  padding-top: 120px;
  padding-bottom: 120px;
}

@media only screen and (max-width: 1199px) {
  .content_box_120 {
    padding-top: 100px;
    padding-bottom: 100px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_120 {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}

.content_box_120_90 {
  padding-top: 120px;
  padding-bottom: 90px;
}

@media only screen and (max-width: 1199px) {
  .content_box_120_90 {
    padding-top: 100px;
    padding-bottom: 70px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_120_90 {
    padding-top: 80px;
    padding-bottom: 50px;
  }
}

.content_box_120_70 {
  padding-top: 120px;
  padding-bottom: 70px;
}

@media only screen and (max-width: 1199px) {
  .content_box_120_70 {
    padding-top: 100px;
    padding-bottom: 50px;
  }
}

@media only screen and (max-width: 767px) {
  .content_box_120_70 {
    padding-top: 80px;
    padding-bottom: 30px;
  }
}

.content_box_100 {
  padding-top: 100px;
  padding-bottom: 100px;
}

@media only screen and (max-width: 1199px) {
  .content_box_100 {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}

.content_box_100_70 {
  padding-top: 100px;
  padding-bottom: 70px;
}

@media only screen and (max-width: 1199px) {
  .content_box_100_70 {
    padding-top: 80px;
    padding-bottom: 50px;
  }
}

.content_box_100_50 {
  padding-top: 100px;
  padding-bottom: 50px;
}

@media only screen and (max-width: 1199px) {
  .content_box_100_50 {
    padding-top: 80px;
    padding-bottom: 30px;
  }
}
ul {
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
}

  .footer1 {
  background: #0E3340;
}

.footer1__top {
  border-top: 1px solid #4B575B;
  border-bottom: 1px solid #3D5B65;
}

.footer1__item h3 {
  font-size: 24px;
  line-height: 1;
  font-weight: 600;
  color: #ebebeb;
  margin-bottom: 20px;
}

.list_services{
  display: flex;
  align-items: start;
  justify-content: start;
  margin-left: 20px;
}
.list_services >ul{
 display: flex;
 flex-direction: column;
 align-items: start;
 justify-content: space-between;

 
}

.list_services >ul li{

 margin-top: 10px;
 margin-right: 25px;
 font-size: 11px;
}

.footer1__item--01 {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-left: 20px;
  
}
.footer_list_1{
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 10px;
  
}
.footer_list_1 > li{
  margin-top: 7px;
}

.footer1__item--02 {
  padding-left: 35px;
  

  
}

@media only screen and (max-width: 1199px) {
  .footer1__item--02 {
    padding-left: 0px;
  }
}

.footer1__item--03 {
  padding-left: 10px;
}

@media only screen and (max-width: 1199px) {
  .footer1__item--03 {
    padding-left: 0px;
  }
}

.footer1__item--logo {
  margin-bottom: 45px;
}

.footer1__item ul li:not(:last-child) {
  margin-bottom: 12px;
}

.footer1__item ul li span {
  font-size: 13px;
  color: #c8c8c8;
  line-height: 1;
}

.footer1__item ul li a {
  font-size: 13px;
  color: #c8c8c8;
  line-height: 1;
  display: inline-block;
}

.footer1__item ul li a:hover {
  color:#5492ee;
}

.footer1__item--email {
  position: relative;
  margin-top: 5px;
}

.footer1__item--email input {
  background: #1e4d70;
  width: 100%;
  border: none;
  padding: 15px 50px 16px 20px;
}

.footer1__item--email input::-webkit-input-placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email input:-ms-input-placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email input::-ms-input-placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email input::-webkit-input-placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email input::-moz-placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email input:-ms-input-placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email input::placeholder {
  color: #508ea3;
  font-style: italic;
}

.footer1__item--email button {
  position: absolute;
  top: 0px;
  right: 0px;
  background:#5492ee;
  color: #fff;
  border: none;
  font-size: 26px;
  display: inline-block;
  padding: 8px 14px;
}

.footer1__item--instagram a {
  display: inline-block;
  width: 75px;
  height: 75px;
  margin-right: 10px;
  margin-bottom: 13px;
}

.footer1__bottom {
  padding: 20px 0px 20px;
}

.footer1__social a {
  display: inline-block;
  font-size: 21px;
  color: #4c6d78;
  text-align: center;
}

.footer1__social a:not(:last-child) {
  margin-right: 20px;
}

@media only screen and (max-width: 991px) {
  .footer1__social a {
    font-size: 18px;
  }
}

.footer1__copyright p {
  color: #c7c7c7;
  font-size: 18px;
}

@media only screen and (max-width: 991px) {
  .footer1__copyright p {
    font-size: 15px;
  }
}

.footer1__copyright p a {
  color:#5492ee;
}
  .subscribe {
    font-size: 13px;
    color: azure;
    margin-top: 30px !important;
    text-align: start;
  }
  
  /* .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    } */

    .success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.success-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.success-content h2 {
  color: #155815;
  margin-bottom: 10px;
}

.success-content p {
  color: #555;
}
.toast-container {
  position: fixed;
  top: 0;
  left: 10;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.toast-modal {
  background-color: white;
  color: #156c06;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.toast-modal p {
  margin: 0;
  flex-grow: 1;
  padding: 10px 20px;
  border-radius: 8px;
}

.toast-icon {
  margin-left: 10px;
  font-size: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
  </style>