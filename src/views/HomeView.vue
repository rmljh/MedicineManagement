<template>
  <div class="homeView">
    <el-container>
      <el-header class="header"><pageHeader/></el-header>
      <el-container>
        <el-aside width="250px"><pageAside/></el-aside>
        <el-main :style="pageInfo.defaultStyle"><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import pageHeader from '@/components/HomeView/PageHeader.vue'
import pageAside  from '@/components/HomeView/PageAside.vue'
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
.header {
  background-color: #0e5889;
}
</style>