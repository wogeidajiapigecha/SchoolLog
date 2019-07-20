<template>
  <div class="rem-body">
    <van-tabs type="card">
      <van-tab title="已完成">
        <div class="line xlr-yc" v-for="(item,index) in className" :key=index>
          <p class="line-name">{{item.name}}</p>
          <div class="xr-yc">
            <router-link tag="p"  class="line-read mr" :to="{ path: '/school/detail' }">
              查看
            </router-link>
            <p class="line-read">生成pdf</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="未完成">
        <div class="xr-yc warn-together">
          <img src="../../assets/img/warn.png" class="warning"/>
          批量提醒
        </div>
        <van-checkbox-group v-model="result">
          <van-checkbox
            v-for="(item, index) in list"
            :key="item"
            :name="item"
          >
            {{ item }}
          </van-checkbox>
        </van-checkbox-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "Remind",
    data() {
      return {
        className: [
          {name: "幼儿园"},
          {name: "小学部"},
          {name: "中学部"},
        ],
        list: ['幼儿园', '小学部', '中学部'],
        result: [],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rem-body {
    padding: 30px 18px 60px;
    overflow-y: auto;
    width: 100%;
    .line {
      height: 24px;
      margin: 0 0 20px 0;
      .line-name {
        color: #666666;
        font-size: 0.875rem;
      }
      .line-read {
        color: #4B77B0;
        font-size: 0.875rem;
        cursor: pointer;
      }
      .mr {
        margin-right: 10px;
      }
    }

    .warn-together {
      color: #FF4A53;
      font-size: 0.875rem;
      margin-bottom: 10px;
      .warning {
        width: 11px;
        margin-right: 5px;
        color: #FF4A53;
      }
    }

  }
</style>
