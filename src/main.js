// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueI18n from 'vue-i18n'

import './assets/font/font.scss';
import './assets/css/global.scss';
import 'vant/lib/index.css';
import './assets/css/common.scss';
import {Button} from 'vant';
import {Tabbar, TabbarItem} from 'vant';
import {Row, Col} from 'vant';
import {Icon} from 'vant';
import {Field} from 'vant';
import {Picker} from 'vant';
import {Popup} from 'vant';
import {Tab, Tabs} from 'vant';
import {Checkbox, CheckboxGroup} from 'vant';
import {Collapse, CollapseItem} from 'vant';
import {Notify} from 'vant';
import {Cell, CellGroup} from 'vant';

import {Locale} from 'vant';
// import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';

import VueCookies from 'vue-cookies'
import Qs from 'qs'   //引入方式
Vue.prototype.$qs = Qs  //全局加载

Vue.use(VueCookies)

Locale.use('en-US', zhCN);

Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);
Vue.use(Row).use(Col);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Notify);
Vue.use(Cell).use(CellGroup);
Vue.use(Tab).use(Tabs);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Collapse).use(CollapseItem);

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: window.localStorage.getItem('so_lang') || 'en',
  fallbackLocale: 'en',
  messages: require('@/assets/lang.json')
})

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App},
  template: '<App/>'
})
