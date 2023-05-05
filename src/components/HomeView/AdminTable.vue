<!-- 防伪溯源药品信息查询表 -->
<template>
  <div class="AdminTableBox">
    <el-container>
      <el-header style="background-color: white">
        <el-row>
          <el-col :span="10"></el-col>
          <el-col :span="4">防伪溯源药品信息查询</el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="pageInfo.AdminTable" border style="width: 100%;">
          <el-table-column prop="medicineName" label="药品名称"></el-table-column>
          <el-table-column prop="medicineProduceTime" label="生产时间"></el-table-column>
          <el-table-column prop="ingredient" label="原料"></el-table-column>
          <el-table-column prop="packageSize" label="包装规格"></el-table-column>
          <el-table-column prop="validityTime" label="有效期"></el-table-column>
          <el-table-column prop="produceNum" label="生产批次号"></el-table-column>
          <el-table-column prop="approvalNumber" label="批准文号"></el-table-column>
          <el-table-column prop="producer" label="生产厂家"></el-table-column>
          <el-table-column prop="sellerId" label="经销商"></el-table-column>
          <el-table-column prop="sellPrice" label="销售价格"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-row>
                <el-col :span="12">
                  <DetailButton v-if="medicineId != ''" />
                </el-col>
                <el-col :span="12">
                  <BuyButton />
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import DetailButton from '../Button/DetailButton.vue';
import BuyButton from '../Button/BuyButton.vue';
const pageInfo = reactive({
  AdminTable: [
    {
      medicineId: '1'
    }
  ],
})
</script>