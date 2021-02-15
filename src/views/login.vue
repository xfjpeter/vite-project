<template>
  <el-form class="login-container" :model="loginForm" :rules="loginRules" ref="loginRef">
    <h3 class="login-title">登陆111</h3>
    <el-form-item prop="username" label="账号">
      <el-input placeholder="请输入账号" v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="remember" label="记住我">
      <el-checkbox v-model="loginForm.remember"></el-checkbox>
    </el-form-item>
    <el-button type="primary" style="width: 100%" @click="login">登陆</el-button>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Message, ElLoading } from 'element3'
import request from '@/utils/api'

const store = useStore()
const router = useRouter()

// dom
const loginRef = ref(null)

// 登陆字段
const loginForm = reactive({
  username: '',
  paddword: '',
  remember: false
})

// 验证条件
const loginRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能唯恐', trigger: 'blur' }]
}

// 加载框
function loading() {
  return ElLoading.service({
    text: '登陆中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

// 登陆事件
function login() {
  loginRef.value.validate((valid) => {
    let service = loading()
    if (valid) {
      store.dispatch('login').then(() => {
        service.close()
        router.replace('/home')
      })
    } else {
      Message.error('请输入所有必填字段')
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .login-title {
    margin: 0 auto 40px 0;
    text-align: center;
  }
}
</style>
