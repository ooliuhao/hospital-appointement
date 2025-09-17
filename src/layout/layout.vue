<!--  -->
<template>
  <div class="d2-layout-header-aside-group" :style="styleLayoutMainGroup" :class="{grayMode: grayActive}">
    <div class="d2-layout-header-aside-mask"></div>
    <div class="d2-layout-header-aside-content" >
      <div class="d2-theme-header" ref="headerBar" :style="{ opacity: this.searchActive ? 0.5 : 1 }"  >
         <div class="bar">
          <router-link
          to="/index"
          :class="{'logo-group': true, 'logo-transition': asideTransition}"
          :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
          >
          <img v-if="asideCollapse" src="/image/logo/hawassa.png">
          <!-- <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`"> -->
          <!-- <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`"> -->
        </router-link>
        <div class="logo-font" >
          Hawassa District Government Service Appointment Platform
        </div>
         </div>
         <div class="menu-button">
           <el-button @click="drawer = true" icon="el-icon-s-unfold" type="transparent" style="margin-left: 16px;">
              </el-button>
         </div>
        
       <div class="header-container">
         <d2-menu-header></d2-menu-header>
       </div>
       
        <div class="d2-header-right" >
          <d2-header-fullscreen/>
          <d2-header-user/>
        </div>
      </div>
     
    

      <el-drawer
  :visible.sync="drawer"
  direction="ltr"
  size="75%">
  <div  class="drawer-header" ref="headerBar" :style="{ opacity: this.searchActive ? 0.5 : 1 }"  >
         <div class="bar">
          <router-link
          to="/index"
          :class="{'logo-group': true, 'logo-transition': asideTransition}"
          :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
          >
          <img v-if="asideCollapse" src="/image/logo/hawassa.png">
          <!-- <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`"> -->
          <!-- <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`"> -->
        </router-link>
        <div class="logo-font" >
          A.A Silk Road
        </div>
         </div>
        
      
       
       
          <d2-header-user/>
       
      </div>
      <div class="drawer-container">
        
         <d2-menu-header :handleDrawer="handleDrawer" ></d2-menu-header>
      
      </div>
  <div>
   
  </div>
</el-drawer>
      <div class="d2-theme-container" >
        <div class="d2-theme-container-main" >
            <div v-if="!searchActive" class="d2-theme-container-main-layer" >
              <div class="d2-theme-container-main-body" >
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view :key="routerViewKey" />
                  </keep-alive>
                </transition>
              </div>
              
            </div>
          <!-- </transition> -->
        </div>
       
        
      </div>
      
      
    </div>
    <div class="footer-class">
                <customize-footer></customize-footer>
              </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { menuHeader, menuAside } from '@/menu'


import d2MenuHeader from './components/menu-header'
import customizeFooter from './components/footer'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderUser from './components/header-user'
export default {
  name: 'layout',
  data () {
    return {
      searchActive: false,
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      headerBarHeight: '',
      drawer: false,
      direction: 'ltl',

    }
  },

  components: {
    d2MenuHeader,
    d2HeaderFullscreen,
    d2HeaderUser,
    customizeFooter,
  },

  computed: {
    ...mapState('basicInfo', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      asideTransition: state => state.menu.asideTransition
    }),
    ...mapGetters('basicInfo', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    styleLayoutMainGroup () {
      // return this.themeActiveSetting.backgroundImage
      //   ? { backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')` }
      //   : {}
      // return { 'background-image': '/public/image/background/bg.jpg' }
    return { 'background-image': `url('/image/background/bg.jpg')` }
 
    },
    routerViewKey () {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
      return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
    },
  },

  mounted () {
    // console.log("menu " , menuHeader)
    this.$store.commit('basicInfo/menu/headerSet', menuHeader)
    this.headerBarHeight = this.$refs.headerBar.offsetHeight
  
  },

  methods: {
    handleDrawer(){
  this.drawer = false;
  
},
handleClose(done) {
     done();
 },
  }
}

</script>
<style lang="scss" >
.d2-layout-header-aside-group {
  // background-color: #fff;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center;
  min-height: 80vh;

 
}

.d2-layout-header-aside-content{
  min-height: 70vh;
}

