<template>
<div>
  <router-view />

  <van-tabbar v-model="active">
    <van-tabbar-item to="/today">
      <span>今日出勤</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_1 : icon.normal_1"
      >
    </van-tabbar-item>

    <van-tabbar-item to="/history">
      <span>历史出勤</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.active_2 : icon.normal_2"
      >
    </van-tabbar-item>
    <van-tabbar-item to="/me">
      <span>我</span>
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
  import j1 from '../assets/img/j-1.png'
  import j2 from '../assets/img/j-2.png'
  import l1 from '../assets/img/l-1.png'
  import l2 from '../assets/img/l-2.png'
  import w1 from '../assets/img/w-1.png'
  import w2 from '../assets/img/w-2.png'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
