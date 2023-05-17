<!-- 用户注册申请表 -->
<template>
    <div>
        <el-container>
            <el-header style="background-color: white; height: 10%;">
                <el-row>
                    <el-col :span="10"></el-col>
                    <el-col :span="4">用户注册表</el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="r.userTable" border style="width: 100%" @cell-mouse-enter="getCurrentRow">
                    <el-table-column label="用户名" prop="userName"/>
                    <el-table-column label="账号" prop="userAccount"/>
                    <el-table-column label="厂商名称" prop="companyName"/>
                    <el-table-column label="用户类型" prop="userType"/>
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-row>   
                                <el-col :span="12">
                                    <ConfirmButton v-if="scope.row.userId != ''" @click="confirmHandle"/>
                                </el-col>
                                <el-col :span="12">
                                    <DenyButton v-if="scope.row.userId != ''" @click="denyHandle"/>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>

    <div class="denyBox">
        <el-dialog width="20%" v-model="denyDialog.denyDiaFlag" title="是否拒绝?" :close-delay="10" :modal='false' center
            :show-close="false">
            <el-container>
                <el-main>
                    <el-row>
                        <el-col :span="4" />
                        <el-col :span="6">
                            <ConfirmButton @click="denyDialogConfirmHandle" />
                        </el-col>
                        <el-col :span="4"></el-col>
                        <el-col :span="6">
                            <DenyButton @click="denyDialogDenyHandle" />
                        </el-col>
                        <el-col :span="4" />
                    </el-row>
                </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import {onBeforeMount, reactive} from 'vue';
import ConfirmButton from '../Button/ConfirmButton.vue';
import DenyButton from '../Button/DenyButton.vue';

var r = reactive({
    userTable: [
        {
            userId: '1',
            userAccount: '1',
            companyName: '',
            companyId: '123',
            userName: '1',
            userEmail: '',
            userPhone: '',
            userType: '1',
            password: '',
            creditNumber: '',
            legalPerson: '',
            licenceNumber: '',
            address: '',
            userStatus: '',
        },
    ],
    currentUserId:'',
    currentUserAccount:'',
    currentUserStatus:'',
})

const denyDialog = reactive({
    denyDiaFlag: false,
})

onBeforeMount(()=>{
    getRegisterTable()
})

function getRegisterTable(){
    axios.get('http://175.178.68.139:8888/admin/getRegistrations')
        .then(function(res){
            console.log("接收申请注册表单",res.data.msg)
            r.userTable = res.data.data
        })
}

function approveUser(){
    axios.post("http://175.178.68.139:8888/admin/processRegistration?account="+r.currentUserAccount+"&action="+r.currentUserStatus)
}

function getCurrentRow(currentRow){
    r.currentUserAccount = currentRow.userAccount
    r.currentUserId = currentRow.userId
    console.log(r.currentUserAccount)
}

function confirmHandle(){
    r.currentUserStatus = '1'
    ElMessage({
        message: '用户已批准',
        type: 'success'
    })
    console.log("account",r.currentUserAccount)
    console.log("action",r.currentUserStatus)
    approveUser()
    getRegisterTable()
}

function denyHandle(){
    denyDialog.denyDiaFlag = true
}

function denyDialogConfirmHandle(){
    denyDialog.denyDiaFlag = false
    ElMessage({
        message: '用户已拒绝注册',
        type: 'warning'
    })
    r.currentUserStatus = '0'
    approveUser()
    getRegisterTable()
}

function denyDialogDenyHandle(){
    denyDialog.denyDiaFlag = false
}
</script>
<style scoped>
</style>
