<!-- 药物管理平台登录界面 -->
<template>
  <div>
    <div class="loginView">
      <!-- 登录 -->
      <div class="loginBox">
        <p class="loginTitle">药品全过程防伪溯源区块链应用管理系统</p>
        <div class="loginForm">
          <el-input class="logininput" placeholder="用户名"     :prefix-icon="userIcon" v-model="pageInfo.username"/>
          <el-input class="logininput" placeholder="密&#8195码" :prefix-icon="pswdIcon" v-model="pageInfo.password" type="password"/>
        </div>
        <el-row><el-button  class="button1" type="primary" @click="loginHandle" style="display:block;margin:0 auto">登录</el-button></el-row>
        <el-row><el-button  class="button2" type="primary" @click="pageInfo.signInFlag=true" style="display:block;margin:0 auto">注册</el-button></el-row>
      </div>
      <!-- 注册 -->
      <div class="signinBox">
        <el-dialog width="30%" v-model="pageInfo.signInFlag"  center :show-close="false"
          :modal='false' :close-delay="10" title="新用户注册"
        >
          <!-- <div class="signInForm"> -->
            <div class="innerBox">
              <el-select   class="registerinput" v-model="pageInfo.registerUserRole" placeholder="用户类型" style="width: 100%">
                <template #prefix>
                  <el-icon><roleIcon /></el-icon>
                </template>
                <el-option v-for="item in pageInfo.roleOption" :key="item" :value="item"></el-option>
              </el-select>
              <el-input class="registerinput" placeholder="用&#8194户&#8194名"      :prefix-icon="userIcon" v-model="pageInfo.registerUsername"/>
              <el-input class="registerinput" placeholder="密&#8195&#8195码"  :prefix-icon="pswdIcon" v-model="pageInfo.registerPassword" type="password"/>
              <el-input class="registerinput" placeholder="厂商代码"    :prefix-icon="creditIcon" v-model="pageInfo.registerCreditNumber"/>
          <!-- </div> -->
          <el-row><el-button class="button3" type="primary" @click="signInHandle" >确认</el-button></el-row>
          <el-row><el-button class="button4" type="primary" @click="cancelHandle">取消</el-button></el-row>
                 </div>
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
  userAccount: '',
  username: '',
  password: '',
  signInFlag: false,
  registerUsername: '',
  registerPassword: '',
  registerCreditNumber: '',
  registerUserRole: '',
  registerUserRole1: '',
  userRole: '',
  roleOption : ['生产商','经销商'],
})

const storeObj = reactive({
  usreAccount: '',
  username: '',
  userRole: '',
})

function loginHandle() {
  // 向服务器发送登录请求，判断是否能成功登录
  axios.get("http://175.178.68.139:8888/login?"+"username="+pageInfo.username+"&password="+pageInfo.password)
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
        storeObj.usreAccount = pageInfo.userAccount;
        storeObj.username = pageInfo.username;
        storeObj.userRole = pageInfo.userRole;
        store.commit('storeUserInfo', storeObj);
        router.push({ path: '/home'})
      }
    })
}

function signInHandle() {
  // 向服务器发送注册请求，判断是否能成功注册
  if (pageInfo.registerUserRole == "生产商") pageInfo.registerUserRole1 = "1"
  if (pageInfo.registerUserRole == "经销商") pageInfo.registerUserRole1 = "2"
  axios.post("http://175.178.68.139:8888/register?" + "userType=" + pageInfo.registerUserRole1+"&password="+pageInfo.registerPassword+"&account="+pageInfo.registerUsername)
    .then(function(response) {
      console.log(response.data);
      if (response.data.code != 200) {
        if(response.data.msg == 'account existed') {
          ElMessage({
          message: '注册失败！该用户名已存在',
          type: 'error'
          })
        } else {
          ElMessage({
            message: '注册失败！',
            type: 'error'
          })
        }
      } else {
        ElMessage({
          message: '注册成功！',
          type: 'success'
        })
        pageInfo.signInFlag = false
      }
    })
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
    background-image: url("src/assets/img/medical.jpg");
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
    font-size: 19px;
    color: #0e5889;
    font-weight:bolder;
    margin:25px ;
  }
  .button1 {
    width: 70%;
    background-color:#0e5889;
    position: absolute;
    left: 17%;
    top: 15px;
  }
  .button2 {
    width: 70%;
    background-color:rgb(180, 82, 78);
    position: absolute;
    left: 17%;
    top: 65px;
  }
  .button3 {
    width: 20%;
    background-color:#0e5889;
    position: absolute;
    left: 15%;
    top:15px;
  }
  .button4 {
    width: 20%;
    background-color:rgb(180, 82, 78);
    position: absolute;
    left: 65%;
    top:15px;
  }
  .logininput {
    width:80%;
    position: relative;
    width: 300px;
    height: 35px;
    left: 50px;
    top: 0;
    margin:12px ;
  }


  .innerBox {
    width: 98%;
    height: 200px;
  }

  .registerinput{
    margin:4px ;
  }
  </style>