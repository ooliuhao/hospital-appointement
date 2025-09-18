<!--  -->
<template>
  
    <div class="main-page" >
    <div style="" class="home-class-container" flex="main:center cross:center">
     
      <div class="swiper-wrapper">
<!--      <el-carousel indicator-position="outside" >-->
<!--        <el-carousel-item v-for="item in 4" :key="item">-->
          <div class="swiper-slide slide" >

<div class="auto-container">

  <div class="content">

    <div class="title">WELCOME TO HAWASSA</div>

    <h2 class="header">We Will Provide You With The Best Service</h2>


    <div class="text">We are always available to assist citizens who need assistance. You can contact us 24/7 at the following phone number:</div>
  </div>

</div>

</div>
<!--    </el-carousel-item>-->
<!--     </el-carousel>-->


</div>
      <div class="home-class-item2">
        <div class="contact">
       <el-popover
            placement="left"
            width="230"
            trigger="hover">
            <div>
              <div style="background-color: rgb(209 248 209 / 58%); border-radius: 6px; padding: 6px">
                <el-row style="margin-bottom: 4px">
                  <el-col>Near the Gibson Academy</el-col>
                </el-row>
                <el-row style="margin-bottom: 4px">
                  <el-col>Addis Ababa, Ethiopia</el-col>
                </el-row>
                <el-row style="margin-bottom: 4px">
                  <el-col>silkroadhospital@afeiholding.com</el-col>
                </el-row>
                <el-row style="margin-bottom: 4px">
                  <el-col> +251 96 904 4519</el-col>
                </el-row>
              </div>
              <div style="justify-content: start;margin-top: 5px; width:200px;">
                <span v-for="(message, index) in chatMessagesOfMe" :key="index" >
                  {{ message }}<br />
                </span>
              </div>
            
              <div style="height: 10px;"></div>
              
              <div>
                <el-input type="textarea" placeholder="If any comments or suggestions" v-model="message">
                </el-input>
                <!-- <el-button  @click="sendMessage" style="width: 100%" size="mini">Message<i style="color: orange;font-size: 12px;" class="iconfont hospital-iconsend"></i></el-button><br /> -->
                <el-button style="margin-top: 10px;"  @click="redirectWhatsApp"  size="mini">Send <img src="../../../assets/image/chat/whatsapp.png" style="height: 15px;width:15px;"/></el-button>
                <el-button @click="redirectTelegram" style="margin-left: 30px;"  size="mini">Send <img src="../../../assets/image/chat/telegram.png" style="height: 13px;width:13px;"/></el-button>
              </div>  
            </div>
            <el-button slot="reference" style="height: 60px;">
              <i class="iconfont hospital-iconliuyan"></i>
            </el-button>
            
          </el-popover>
        </div>
       
        
      </div>
      <!-- <el-image src="/image/background/main-bg.png" fit="cover" style="height: 100%;"></el-image> -->
      <!-- <el-image url="/public/image/background/main-bg.png"></el-image> -->
    </div>
   

  </div>
 
 
  
</template>

<script>
import MessageService from '../api/message.service'
export default {

  name: 'indePage',
  data () {
    return {
      message: '',
      searchBarHeight: '',
      chatMessagesOfMe:[]
    }
  },

  components: {
  },

  computed: {
    mainPageHeight() {
      return (document.body.clientHeight - 60)
    },
    introduceWordMarginTop () {
      return (this.mainPageHeight - 432) / 2 
    },
    telegramLink() {

      const username = '+251912644612';

      return `https://t.me/${username}?text=${encodeURIComponent(this.message)}`;
      },
      whatsappLink() {

      const phoneNumber = '+251912644612';
      const message = 'Hello, I have a question.';
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(this.message)}`;
      }
  },

  mounted () {
    // this.headerBarHeight = this.$refs.headerBar.offsetHeight;
    // console.log("headerBarHeight: " + this.headerBarHeight)
    // console.log(document.body.clientHeight)
    // console.log(document.body.clientWidth)
    // console.log(this.$refs.introduceWords.offsetHeight)
    // console.log(this.introduceWordMarginTop)
  },

  methods: {
    redirectWhatsApp() {
      const newTab = window.open(this.whatsappLink, '_blank');
      newTab.focus();
    },
    redirectTelegram() {
      window.open(this.telegramLink, '_blank');
    },
    sendMessage(){
      if(this.message != ''){
        this.chatMessagesOfMe.push(this.message);

        MessageService.sendMessage(this.message).then(res=>{
          // console.log("message sent Succussfuly")
        })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.main-page {
  background-image: url('/public/image/background/main-bg.jpg');
  background-size: cover; /* or 'contain' */
  background-repeat: no-repeat;
  background-position: center center;
  // min-height: 100%;
  @media  (max-width: 600px) {
    background-size:cover;
  }
}
.home-class-container {
  display: flex;
  flex-direction: row;
  // background-color: antiquewhite;
  height: 100%;
  // height: 2000px;

}
.home-class-item1 {
  flex: 2;
  padding: 10px;
  @media  (max-width: 600px) {
   display: none !important;
  }
}
.home-class-item2 {
  flex: 1;
  padding: 10px;
}
.item {
  margin: 4px;
}
.contact {
  overflow: hidden;
  z-index: 9999;
  position: fixed;
  // padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 6px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  // border: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,.12);

}

.contact:hover {
  background-color: #f2f6fc;
}
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    @media  (min-width: 600px) {
   
  }
}
 .slide {
    position: relative;
    padding: 225px 0px 225px;
   
}
.auto-container {
    position: static;
    //top: 150px;
    max-width: 1210px;
    padding: 0px 80px; /* reduce side padding */
    margin: 0;
}
.content {
    position: relative;
    z-index: 10;
    * {
    margin: 0px;
    padding: 0px;
    border: none;
    outline: none;
    font-size: 100%;
}
.header {
    font-size: 32px;
    color: #004cda;
    text-align: start;
    margin: 40px 0px;
    @media  (min-width: 600px) {
      font-size: 32px;
  }
}
.title {
    position: relative;
    font-size: 18px;
    color: #222222;
    font-weight: 700;
    line-height: 1em;
    text-align: start;
    margin-bottom: 20px;
}
.text {
    position: relative;
    font-size: 16px;
    color: #333232;
    font-weight: 400;
    line-height: 1.8em;
    max-width: 600px;
    margin-top: 25px;
    margin-bottom: 30px;
    text-align: start;
    margin-top: 15px;
    
}
}
::v-deep .el-carousel__container {
  width: 100%;
  height: 70vh;
}

</style>
