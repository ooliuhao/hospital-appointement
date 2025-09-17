<template>
  <div class="error-page">
    <div class="error-image-box">
      <img  class="error-image" :style="errorImageStyle" src="@/assets/image/background/building.jpg" />
    </div>
    <div class="error-message">
      <p class="error-description icon-box"><i class="iconfont hospital-iconku"></i></p>
      <p class="error-description"><i class="iconfont hospital-iconyepian"></i></p>
      <h1 class="error-title">Oops!</h1>
      <p class="error-description">The page is missing</p>
      <p class="error-description">Our hospital always here</p>
      <contactCard></contactCard>
      <button class="error-button" @click="backToHome">Back to Home Page</button>
    </div>
  </div>
</template>

<script>
import contactCard from './contact/index.vue'
export default {
  name: 'ErrorPage',
  props: {
  },
  data() {
    return {
      errorImageStyle: {
        height: document.body.clientHeight + 'px',
        // height: document.body.clientHeight + 'px',
        // width: document.body.clientWidth + 'px',
        // 'object-fit': cover
      }
    }
  },
  components: {
    contactCard
  },
  methods: {
    backToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.error-page {
  border-radius: 6px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  /* grid-template-columns: repeat(3, 30%); */
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  align-items: center;
  /*  声明行间距和列间距  */
  /* grid-gap: 20px; */
  /*  声明行的高度  */
  /* grid-template-rows: 50px 50px 50px ; */
  grid-template-rows: auto auto ;
  /* font-family: 'Arial', sans-serif; */
  background-image: url("@/assets/image/background/bg.jpg");
}

.error-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.error-message {
  text-align: center;
}
.error-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #e74c3c;
}

.error-description {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.error-button {
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: #fff;
  cursor: pointer;
}
.iconfont {
  font-size: 110px;
}
.hospital-iconyepian {
  color: rgb(112, 49, 49);
}
.icon-box {
  margin: 0px
}
</style>
