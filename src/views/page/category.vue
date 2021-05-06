<template>
  <div class="wrapper">
    <div class="top">
      <a-button type="primary" ghost @click="showModal">新增类目</a-button>
      <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    ></a-modal>
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
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      this.visible = false;
      this.confirmLoading = false;
    },
    handleCancel() {
      this.visible = false;
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
  margin-top: 70px;
  flex: 1;
  flex-wrap: wrap;
}
.wrapper{
  position: relative;
}
</style>
