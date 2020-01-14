<template>
  <div>
    <img width="100%;display:block" :src="imgurl" alt="">
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgurl:''
    };
  },
  mounted() {
    let imgurl = this.$route.query.imgurl
    this.imgurl = imgurl
  },
};
</script>
<style scoped>
</style>