<template>
<div>
  <div class="top"></div>

  <div class="notice xl-yc">
    <img class="nt-img" src="../assets/img/notice.png"/>
    <div class="nt-p">
      <span>{{t}}好！{{name}}（PYP实验一（1）班），今天是{{d}}！</span>
    </div>
  </div>

  <div></div>
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
        getD: function() {
          let now = new Date();
          let a = now.getHours();
          if (a>10&&a<13) {
            this.t = "中午"
          } else if (a>12&&a<19) {
            this.t = "下午"
          } else if (a>5&&a<11) {
            this.t = "上午"
          } else {
            this.t = "晚上"
          }
          let y = now.getFullYear();
          let m = now.getMonth()+1;
          let d = now.getDate();
          let dd = now.getDay(); //获取当前星期X(0-6,0代表星期天)
          let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
          this.d = y+"年"+m+"月"+d+"日 "+weekday[dd]
        }
      }
    }
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 220px;
  background-image: url(../assets/img/headbg.png);
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

  @keyframes move {
    0% {
      margin-left: 100%;
    }
    100% {
      margin-left: -100%;
    }
  }
</style>
