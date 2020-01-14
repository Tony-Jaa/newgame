<template>
  <div class="home-chLabel" :class="[hide?'home-chLabel-hide':'']">
    <p>选择4个萌宝最有天赋的思维</p>
    <!-- 1-6岁 16个 0-12个月14个   -->
    <div class="label-all">
      <div
        v-if="$store.state.label_think[0]"
        class="radio radio1-1"
        style="left:0.82rem;top:0"
        :class="[label.includes($store.state.label_think[0].id)?'radio1-1cli':'']"
        @click="addLabel($store.state.label_think[0].id)"
       >
        <template v-if="$store.state.label_think[0].labelName.length>=4">
          {{$store.state.label_think[0].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[0].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[0].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[1]"
        class="radio radio2-1"
        style="left:4.58rem;top:0.95rem"
        :class="[label.includes($store.state.label_think[1].id)?'radio2-1cli':'']"
        @click="addLabel($store.state.label_think[1].id)"
       >
        <template v-if="$store.state.label_think[1].labelName.length>=4">
          {{$store.state.label_think[1].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[1].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[1].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[2]"
        class="radio radio2-4"
        style="left:4.31rem;top:2.95rem"
        :class="[label.includes($store.state.label_think[2].id)?'radio2-4cli':'']"
        @click="addLabel($store.state.label_think[2].id)"
       >
        <template v-if="$store.state.label_think[2].labelName.length>=4">
          {{$store.state.label_think[2].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[2].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[2].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[3]"
        class="radio radio2-1"
        style="left:2.32rem;top:3.45rem"
        :class="[label.includes($store.state.label_think[3].id)?'radio2-1cli':'']"
        @click="addLabel($store.state.label_think[3].id)"
       >
        <template v-if="$store.state.label_think[3].labelName.length>=4">
          {{$store.state.label_think[3].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[3].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[3].labelName}}</template>
      </div>
      <!-- xiao -->
      <div
        v-if="$store.state.label_think[4]"
        class="radio radio3-7"
        style="left:3.17rem;top:0.15rem"
        :class="[label.includes($store.state.label_think[4].id)?'radio3-7cli':'']"
        @click="addLabel($store.state.label_think[4].id)"
       >
        <template v-if="$store.state.label_think[4].labelName.length>=4">
          {{$store.state.label_think[4].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[4].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[4].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[5]"
        class="radio radio3-1"
        style="left:3.02rem;top:1.82rem"
        :class="[label.includes($store.state.label_think[5].id)?'radio3-1cli':'']"
        @click="addLabel($store.state.label_think[5].id)"
      >
        <template v-if="$store.state.label_think[5].labelName.length>=4">
          {{$store.state.label_think[5].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[5].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[5].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[6]"
        class="radio radio4-1"
        style="left:1.46rem;top:2.22rem"
        :class="[label.includes($store.state.label_think[6].id)?'radio4-1cli':'']"
        @click="addLabel($store.state.label_think[6].id)"
      >
        <template v-if="$store.state.label_think[6].labelName.length>=4">
          {{$store.state.label_think[6].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[6].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[6].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[7]"
        class="radio radio3-5"
        style="left:0;top:2.74rem"
        :class="[label.includes($store.state.label_think[7].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_think[7].id)"
      >
        <template v-if="$store.state.label_think[7].labelName.length>=4">
          {{$store.state.label_think[7].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[7].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[7].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[8]"
        class="radio radio4-2"
        style="left:0.84rem;top:4.01rem"
        :class="[label.includes($store.state.label_think[8].id)?'radio4-2cli':'']"
        @click="addLabel($store.state.label_think[8].id)"
      >
        <template v-if="$store.state.label_think[8].labelName.length>=4">
          {{$store.state.label_think[8].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[8].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[8].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[9]"
        class="radio radio3-2"
        style="left:0.33rem;top:5.46rem"
        :class="[label.includes($store.state.label_think[9].id)?'radio3-2cli':'']"
        @click="addLabel($store.state.label_think[9].id)"
      >
        <template v-if="$store.state.label_think[9].labelName.length>=4">
          {{$store.state.label_think[9].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[9].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[9].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[10]"
        class="radio radio4-1"
        style="left:1.88rem;top:5.46rem"
        :class="[label.includes($store.state.label_think[10].id)?'radio4-1cli':'']"
        @click="addLabel($store.state.label_think[10].id)"
      >
        <template v-if="$store.state.label_think[10].labelName.length>=4">
          {{$store.state.label_think[10].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[10].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[10].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[11]"
        class="radio radio3-7"
        style="left:3.87rem;top:4.85rem"
        :class="[label.includes($store.state.label_think[11].id)?'radio3-7cli':'']"
        @click="addLabel($store.state.label_think[11].id)"
      >
        <template v-if="$store.state.label_think[11].labelName.length>=4">
          {{$store.state.label_think[11].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[11].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[11].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[12]"
        class="radio radio4-2"
        style="left:5.47rem;top:4.65rem"
        :class="[label.includes($store.state.label_think[12].id)?'radio4-2cli':'']"
        @click="addLabel($store.state.label_think[12].id)"
      >
        <template v-if="$store.state.label_think[12].labelName.length>=4">
          {{$store.state.label_think[12].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[12].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[12].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[13]"
        class="radio radio3-5"
        style="left:3.42rem;top:6.31rem"
        :class="[label.includes($store.state.label_think[13].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_think[13].id)"
      >
        <template v-if="$store.state.label_think[13].labelName.length>=4">
          {{$store.state.label_think[13].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[13].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[13].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[14]&&$store.state.age>12"
        class="radio radio3-6"
        style="left:5.05rem;top:6.2rem"
        :class="[label.includes($store.state.label_think[14].id)?'radio3-6cli':'']"
        @click="addLabel($store.state.label_think[14].id)"
      >
        <template v-if="$store.state.label_think[14].labelName.length>=4">
          {{$store.state.label_think[14].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[14].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[14].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_think[15]&&$store.state.age>12"
        class="radio radio4-5"
        style="left:2.01rem;top:7.02rem"
        :class="[label.includes($store.state.label_think[15].id)?'radio4-5cli':'']"
        @click="addLabel($store.state.label_think[15].id)"
      >
        <template v-if="$store.state.label_think[15].labelName.length>=4">
          {{$store.state.label_think[15].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_think[15].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_think[15].labelName}}</template>
      </div>
    </div>
    <div class="btn" @click="next">定制家庭教育方案</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hide: false,
      label: [],
    };
  },
  computed: {
    vuxLabel_think() {
      return this.$store.state.label_think;
    },
    hasvuxLabel_think() {
      return this.vuxLabel_think.length > 0 ? true : false;
    }
  },
  methods: {
    // 下一步
    next() {
      if (this.label.length != 4) {
        this.$toast('请选择四个标签！')
        return;
      }
      this.hide = true;
      this.$store.commit("uploadLabel", { label: this.label, id: 1 }); //0代表问题，1代表标签
      let openId = JSON.parse(localStorage.getItem('userWechatInfo')).openid
      this.$store.dispatch('addUserLabel',openId)
    },
    // 选择标签
    addLabel(id) {
      if (!this.label.includes(id) && this.label.length < 4) {
        // 正常添加
        this.label.push(id);
      } else if (!this.label.includes(id) && this.label.length == 4) {
        // 点击添加但是已经有四个
         this.$toast('最多选择四个哦！')
      } else if (this.label.includes(id)) {
        this.label.splice(this.label.indexOf(id), 1);
      }
    }
  }
};
</script>
<style scoped>
.home-chLabel {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  z-index: 997;
  font-size: 0.32rem;
  transition: all 0.2s linear;
  overflow: scroll;
}
.home-chLabel-hide {
  left: -100%;
}
.home-chLabel > p {
  text-align: center;
  font-size: 0.4rem;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
  line-height: 1;
  padding: 0.55rem 0 0.87rem 0;
}
.label-all {
  margin: 0 0.57rem;
  width: 6.36rem;
  height: 7.57rem;
  position: relative;
}
.ball {
  position: absolute;
}
.radio {
  border-radius: 50%;
  position: absolute;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
}
.btn {
  width: 4.1rem;
  height: 0.88rem;
  background: linear-gradient(
    45deg,
    rgba(255, 209, 0, 1),
    rgba(255, 215, 33, 1)
  );
  box-shadow: 0 0.05rem 0.16rem 0 rgba(221, 191, 54, 0.09),
    0 0.13rem 0.33rem 0 rgba(170, 140, 6, 0.08);
  border-radius: 0.44rem;
  margin: 0.9rem auto 0;
  font-size: 0.32rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 0.88rem;
}
/* 圆 */
.radio1-1 {
  width: 2.12rem;
  height: 2.12rem;
  background: rgba(254, 163, 163, 1);
  border: 0.12rem solid #fea3a3;
  font-size: 0.34rem;
  left: 1.01rem;
  top: 0;
}
.radio1-1cli {
  background: rgba(254, 163, 163, 0.2);
  color: rgba(254, 163, 163, 1);
}
.radio2-1 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(252, 177, 47, 1);
  border: 0.1rem solid rgba(252, 177, 47, 1);
  font-size: 0.34rem;
  left: 4.42rem;
  top: 0.45rem;
}
.radio2-1cli {
  background: rgba(252, 177, 47, 0.2);
  color: rgba(252, 177, 47, 1);
}
.radio2-2 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(129, 185, 247, 1);
  border: 0.1rem solid rgba(129, 185, 247, 1);
  font-size: 0.34rem;
  left: 2.19rem;
  top: 2.88rem;
}
.radio2-2cli {
  background: rgba(129, 185, 247, 0.2);
  color: rgba(129, 185, 247, 1);
}
.radio2-3 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(170, 219, 52, 1);
  border: 0.1rem solid rgba(170, 219, 52, 1);
  font-size: 0.34rem;
  left: 4.15rem;
  top: 2.45rem;
}
.radio2-3cli {
  background: rgba(170, 219, 52, 0.2);
  color: rgba(170, 219, 52, 1);
}
.radio2-4 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(77, 211, 250, 1);
  border: 0.1rem solid rgba(77, 211, 250, 1);
  font-size: 0.34rem;
}
.radio2-4cli {
  background: rgba(77, 211, 250, 0.2);
  color: rgba(77, 211, 250, 1);
}
.radio3-1 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 209, 0, 1);
  border: 0.08rem solid rgba(255, 209, 0, 1);
  font-size: 0.3rem;
  left: 3.09rem;
  top: 1.47rem;
}
.radio3-1cli {
  background: rgba(255, 209, 0, 0.2);
  color: rgba(255, 209, 0, 1);
}
.radio3-2 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 209, 0, 1);
  border: 0.08rem solid rgba(255, 209, 0, 1);
  font-size: 0.3rem;
  left: 0;
  top: 2.15rem;
}
.radio3-2cli {
  background: rgba(255, 209, 0, 0.2);
  color: rgba(255, 209, 0, 1);
}
.radio3-3 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(252, 177, 47, 1);
  border: 0.08rem solid rgba(252, 177, 47, 1);
  font-size: 0.3rem;
  left: 0.17rem;
  top: 4.96rem;
}
.radio3-3cli {
  background: rgba(252, 177, 47, 0.2);
  color: rgba(252, 177, 47, 1);
}
.radio3-4 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(231, 187, 251, 1);
  border: 0.08rem solid rgba(231, 187, 251, 1);
  font-size: 0.3rem;
  left: 1.72rem;
  top: 4.96rem;
}
.radio3-4cli {
  background: rgba(231, 187, 251, 0.2);
  color: rgba(231, 187, 251, 1);
}
.radio3-5 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(129, 185, 247, 1);
  border: 0.08rem solid rgba(129, 185, 247, 1);
  font-size: 0.3rem;
  left: 3.47rem;
  top: 5.4rem;
}
.radio3-5cli {
  background: rgba(129, 185, 247, 0.2);
  color: rgba(54, 141, 240, 1);
}
.radio3-6 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(254, 163, 163, 1);
  border: 0.08rem solid rgba(254, 163, 163, 1);
  font-size: 0.3rem;
  left: 4.88rem;
  top: 5.82rem;
}
.radio3-6cli {
  background: rgba(254, 163, 163, 0.2);
  color: rgba(254, 163, 163, 1);
}
.radio3-7 {
  width: 1.4rem;
  height: 1.4rem;
  background: #aadb34;
  border: 0.08rem solid #aadb34;
  font-size: 0.3rem;
}
.radio3-7cli {
  background: rgba(170, 219, 52, 0.2);
  color: rgba(170, 219, 52, 1);
}
.radio4-1 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(231, 187, 251, 1);
  border: 0.08rem solid rgba(231, 187, 251, 1);
  font-size: 0.28rem;
  left: 1.47rem;
  top: 2.19rem;
  line-height: 0.385rem;
}
.radio4-1cli {
  background: rgba(231, 187, 251, 0.2);
  color: rgba(231, 187, 251, 1);
}
.radio4-2 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 76, 100, 1);
  border: 0.08rem solid rgba(255, 76, 100, 1);
  font-size: 0.28rem;
  left: 0.76rem;
  top: 3.77rem;
  line-height: 0.385rem;
}
.radio4-2cli {
  background: rgba(255, 76, 100, 0.2);
  color: rgba(255, 76, 100, 1);
}
.radio4-3 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 76, 100, 1);
  border: 0.08rem solid rgba(255, 76, 100, 1);
  font-size: 0.28rem;
  left: 3.84rem;
  top: 4.24rem;
  line-height: 0.385rem;
}
.radio4-3cli {
  background: rgba(255, 76, 100, 0.2);
  color: rgba(255, 76, 100, 1);
}
.radio4-4 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(77, 211, 250, 1);
  border: 0.08rem solid rgba(77, 211, 250, 1);
  font-size: 0.28rem;
  left: 5.35rem;
  top: 4.05rem;
  line-height: 0.385rem;
}
.radio4-4cli {
  background: rgba(77, 211, 250, 0.2);
  color: rgba(77, 211, 250, 1);
}
.radio4-5 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(77, 211, 250, 1);
  border: 0.08rem solid rgba(77, 211, 250, 1);
  font-size: 0.28rem;
  left: 2.39rem;
  top: 6.52rem;
  line-height: 0.385rem;
}
.radio4-5cli {
  background: rgba(77, 211, 250, 0.2);
  color: rgba(77, 211, 250, 1);
}
</style>