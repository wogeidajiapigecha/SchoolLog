/**
 * 配置全局路径
 *
 */
window.Config = {
  // prodUrl: "http://localhost:36423",
  prodUrl: "http://www.ssjc.suzhou.gov.cn/SZWWGJ2",//后台接口
  corpId: "ww3685eaf065aba746",//企业ID
  corpSecret: "jiwcOSlIQQLzUZgpjrqT-ksoG0ROlQlNN2csrnW6LzA",//应用secret
}

window.PubFuc = {
  getDate: function () {
    let now = new Date();
    return [now.getFullYear(), now.getMonth() + 1, now.getDate(),
      now.getHours(), now.getMinutes(), now.getSeconds(),
      now.getDay()]
  },
  getToDay() {
    let d = this.getDate()
    return d[0] + "-" + (d[1] < 10 ? "0" + d[1] : d[1]) + "-" + (d[2] < 10 ? "0" + d[2] : d[2])
  },
  getToDayAll() {
    let d = this.getDate()
    return d[0] + "-" + (d[1] < 10 ? "0" + d[1] : d[1]) + "-" + (d[2] < 10 ? "0" + d[2] : d[2]) + " " +
      (d[3] < 10 ? "0" + d[3] : d[3]) + ":" + (d[4] < 10 ? "0" + d[4] : d[4]) + ":" + (d[5] < 10 ? "0" + d[5] : d[5])
  },
  getYear() {
    let now = new Date();
    return now.getFullYear()
  },
  getXingQi() {
    let mydate = new Date();
    const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekday[mydate.getDay() / 1]
  }
}
