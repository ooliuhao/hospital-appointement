<!--  -->
<template>
  <!-- <div :style="cardInfoStyle" class="card-info-class"> -->
  <!-- <div style="background-image: url('/public/image/background/physical/basic-baby-care.jpg');" class="card-info-class"> -->
  <div class="card-info-class">
    <el-card shadow="hover" class="el-card-customize">
      <div :class="cardBackgroundClass" :style="{
          '--background-image': `url(${cardInfo.backgroundImage})`,
        }">
        <div class="card-name-class">
          <img :src="cardInfo.iconImage" v-if="cardInfo.iconImage" style="height: 160%; margin-right: 6px"/>
          <!-- <img :src="iconImageProp()"  v-if="cardInfo.iconImage" style="height: 160%; margin-right: 6px"/> -->
          <!-- <img src="@/assets/image/background/physical/logo/baby-care-logo.png"  v-if="cardInfo.iconImage" style="height: 160%; margin-right: 6px"/> -->
          <span> {{ cardInfo.name }} </span>
          <!-- <a class="no-underline" href="/docs/physical/Physical Examination Package A.pdf" target="_blank"> -->
          <!-- <a class="no-underline" :href="detailPdfLink" target="_blank">
            <i class="el-icon-info more-info" title="More Information" @click="getMoreInformation"></i>
          </a> -->
        </div>
        <div class="word-class">
          {{ cardInfo.description }}
          <list-component :dataList="cardInfo.functions"></list-component>
        </div>
        <br>
        <div class="card-footer">
          <!-- <span class="price-class">{{ (cardInfo.price == null || cardInfo.price == '') ? '?' :priceFormat }}</span>
          <span class="price-unit-class">{{ (cardInfo.unit == null || cardInfo.unit == '') ? 'ETB' : cardInfo.unit }}</span> -->
          <!-- <a class="no-underline" :href="detailPdfLink" target="_blank"> -->
<!--            <div class="more-info-container" @click="openDialog">-->
<!--  <span class="detail-text"><i class="el-icon-info more-info" title="More Information" ></i> Details</span>-->
<!--  -->
<!--</div>-->
          <!-- </a>Detail -->
       
       
          <el-button class="button-class" type="primary" @click="handleAppointmentClick(cardInfo)">APPOINTMENT</el-button>
        </div>
      </div>
    </el-card>
    <div>
    <el-dialog :visible.sync="dialogVisible" title="" width="80%">
      <!-- Dialog Content -->
      <div class="dialog-content">
        
        <div  style="display: flex;justify-content: center;align-items: center; ">
        <!-- WhatsApp Contact Information -->
        
        <div class="whatsapp-info dialog-content1">
          <p>For customized package, please contact with 
            </p>
             
          <!-- <br> -->
          <span class="whatsapp-text ">Whatsapp:</span>
          <div class="whatsapp-contacts">
            <div class="contact">
              +25191 264 4612 (Amharic)
            </div>
            <div class="contact">
              +25192 797 4540 (English)
            </div>
            <div class="contact">
              +25190 357 2361 (Chinese)
            </div>
          </div>
        </div>
        <div class="mobilehide" style="display: flex;flex-direction: column; margin-left:50px;width: 65%;">
          <p>Medical Staff Services department at Addis Ababa Silk Road General Hospital would like to
thank you for your visit and trust. We are your neighborhood health and wellness center, here to
provide the best medical services to promote your well-being. Our high quality of medical team is
here for you, whenever you need. A level of care with dignity, honor, respect, and love is assured
in our hospital.</p>
        <h4>{{ cardInfo.description }}</h4>
    
      </div>
      </div>

        <!-- Display the information here -->
      
        <packagedetail :cardInfo="cardInfo"></packagedetail>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import listComponent from './listComponent.vue'
import packagedetail from '@/layout/components/package-detail'

