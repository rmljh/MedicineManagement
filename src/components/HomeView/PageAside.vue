<template>
  <div class="pageAside">
    <el-menu
      :collapse = "store.state.collapseFlag"
    >
      <el-menu-item class="asideItem" index="1">
        <el-icon><homeIcon/></el-icon>
        <template #title><span>主页</span></template>
      </el-menu-item>
      <el-menu-item class="asideItem" index="2">
        <el-icon><medicineSearchIcon/></el-icon>
        <template #title><span>查询药品</span></template>
      </el-menu-item>
      <el-menu-item class="asideItem" index="3">
        <el-icon><medicineManegeIcon/></el-icon>
        <template #title><span>药品区块链管理</span></template>
      </el-menu-item>
      <el-menu-item class="asideItem" index="4">
        <el-icon><saleIcon/></el-icon>
        <template #title><span>销售信息上链</span></template>
      </el-menu-item>
      <el-menu-item class="asideItem" index="5">
        <el-icon><homeIcon/></el-icon>
        <template #title><span>药品信息上链管理</span></template>
      </el-menu-item>
      <el-menu-item class="asideItem" index="6">
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