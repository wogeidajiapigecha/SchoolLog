<template>
  <div class="his-body">
    <div class="datePicker">
      <Calendar
        :now="false"
        :responsive="false"
        lunar
        clean
        @select="selected"
        :multi="false"
        ref="calendar"
      />
    </div>

    <van-row class="his-num">
      <van-col span="8" class="xl-yc">
        <div class="num-circle nc-1"></div>
        <div class="num-p xl-yc">
          {{$t('expected')}}:
          <span class="nc-sp1">{{num_should}}</span>
          <span v-show="lan=='cn'">{{$t('people')}}</span>
        </div>
      </van-col>
      <van-col span="8" class="xc-yc">
        <div class="num-circle nc-2"></div>
        <div class="num-p xl-yc">
          {{$t('actual')}}:
          <span class="nc-sp2">{{num_actual}}</span>
          <span v-show="lan=='cn'">{{$t('people')}}</span>
        </div>
      </van-col>
      <van-col span="8" class="xr-yc">
        <div class="num-circle nc-3"></div>
        <div class="num-p xl-yc">
          {{$t('missing')}}:
          <span class="nc-sp3">{{num_miss}}</span>
          <span v-show="lan=='cn'">{{$t('people')}}</span>
        </div>
      </van-col>
    </van-row>

    <div class="today-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('remark')}}</p>
      </div>
      <div class="today-content">
        <div class="xl-yc">
          <img class="cir-b" src="../../assets/img/cir-b.png"/>
          <p class="time">{{nTime}}</p>
        </div>
        <p class="describe">{{remark}}</p>
      </div>
    </div>

    <div class="today-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('importantActivity')}}</p>
      </div>
      <div class="today-content">
        <div class="xl-yc">
          <img class="cir-b" src="../../assets/img/cir-o.png"/>
          <p class="time">{{nTime}}</p>
        </div>
        <p class="describe">{{event}}</p>
      </div>
    </div>

    <router-link tag="div" :to="{ path: '/office/remind',query:{date:nTime} }">
      <van-button class="save">{{$t('checkAttendance')}}</van-button>
    </router-link>

  </div>
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import 'mpvue-calendar/src/browser-style.css'
  import officeApi from '@/components/office/office.js'

  export default {
    name: "History",
    components: {
      Calendar,
    },
    data() {
      return {
        num_should: 0,//应到人数
        num_actual: 0,//实到人数
        num_miss: 0,//缺勤人数
        remark: "",
        nTime:"",
        event:"",
        lan: window.localStorage.getItem('lang'),
        // months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        // // disabledArray: ['2018-6-27','2018-6-25'],
        // value: util.formatDate(Date.parse(new Date())),
        // begin: util.formatDate(Date.parse(new Date())),
        // end: util.formatDate(Date.parse(new Date()) + 90 * 24 * 60 * 60 * 1000),//假设未来20天可以选择日期
        // monthRange: ['2019-6', '2019-8']
        // events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},自定义备注
        // almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},//自定义节日
        // tileContent: [
        //     {date: '2018-9-22', className: 'holiday ', content: '休'},
        //     {date: '2018-9-23', className: 'holiday ', content: '休'}
        // ],//为每个具体日期自定义class和插入文本内容，具体用法见下
      }
    },
    mounted(){
      const now = new Date();
      this.selected([now.getFullYear(), now.getMonth() + 1, now.getDate()],
        {date:now.getFullYear()+"-"+(now.getMonth() + 1)+"-"+now.getDate()})
    },
    methods: {
      // prev(year, month, weekIndex) {
      //     console.log(year, month, weekIndex)
      // },
      // next(year, month, weekIndex) {
      //     console.log(year, month, weekIndex)
      // },
      // selectYear(year) {
      //     console.log(year)
      // },
      // selectMonth(month, year) {
      //     console.log(year, month)
      // },
      // setToday() {
      //     this.$refs.calendar.setToday()
      // },
      // dateInfo() {
      //     const info = this.$refs.calendar.dateInfo(2018, 8, 23)
      //     console.log(info);
      // },
      // renderer() {
      //     this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
      // },
      selected(val, val2) {
        // console.log(this.$refs.calendar.monthRangeDays)
        let monthArray = this.$refs.calendar.monthRangeDays
        monthArray.forEach(jj => {
          jj.forEach(vv => {
            vv.forEach(ii => {
              if (val2.date == ii.date) {
                ii.selected = true
              } else {
                ii.selected = false
              }
            })
          })
        })
        const dayStr = val[0] + "-" + (val[1] < 10 ? "0" + val[1] : val[1]) + "-" + (val[2] < 10 ? "0" + val[2] : val[2])
        officeApi.getTeachers(this.$cookies.get("divisionid"), dayStr, PubFuc.getYear()).then(res => {
          if(res[0]){
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
            this.nTime = dayStr
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .his-body {
    padding: 18px 18px 60px;
    overflow-y: auto;
    width: 100%;

    .datePicker {
      box-shadow: 0 3px 7px #D2D2D2;
      border-radius: 5px;

      .mpvue-calendar {
        min-width: 0;
        border-radius: 5px;
      }
    }

    .his-num {
      margin-top: 21px;

      .num-circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 5px;
      }

      .num-p {
        color: #666666;
        font-size: 0.93rem;
        span {
          margin-left: 10px;
        }

        .nc-sp1 {
          color: #0078FF;
        }

        .nc-sp2 {
          color: #FF8A00;
        }

        .nc-sp3 {
          color: #F64840;
        }
      }

      .nc-1 {
        background-color: #0078FF;
      }

      .nc-2 {
        background-color: #FF8A00;
      }

      .nc-3 {
        background-color: #F64840;
      }
    }

    .today-block {
      width: 100%;
      padding: 25px 0 0;
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
