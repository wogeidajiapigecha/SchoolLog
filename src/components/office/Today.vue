<template>
  <div style="overflow-y: auto; padding-bottom: 60px;">
    <div class="top"></div>

    <div class="notice xl-yc">
      <img class="nt-img" src="../../assets/img/notice.png"/>
      <div class="nt-p">
        <span>{{t}}好！{{name}}（高中部），今天是{{d}}！</span>
      </div>
    </div>

    <div class="today-block today-block-1">
      <div class="b-head xlr-yc">
        <p class="b-title">今日教师出勤</p>
        <router-link tag="div" :to="{ path: '/office/record' }">
          <div class="xl-yc">
            <van-icon name="add-o" color="#346AFF"/>
            <p class="b-tt">记录</p>
          </div>
        </router-link>
      </div>
      <van-row>
        <van-col span="8" class="tri-block tri-1">
          <p>25</p>
          <p>应到人数</p>
        </van-col>
        <van-col span="8" class="tri-block tri-2">
          <p>25</p>
          <p>实到人数</p>
        </van-col>
        <van-col span="8" class="tri-block tri-3">
          <p>25</p>
          <p>缺到人数</p>
        </van-col>
      </van-row>
    </div>

    <div class="today-block">
      <div class="b-head xlr-yc">
        <p class="b-title">备注</p>
      </div>
      <div class="today-content">
        <div class="xl-yc">
          <img class="cir-b" src="../../assets/img/cir-b.png"/>
          <p class="time">2019.06.29</p>
        </div>
        <p class="describe">国庆将放假七天，请老师做好学生放假安排工作。国庆将放假七天，请老师做好学生放假安排工作。 国庆将放假七天，请老师做好学生放假安排工作。
          国庆将放假七天，请老师做好学生放假安排工作。 </p>
      </div>
    </div>

    <div class="today-block">
      <div class="b-head xlr-yc">
        <p class="b-title">重要活动</p>
      </div>
      <div class="today-content">
        <div class="xl-yc">
          <img class="cir-b" src="../../assets/img/cir-o.png"/>
          <p class="time">2019.06.29</p>
        </div>
        <p class="describe">制定下学期新生家长会学生处年级协调委员会 </p>
      </div>
    </div>

    <div class="today-block today-block-1">
      <div class="b-head xlr-yc">
        <p class="b-title">今日教师记录情况</p>
        <router-link tag="div" :to="{ path: '/office/remind' }">
          <div class="xl-yc">
            <van-icon name="add-o" color="#346AFF"/>
            <p class="b-tt">提醒</p>
          </div>
        </router-link>
      </div>
      <van-row>
        <van-col span="8" class="tri-block tri-1">
          <p>25</p>
          <p>总班级</p>
        </van-col>
        <van-col span="8" class="tri-block tri-2">
          <p>25</p>
          <p>已完成</p>
        </van-col>
        <van-col span="8" class="tri-block tri-3">
          <p>25</p>
          <p>未完成</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "today",
    data() {
      return {
        t: "",//时间
        name: "黄奕韵",//姓名
        d: "",//时间
      }
    },
    mounted() {
      this.getD();
    },
    methods: {
      getD: function () {
        let now = new Date();
        let a = now.getHours();
        if (a > 10 && a < 13) {
          this.t = "中午"
        } else if (a > 12 && a < 19) {
          this.t = "下午"
        } else if (a > 5 && a < 11) {
          this.t = "上午"
        } else {
          this.t = "晚上"
        }
        let y = now.getFullYear();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        let dd = now.getDay(); //获取当前星期X(0-6,0代表星期天)
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        this.d = y + "年" + m + "月" + d + "日 " + weekday[dd]
      },

    }
  }
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    height: 220px;
    background-image: url(../../assets/img/headbg.png);
    background-size: 100% 100%;
  }

  .notice {
    position: absolute;
    width: calc(100% - 20px);
    /*height: 40px;*/
    padding: 15px 22px;
    left: 10px;
    top: 186px;
    background-color: #ffffff;
    box-shadow: 0 3px 7px #D2D2D2;
    border-radius: 2px;

    .nt-img {
      width: 13px;
      height: 10px;
    }

    .nt-p {
      width: calc(100% - 18px);
      margin-left: 5px;
      color: #666666;
      overflow: hidden;

      span {
        white-space: nowrap;
        animation: move 15s linear infinite;
      }
    }
  }

  .today-block {
    width: 100%;
    padding: 22px 18px 0 18px;
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

    .tri-block {
      height: 125px;
      text-align: center;

      p:nth-child(1) {
        font-size: 2.65rem;
        line-height: 5.6rem;
        color: #ffffff;
      }

      p:nth-child(2) {
        font-size: 0.875rem;
        color: #FFFEFE;
      }
    }

    .tri-1 {
      background-image: url(../../assets/img/tri-1.png);
      background-size: 100% 100%;
    }

    .tri-2 {
      background-image: url(../../assets/img/tri-2.png);
      background-size: 100% 100%;
    }

    .tri-3 {
      background-image: url(../../assets/img/tri-3.png);
      background-size: 100% 100%;
    }

    .today-content {
      width: 100%;
      padding: 18px 24px;
      background: #F5F5F5;
      border-radius: 5px;

      .cir-b {
        width: 8px;
        height: 8px;
      }

      .time {
        width: calc(100% - 18px);
        font-size: 0.68rem;
        color: #808080;
        margin-left: 10px;
      }

      .describe {
        width: calc(100% - 18px);
        margin-left: 18px;
        margin-top: 13px;
        font-size: 0.81rem;
        color: #333333;
      }
    }
  }

  .today-block-1 {
    margin-top: 14px;
  }

  @keyframes move {
    0% {
      margin-left: 100%;
    }
    100% {
      margin-left: -100%;
    }
  }
</style>
