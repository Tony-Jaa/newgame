<template>
  <div class="bg">
    <span class="active" :style="{width:percentage+'%'}" :class="[percentage==100?'percent100':'']"></span>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: [Number, String],
      default: 0
    }
  },
  mounted() {
    //   alert(this.percentage)
  }
};
</script>
<style lang="less" scoped>
.bg {
  background: rgba(164, 164, 164, 0.2);
  height: 0.3rem;
  border-radius: 0.15rem;
  position: relative;
  .active {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(97, 195, 255, 1);
    height: 100%;
    border-radius: 0.15rem;
  }
  .percent100 {
    background: rgba(255, 208, 0, 1);
  }
}
</style>