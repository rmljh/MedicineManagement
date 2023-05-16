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
                <el-table :data="r.medicineTable" border style="width: 100%;" @cell-mouse-enter="getCurrentRow">
                    <el-table-column label="药品名称" prop="medicineName" min-width="20%" />
                    <el-table-column label="药品公司" prop="medicineCompany" min-width="20%" />
                    <el-table-column label="批准文号" prop="medicineLicenceNumber" min-width="20%" />
                    <el-table-column label="包装企业" prop="packingFirm" min-width="20%" />
                    <el-table-column label="出售价格" prop="salePrice" min-width="10%" />
                    <el-table-column label="操作" min-width="22%">
                        <template v-slot="scope">
                            <el-row>
                                <el-col :span="8">
                                    <ConfirmButton v-if="scope.row.medicine_id != ''" @click="admitHandle" />
                                </el-col>
                                <el-col :span="8">
                                    <DenyButton v-if="scope.row.medicine_id != ''" @click="denyHandle" />
                                </el-col>
                                <el-col :span="8">
                                    <DetailButton v-if="scope.row.medicine_id != ''" @click="detailHandle" />
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
        <el-dialog width="20%" v-model="deleteDialog.deleteDiaFlag" title="是否拒绝?" :close-delay="10" :modal='false' center
            :show-close="false">
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="4" />
                        <el-col :span="6">
                            <ConfirmButton @click="deleteDialogConfirmHandle" />
                        </el-col>
                        <el-col :span="4"></el-col>
                        <el-col :span="6">
                            <DenyButton @click="deleteDialogDenyHandle" />
                        </el-col>
                        <el-col :span="4" />
                    </el-row>
                </el-main>
            </el-container>
        </el-dialog>
    </div>
    <!-- 药品细节弹窗 -->
    <div class="detailBox">
        <el-dialog width="50%" title="药品上链详情" v-model="detailDialog.detailDiaFlag" :modal='false' center :show-close="false">
            <el-container>
                <el-main>
                    <div class="container">
                        <div class="formBox">
                            <el-form :model="detailDialog.detailForm">
                                <el-form-item label="药品名称">
                                    <el-input v-model="detailDialog.detailForm.medicineName" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="批准文号">
                                    <el-input v-model="detailDialog.detailForm.medicineLicenceNumber" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="原料">
                                    <el-input v-model="detailDialog.detailForm.material" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="规格">
                                    <el-input v-model="detailDialog.detailForm.specification" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="生产时间">
                                    <el-input v-model="detailDialog.detailForm.productionDate" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="过期时间">
                                    <el-input v-model="detailDialog.detailForm.expiredDate" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="生产批次号">
                                    <el-input v-model="detailDialog.detailForm.batch" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="药品公司">
                                    <el-input v-model="detailDialog.detailForm.medicineCompany" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="批次药品数量">
                                    <el-input v-model="detailDialog.detailForm.batchNumber" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="出售价格">
                                    <el-input v-model="detailDialog.detailForm.salePrice" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="包装企业">
                                    <el-input v-model="detailDialog.detailForm.packingFirm" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="发货地址">
                                    <el-input v-model="detailDialog.detailForm.selloutAddress" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="生产数量">
                                    <el-input v-model="detailDialog.detailForm.remainingQuantity" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="运输公司">
                                    <el-input v-model="detailDialog.detailForm.transporter" disabled></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-col :span="11"></el-col>
                                    <el-col :span="3">
                                        <el-button type='primary' @click="detailDialogBackHandle">返回</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import DetailButton from '../Button/DetailButton.vue';
import ConfirmButton from '../Button/ConfirmButton.vue';
import DenyButton from '../Button/DenyButton.vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import store from '@/store';
var r = reactive({
    medicineTable: [
        {
            medicineId: "1",
            medicineName: "11",
            medicineCompany: "",
            medicineLicenceNumber: "",
            specification: "",
            material: "",
            batch: "",
            productionAddress: "",
            producerId: "",
            batchNumber: "",
            salePrice: "",
            packingFirm: "",
            selloutAddress: "",
            receiver_address: "",
            responsiblePerson: "",
            remark: "",
            approval: "",
            remainingQuantity: "",
            productionDate: "",
            expiredDate: "",
            transporter: "",
        },
        {
            medicineId: "2",
            medicineName: "22",
            medicineCompany: "",
            medicineLicenceNumber: "",
            specification: "",
            material: "",
            batch: "",
            productionAddress: "",
            producerId: "",
            batchNumber: "",
            salePrice: "",
            packingFirm: "",
            selloutAddress: "",
            receiver_address: "",
            responsiblePerson: "",
            remark: "",
            approval: "",
            remainingQuantity: "",
            productionDate: "",
            expiredDate: "",
            transporter: "",
        },
    ],
    currentMedicineId: "",
    currentMedicineRemark: "",
})

const deleteDialog = reactive({
    deleteDiaFlag: false,
})

const detailDialog = reactive({
    detailDiaFlag: false,
    detailForm: {
        medicineId: "1",
        medicineName: "123",
        medicineCompany: "",
        medicineLicenceNumber: "",
        specification: "",
        material: "",
        batch: "",
        productionAddress: "",
        producerId: "",
        batchNumber: "",
        salePrice: "",
        packingFirm: "",
        selloutAddress: "",
        receiver_address: "",
        responsiblePerson: "",
        remark: "",
        approval: "",
        remainingQuantity: "",
        productionDate: "",
        expiredDate: "",
        transporter: "",
    }
})

onBeforeMount(() => {
    getTableStatistics()
})

function checkApproval() {
    console.log("medicineID:",r.currentMedicineId)
    axios.post("http://175.178.68.139:8888/admin/cochain?medicineId="+r.currentMedicineId+"&action="+r.currentMedicineRemark+"&adminAccount="+"FDA")
}

function getTableStatistics() {
    axios.get('http://175.178.68.139:8888/admin/getApplications')
        .then(function (res) {
            console.log("获取待审批药品列表",res.data.msg)
            r.medicineTable = res.data.data
        })
}

function getCurrentRow(currentRow) {
    r.currentMedicineId = currentRow.medicineId
    r.currentMedicineRemark = currentRow.remark
    console.log("currentrow:", r.currentMedicineId)
}

function deleteDialogConfirmHandle() {
    ElMessage({
        message: '删除成功',
        type: 'success'
    })
    r.currentMedicineRemark = "0"
    deleteDialog.deleteDiaFlag = false;
    checkApproval()
    getTableStatistics()
}

function deleteDialogDenyHandle() {
    deleteDialog.deleteDiaFlag = false;
}

function denyHandle() {
    deleteDialog.deleteDiaFlag = true
}

function detailDialogBackHandle(){
    detailDialog.detailDiaFlag = false
}

function admitHandle() {
    r.currentMedicineRemark = "1"
    ElMessage({
        message: '药品上链成功',
        type: 'success'
    })
    checkApproval()
    getTableStatistics()
}

function detailHandle() {
    detailDialog.detailDiaFlag = true
    for(var i=0;i<r.medicineTable.length;++i){
        if(r.currentMedicineId == r.medicineTable[i].medicineId){
            detailDialog.detailForm = r.medicineTable[i]
        }
    }
}
</script>