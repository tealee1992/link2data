<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',

    data() {
      return {
      }
    },
    created () {
      this.$router.push('/')
    },
    computed: {

    },
    methods: {

    },
  }
</script>

<style type="text/css">
  
</style>