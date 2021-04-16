<template>
  <div class="form">
    <a-form :form="form" @submit="handleSubmit" class="forgetForm">
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱',
                },
                {
                  required: true,
                  message: '请输入邮箱！',
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
                  message: '请输入密码！',
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="验证码">
        <a-input
          v-decorator="[
            'code',
            {
              rules: [
                {
                  required: true,
                  message: '请输入正确的验证码！',
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" class="submitFrom">
        <a-button type="primary" html-type="submit"> 提交 </a-button>
        <a-button type="primary" style="margin-left: 10px" @click="login">
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
          api.findBack(values);
          alert('修改成功请登录');
          this.$router.push({
            name: 'Login',
          });
        }
      });
    },
    login() {
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
<style lang="less">
    @import url('~@/assets/css/forget.less');
</style>
