<template>
  <div class="re-body">
    <div class="re-block xl-yc">
      <p>学部:</p>
      <van-cell-group>
        <van-field v-model="ydPeople" placeholder=""/>
      </van-cell-group>
    </div>
    <div class="re-block xl-yc">
      <p>时间:</p>
      <van-cell-group>
        <van-field v-model="sdPeople" placeholder=""/>
      </van-cell-group>
    </div>

    <div style="margin-top: 24px;">
      <div class="b-head xlr-yc">
        <p class="b-title">学生基本情况</p>
      </div>

      <div class="re-block xl-yc">
        <p>班级数量:</p>
        <van-cell-group>
          <van-field v-model="ydPeople" placeholder=""/>
        </van-cell-group>
      </div>
      <div class="re-block xl-yc">
        <p>学生总数:</p>
        <van-cell-group>
          <van-field v-model="sdPeople" placeholder=""/>
        </van-cell-group>
      </div>
      <div class="re-block xl-yc">
        <p>实到人数:</p>
        <van-cell-group>
          <van-field v-model="sdPeople" placeholder=""/>
        </van-cell-group>
      </div>

      <van-collapse v-model="activeName" accordion class="collapse">
        <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
        <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
        <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
      </van-collapse>
    </div>

    <div style="margin-top: 24px;">
      <div class="b-head xlr-yc">
        <p class="b-title">教师基本情况</p>
      </div>
      <div class="table">
        <table>
          <tr>
            <th>类型</th>
            <th>应到人数</th>
            <th>实到人数</th>
          </tr>
          <tr>
            <td>一线教师</td>
            <td>55人</td>
            <td>55人</td>
          </tr>
          <tr>
            <td>干部</td>
            <td>55人</td>
            <td>55人</td>
          </tr>
          <tr>
            <td>合计</td>
            <td>55人</td>
            <td>55人</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="record-block">
      <div class="b-head xlr-yc">
        <p class="b-title">备注</p>
      </div>
      <textarea class="record-content">
      {{remark}}
    </textarea>
    </div>

    <div class="xc-yc">
      <router-link tag="div" class="back-router" :to="{ path: '/school/remind' }">
        <van-button :loading="load" loading-text="返回中" class="back">返回</van-button>
      </router-link>
      <van-button :loading="load2" loading-text="生成中" class="save">生成pdf</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        load: false,//按钮加载
        load2: false,//按钮加载
        ydPeople: 35,//应到人数
        sdPeople: 35,//实到人数
        qxPeople: 35,//缺席人数
        remark: "12324234",//备注
        activeName: '1',
      }
    }
  }
</script>

<style lang="scss" scoped>
  .re-body {
    padding: 20px 18px 60px;
    overflow-y: auto;
    width: 100%;

    .b-head {
      width: calc(100% - 10px);
      height: 15px;
      padding-left: 7px;
      margin-bottom: 20px;
      border-left: 3px solid #333333;

      .b-title {
        color: #333333;
        font-size: 0.937rem;
        font-weight: bold;
      }
    }

    .table table {
      border: 1px solid #D9D9D9;
      width: 100%;
      th, td {
        padding: 14px 0;
        text-align: center;
        color: #333333;
        font-size: 0.875rem;
      }
      th {
        background-color: #E6E6E6;
        border: 0px;
      }
      td {
        border-bottom: 1px solid #D9D9D9;
      }
    }

    .re-block {
      margin-bottom: 13px;
      p {
        color: #666666;
        font-size: 0.875rem;
        min-width: 75px;
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

    .back-router {
      width: 34%;
      .back {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-top: 23px;
        background: #ffffff;
        border: 1px solid #4B77B0;
        color: #4B77B0;
        font-size: 0.937rem;
        border-radius: 2px;
      }
    }


    .save {
      width: 34%;
      height: 40px;
      line-height: 40px;
      margin-left: 33px;
      margin-top: 23px;
      background: #4B77B0;
      color: #ffffff;
      font-size: 0.937rem;
      border-radius: 2px;
    }
  }
</style>
