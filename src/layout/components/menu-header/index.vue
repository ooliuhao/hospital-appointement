<!--  -->
<template>
  <div
      
      class="d2-theme-header-menu"
      >
      <div  class="d2-theme-header-menu__content" >
        <div
          class="d2-theme-header-menu__scroll"
          >
          <el-menu
            mode="horizontal"
            default-active = ''
            @select="handleMenuSelect"
            active-text-color="#41bb41">

          </el-menu>
        </div>
      </div>
      </div>
</template>

<script>
import { throttle } from 'lodash'
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { createMenu } from '../libs/util.menu'

export default {
  props:{
    handleDrawer: {
      type: Function,
      required: false
    },
  },
  name: 'd2-layout-header-aside-menu-header',
  data() {
    return {
      active: '',
      isScroll: false,
      scrollWidth: 0,
      contentWidth: 0,
      currentTranslateX: 0,
      throttledCheckScroll: null
    }
  },

  components: {},

  computed: {
    ...mapState('basicInfo/menu', [
      'header'
    ])
  },
  mounted() {
    // console.log('this.header: ', this.header)
    this.custCreateMenu()
  },

  methods: {
    handleMenuSelect(index, indexPath) {
      if (this.$route.path !== index) {
        this.$router.push({
          path: index
        })
      }
   
    },
    custCreateMenu() {
      this.header.map(menu => createMenu.call(this, h, menu))
    }
  }
}

</script>
<style lang='scss' >

.d2-theme-header-menu {

  @media  (max-width: 942px) {
    width: 100%;
    height: 100%;
    display: block;
    flex: none;
  }
}
.d2-theme-header-menu__content{
  
  
  @media  (max-width: 942px) {
    display: block;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    color: black;
  }
}

.d2-theme-header-menu__scroll{
  @media  (min-width: 942px) {
    width: 100%;
    height: 100%;
   
  }
}



</style>


