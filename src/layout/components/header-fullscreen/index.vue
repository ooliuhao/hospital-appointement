<template>
  <el-tooltip effect="dark" :content="active ? 'Exit' : 'Full Screen'" placement="bottom">
    <el-button class="d2-mr btn-text can-hover fullscreen-class" type="text" @click="toggle">
      <i v-if="active" class="iconfont hospital-iconquxiaoquanping"></i>
      <i v-else class="iconfont hospital-iconquanping" style="font-size: 16px"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('basicInfo/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('basicInfo/fullscreen', [
      'toggle'
    ])
  }
}
</script>

<style lang="scss" scoped>
.fullscreen-class {
  &:hover {
    background-color: #eee !important;
    color: #000 !important;
  }
}
</style>