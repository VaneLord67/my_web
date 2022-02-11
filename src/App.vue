<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Bilibili from './components/Bilibili.vue'
import Elec from './components/Elec.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    Bilibili,
    Elec,
  }
}
</script>

<style>

</style>
