<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <!--配置tab的路由用以展示不同区域的内容-->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <!--路由切换后展示区域-->
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  /* 导入组件 */
  import { urlParse } from 'common/js/util';
  import header from 'components/header/header.vue';

  const ERR_OK = 0;
  const debug = process.env.NODE_ENV !== 'production';

  /* 注册组件 */
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      const url = debug ? '/api/seller' : 'http://ustbhuangyi.com/sell/api/seller';
      this.$http.get(url + '?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  /* tab的flex布局基本属性设置：3等分、居中等等 */
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
