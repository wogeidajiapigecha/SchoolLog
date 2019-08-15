<template>
  <div>
    {{message}}
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "login",
    data() {
      return {
        message: ""
      }
    },
    mounted() {
      this.checking_getAcessToken()
    },
    methods: {
      getQueryString(name) {//获取连接后参数
        // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
        return location.href.split("/?code=")[1].split("&state=")[0]
      },
      checking_getAcessToken() {//获取access_token
        let _this = this
        const code = this.getQueryString("")
        // const code = "97LCxNs4w5D-XQaCQqDcRLTu54Tr7u7Z03t2Nt1a11M"
        if (!code || code == "") {
          this.message = "获取身份代码失败，请尝试重新进入本应用！"
          return
        } else {
          _this.message = "获取身份代码成功！"
          debugger
          axios.get(Config.prodUrl + "/api/weixin/getUserInfo?" +
            "corpid=" + Config.corpId +
            "&corpsecret=" + Config.corpSecret +
            "&code=" + code).then(response => {
            _this.loginSuccess(response)
          }).catch(err => {
            _this.message = "获取用户信息失败，请尝试重新进入本应用！" + Config.corpId + "//" + Config.corpSecret
          })
        }
      },
      loginSuccess(response) {//成功，跳转对应页面
        let _this = this
        try {
          let res = response.data
          const name = res["name"]
          const mobile = res["mobile"]
          this.message = "成功获取用户信息，跳转中..."
          this.$router.push({path: '/teacher/today',query:{username:name}})
          // this.$router.push({path: '/office/today',query:{username:name}})
          // this.$router.push({path: '/school/today',query:{username:name}})
        } catch (e) {
          _this.message = "获取用户信息失败，请尝试重新进入本应用！" + e.message
        }
      }
    }
  }
</script>

<style scoped>

</style>
