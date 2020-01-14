<template>
  <div class="dialog" :class="[show?'dialogShow':'']">
    <div class="icon-kite">
      <img src="../../../assets/images/vipsharedia/icon-kite.png" alt />
    </div>
    <div class="main">
      <p>分享好友注册一分钱获取VIP</p>
      <p>1、点击右上角按钮</p>
      <div>
        2、选择&nbsp;“&nbsp;
        <img
          style="width:0.96rem;position:relative;top:0.4rem;"
          src="../../../assets/images/vipsharedia/icon-send.png"
          alt
        />
        ”发送给朋友
      </div>
    </div>
    <div class="btn" @click="clickKnow">
      我知道了
      <img src="../../../assets/images/vipsharedia/icon-star.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show:false
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 0);
  },
  methods: {
    clickKnow() {
      this.show = false
      setTimeout(() => {
        this.$emit("clickKnow", false);
      }, 200);
    }
  }
};
</script>
<style scoped>
.dialog {
  font-family: HappyZcool-2016;
  width: 0;
  height: 0;
  /* position: absolute;
  left: 0;
  top: 0; */
  background: rgba(0, 0, 0, 0.8);
  transition: all .2s linear;
  overflow: hidden;
}
.dialogShow {
  width: 100%;
  height: 100%;
}
.icon-kite {
  position: relative;
  margin-left: 5.03rem;
  margin-top: 0.38rem;
}
.icon-kite > img {
  width: 1.4rem;
  height: 1.72rem;
  display: block;
}
.main {
  width: 4.81rem;
  /* font-family: HappyZcool-2016; */
  font-size: 0.32rem;
  color: rgba(255, 255, 255, 1);
  line-height: 1;
  margin: 0.94rem auto 0;
}
.main > p:last-of-type {
  margin-top: 0.59rem;
}
.btn {
  width: 3.5rem;
  height: 0.8rem;
  position: relative;
  background: rgba(255, 255, 255, 0);
  border: 0.04rem solid rgba(255, 255, 255, 0.4);
  border-radius: 0.4rem;
  margin: 2.69rem auto 0;
  font-size: 0.32rem;
  /* font-family: HappyZcool-2016; */
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn > img {
  position: absolute;
  right: -0.31rem;
  width: 0.27rem;
  height: 0.31rem;
  top: -0.13rem;
}
</style>