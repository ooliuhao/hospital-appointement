<!--  -->
<template>
  <div class="mainPage">
    <transition name="fade-order">
      <div class="card-wall" v-if="!isOrder">
        <div style="margin-bottom: 20px;" v-for="(card, index) in cardList" :key="index" class="card-item">
          <description-card :backgroundImageProp="card.backgroundImageProp" :iconImageProp="card.iconImageProp"
            :type="type" :cardInfo="card" @openOrderPage="openOrderPage" @openPdfDialog="openPdfDialog">
          </description-card>
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
import { mapState} from 'vuex'
import store from '@/store/index.js'
import orderForm from './component/form.vue'
import API from '../api/index'
import { deepClone } from '@/util/util'
import descriptionCard from './component/descriptionCard.vue'
import { validatenull } from '@/util/validate'
export default {
  name: 'physicalPage',
    data() {
      return {
        dialogVisible: false,
        isOrder: false,
        type: 'physical',
        transCardInfo: {},
        rowCardList: [],
        cardList: [],
      }
    },

    components: {
      orderForm,
      descriptionCard,
    },

    computed: {
      
    },

    mounted() {
      if(this.$route.query.physical) {
        this.transCardInfo.id = this.$route.query.physical
        this.openOrderPage(this.transCardInfo)
      }
      this.generateRowCardList()
      this.getPackageByType()
    },

    methods: {
      getPackageByType() {
        API.getPackageByType({type: 'physical'}).then(res => {
          this.cardList = res.packageList
          for(var i=0; i<this.cardList.length; i++) {
            this.cardList[i].iconImage = require('@/assets/image/background/' +this.cardList[i].type + '/logo/' + this.cardList[i].iconImage)
            this.cardList[i].backgroundImage = require('@/assets/image/background' + this.cardList[i].backgroundImage)
          }
         this.generateRowCardList()
        })
      },
      closeOrder() {
        console.log('outer')
        this.isOrder = false
      },
      openOrderPage(transCardInfo) {
        this.isOrder = true
        this.transCardInfo = transCardInfo
      },
      handleClick() {
        this.rowCardList = []
        this.generateRowCardList()
      },
      generateRowCardList() {
        const limit = 3
        var tempList = []
        for(var i=0; i < this.cardList.length; i++) {
          tempList.push(this.cardList[i])
          if(tempList.length % 3 == 0) {
            this.rowCardList.push(deepClone(tempList))
            tempList = []
          } else if (i == this.cardList.length - 1) {
            this.rowCardList.push(deepClone(tempList))
            tempList = []

          }
        }
      },
      openPdfDialog() {
       
        this.dialogVisible = true
      }
    }
  }

</script>
<style lang='scss' scoped>
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
