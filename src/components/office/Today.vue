<template>
  <div style="overflow-y: auto; padding-bottom: 60px;">
    <div class="top"></div>

    <div class="notice xl-yc">
      <img class="nt-img" src="../../assets/img/notice.png"/>
      <div class="nt-p">
        <span v-show="cookie=='cn'">{{t}}好！{{name}}（{{division}}），今天是{{d}}！</span>
        <span v-show="cookie=='en'">Good {{t}}!{{name}}({{division}}),today is {{d}}!</span>
      </div>
    </div>

    <div class="today-block today-block-1">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('todayTeacherAttendance')}}</p>
        <router-link tag="div" :to="{ path: '/office/record' }">
          <div class="xl-yc">
            <van-icon name="add-o" color="#346AFF"/>
            <p class="b-tt">{{$t('record')}}</p>
          </div>
        </router-link>
      </div>
      <van-row>
        <van-col span="8" class="tri-block tri-1">
          <p>{{num_should}}</p>
          <p>{{$t('expected')}}</p>
        </van-col>
        <van-col span="8" class="tri-block tri-2">
          <p>{{num_actual}}</p>
          <p>{{$t('actual')}}</p>
        </van-col>
        <van-col span="8" class="tri-block tri-3">
          <p>{{num_miss}}</p>
          <p>{{$t('missing')}}</p>
        </van-col>
      </van-row>
    </div>

    <div class="today-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('remark')}}</p>
      </div>
      <div class="today-content">
        <div class="xl-yc">
          <img class="cir-b" src="../../assets/img/cir-b.png"/>
          <p class="time">{{today}}</p>
        </div>
        <p class="describe">{{remark}} </p>
      </div>
    </div>

    <div class="today-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('importantActivity')}}</p>
      </div>
      <div class="today-content">
        <div class="xl-yc">
          <img class="cir-b" src="../../assets/img/cir-o.png"/>
          <p class="time">{{today}}</p>
        </div>
        <p class="describe">{{event}} </p>
      </div>
    </div>

    <div class="today-block today-block-1">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t("todayTeacherRecorded")}}</p>
        <router-link tag="div" :to="{ path: '/office/remind',query:{date:today} }">
          <div class="xl-yc">
            <van-icon name="add-o" color="#346AFF"/>
            <p class="b-tt">{{$t('remind')}}</p>
          </div>
        </router-link>
      </div>
      <van-row>
        <van-col span="8" class="tri-block tri-1">
          <p>{{total_class}}</p>
          <p>{{$t('general')}}</p>
        </van-col>
        <van-col span="8" class="tri-block tri-2">
          <p>{{finished_class}}</p>
          <p>{{$t('finished')}}</p>
        </van-col>
        <van-col span="8" class="tri-block tri-3">
          <p>{{unfinish_class}}</p>
          <p>{{$t('unfinished')}}</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import officeApi from '@/components/office/office.js'

  export default {
    name: "today",
    data() {
      return {
        t: "",//时间
        name: this.$cookies.get("username"),//姓名
        division:this.$cookies.get("divisionname"),
        d: "",//时间
        num_should: "0",
        num_actual: "- -",
        num_miss: "- -",
        today: PubFuc.getToDay(),
        remark: "",
        event: "",
        total_class: "",
        finished_class: "",
        unfinish_class: "",
        cookie: window.localStorage.getItem('lang')
      }
    },
    mounted() {
      this.getD();
      this.getTeachersNum()
      this.getClassInfo()
    },
    methods: {
      getD: function () {
        let now = new Date();
        let a = now.getHours();
        let y = now.getFullYear();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        let dd = now.getDay(); //获取当前星期X(0-6,0代表星期天)
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        let men = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let weekdayen = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (this.cookie == "cn") {
          if (a > 10 && a < 13) {
            this.t = "中午"
          } else if (a > 12 && a < 19) {
            this.t = "下午"
          } else if (a > 5 && a < 11) {
            this.t = "上午"
          } else {
            this.t = "晚上"
          }
          this.d = y + "年" + m + "月" + d + "日 " + weekday[dd]
        } else if (this.cookie == "en") {
          if (a > 10 && a < 13) {
            this.t = "noon"
          } else if (a > 12 && a < 19) {
            this.t = "afternoon"
          } else if (a > 5 && a < 11) {
            this.t = "morning"
          } else {
            this.t = "evening"
          }
          this.d = weekdayen[dd] + ', ' + d + ' ' + men[m] + ', ' + y
        }

      },
      getTeachersNum() {
        officeApi.getTeachers(this.$cookies.get("divisionid"), PubFuc.getToDay(), PubFuc.getYear()).then(res => {
          if (res[0]) {
            if (res[0]["tec_num_total"]) this.num_should = res[0]["tec_num_total"]
            if (res[0]["num_actual_yx"] == null || res[0]["num_actual_gj"] == null) {
              this.num_actual = '- -'
            } else {
              this.num_actual = res[0]["num_actual_yx"] + res[0]["num_actual_gj"]
            }
            if (res[0]["num_miss_yx"] == null || res[0]["num_miss_gj"] == null) {
              this.num_miss = '- -'
            } else {
              this.num_miss = res[0]["num_miss_yx"] + res[0]["num_miss_gj"]
            }
            if ((res[0]["remark"] && res[0]["remark"] != "") || res[0]["remark"] == 0) {
              this.remark = res[0]["remark"]
            } else {
              this.remark = "暂无"
            }
            if ((res[0]["event"] && res[0]["event"] != "") || res[0]["event"] == 0) {
              this.event = res[0]["event"]
            } else {
              this.event = "暂无"
            }
          }
        })
      },
      getClassInfo() {
        officeApi.getClassList(this.$cookies.get("divisionid"), PubFuc.getToDay(), PubFuc.getYear()).then(res => {
          this.total_class = res.length
          let k =  0
          for(let i = 0;i<res.length;i++){
            if(res[i]["isFinish"] == 1) k++
          }
          this.finished_class = k
          this.unfinish_class = res.length - k
        })
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
