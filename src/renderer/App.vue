<template>
  <div id="app">
    <div id="loader">
      <div class="loader-spinner"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'social-life-vue',
    data: function () {
      $(window).on('load', function () {
        const loader = $('#loader')
        loader.delay(1000).fadeOut('slow')
      })

      return {}
    }
  }
</script>

<style>
  /* CSS */
</style>
