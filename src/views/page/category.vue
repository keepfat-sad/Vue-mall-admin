<template>
  <div class="wrapper">
    <div class="top">
      <a-button type="primary" ghost @click="showModal" class="topButton"
        >新增类目</a-button
      >
      <a-modal
        title="新增类目"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        cancelText="取消"
        okText="确定"
      >
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="类目">
            <a-input />
          </a-form-model-item>
          <a-form-model-item label="子类目">
            <a-input />
          </a-form-model-item>
          <a-form-model-item label="类目图片">
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <div class="card">
      <a-card hoverable style="width: 240px">
        <img slot="cover" alt="example" :src="drink" />
        <a-card-meta title="酒水冲调">
          <template slot="description">饮用水,咖啡,茶饮料,果汁,啤酒..</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
        <img slot="cover" alt="example" :src="fruit" />
        <a-card-meta title="时令水果">
          <template slot="description">苹果,草莓,菠萝,香蕉,樱桃,火..</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
        <img slot="cover" alt="example" :src="milk" />
        <a-card-meta title="安心乳品">
          <template slot="description">鲜牛奶,奶酪,酸奶,奶粉,益酸..</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
        <img slot="cover" alt="example" :src="food" />
        <a-card-meta title="休闲零食">
          <template slot="description">核桃,薯片,开心果,方便面,瓜..</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width: 240px">
        <img slot="cover" alt="example" :src="shucai" />
        <a-card-meta title="新鲜蔬菜">
          <template slot="description">白菜,青菜,豆芽,黄瓜,番茄..</template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>
<script>
import drink from '@/assets/drink.jpg';
import fruit from '@/assets/fruit.jpg';
import milk from '@/assets/milk.jpg';
import food from '@/assets/food.jpg';
import shucai from '@/assets/shucai.jpg';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const key = 'updatable';
export default {
  data() {
    return {
      drink,
      fruit,
      milk,
      food,
      shucai,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading: false,
      imageUrl: '',
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      this.$message.loading({ content: '保存中...', key });
      setTimeout(() => {
        this.$message.success({ content: '保存成功!', key, duration: 2 });
        this.visible = false;
        this.confirmLoading = false;
      }, 1000);
    },
    handleCancel() {
      this.visible = false;
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>

<style scoped>
img {
  height: 320px;
}
.card {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  flex: 1;
  flex-wrap: wrap;
}
.wrapper {
  position: relative;
}
.topButton {
  margin-left: 40px;
  margin-top: 20px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
