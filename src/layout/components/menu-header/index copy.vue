<!--  -->
<template>
  <div
      flex="cross:center"
      class="d2-theme-header-menu is-scrollable"
      ref="page">
      <div
        ref="content"
        class="d2-theme-header-menu__content"
        style="justify-content: center; align-items: center;"
        flex-box="1"
        flex>
        <div
          class="d2-theme-header-menu__scroll"
          flex-box="0"
          :style="{transform: `translateX(${this.currentTranslateX}px)` } "
          ref="scroll">
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
<style lang='scss' scoped>
</style>
