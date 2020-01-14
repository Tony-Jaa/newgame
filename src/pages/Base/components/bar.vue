<template>
  <div class="tabbar">
    <div class="tabbar-item" @click="checkbar(0)" :class="[$store.state.barindex==0?'active':'']">
      <div>
        <div>
          <img v-show="$store.state.barindex==0" src="../../../assets/images/bar/1-active.png" alt />
          <img v-show="$store.state.barindex!=0" v-lazy="require('../../../assets/images/bar/1.png')" alt />
          <p>小Z懂你</p>
        </div>
      </div>
    </div>
    <div class="tabbar-item" @click="checkbar(1)" :class="[$store.state.barindex==1?'active':'']">
      <div>
        <div>
          <img v-show="$store.state.barindex==1" v-lazy="require('../../../assets/images/bar/2-active.png')" alt />
          <img v-show="$store.state.barindex!=1" src="../../../assets/images/bar/2.png" alt />
          <p>思维课堂</p>
        </div>
      </div>
    </div>
    <div class="tabbar-item" @click="checkbar(2)" :class="[$store.state.barindex==2?'active':'']">
      <div>
        <div>
          <img v-show="$store.state.barindex==2" v-lazy="require('../../../assets/images/bar/3-active.png')" alt />
          <img v-show="$store.state.barindex!=2" src="../../../assets/images/bar/3.png" alt />
          <p>我的</p>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
set bar-active-color:rgba(242, 200, 28, 1)
  zh-CN: rgba(242, 200, 28, 1)
</i18n>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "bar",
  data() {
    return {
      index: 0
    };
  },
  components: {
  },
  mounted: function() {
    this.index = this.$store.state.barindex;
  },
  computed: {
    ...mapGetters(["barindex"])
  },
  methods: {
    ...mapMutations(["settabindex", "setbarindex"]),
    checkbar: function(index) {
      // this.$router.push({name:'home',params:{index}})
      this.index = index;
      this.setbarindex(index);
      this.settabindex(index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}
span {
  font-size: 0.22rem;
}
.active {
  font-weight: 250;
  color: rgba(242, 200, 28, 1) !important;
  text-decoration: none;
}
.weui-tabbar {
  background: #fff;
}
.tabbar {
  width: 100%;
  height: 1.16rem;
  font-size: 0.22rem;
  position: fixed;
  bottom: 0;
  z-index: 996;
  display: flex;
  background-color: #fff;
}
.tabbar::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 0.02rem;
  border-top: 0.02rem solid #c0bfc4;
  color: #c0bfc4;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
.tabbar > .tabbar-item {
  flex-grow: 1;
  text-align: center;
  color: #999999;
}
.tabbar img {
  width: 0.54rem;
}
.tabbar-item > div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabbar-item p {
  margin-top: 0.07rem;
}
.tabbar > div > div {
  text-align: center;
  line-height: 1;
}
</style>