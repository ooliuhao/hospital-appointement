
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
  mixins: [
    menuMixin
  ],
  render (h) {
    return <div
      
      class='d2-theme-header-menu'
      >
      <div
       
        class="d2-theme-header-menu__content"
     
        >
        <div
          class="d2-theme-header-menu__scroll"
         
          style={ { transform: `translateX(${this.currentTranslateX}px)` } }
          ref="scroll">
          <el-menu
            mode="horizontal"
            defaultActive={ this.active }

            onSelect={ this.handleMenuSelect }
            active-text-color="#41bb41">
            { this.header.map(menu => createMenu.call(this, h, menu)) }
          </el-menu>
        </div>
      </div>
    
      
    </div>
  },
  computed: {
    ...mapState('basicInfo/menu', [
      'header'
    ])
  },
  data () {
    return {
      active: '',
     
    }
  },
  watch: {
    '$route.matched': {
      handler (val) {
      
        
        
        this.active = val[val.length - 1].path
       
      },
      immediate: true,
     
    }
  },
  methods: {
    
  },
  mounted () {
    
  },
 
}