export default {
  name: 'card',
  props: {
    cardInfo: Object,
    type: String,
    iconImageProp: {
      type: Function,
      default: () => ''
    },
    backgroundImageProp: {
      type: Function,
      default: () => ''
    }
  },
  data () {
    return {
      detailPdfLink: '/docs/' + this.type + '/' + this.cardInfo.name + '.pdf',
      dialogVisible: false, 
      // filePath: require('@/assets/docs/physical/a/pdf')
    }
  },

  components: {
    listComponent,
    packagedetail
  },

  computed: {
    // iconImageCompute() {
    //   return ()=>require('./warning.png')
    // },
    cardBackgroundClass() {
      return this.cardInfo.backgroundImage ? 'card-background-image' : 'card-background-non-image'
    },
    priceFormat() {
      var num = this.cardInfo.price
			if(!/^(-|\+)?(\d+)(\.\d+)?$/.test(num)){
				return num;
			}
			var sign = RegExp.$1;
			var middle = RegExp.$2;
			var decimals = RegExp.$3;
			
			var reg = /(\d)(\d{3})(,|$)/
			while(reg.test(middle)){
				middle = middle.replace(reg,'$1,$2$3');
			}
			return sign+""+middle+""+decimals;
    }
  },

  mounted () {
    // console.log("this.iconImageProp", this.iconImageProp)
  },

  methods: {
    handleAppointmentClick(cardInfo) {
      this.$emit('openOrderPage', cardInfo)
      // this.$router.push({name: 'order', query: { id: '123' }} )
    },
    getMoreInformation() {
      // this.$emit('openPdfDialog')
      // console.log(this.cardInfo)
    },
    openDialog() {
    
      this.dialogVisible = true; // Open the dialog when the icon is clicked
    },
  }
}

</script>
<style lang='scss' scoped>
.more-info-container {
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    color: #829ed2;
    cursor: pointer;
  }
}

.detail-text {
  border: 1px solid #000; /* Add a border style to the detail text */
  padding: 4px 8px; /* Adjust padding as needed */
  border-radius: 6px; /* Add rounded corners */
}

.more-info {
  // &:hover {
  //   color: #82d296;
  //   cursor: pointer;
  // }
}
@media (max-width: 950px) {
  .mobilehide {
    display: none !important;
  }
}
.dialog-content {
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1); /* Add shadow on the left side */
  padding: 20px; /* Adjust padding as needed */
}
.dialog-content1 {
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1); 
  padding: 20px; 
  
}

.whatsapp-info {
  margin-bottom: 20px; /* Add space between WhatsApp info and the content */
}

.whatsapp-text {
  font-weight: bold;
}

.whatsapp-contacts {
  margin-left: 20px; /* Indent WhatsApp contacts */
}

.contact {
  margin-bottom: 10px; /* Add space between WhatsApp contacts */
}
.card-info-class {
  border-radius: 6px;
  width: 370px;
}
.button-class {
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
}

.card-background-image {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;

  &::before {
    content: '';
    border: #ebeef580;
    background-image: var(--background-image);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.5;
  }
}

.card-background-non-image {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;

  &::before {
    content: '';
    border: #ebeef580;
    background-color: #82d296;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.5;
  }
}


::v-deep .el-card-customize {
  border-radius: 20px;
}

::v-deep .el-card__body {
  padding: 0px;
}
.card-name-class {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 10px;
  background-color: #ebeef580;
  height: 18px;
  font-size: 18px;
}
.word-class {
  padding: 20px;
  word-break: break-word;
  background-color: #ffffff5c;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
// @font-face {
//   font-family: 'SerifFont';
//   src: url('/fonts/serif-font.woff2') format('woff2'),
//        url('/fonts/serif-font.woff') format('woff');
//   /* 指定其他字体属性（可选） */
//   font-weight: normal;
//   font-style: normal;
// }

/* 在需要使用 Serif 字体的元素中应用 */
.serif-text {
  font-family: 'SerifFont', serif;
}
.price-class {
  font-size: 20px;
  font-weight: bold;
  color: #ec2121;
  margin-right: -6px;
}
.price-unit-class {
  font-size: 14px;
  font-weight: normal;
  color: #ca5050;
}
.more-info {
  &:hover {
    color: #82d296;
    cursor: pointer;
  }
}
.no-underline {
  text-decoration: none; /* 取消下划线效果 */
  color: inherit; /* 继承父元素的颜色 */
}

.no-underline:hover {
  text-decoration: none; /* 鼠标悬停时取消下划线效果 */
  color: inherit; /* 继承父元素的颜色 */
}
</style>
