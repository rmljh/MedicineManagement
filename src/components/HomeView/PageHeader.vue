<!-- 系统页面头部 -->
<template>
  <div class="pageHeader">
    <!-- 折叠按钮 -->
    <div class="collapseButton" @click="collapseHandle">
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const pageInfo = reactive({
  collapseFlag: false
})

</script>