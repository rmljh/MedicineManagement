<!-- 药物管理平台登录界面 -->
<template>
  <div>
    <div class="loginView">
      <!-- 登录 -->
      <div class="loginBox">
        <p class="loginTitle">药品全过程防伪溯源区块链应用管理系统</p>
        <div class="loginForm">
          <el-input placeholder="用户名"     :prefix-icon="userIcon" v-model="pageInfo.username"/>
          <el-input placeholder="密&#8195码" :prefix-icon="pswdIcon" v-model="pageInfo.password"/>
        </div>
        <el-row class="loginButton"><el-button type="primary" @click="loginHandle" >登录</el-button></el-row>
        <el-row class="loginButton"><el-button @click="pageInfo.signInFlag=true">注册</el-button></el-row>
      </div>
      <!-- 注册 -->
      <div class="signInBox">
        <el-dialog width="30%" v-model="pageInfo.signInFlag"  center :show-close="false"
          :modal='false' :close-delay="10" title="新用户注册"
        >
          <div class="signInForm">
              <el-select v-model="pageInfo.userRole" placeholder="用户类型" style="width: 100%">
                <el-option v-for="item in pageInfo.roleOption" :key="item" :value="item"></el-option>
              </el-select>
              <el-input placeholder="用户名"     :prefix-icon="userIcon" v-model="pageInfo.registerUsername"/>
              <el-input placeholder="密&#8195码" :prefix-icon="pswdIcon" v-model="pageInfo.registerPassword"/>
          </div>
          <el-row class="signInButton"><el-button type="primary" @click="signInHandle" >确认</el-button></el-row>
          <el-row class="signInButton"><el-button @click="cancelHandle">取消</el-button></el-row>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userIcon from '~icons/mingcute/user-1-line'
import pswdIcon from '~icons/mdi/lock-outline'
import {reactive} from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

const pageInfo = reactive({ // 用于存储页面所需上传或者需接收的信息变量
  username: '',
  password: '',
  signInFlag: false,
  registerUsername: '',
  registerPassword: '',
  userRole: '',
  roleOption : ['生产商','经销商','管理员'],
})

function loginHandle() {
  // 向服务器发送登录请求，判断是否能成功登录
  axios.post('/login', {username: pageInfo.username, password: pageInfo.password })
    .then(function(response) {
      console.log(response.data);
      if (response.data.code != 200) {
        ElMessage({
          message: '用户名或密码错误!',
          type: 'error'
        })
      } else {
        ElMessage({
          message: '登录成功',
          type: 'success' 
        })
        // store.commit
        router.push({ path: '/home'})
      }
    })
}

function signInHandle() {
  // 向服务器发送注册请求，判断是否能成功注册
  axios.post('/register')
}

function cancelHandle() {
  // 取消注册，清空注册信息
  pageInfo.signInFlag = false;
  pageInfo.userRole = '';
  pageInfo.registerUsername = '';
  pageInfo.registerPassword = '';
}
</script>

<style scoped>
  /* .loginView {
    position: absolute;
    width: 100%;
    height: 100%;
  } */
  .loginBox {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    margin: -190px 0 0 -175px;
    overflow: hidden;
  }
  .loginTitle {
    text-align: center;
    font-size: 20px;
  }
  .el-button {
    width: 100%;
  }
</style>