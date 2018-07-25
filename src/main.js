import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

/* 使用路由 */
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;

const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

const router = new VueRouter({
  /* 配置高亮 */
  linkActiveClass: 'active',
  routes: routes
});

router.push('goods');

/* eslint-disable no-new */
new Vue({
  router: router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
