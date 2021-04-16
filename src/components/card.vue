<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="时间概览" :bordered="false" style="height:215px">
          <a-col :span="12">
      <a-statistic-countdown
        title="下一次促销倒计时"
        :value="deadline"
        style="margin-right: 50px"
        @finish="onFinish"
      />
    </a-col>
    <a-col :span="12">
      <a-statistic-countdown
        title="此次活动结束"
        :value="deadline"
        format="HH:mm:ss:SSS"
        style="margin-right: 50px"
      />
    </a-col>
    <a-col :span="24" >
      <a-statistic-countdown title="剩余推荐时长" :value="deadline" format="D 天 H 时 m 分 s 秒" />
    </a-col>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="店铺总览" :bordered="false" style="height:215px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-card>
                <a-statistic
                  title="访问率"
                  :value="11.28"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon type="arrow-up" />
                  </template>
                </a-statistic>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card>
                <a-statistic
                  title="成交率"
                  :value="9.3"
                  :precision="2"
                  suffix="%"
                  class="demo-class"
                  :value-style="{ color: '#cf1322' }"
                >
                  <template #prefix>
                    <a-icon type="arrow-down" />
                  </template>
                </a-statistic>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="商品总览" :bordered="false" style="height:215px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-statistic
                title="用户评价"
                :value="liking"
                style="margin-right: 50px"
              >
                <template #suffix>
                  <a-icon type="like" @click="handleLiking" />
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="12">
              <a-statistic title="剩余库存" :value="93" class="demo-class">
                <template #suffix>
                  <span> / 100</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      liking: 1123,
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
    };
  },
  methods: {
    handleLiking() {
      this.liking += 1;
    },
    onFinish() {
      console.log('finished!');
    },
  },
};
</script>
