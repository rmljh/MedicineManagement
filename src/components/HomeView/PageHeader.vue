<!-- 系统页面头部 -->
<template>
  <div class="pageHeader">
    <div class="leftBox">
      <!-- 折叠按钮 -->
      <div class="collapseButton" @click="collapseHandle">
        <i v-if="!pageInfo.collapseFlag"><el-icon><Expand /></el-icon></i>
        <i v-else><el-icon><Fold /></el-icon></i>
      </div>

      <div class="systemName">药品全过程防伪溯源区块链应用管理系统</div>
    </div>
    <div class="rightBox">
      <!-- 全屏按钮 -->
      <div class="headRight">
      <div class="fullScreenButton" @click="fullScreenHandle">
        <el-tooltip effect="dark" :content="pageInfo.fullScreenFlag?`取消全屏`:`&#8195全屏&#8195`" placement="bottom">
          <i v-if="!pageInfo.fullScreenFlag"><fullScreenIcon/></i>
          <i v-else><fullScreenExitIcon/></i>
        </el-tooltip>
      </div>
      <!-- 用户头像 -->
      <div class="userAvator">
        <el-avatar :size="50" :src="userAvatorUrl" />
      </div>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="userName" trigger="click" @command="drodownHandle">
        <span>{{ pageInfo.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="exitHandle">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue'
import fullScreenIcon from '~icons/gridicons/fullscreen'
import fullScreenExitIcon from '~icons/gridicons/fullscreen-exit'
import userAvatorUrl from '@/assets/img/img.jpg'
import store from '@/store'

const pageInfo = reactive({
  collapseFlag: false,
  fullScreenFlag: false,
  username: 'test',
})

const storeObj = reactive({
  collapseFlag: false,
  fullScreenFlag: false,
})

onBeforeMount(() => {
  pageInfo.username = store.state.username
})

function collapseHandle() {
  pageInfo.collapseFlag = !pageInfo.collapseFlag;
  storeObj.collapseFlag =  pageInfo.collapseFlag;
  store.commit('storeHeaderFlag', storeObj);
}

function fullScreenHandle() {
  pageInfo.fullScreenFlag = !pageInfo.fullScreenFlag;
  storeObj.fullScreenFlag =  pageInfo.fullScreenFlag;
  store.commit('storeHeaderFlag', storeObj);
}

</script>

<style scoped>
.pageHeader {
  position: absolute;
  width: 100%;
  height: 70px;
  color: white;
  background-color: #0e5889;
}

 .collapseButton {
  float: left;
  padding: 0 20px;
  line-height: 70px;
  font-size: 24px;
  margin-top: 3px;
}

.systemName {
  float: left;
  width: auto;
  line-height: 70px;
  font-size: 22px;
  background-color: #0e5889;
}

.rightBox {
  float: right;
  padding-right: 150px;
}

.headRight {
  display: flex;
  height: 70px;
  align-items: center;
}

.fullScreenButton {
  font-size: 24px;
}

.userAvator {
  margin-left: 20px;
}

.userName {
  margin-left: 10px;
  color:aliceblue
}
</style>