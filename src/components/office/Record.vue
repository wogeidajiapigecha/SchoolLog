<template>
  <div class="re-body">
    <div>
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('firstLine')}}</p>
      </div>

      <div class="re-block xl-yc">
        <p>{{$t('expected')}}:</p>
        <van-cell-group>
          <van-field v-model="form.num_should_yx" placeholder="" disabled/>
        </van-cell-group>
      </div>
      <div class="re-block xl-yc">
        <p>{{$t('actual')}}:</p>
        <van-cell-group>
          <van-field v-model="form.num_actual_yx" placeholder="" type="number"/>
        </van-cell-group>
      </div>
    </div>


    <div style="margin-top: 20px;">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('internationalTeacher')}}</p>
      </div>

      <div class="re-block xl-yc">
        <p>{{$t('expected')}}:</p>
        <van-cell-group>
          <van-field v-model="form.num_should_gj" placeholder="" disabled/>
        </van-cell-group>
      </div>
      <div class="re-block xl-yc">
        <p>{{$t('actual')}}:</p>
        <van-cell-group>
          <van-field v-model="form.num_actual_gj" placeholder="" type="number"/>
        </van-cell-group>
      </div>
    </div>

    <div class="record-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('remark')}}</p>
      </div>
      <textarea class="record-content" v-model="form.remark">
    </textarea>
    </div>

    <div class="record-block">
      <div class="b-head xlr-yc">
        <p class="b-title">{{$t('importantActivity')}}</p>
      </div>
      <textarea class="record-content" v-model="form.events">
    </textarea>
    </div>

    <van-button :loading="load" loading-text="保存中" class="save" @click="saveRecord">{{$t('saveRecord')}}</van-button>
  </div>
</template>

<script>
  import officeApi from '@/components/office/office.js'

  export default {
    name: "Record",
    data() {
      return {
        load: false,//按钮加载
        form: {
          reco_date: PubFuc.getToDay(),
          division_id: this.$cookies.get("divisionid"),
          reco_week: PubFuc.getXingQi(),
          school: this.$cookies.get("schoolname"),
          division: this.$cookies.get("divisionname"),
          num_should_yx: "",
          num_actual_yx: "",
          num_miss_yx: "",
          num_should_gj: "",
          num_actual_gj: "",
          num_miss_gj: "",
          remark: "",
          events: "",
          reco_people: this.$cookies.get("username"),
          reco_time: PubFuc.getToDayAll(),
          check_people: this.$cookies.get("username"),
          check_time: PubFuc.getToDayAll()
        }
      }
    },
    mounted() {
      this.getTeachersNum()
    },
    methods:{
      getTeachersNum() {
        officeApi.getTeachers(this.$cookies.get("divisionid"), PubFuc.getToDay(), PubFuc.getYear()).then(res => {
          if (res[0]) {
            this.form.num_should_yx = res[0]["tec_num_yx"]?res[0]["tec_num_yx"]+"":""
            this.form.num_actual_yx=res[0]["num_actual_yx"]?res[0]["num_actual_yx"]+"":""
            this.form.num_miss_yx=res[0]["num_miss_yx"]?res[0]["num_miss_yx"]+"":""
            this.form.num_should_gj = res[0]["tec_num_gj"]?res[0]["tec_num_gj"]+"":""
            this.form.num_actual_gj=res[0]["num_actual_gj"]?res[0]["num_actual_gj"]+"":""
            this.form.num_miss_gj=res[0]["num_miss_gj"]?res[0]["num_miss_gj"]+"":""
            this.form.remark = res[0]["remark"]?res[0]["remark"]:""
            this.form.events = res[0]["event"]?res[0]["event"]:""
          }
        })
      },
      saveRecord() {//保存
        this.load = true
        let _this = this
        // let r = /^\+?[1-9][0-9]*$/
        let r = /^\d+$/
        if(this.form.num_should_yx.toString()==""||this.form.num_actual_yx.toString()==""
          ||this.form.num_should_gj.toString()==""||this.form.num_actual_gj.toString()==""
        ){
          this.$notify({
            message: '请填写完整实到人数、应到人数！',
            duration: 2000,
          });
          _this.load = false
          return
        }else if(!r.test(this.form.num_should_yx)||!r.test(this.form.num_actual_yx)
          ||!r.test(this.form.num_should_gj)||!r.test(this.form.num_actual_gj)){
          this.$notify({
            message: '请填写实到人数、应到人数为数字格式',
            duration: 2000,
          });
          _this.load = false
          return
        }
        this.form.num_miss_yx = this.form.num_should_yx-this.form.num_actual_yx
        this.form.num_miss_gj = this.form.num_should_gj-this.form.num_actual_gj
        officeApi.postDivision(_this.form).then(res => {
          this.$notify({
            message: '保存成功！',
            duration: 1000,
            background: '#008000'
          });
          _this.load = false
          setTimeout(()=>{
            this.$router.push('/office/today');
          },1000)
        }).catch(error=>{
          this.$notify({
            message: '保存失败！',
            duration: 1000,
          });
          _this.load = false
        })
      },
    },
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
      margin-bottom: 17px;
      border-left: 3px solid #333333;

      .b-title {
        color: #333333;
        font-size: 0.937rem;
        font-weight: bold;
      }
    }

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
      padding: 0px 0 20px 0;
      height: auto;

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
