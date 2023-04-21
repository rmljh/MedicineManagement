<template>
  <div class="homeView">
    <el-container>
      <el-header><pageHeader/></el-header>
      <el-container>
        <el-aside width="250px">Aside</el-aside>
        <el-main :style="pageInfo.defaultStyle"><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import pageHeader from '@/components/HomeView/PageHeader.vue'
import { onBeforeMount, reactive } from 'vue';

const pageInfo = reactive({
  defaultStyle : {  // 使el-main铺满页面
    height: '',
  }
})

onBeforeMount(() => {
  pageInfo.defaultStyle.height = window.innerHeight - 70 + "px"
})

</script>

<style scoped>
</style>