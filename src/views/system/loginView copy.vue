<!--  -->
<template>
  <div>
    <a href="#/home">login view</a>
    <button @click="hancleClickGoToAbout">go to about</button>
    <button @click="hancleClickGoToRoot">go to /</button>
  </div>
</template>

<script>
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'


export default {
  name: 'loginView',
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    hancleClickGoToAbout() {
      this.$router.replace('/about')
    },
    hancleClickGoToRoot() {
      this.$store.commit('basicInfo/menu/headerSet', menuHeader)
      this.$router.replace('/')
    },
  }
}

</script>
<style scoped>
</style>
