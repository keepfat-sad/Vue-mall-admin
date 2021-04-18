<template>
  <div class="login">
    <div class="top">
      <transition name="word">
      <p>生鲜商品管理页</p>
      </transition>
    </div>
     <div class="form">
        <a-form-model class="login-form"
                ref="loginForm" :model="loginForm"
                :rules="rules" v-bind="layout">
       <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input v-model="loginForm.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="register"> 注册 </a-button>
        <a-button
          type="primary"
          style="background-color: #EE6363;margin:5px"
          @click="forgetWord"
        >
          找回密码
        </a-button>
      <a-button  @click="resetForm('loginForm')">
        重置
      </a-button>
      <a-button
        type="primary"
        @click="submitForm('loginForm')"
        style="marginLeft:80px;marginTop:30px">
        登录
      </a-button>
    </a-form-model-item>
        </a-form-model>
     </div>
     <div class="title">
       <div class="left">
         生鲜商品商家管理
       </div>
       <div class="right">
         @keepfat享有最终解释权
       </div>
     </div>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm).then((res) => {
            console.log(res);
            this.$store.dispatch('setUserInfo', res);
            this.$router.push({
              name: 'Home',
            });
          }).catch((error) => {
            this.$message.error(error);
          });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push({
        name: 'Register',
      });
    },
    forgetWord() {
      this.$router.push({
        name: 'Forget',
      });
    },
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/login.less');
</style>
