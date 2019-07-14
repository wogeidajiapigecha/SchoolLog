// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'

import './assets/font/font.scss';
import './assets/css/global.scss'
import 'vant/lib/index.css';
import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Row, Col } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';

import { Locale } from 'vant';
// import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';

Locale.use('en-US', zhCN);

Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);
Vue.use(Row).use(Col);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
