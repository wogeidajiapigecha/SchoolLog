<template>
  <div class="re-body">
    <div class="re-block xl-yc">
      <p>{{$t('expected')}}:</p>
      <van-cell-group>
        <van-field v-model="form.num_should" placeholder="" disabled/>
      </van-cell-group>
    </div>
    <div class="re-block xl-yc">
      <p>{{$t('actual')}}:</p>
      <van-cell-group>
        <van-field v-model="form.num_actual" placeholder="" :error-message="error.watchNumber"/>
      </van-cell-group>
    </div>
    <div class="re-block xl-yc">
      <p>{{$t('missing')}}:</p>
      <van-cell-group>
        <van-field v-model="form.num_miss" placeholder="" disabled/>
      </van-cell-group>
    </div>

    <div class="record-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('remark')}}</p>
      </div>
      <textarea class="record-content" v-model="form.remark">
      </textarea>
    </div>

    <van-button :loading="load" loading-text="保存中" class="save" @click="saveRecord">{{$t('saveRecord')}}</van-button>
  </div>
</template>

<script>
  import teacherApi from '@/components/teacher/teacher.js'

  export default {
    name: "Record",
    data() {
      return {
        load: false,//按钮加载
        error: {watchNumber:""},
        form: {
          reco_date: PubFuc.getToDay(),
          class_id: this.$cookies.get("classid"),
          reco_week: PubFuc.getXingQi(),
          school: this.$cookies.get("schoolname"),
          division: this.$cookies.get("divisionname"),
          grade: this.$cookies.get("grade"),
          classname: this.$cookies.get("classname"),
          num_should: "",
          num_actual: "",
          num_miss: "",
          remark: "",
          reco_people: this.$cookies.get("username"),
          reco_time: PubFuc.getToDayAll(),
          check_people: this.$cookies.get("username"),
          check_time: PubFuc.getToDayAll()
        }
      }
    },
    mounted() {
      this.getStudentsNum()
    },
    methods: {
      getStudentsNum() {
        teacherApi.getStudents(this.$cookies.get("classid"), PubFuc.getToDay(), PubFuc.getYear()).then(res => {
          if (res[0]) {
            if (res[0]["stu_num"]) this.form.num_should = res[0]["stu_num"] + ""
            if ((res[0]["num_actual"] && res[0]["num_actual"] != null) || res[0]["num_actual"] == 0) {
              this.form.num_actual = res[0]["num_actual"] + ""
            } else {
              this.form.num_actual = ''
            }
            if ((res[0]["num_miss"] && res[0]["num_actual"] != null) || res[0]["num_miss"] == 0) {
              this.form.num_miss = res[0]["num_miss"] + ""
            } else {
              this.form.num_miss = ''
            }
            if ((res[0]["remark"] && res[0]["remark"] != "") || res[0]["remark"] == 0) {
              this.form.remark = res[0]["remark"]
            } else {
              this.form.remark = ""
            }
          }
        })
      },
      saveRecord() {//保存
        this.load = true
        let _this = this
        // let r = /^\+?[1-9][0-9]*$/
        let r = /^\d+$/
        if (this.form.num_should.toString() == "" || this.form.num_actual.toString() == "" || this.form.num_miss.toString() == "") {
          this.$notify({
            message: '请填写完整实到人数、应到人数、缺勤人数！',
            duration: 2000,
          });
          _this.load = false
          return
        } else if (!r.test(this.form.num_should)
          || !r.test(this.form.num_actual)
          || !r.test(this.form.num_miss)) {
          this.$notify({
            message: '请填写实到人数、应到人数、缺勤人数为数字格式',
            duration: 2000,
          });
          _this.load = false
          return
        }

        teacherApi.postClass(_this.form).then(res => {
          this.$notify({
            message: '保存成功！',
            duration: 1000,
            background: '#008000'
          });
          _this.load = false
        }).catch(error => {
          _this.load = false
        })
      }
    },
    watch: {
      "form.num_actual"(newValue, oldValue) {
        let r = /^\d+$/
        if (newValue == "") {
          this.form.num_miss = ""
          return
        } else if (!r.test(newValue)) {
          // this.$notify({
          //   message: '请填写实到人数为数字格式',
          //   duration: 2000,
          // });
          this.error.watchNumber = "实到人数应为数字格式"
          this.form.num_actual = ""
          return
        }
        this.error.watchNumber = ""
        this.form.num_miss = this.form.num_should - newValue
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
