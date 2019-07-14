<template>
  <div class="re-body">
    <div class="re-block xl-yc">
      <p>应到人数:</p>
      <van-cell-group>
        <van-field v-model="ydPeople" placeholder=""/>
      </van-cell-group>
    </div>
    <div class="re-block xl-yc">
      <p>实到人数:</p>
      <van-cell-group>
        <van-field v-model="sdPeople" placeholder=""/>
      </van-cell-group>
    </div>
    <div class="re-block xl-yc">
      <p>缺席人数:</p>
      <van-cell-group>
        <van-field v-model="qxPeople" placeholder=""/>
      </van-cell-group>
    </div>

    <div class="record-block">
      <div class="b-head xlr-yc">
        <p class="b-title">备注</p>
      </div>
      <textarea class="record-content">
      {{remark}}
    </textarea>
    </div>

    <van-button :loading="load" loading-text="保存中" class="save">保存记录</van-button>
  </div>
</template>

<script>
  export default {
    name: "Record",
    data() {
      return {
        load: false,//按钮加载
        ydPeople: 35,//应到人数
        sdPeople: 35,//实到人数
        qxPeople: 35,//缺席人数
        remark: "12324234",//备注
      }
    }
  }
</script>

<style lang="scss" scoped>
  .re-body {
    padding: 20px 18px 60px;
    overflow-y: auto;
    width: 100%;

    .re-block {
      margin-bottom: 13px;

      p {
        color: #666666;
        font-size: 0.875rem;
        min-width: 75px;
      }

      van-cell-group {
        width: calc(100% - 81px);
        height: 33px;
        margin-left: 6px;

        .van-cell {
          padding: 0 7px;
          line-height: 33px;
          color: #666666;
          background: #F7F7F7;
        }
      }
    }

    .record-block {
      width: 100%;
      padding: 22px 0;
      height: auto;

      .b-head {
        width: calc(100% - 10px);
        height: 15px;
        padding-left: 7px;
        margin-bottom: 17px;
        border-left: 3px solid #333333;

        .b-title {
          color: #333333;
          font-size: 0.937rem;
          font-weight: bold;
        }

        .b-tt {
          color: #346AFF;
          font-size: 0.937rem;
          margin-left: 5px;
        }
      }

      .record-content {
        width: 100%;
        padding: 18px 24px;
        background: #F5F5F5;
        border-radius: 5px;
        min-height: 150px;
        font-size: 0.81rem;
      }
    }

    .save {
      width: 66%;
      height: 40px;
      line-height: 40px;
      margin-left: 17%;
      margin-top: 23px;
      background: #4B77B0;
      color: #ffffff;
      font-size: 0.937rem;
      border-radius: 2px;
    }
  }
</style>
