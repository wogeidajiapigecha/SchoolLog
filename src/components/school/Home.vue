<template>
<div>
  <router-view />

  <van-tabbar v-model="active">
    <van-tabbar-item to="/school/today">
      <span>{{$t('todayAttendance')}}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_1 : icon.normal_1"
      >
    </van-tabbar-item>

    <van-tabbar-item to="/school/history">
      <span>{{$t('historyAttendance')}}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_2 : icon.normal_2"
      >
    </van-tabbar-item>
    <van-tabbar-item to="/school/me">
      <span>{{$t('me')}}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_3 : icon.normal_3"
      >
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
  import j1 from '../../assets/img/j-1.png'
  import j2 from '../../assets/img/j-2.png'
  import l1 from '../../assets/img/l-1.png'
  import l2 from '../../assets/img/l-2.png'
  import w1 from '../../assets/img/w-1.png'
  import w2 from '../../assets/img/w-2.png'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      icon: {
        normal_1: j1,
        active_1: j2,
        normal_2: l1,
        active_2: l2,
        normal_3: w1,
        active_3: w2,
      }
    }
  },
  created() {
    this.login()
  },
  methods:{
    login(){
      if(!window.localStorage.getItem('lang')) window.localStorage.setItem('lang',"cn")
      this.$cookies.set("schoolname", "苏州XXX学校")
      this.$cookies.set("schoolid", 1)
      // this.$cookies.set("username", "董京")
      this.$cookies.set("username", this.$route.query.username)
      this.$cookies.set("userid", 3)
    },
    getQueryString(name) {//获取连接后参数
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
