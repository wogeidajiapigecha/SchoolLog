<template>
  <div class="me-body">
    <div class="card">
      <div class="card-div school xlr-yt">
        <p>{{schoolName}}</p>
        <img src="../../assets/img/head.jpg"/>
      </div>
      <div class="card-div xl-yb">
        <p class="name">{{username}}</p>
      </div>
    </div>

    <div class="panel">
      <div class="panel-div xlr-yc">
        <div class="panel-left xl-yc">
          <img src="../../assets/img/folder.png"/>
          <p>语言</p>
        </div>
        <div class="panel-right xr-yc" @click="showLanPicker = true">
          {{lanValue}}
        </div>
      </div>
    </div>

    <van-popup v-model="showClassPicker" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="classList"
        @cancel="showClassPicker = false"
        @confirm="onConfirmClass"
      />
    </van-popup>

    <van-popup v-model="showLanPicker" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        :columns="lanList"
        @cancel="showLanPicker = false"
        @confirm="onConfirmLan"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "Me",
    data() {
      return {
        schoolName:this.$cookies.get("schoolname"),
        username:this.$cookies.get("username"),
        classValue: '实验一（1）班',
        lanValue: '中文',
        showClassPicker: false,
        showLanPicker: false,
        classList: ['实验一（1）班', '实验一（2）班', '实验一（3）班'],
        lanList: ['中文', '英语'],
      };
    },
    methods: {
      onConfirmClass(value) {
        this.classValue = value;
        this.showClassPicker = false;
      },

      onConfirmLan(value) {
        this.lanValue = value;
        localStorage.setItem('language',value)
        this.showLanPicker = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .me-body {
    padding: 13px 0px 60px;
    overflow-y: auto;
    width: 100%;

    .card {
      width: calc(100% - 36px);
      height: 179px;
      margin: 0 18px 15px;
      padding: 23px 26px;
      background-color: #ffffff;
      box-shadow: 0 0px 9px #D2D2D2;
      border-radius: 5px;

      .card-div {
        height: 50%;



        p {
          color: #3C4652;
          font-size: 1.43rem;
        }
      }
      .school {
        p {
          color: #7F7F8A;
          font-size: 1rem;
          font-weight: bold;
        }

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
    }

    .panel {
      width: 100%;
      box-shadow: inset 0px 0px 3px #D9D9D9;

      .panel-div {
        height: 45px;
        padding: 0 20px;

        .panel-left img {
          width: 18px;
          margin-right: 10px;
        }

        .panel-left p {
          color: #000;
          font-size: 1rem;
        }

        .panel-right {
          min-width: 50%;
          height: 100%;
          color: #666666;
          font-size: 0.87rem;
        }
      }
    }
  }
</style>
