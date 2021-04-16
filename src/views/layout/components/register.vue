<template>
  <div class="register">
    <a-form :form="form" @submit="handleSubmit" class="registerForm">
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确邮箱账号',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请确认密码',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="验证码" has-feedback>
        <a-input
          v-decorator="[
            'code',
            {
              rules: [
                {
                  required: true,
                  message: '请输入验证码!',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" class="getCode">
        <a-button type="primary" @click="getVerificationCode">
          获取验证码
        </a-button>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          用户名字&nbsp;
          <a-tooltip title="给自己取个名">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: true,
                  message: '请填写你的用户名字',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="用户角色">
        <a-radio-group v-decorator="['role']">
          <a-radio-button value="customer"> customer </a-radio-button>
          <a-radio-button value="admin"> admin </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          我已阅读
          <a href="/login"> 用户手册 </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" class="submitFrom">
        <a-button type="primary" html-type="submit"> 提交 </a-button>
        <a-button
          type="primary"
          style="margin-left: 10px"
          @click="login"
        >
          返回登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
      verificationCode: '',
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          api.register(values).then((res) => {
            if (res.data.state !== 'fail') {
              alert('注册成功');
              this.$router.push({
                name: 'Login',
              });
            }
          });
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const { value } = e.target;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const { form } = this;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const { form } = this;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(
          (domain) => `${value}${domain}`,
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    getVerificationCode() {
      const verification = {
        email: `${this.form.getFieldValue('email')}`,
      };
      this.verificationCode = api.getCode(verification);
    },
    login() {
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
<style lang="less" scope>
@import url("~@/assets/css/register.less");
</style>
