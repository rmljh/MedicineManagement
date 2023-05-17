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
        <el-table :data="pageInfo.AdminTable" border style="width: 100%;" @cell-mouse-enter="getCurrentRow">
          <el-table-column prop="medicineName" label="药品名称"></el-table-column>
          <el-table-column prop="productionDate" label="生产时间"></el-table-column>
          <el-table-column prop="material" label="原料"></el-table-column>
          <el-table-column prop="batch" label="生产批次号"></el-table-column>
          <el-table-column prop="medicineLicenceNumber" label="批准文号"></el-table-column>
          <el-table-column prop="medicineCompany" label="生产厂家"></el-table-column>
          <el-table-column prop="packingFirm" label="包装企业"></el-table-column>
          <el-table-column prop="sellPrice" label="销售价格"></el-table-column>
          <el-table-column min-width="100%" label="操作">
            <template v-slot="scope">
              <el-row>
                <el-col :span="12">
                  <DetailButton v-if="medicineId != ''" @click="detailHandle" />
                </el-col>
                <el-col :span="12">
                  <BuyButton />
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="溯源二维码">
            <el-button type="success" round @click="QRcodeApplyHandle">申请</el-button>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <!-- 药品详情信息弹窗 -->
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
                <el-form-item label="生产地址">
                  <el-input v-model="detailDialog.detailForm.productionAddress" disabled></el-input>
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
                <el-form-item label="剩余数量">
                  <el-input v-model="detailDialog.detailForm.remainingQuantity" disabled></el-input>
                </el-form-item>
                <el-form-item label="运输公司">
                  <el-input v-model="detailDialog.detailForm.transporter" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input v-model="detailDialog.detailForm.responsiblePerson" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="detailDialog.detailForm.remark" disabled></el-input>
                </el-form-item>
                <el-form-item>
                  <el-col :span="9"></el-col>
                  <el-col :span="4">
                    <el-button type="danger">冻结</el-button>
                  </el-col>
                  <el-col :span="4">
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
  <!-- 二维码展示 -->
  <div id="QRcode" class="QRcodeBox">
    <el-image :src=pageInfo.currentQRcodeSrc />
  </div>
  <!-- 购买弹窗 -->
  <div class="buyBox">
    <el-dialog width="50%" title="药品上链详情" v-model="buyDialog.buyDialogFlag" :modal='false' center :show-close="false">
      <el-container>
        <el-main>
          <div class="container">
            <div class="formBox">
              <el-form :model="buyDialog.buyForm">
                <el-form-item label="经销商名称">
                  <el-input v-model="buyDialog.buyForm.FranchiserName" ></el-input>
                </el-form-item>
                <el-form-item label="营业执照">
                  <el-input v-model="buyDialog.buyForm.MedicineId" ></el-input>
                </el-form-item>
                <el-form-item label="法人姓名">
                  <el-input v-model="buyDialog.buyForm.MedicineId" ></el-input>
                </el-form-item>
                <el-form-item label="药品类型">
                  <el-input v-model="buyDialog.buyForm.MedicineType" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-col :span="9"></el-col>
                  <el-col :span="4">
                    <el-button type="danger">冻结</el-button>
                  </el-col>
                  <el-col :span="4">
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


<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import DetailButton from '../Button/DetailButton.vue';
import BuyButton from '../Button/BuyButton.vue';
import axios from 'axios';
const pageInfo = reactive({
  AdminTable: [
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
    }
  ],
  currentMedicineId: "",
  currentQRcodeSrc: '',
  currentMedicineBatch: "",
  nowTime:'',
})

const buyDialog = reactive({
  buyDialogFlag: false,
  buyForm:{
    Id: "123",
    MedicineId: "",
    FranchiserName: "",
    BusinessCertificate: "",
    FranchiserLegalPerson: "",
    MedicineType: "",
    MedicineBatch: "",
    MedicineAmount: "",
    MedicinePrice: "",
    FromAddress: "",
    DeliveryTime: "",
    ReceiptAddress: "",
    ReceiptTime: "",
    PersonLiableName: "",
    PersonLiableEmail: "",
    PersonLiableTel: "",
    Remark: "",
    Time: "",
  }
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
  getMedicineTable()
})

function getCurrentRow(currentRow) {
  pageInfo.currentMedicineId = currentRow.medicineId
  pageInfo.currentMedicineBatch = currentRow.batch
}

function getMedicineTable() {
  axios.get('http://175.178.68.139:8888/admin/getAllMedicines')
    .then(function (res) {
      console.log("表单结果", res.data.msg)
      pageInfo.AdminTable = res.data.data
    })
}

function detailHandle() {
  detailDialog.detailDiaFlag = true
  for (var i = 0; i < pageInfo.AdminTable.length; ++i) {
    if (pageInfo.AdminTable[i].medicineId == pageInfo.currentMedicineId) {
      detailDialog.detailForm = pageInfo.AdminTable[i]
    }
  }
}

function QRcodeApplyHandle() {
  console.log("QRcode")
  axios.get('http://175.178.68.139:8888/getQRCode?medicineId=' + pageInfo.currentMedicineId, { responseType: 'blob' })
    .then(function (res) {
      const url = URL.createObjectURL(res.data)
      pageInfo.currentQRcodeSrc = url
    })
}

function detailDialogBackHandle() {
  detailDialog.detailDiaFlag = false
}
</script>