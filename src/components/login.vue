<template>
  <div class="loginWrapper">
    <div class="hd">
      <h2>Link2Data</h2>
      <p></p>
    </div>
    <div class="bd">
      <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
        <el-form-item prop="userName">
          <el-input type="userName" v-model="loginForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submitBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>

import { doLogin } from '../lib/vueHelper'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        userName: '',
        pwd: ''
      },
      loginRule: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },

        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },

        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            'username': this.loginForm.userName,
            'password': this.loginForm.pwd
          }
          doLogin(this, data)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-size: 18px;
}
.loginWrapper .hd {
  width: 300px;
}
.loginWrapper .hd h2 {
    font-weight: 400;
    color: #006e93;
}
.loginWrapper .hd p {
  font-size: 15px;
  color: #1f2f3d;
}
.loginWrapper .bd {
    width: 300px;
}
.loginWrapper .bd .submitBtn {
  width: 100%;
  background: #006e93;
}
.loginWrapper .bd .el-form-item:last-child {
  margin-bottom: 10px;
}
.loginWrapper .ft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
}
.loginWrapper .ft a {
  font-size: 14px;
  text-decoration: none;
  color: #20A0FF;
}
</style>