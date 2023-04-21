<!-- 药物管理平台登录界面 -->
<template>
  <div>
    <div class="loginView">
      <!-- 登录 -->
      <div class="loginBox">
        <br>
        <br>
        <p class="loginTitle">药品全过程防伪溯源区块链应用管理系统</p>
        <br>
        <div class="loginForm">
          <el-input class="logininput" placeholder="用户名"     :prefix-icon="userIcon" v-model="pageInfo.username"/>
          <br>
          <br>
          <el-input class="logininput" placeholder="密&#8195码" :prefix-icon="pswdIcon" v-model="pageInfo.password"/>
        </div>
        <br>
        <br>
        <el-row><el-button  class="button1" type="primary" @click="loginHandle" style="display:block;margin:0 auto">登录</el-button></el-row>
        <br>
        <el-row><el-button  class="button2" type="primary" @click="pageInfo.signInFlag=true" style="display:block;margin:0 auto">注册</el-button></el-row>
      </div>
      <!-- 注册 -->
      <div class="signInBox">
        <el-dialog width="30%" v-model="pageInfo.signInFlag"  center :show-close="false"
          :modal='false' :close-delay="10" title="新用户注册"
        >
          <div class="signInForm">
              <el-select v-model="pageInfo.userRole" placeholder="用户类型" style="width: 100%">
                <template #prefix>
                  <el-icon><roleIcon /></el-icon>
                </template>
                <el-option v-for="item in pageInfo.roleOption" :key="item" :value="item"></el-option>
              </el-select>
              <el-input placeholder="用&#8194户&#8194名"      :prefix-icon="userIcon" v-model="pageInfo.registerUsername"/>
              <el-input placeholder="密&#8195&#8195码"  :prefix-icon="pswdIcon" v-model="pageInfo.registerPassword"/>
              <el-input placeholder="厂商代码"    :prefix-icon="creditIcon" v-model="pageInfo.registerCreditNumber"/>
          </div>
          <br>
          <br>
          <el-row><el-button class="button3" type="primary" @click="signInHandle" >确认</el-button></el-row>
          <el-row><el-button class="button4" type="primary" @click="cancelHandle">取消</el-button></el-row>
          <br>
          <br>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userIcon from '~icons/mingcute/user-1-line'
import pswdIcon from '~icons/mdi/lock-outline'
import creditIcon from '~icons/ph/user-list-light'
import roleIcon from '~icons/ph/user-focus-light'
import {reactive} from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import store from '@/store';

const router = useRouter();

const pageInfo = reactive({ // 用于存储页面所需上传或者需接收的信息变量
  username: '',
  password: '',
  signInFlag: false,
  registerUsername: '',
  registerPassword: '',
  registerCreditNumber: '',
  userRole: '',
  roleOption : ['生产商','经销商','管理员'],
})

const storeObj = reactive({
  username: '',
  userRole: '',
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
        storeObj.username = pageInfo.username;
        storeObj.userRole = pageInfo.userRole;
        store.commit('storeUserInfo', storeObj);
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
  .loginView {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(D:\Nodejs\MedicineManagement\src\assets\img\medical.jpg);
    background-size: 110%;
  } 
  .loginBox {
    position: absolute;
    background-color: aliceblue;
    border-radius: 25px;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 350px;
    margin: -190px 0 0 -175px;
    overflow: hidden;
  }
  .loginTitle {
    text-align: center;
    font-size: 20px;
    color: #0e5889;
    font-weight:bolder;
  }
  .button1 {
    width: 70%;
    background-color:#0e5889;
  }
  .button2 {
    /* width: 70%;
    background-color:rgb(180, 82, 78); */
  }
  .button3 {
    width: 20%;
    background-color:#0e5889;
    position: absolute;
    left: 10%;
    top: 70%;
  }
  .button4 {
    width: 20%;
    background-color:rgb(180, 82, 78);
    position: absolute;
    left: 60%;
    top: 70%;
  }
  .logininput {
    width:80%;
    position: relative;
    width: 300px;
    height: 35px;
    left: 50px;
    top: 0;
  }
  .signInBox{
    position: absolute;
    width:400px;
    height: 400px;
    border-radius: 25px;
    left: 50%;
    top: 50%;
  }
</style>