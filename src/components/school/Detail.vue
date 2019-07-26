<template>
  <div class="re-body">
    <div class="re-block xl-yc">
      <p>学部:</p>
      <van-cell-group>
        <van-field v-model="divisionName" placeholder=""/>
      </van-cell-group>
    </div>
    <div class="re-block xl-yc">
      <p>时间:</p>
      <van-cell-group>
        <van-field v-model="time" placeholder=""/>
      </van-cell-group>
    </div>

    <div style="margin-top: 24px;">
      <div class="b-head xlr-yc">
        <p class="b-title">学生基本情况</p>
      </div>

      <div class="re-block xl-yc">
        <p>班级数量:</p>
        <van-cell-group>
          <van-field v-model="classNum" placeholder=""/>
        </van-cell-group>
      </div>
      <div class="re-block xl-yc">
        <p>学生总数:</p>
        <van-cell-group>
          <van-field v-model="stuNum_total" placeholder=""/>
        </van-cell-group>
      </div>
      <div class="re-block xl-yc">
        <p>实到人数:</p>
        <van-cell-group>
          <van-field v-model="stuNum_actual" placeholder=""/>
        </van-cell-group>
      </div>

      <van-collapse v-model="activeName" accordion class="collapse">
        <van-collapse-item :title="item.grade+' '+item.class" :name="item.id" v-for="(item,index) in classList" :key="item.id">
          <p>应到人数:{{item.stu_num}}</p>
          <p>实到人数:{{item.num_actual?item.num_actual:'暂未填写'}}</p>
          <p class="describe">备注：{{item.remark?item.remark:"暂无"}} </p>
        </van-collapse-item>
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
            <td>{{tec_yx_should}}人</td>
            <td>{{tec_yx_actual}}人</td>
          </tr>
          <tr>
            <td>国际教师</td>
            <td>{{tec_gj_should}}人</td>
            <td>{{tec_gj_actual}}人</td>
          </tr>
          <tr>
            <td>合计</td>
            <td>{{tec_yx_should/1+tec_gj_should/1}}人</td>
            <td>{{tec_yx_actual/1+tec_gj_actual/1}}人</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="record-block">
      <div class="b-head xlr-yc">
        <p class="b-title">备注</p>
      </div>
      <textarea class="record-content" v-model="remark">
    </textarea>
    </div>

    <div class="xc-yc">
      <router-link tag="div" class="back-router" :to="{ path: '/school/remind',query:{date:time} }">
        <van-button :loading="load" loading-text="返回中" class="back">返回</van-button>
      </router-link>
      <van-button :loading="load2" loading-text="生成中" class="save">生成pdf</van-button>
    </div>
  </div>
</template>

<script>
  import officeApi from '@/components/office/office.js'

  export default {
    name: "Detail",
    data() {
      return {
        load: false,//按钮加载
        load2: false,//按钮加载
        divisionName: "",
        time: "",
        classNum: "",
        stuNum_total: 0,
        stuNum_actual: 0,
        tec_yx_should: "",
        tec_gj_should: "",
        tec_yx_actual: "",
        tec_gj_actual: "",
        remark: "",//备注
        classList: [],
        activeName: '1',
      }
    },
    mounted() {
      this.getRes()
    },
    methods: {
      getRes() {
        let item = this.$route.query;
        officeApi.getClassList(item.division_id, item.reco_date.split("T")[0], '2019').then(res => {
          this.divisionName = item.division
          this.time = item.reco_date.split("T")[0]
          this.remark = item.remark
          this.tec_yx_should = item.num_should_yx
          this.tec_gj_should = item.num_should_gj
          this.tec_yx_actual = item.num_actual_yx
          this.tec_gj_actual = item.num_actual_gj
          this.classNum = res.length
          this.classList = res
          for (let i = 0; i < res.length; i++) {
            this.stuNum_total += res[i]["stu_num"]
          }
          for (let j = 0; j < res.length; j++) {
            if (!res[j]["num_actual"]) {
              this.stuNum_actual = "未统计完毕"
              break
            } else {
              this.stuNum_actual += res[j]["num_actual"]
            }
          }
        })
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
