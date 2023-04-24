<!-- 药品上链申请表 -->
<template>
    <div>
        <el-container>
            <el-header style="background-color: white;">
                <el-row>
                    <el-col :span="10"></el-col>
                    <el-col :span="4">药品上链申请表</el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="r.medicineTable" border style="width: 100%;">
                    <el-table-column label="药品名称" prop="medicine_name" min-width="20%"/>
                    <el-table-column label="药品公司" prop="medicine_company" min-width="20%"/>
                    <el-table-column label="批准文号" prop="medicine_licence_number" min-width="20%"/>
                    <el-table-column label="包装企业" prop="packing_confirm" min-width="20%"/>
                    <el-table-column label="出售价格" prop="sale_price" min-width="10%"/>
                    <el-table-column label="操作" min-width="22%">
                        <template v-slot="scope">
                            <el-row>
                                <el-col :span="8" >
                                    <ConfirmButton v-if="scope.row.medicine_id != ''" />
                                </el-col>
                                <el-col :span="8" >
                                    <DenyButton v-if="scope.row.medicine_id != ''" @click="denyHandle"/>
                                </el-col>
                                <el-col :span="8" >
                                    <DetailButton v-if="scope.row.medicine_id != ''" />
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
    <!-- 删除确认弹窗 -->
    <div class="deleteBox">
        <el-dialog width="20%" v-model="deleteDialog.deleteDiaFlag" title="是否删除?" :close-delay="10" :modal='false' center :show-close="false">
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="4" />
                        <el-col :span="6"><ConfirmButton @click="deleteDialogConfirmHandle"/></el-col>
                        <el-col :span="4"></el-col>
                        <el-col :span="6"><DenyButton @click="deleteDialogDenyHandle"/></el-col>
                        <el-col :span="4" />
                    </el-row>
                </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import DetailButton from '../Button/DetailButton.vue';
import ConfirmButton from '../Button/ConfirmButton.vue';
import DenyButton from '../Button/DenyButton.vue';
import { ElMessage } from 'element-plus';
var r = reactive({
    medicineTable: [
        {
            medicine_id: "1",
            medicine_name: "",
            medicine_company: "",
            medicine_licence_number: "",
            specification: "",
            material: "",
            batch: "",
            production_address: "",
            producer_id: "",
            batch_number: "",
            sale_price: "",
            packing_firm: "",
            gmp: "",
            sellout_address: "",
            receiver_address: "",
            responsible_person: "",
            remark: "",
            approval: "",
            is_on_blockchain: "",
            remaining_quantity: "",
            production_date: "",
            expired_date: "",
        },
    ]
})

const deleteDialog = reactive({
    deleteDiaFlag: false,

})

function deleteDialogConfirmHandle() {
    ElMessage({
        message: '删除成功',
        type: 'success'
    })
    deleteDialog.deleteDiaFlag = false;
}

function deleteDialogDenyHandle() {
    deleteDialog.deleteDiaFlag = false;
}

function denyHandle() {
    deleteDialog.deleteDiaFlag = true
}
</script>