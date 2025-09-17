<!--  -->
<template>
  <div class="custfooter">
    <div class="container">
      <div class="custfooter-content">
        <p>&copy; 2023 Silk Road Hospital. All rights reserved.</p>
        <p>Powered by Inspur Group</p>
        <nav class="custfooter-links">
          <a href="#/">Home</a>
          <!-- <a href="#">About</a> -->
          <a href="#/appointment/examinations">Appointment</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custfooter',
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.custfooter {
  background-color: #0e3340;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.custfooter-content {
  color: #c8c8c8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  margin-bottom: 10px;
}

.custfooter-links {
  display: flex;
}

.custfooter-links a {
  color: #c8c8c8;;
  text-decoration: none;
  margin-right: 10px;
}

.custfooter-links a:hover {
  color: #a81d1d;
}
</style>
