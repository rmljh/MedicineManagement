<template>
  <div class="pageAside">
    <el-menu
      :collapse = "store.state.collapseFlag"
      router = "true"
    >
      <el-menu-item class="asideItem" index="/home">
        <el-icon><homeIcon/></el-icon>
        <template #title><span>主页</span></template>
      </el-menu-item>
      <!-- <el-menu-item class="asideItem" index="2">
        <el-icon><medicineSearchIcon/></el-icon>
        <template #title><span>查询药品</span></template>
      </el-menu-item> -->
      <el-menu-item class="asideItem" index="/medicinesearch">
        <el-icon><medicineManegeIcon/></el-icon>
        <template #title><span>防伪溯源药品信息查询</span></template>
      </el-menu-item>
      <!-- <el-menu-item class="asideItem" index="4">
        <el-icon><saleIcon/></el-icon>
        <template #title><span>销售信息上链</span></template>
      </el-menu-item> -->
      <el-menu-item class="asideItem" index="/medicinemanage">
        <el-icon><homeIcon/></el-icon>
        <template #title><span>药品上链申请表</span></template>
      </el-menu-item>
      <el-menu-item class="asideItem" index="/medicineup">
        <el-icon><medicineIcon/></el-icon>
        <template #title><span>药品上链</span></template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import homeIcon from '~icons/ic/round-home'
import medicineSearchIcon from '~icons/game-icons/medicines'
import medicineManegeIcon from '~icons/covid/virus-lab-research-medicine-pill'
import saleIcon from '~icons/foundation/burst-sale'
import medicineIcon from '~icons/game-icons/medicine-pills'

import { reactive, onBeforeMount } from 'vue'
import store from '@/store'

const pageInfo = reactive({
 
})

onBeforeMount(() => {

})

</script>