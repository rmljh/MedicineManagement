<!-- 药品溯源表 -->
<template>
    <div>
        <el-container>
            <el-header style="background-color: white; height: 10%;">
                <el-row>
                    <el-col :span="10"></el-col>
                    <el-col :span="4">药品溯源表</el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="r.medicineTraceTable" border style="width: 100%;">
                    <el-table-column label="药品名称" prop="medicineName" min-width="20%"/>
                    <el-table-column label="生产商" prop="producerCompany" min-width="18%"/>
                    <el-table-column label="经销商" prop="sellerCompany" min-width="18%"/>
                    <el-table-column label="发货地" prop="source" min-width="12%"/>
                    <el-table-column label="目的地" prop="destination" min-width="12%"/>
                    <el-table-column label="运输公司" prop="transport" min-width="12%"/>
                    <el-table-column label="销售数量" prop="total" min-width="8%"/>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue'

var r = reactive({
    medicineTraceTable: [
        {
            medicineId: "",
            medicineName: "1",
            source: "",
            destination: "",
            producerCompany: "",
            sellerCompany: "",
            transport: "",
            total: "",
        },
    ]
})
</script>