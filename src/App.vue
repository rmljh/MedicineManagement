<template>
  <!-- <scale-box :width="1920" :height="1080"> -->
    <div id = "app">
      <router-view></router-view>
    </div>
  <!-- </scale-box> -->
</template>

<script lang="ts" setup>
  import ScaleBox from 'scale-box'
  import 'scale-box/dist/style.css'
</script>
