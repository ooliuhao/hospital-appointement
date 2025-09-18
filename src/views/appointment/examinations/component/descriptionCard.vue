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
          <img :src="cardInfo.iconImage" v-if="cardInfo.iconImage" style="height: 24px; margin-right: 6px"/>
          <!-- <img :src="iconImageProp()"  v-if="cardInfo.iconImage" style="height: 160%; margin-right: 6px"/> -->
          <!-- <img src="@/assets/image/background/physical/logo/baby-care-logo.png"  v-if="cardInfo.iconImage" style="height: 160%; margin-right: 6px"/> -->
          <span> {{ cardInfo.name }} </span>
          <!-- <a class="no-underline" href="/docs/physical/Physical Examination Package A.pdf" target="_blank"> -->
<!--          <a class="no-underline" :href="detailPdfLink" target="_blank">-->
<!--            <i class="el-icon-info more-info" title="More Information" @click="getMoreInformation"></i>-->
<!--          </a>-->
        </div>
        <div class="word-class">
          {{ cardInfo.description }}
          <list-component :dataList="cardInfo.functions"></list-component>
        </div>
        <br>
        <div class="card-footer">
          <el-button class="button-class" @click="handleAppointmentClick(cardInfo)" type="primary">APPOINTMENT</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import listComponent from './listComponent.vue'
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
      detailPdfLink: '/docs/' + this.type + '/' + this.cardInfo.name + '.pdf'
      // filePath: require('@/assets/docs/physical/a/pdf')
    }
  },

  components: {
    listComponent,
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
      // console.log(cardInfo)
      this.$emit('openOrderPage', cardInfo)
      // this.$router.push({name: 'order', query: { id: '123' }} )
    },
    getMoreInformation() {
      // this.$emit('openPdfDialog')
      // console.log(this.cardInfo)
    }
  }
}

</script>
<style lang='scss' scoped>
.card-info-class {
  border-radius: 6px;
  width: 380px;
  height: 520px; /* unify card height */
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
  min-height: 68px; /* ensure space for long title */
  line-height: 1.2;
  font-size: 18px;
  text-align: center;
  white-space: normal;
}
.word-class {
  padding: 20px;
  word-break: break-word;
  background-color: #ffffff5c;
  height: 250px;
  max-height: 500px; /* keep consistent card height */
  //overflow: auto;
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
