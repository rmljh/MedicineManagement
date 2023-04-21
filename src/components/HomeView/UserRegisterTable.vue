<template>
    <div>
        <el-container>
            <el-header style="background-color: white;">
                <el-row>
                    <el-col :span="10"></el-col>
                    <el-col :span="4">用户注册表</el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="r.userTable" border style="width: 1000px" >
                    <el-table-column label="用户名" prop="username"/>
                    <el-table-column label="账号" prop="userAccount"/>
                    <el-table-column label="厂商代码" prop="companyId"/>
                    <el-table-column label="用户类型" prop="userRole"/>
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-row>
                                <el-col :span="12">
                                    <ConfirmButton v-if="scope.row.userId != ''" />
                                </el-col>
                                <el-col :span="12">
                                    <DenyButton v-if="scope.row.userId != ''" />
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import ConfirmButton from '../Button/ConfirmButton.vue';
import DenyButton from '../Button/DenyButton.vue';

var r = reactive({
    userTable: [
        {
            companyId: '123',
            username: '1',
            userId: '1',
            userAccount: '1',
            userRole: '1',
        },
    ]
})
</script>
<style scoped>
</style>
