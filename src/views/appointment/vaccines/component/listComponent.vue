<!--  -->
<template>
  <div>
    <ul class="ul-class">
      <li v-for="(item, index) in dataList" :ref="index" :key="index" :class="itemClass" @click="handleSelect(item, index, isSelect)">
        <span style="margin-right: 4px">
          <i class="iconfont hospital-icondian" v-if="!item.icon"></i>
          <i :class="'iconfont ' + item.icon" v-if="item.icon"></i>
        </span>
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'listComponent',
  props: {
    dataList: Array,
    isSelect: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data () {
    return {
      itemClass: 'li-class',
    }
  },

  components: {},

  computed: {
  },

  mounted () {},

  methods: {
    handleSelect(item, index, isSelect) {
      if(isSelect) {
        this.$refs[index][0].classList = ['li-select-class']
        for (let key in this.$refs) {
          if (key != index) {
            this.$refs[key][0].classList = ['li-class']
          } else {
          }
        }
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.ul-class {
  list-style-type: none;
  padding-left: 0px;
  text-align: left;
}
.li-class {
  padding: 4px 6px;
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 50px;
  border: 1px solid #fff;
  background-color: #ffffff80;
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
  transition-property: width, background;
  transition-duration: .25s, 1s;
  word-wrap: break-word;
  white-space: normal;
  margin-top: 6px;
  &:hover {
    background-color: #b8ddbe80;
    cursor: pointer;
    color: green;
  }
}
.li-select-class {
  padding: 4px 6px;
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 50px;
  border: 1px solid #fff;
  background-color: #ffffff80;
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
  transition-property: width, background;
  transition-duration: .25s, 1s;
  word-wrap: break-word;
  white-space: normal;
  margin-top: 6px;
  background-color: #b8ddbe80;
  color: green;
}
</style>
