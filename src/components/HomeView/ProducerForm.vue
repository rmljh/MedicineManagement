<!-- 药品上链表单 -->
<template>
  <div class="ProducerForm">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 生产商</el-breadcrumb-item>
        <el-breadcrumb-item>生产信息上链</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="formBox">
        <el-form :model="formData" >
          <el-form-item label="药品名称">
            <el-input v-model="formData.medicineName"></el-input>
          </el-form-item>
          <el-form-item label="生产编号">
              <el-input v-model="formData.medicineNumber"></el-input>
          </el-form-item>
          <el-form-item label="配料">
              <el-input v-model="formData.ingredient"></el-input>
          </el-form-item>
          <el-form-item label="包装规格">
              <el-input v-model="formData.packageSize"></el-input>
          </el-form-item>
          <el-form-item label="生产时间">
              <el-col :span="11">
                  <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="formData.produceTime"
                      value-format="YYYY-MM-DD"
                      style="width: 100%;"
                  ></el-date-picker>
              </el-col>
          </el-form-item>
          <el-form-item label="有效期至">
              <el-col :span="11">
                  <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="formData.validityTime"
                      value-format="YYYY-MM-DD"
                      style="width: 100%;"
                  ></el-date-picker>
              </el-col>
          </el-form-item>
          <el-form-item label="生产批次号">
              <el-input v-model="formData.produceNumber"></el-input>
          </el-form-item>
          <el-form-item label="批准文号">
              <el-input v-model="formData.approvalNumber"></el-input>
          </el-form-item>
          <el-form-item label="生产厂商姓名">
              <el-input v-model="formData.producerName"></el-input>
          </el-form-item>
          <el-form-item label="生产地址">
              <el-input v-model="formData.producerAddress"></el-input>
          </el-form-item>
          <el-form-item label="生产商电话">
              <el-input v-model="formData.producerTel"></el-input>
          </el-form-item>
          <el-form-item label="备注">
              <el-input v-model="formData.producerRemark"></el-input>
          </el-form-item>
          <el-form-item label="生产数量">
              <el-input v-model="formData.producerCount"></el-input>
          </el-form-item>
          <el-form-item label="运输公司">
              <el-input v-model="formData.transName"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitHandle" >确认上链</el-button>
              <el-button type='warning'>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const formData = reactive({
  medicineName: '',
  medicineNumber: '',
  ingredient: '',
  packageSize: '',
  produceTime: '',
  validityTime: '',
  produceNumber: '',
  approvalNumber: '',
  producerName: '',
  producerAddress: '',
  producerTel: '',
  producerRemark: '',
  producerCount: '',
  transName: '',
})

function submitHandle() {
  console.log(formData.produceTime.substring(0,10))
  axios.post("http://175.178.68.139:8888/producer/produce", 
    { medicineName: formData.medicineName, batch: formData.medicineNumber, medicineCompany:formData.producerName, 
      medicineLicenceNumber: formData.approvalNumber, specification: formData.packageSize, material: formData.ingredient,
      productionAddress: formData.producerAddress, batchNum: formData.producerCount, selloutAddress: formData.transName,
      responsiblePerson: formData.producerTel, productionDate: formData.produceTime.substring(0,10), expireDate: formData.validityTime.substring(0,19), 
      producerId: formData.producerName, remark: formData.producerRemark})
    .then(function(response) {
      console.log(response.data)
      if (response.data.code == '200') {
        ElMessage({
          message: '上链成功',
          type:    'success'
        }) 
      } else {
        ElMessage({
          message: '上链失败',
          type : 'error'
        })
      }
    })
}
</script>

<style>
.formBox {

}
</style>