.d2-theme-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: fixed;
 width: 100%;
 z-index: 1000;
 background-color: white;
 top: 0;
 @media  (max-width: 942px) {
  background-color: rgb(198,232,247);
  }
}

.logo-group {
  float: left;
  text-align: center;

  img {
    height: 50px;
    padding: 5px;
  }
}

.logo-transition {
  transition: width .3s;
}

.logo-font {
  min-width: 800px;
  text-transform: uppercase;
  // letter-spacing: .2em;
  // font-size: 22px;
  color: rgb(82,88,139) !important;
  font-weight: 800;
  line-height: 60px;
  height: 60px;
  @media  (max-width: 450px) {
    // font-size: 16px;
    margin-left: -10px;
    display: none;

  }
}


.d2-header-right {
 // float: right;
  height: 60px;
  display: flex;
  align-items: center;
  @media  (max-width: 700px) {
   display: none;

  }
  .btn-text {
    padding: 14px 12px;
    border-radius: 4px;
    margin: 0px !important;

    &.el-color-picker.el-color-picker--mini {
      padding: 9px 6px;
    }

  }

  // .el-dropdown {
  //   @extend %unable-select;
  // }
}

.d2-header-right {
  .btn-text {
    color: #ccc;

    &.can-hover {
      &:hover {
        color: #ccc;
        background: #ccc;
      }
    }
  }
}


.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  
  /* Add any additional styles you need */
}
.el-drawer__header{
  position: fixed;
  top: 5px;
  left: 68%;
  width: 30px;
  height: 60px;
}

.d2-theme-container {
  margin-top: 60px;
 
  .d2-theme-container-transition {
    transition: width .3s;
  }

  .d2-theme-container-main {
    padding: 0px;
    position: relative;
    
   
       &::-webkit-scrollbar {
    width: 10px; // Width of the scrollbar
  }

  
  &::-webkit-scrollbar-track {
      background-color: rgb(198,232,247) ; /* Background color of the scrollbar track */
      }

      &::-webkit-scrollbar-thumb {
      background-color: rgb(14,51,64) ; /* Color of the scrollbar thumb */
      border-radius: 4px; /* Border radius of the scrollbar thumb */
      }

      &::-webkit-scrollbar-thumb:hover {
      background-color: rgb(14,51,64) ; /* Color of the scrollbar thumb on hover */
      }

    

    .d2-theme-container-main-body {
      position: relative;
      width: 100%;
    
    }
   
  }
 

}
// 过渡动画 横向渐变
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all .5s;
}
.fade-transverse-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transverse-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.footer-class {
  background-color: darkgreen;
 
}
.bar {
    width: 500px;
     @media  (max-width: 450px) {
  width: 200px;

  }
}
.header-container{
  display: block;
  
  @media  (max-width: 942px) {
   display: none;

  }

}
.el-drawer{
  background-color: rgb(198,232,247)!important;
}
.menu-button{
  @media  (min-width: 942px) {
   display: none !important;
  }
}
.menu-button .el-button{
  background-color: transparent;
  border: none;
  font-size: 22px;
}
.menu-button .el-button:hover{

  font-size: 27px;
}

.menu-button .el-button:focus,
.menu-button .el-button:active {
  outline: none; /* Remove the default focus outline */
  background-color: transparent; /* Set the background color to the desired value */
}
$height: 100vh;
$offset: 85px;
$result: calc(#{$height} - #{$offset});
.drawer-container{
  
  width: 100%;
  height: $result;
  background-image: url('/public/image/background/bg.jpg');
  background-size: cover; /* or 'contain' */
  background-repeat: no-repeat;
  background-position: center center;
}
.el-menu.el-menu--horizontal{
  @media  (max-width: 942px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: transparent;
  }
}
.el-submenu__title  {
  @media  (max-width: 942px) {
  i{
    color: black;
    font-size: 20px;
    font-weight: 500;
   } 
   span{
    color: black;
    font-size: 20px;
    font-weight: 500;
   } 
  }
}
.el-menu-item{
  @media  (max-width: 942px) {
  i{
    color: black;
    font-size: 20px;
    font-weight: 500;
   } 
   span{
    color: black;
    font-size: 20px;
    font-weight: 500;
   } 
  }
}

</style>
