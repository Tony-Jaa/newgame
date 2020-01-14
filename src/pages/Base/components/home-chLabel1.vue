<template>
  <div v-if="$store.state.label_pro[0]" class="home-chLabel" :class="[hide?'home-chLabel-hide':'']">
    <p>选择4个萌宝最Q的特征</p>
    <!-- 问题 -->
    <!-- 0-6月  -->
    <div v-if="$store.state.age<=6" class="label-all">
      <div
        v-if="$store.state.label_pro[0]"
        class="radio radio1-1"
        style="left:0.54rem;top:0.47rem"
        :class="[label.includes($store.state.label_pro[0].id)?'radio1-1cli':'']"
        @click="addLabel($store.state.label_pro[0].id)"
      >
        <template v-if="$store.state.label_pro[0].labelName.length>=4">
          {{$store.state.label_pro[0].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[0].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[0].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[1]"
        class="radio radio2-1"
        style="left:4.24rem:top:1.07rem"
        :class="[label.includes($store.state.label_pro[1].id)?'radio2-1cli':'']"
        @click="addLabel($store.state.label_pro[1].id)"
      >
        <template v-if="$store.state.label_pro[1].labelName.length>=4">
          {{$store.state.label_pro[1].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[1].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[1].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[2]"
        class="radio radio2-3"
        style="left:2.5rem;top:2.03rem"
        :class="[label.includes($store.state.label_pro[2].id)?'radio2-3cli':'']"
        @click="addLabel($store.state.label_pro[2].id)"
      >
        <template v-if="$store.state.label_pro[2].labelName.length>=4">
          {{$store.state.label_pro[2].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[2].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[2].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[3]"
        class="radio radio2-2"
        style="left:1.69rem;top:3.82rem"
        :class="[label.includes($store.state.label_pro[3].id)?'radio2-2cli':'']"
        @click="addLabel($store.state.label_pro[3].id)"
      >
        <template v-if="$store.state.label_pro[3].labelName.length>=4">
          {{$store.state.label_pro[3].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[3].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[3].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[4]"
        class="radio radio3-3"
        style="left:2.89rem;top:0"
        :class="[label.includes($store.state.label_pro[4].id)?'radio3-3cli':'']"
        @click="addLabel($store.state.label_pro[4].id)"
      >
        <template v-if="$store.state.label_pro[4].labelName.length>=4">
          {{$store.state.label_pro[4].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[4].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[4].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[5]"
        class="radio radio5-1"
        :class="[label.includes($store.state.label_pro[5].id)?'radio5-1cli':'']"
        @click="addLabel($store.state.label_pro[5].id)"
      >
        <template v-if="$store.state.label_pro[5].labelName.length>=4">
          {{$store.state.label_pro[5].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[5].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[5].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[6]"
        class="radio radio3-1"
        style="left:0.1rem;top:4.31rem"
        :class="[label.includes($store.state.label_pro[6].id)?'radio3-1cli':'']"
        @click="addLabel($store.state.label_pro[6].id)"
      >
        <template v-if="$store.state.label_pro[6].labelName.length>=4">
          {{$store.state.label_pro[6].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[6].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[6].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[7]"
        class="radio radio3-5"
        style="left:4.69rem;top:3.28rem"
        :class="[label.includes($store.state.label_pro[7].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_pro[7].id)"
      >
        <template v-if="$store.state.label_pro[7].labelName.length>=4">
          {{$store.state.label_pro[7].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[7].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[7].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[8]"
        class="radio radio3-6"
        style="left:4.13rem;top:5.01rem"
        :class="[label.includes($store.state.label_pro[8].id)?'radio3-6cli':'']"
        @click="addLabel($store.state.label_pro[8].id)"
      >
        <template v-if="$store.state.label_pro[8].labelName.length>=4">
          {{$store.state.label_pro[8].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[8].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[8].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[9]"
        class="radio radio3-4"
        style="left:2.13rem;top:5.94rem"
        :class="[label.includes($store.state.label_pro[9].id)?'radio3-4cli':'']"
        @click="addLabel($store.state.label_pro[9].id)"
      >
        <template v-if="$store.state.label_pro[9].labelName.length>=4">
          {{$store.state.label_pro[9].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[9].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[9].labelName}}</template>
      </div>
    </div>
    <!-- 6-12月,1-2岁 -->
    <div v-if="$store.state.age>6&&$store.state.age<=24" class="label-all">
      <div
        v-if="$store.state.label_pro[0]"
        class="radio radio1-1"
        style="left:0.54rem;top:0.47rem"
        :class="[label.includes($store.state.label_pro[0].id)?'radio1-1cli':'']"
        @click="addLabel($store.state.label_pro[0].id)"
      >
        <template v-if="$store.state.label_pro[0].labelName.length>=4">
          {{$store.state.label_pro[0].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[0].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[0].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[1]"
        class="radio radio2-1"
        style="left:4.24rem:top:1.07rem"
        :class="[label.includes($store.state.label_pro[1].id)?'radio2-1cli':'']"
        @click="addLabel($store.state.label_pro[1].id)"
      >
        <template v-if="$store.state.label_pro[1].labelName.length>=4">
          {{$store.state.label_pro[1].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[1].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[1].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[2]"
        class="radio radio2-3"
        style="left:2.5rem;top:2.03rem"
        :class="[label.includes($store.state.label_pro[2].id)?'radio2-3cli':'']"
        @click="addLabel($store.state.label_pro[2].id)"
      >
        <template v-if="$store.state.label_pro[2].labelName.length>=4">
          {{$store.state.label_pro[2].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[2].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[2].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[3]"
        class="radio radio2-2"
        style="left:1.69rem;top:3.82rem"
        :class="[label.includes($store.state.label_pro[3].id)?'radio2-2cli':'']"
        @click="addLabel($store.state.label_pro[3].id)"
      >
        <template v-if="$store.state.label_pro[3].labelName.length>=4">
          {{$store.state.label_pro[3].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[3].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[3].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[4]"
        class="radio radio3-3"
        style="left:2.89rem;top:0"
        :class="[label.includes($store.state.label_pro[4].id)?'radio3-3cli':'']"
        @click="addLabel($store.state.label_pro[4].id)"
      >
        <template v-if="$store.state.label_pro[4].labelName.length>=4">
          {{$store.state.label_pro[4].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[4].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[4].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[5]"
        class="radio radio5-1"
        :class="[label.includes($store.state.label_pro[5].id)?'radio5-1cli':'']"
        @click="addLabel($store.state.label_pro[5].id)"
      >
        <template v-if="$store.state.label_pro[5].labelName.length>=4">
          {{$store.state.label_pro[5].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[5].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[5].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[6]"
        class="radio radio3-1"
        style="left:0.1rem;top:4.31rem"
        :class="[label.includes($store.state.label_pro[6].id)?'radio3-1cli':'']"
        @click="addLabel($store.state.label_pro[6].id)"
      >
        <template v-if="$store.state.label_pro[6].labelName.length>=4">
          {{$store.state.label_pro[6].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[6].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[6].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[7]"
        class="radio radio3-5"
        style="left:5.19rem;top:3.25rem"
        :class="[label.includes($store.state.label_pro[7].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_pro[7].id)"
      >
        <template v-if="$store.state.label_pro[7].labelName.length>=4">
          {{$store.state.label_pro[7].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[7].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[7].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[8]"
        class="radio radio5-2"
        style="left:3.74rem;top:3.65rem"
        :class="[label.includes($store.state.label_pro[8].id)?'radio5-2cli':'']"
        @click="addLabel($store.state.label_pro[8].id)"
      >
        <template v-if="$store.state.label_pro[8].labelName.length>=4">
          {{$store.state.label_pro[8].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[8].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[8].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[9]"
        class="radio radio3-6"
        style="left:4.24rem;top:5.09rem"
        :class="[label.includes($store.state.label_pro[9].id)?'radio3-6cli':'']"
        @click="addLabel($store.state.label_pro[9].id)"
      >
        <template v-if="$store.state.label_pro[9].labelName.length>=4">
          {{$store.state.label_pro[9].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[9].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[9].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[10]"
        class="radio radio3-4"
        style="left:2.13rem;top:5.94rem"
        :class="[label.includes($store.state.label_pro[10].id)?'radio3-4cli':'']"
        @click="addLabel($store.state.label_pro[10].id)"
      >
        <template v-if="$store.state.label_pro[10].labelName.length>=4">
          {{$store.state.label_pro[10].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[10].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[10].labelName}}</template>
      </div>
    </div>
    <!-- 2-3 -->
    <div v-if="$store.state.age>24&&$store.state.age<=36" class="label-all">
      <div
        v-if="$store.state.label_pro[0]"
        class="radio radio1-1"
        style="left:0.82rem;top:0"
        :class="[label.includes($store.state.label_pro[0].id)?'radio1-1cli':'']"
        @click="addLabel($store.state.label_pro[0].id)"
      >
        <template v-if="$store.state.label_pro[0].labelName.length>=4">
          {{$store.state.label_pro[0].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[0].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[0].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[1]"
        class="radio radio2-1"
        style="left:4.58rem;top:0.95rem"
        :class="[label.includes($store.state.label_pro[1].id)?'radio2-1cli':'']"
        @click="addLabel($store.state.label_pro[1].id)"
      >
        <template v-if="$store.state.label_pro[1].labelName.length>=4">
          {{$store.state.label_pro[1].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[1].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[1].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[2]"
        class="radio radio2-3"
        style="left:4.31rem;top:2.95rem"
        :class="[label.includes($store.state.label_pro[2].id)?'radio2-3cli':'']"
        @click="addLabel($store.state.label_pro[2].id)"
      >
        <template v-if="$store.state.label_pro[2].labelName.length>=4">
          {{$store.state.label_pro[2].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[2].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[2].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[3]"
        class="radio radio2-2"
        style="left:2.32rem;top:3.45rem"
        :class="[label.includes($store.state.label_pro[3].id)?'radio2-2cli':'']"
        @click="addLabel($store.state.label_pro[3].id)"
      >
        <template v-if="$store.state.label_pro[3].labelName.length>=4">
          {{$store.state.label_pro[3].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[3].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[3].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[4]"
        class="radio radio3-4"
        style="left:3.17rem;top:0.15rem"
        :class="[label.includes($store.state.label_pro[4].id)?'radio3-4cli':'']"
        @click="addLabel($store.state.label_pro[4].id)"
      >
        <template v-if="$store.state.label_pro[4].labelName.length>=4">
          {{$store.state.label_pro[4].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[4].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[4].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[5]"
        class="radio radio3-1"
        style="left:3.02rem;top:1.82rem"
        :class="[label.includes($store.state.label_pro[5].id)?'radio3-1cli':'']"
        @click="addLabel($store.state.label_pro[5].id)"
      >
        <template v-if="$store.state.label_pro[5].labelName.length>=4">
          {{$store.state.label_pro[5].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[5].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[5].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[6]"
        class="radio radio3-2"
        style="left:0;top:2.74rem"
        :class="[label.includes($store.state.label_pro[6].id)?'radio3-2cli':'']"
        @click="addLabel($store.state.label_pro[6].id)"
      >
        <template v-if="$store.state.label_pro[6].labelName.length>=4">
          {{$store.state.label_pro[6].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[6].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[6].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[7]"
        class="radio radio4-1"
        style="left:1.46rem;top:2.22rem"
        :class="[label.includes($store.state.label_pro[7].id)?'radio4-1cli':'']"
        @click="addLabel($store.state.label_pro[7].id)"
      >
        <template v-if="$store.state.label_pro[7].labelName.length>=4">
          {{$store.state.label_pro[7].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[7].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[7].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[8]"
        class="radio radio4-2"
        style="left:0.84rem;top:4.01rem"
        :class="[label.includes($store.state.label_pro[8].id)?'radio4-2cli':'']"
        @click="addLabel($store.state.label_pro[8].id)"
      >
        <template v-if="$store.state.label_pro[8].labelName.length>=4">
          {{$store.state.label_pro[8].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[8].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[8].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[9]"
        class="radio radio3-5"
        style="left:0.33rem;top:5.46rem"
        :class="[label.includes($store.state.label_pro[9].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_pro[9].id)"
      >
        <template v-if="$store.state.label_pro[9].labelName.length>=4">
          {{$store.state.label_pro[9].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[9].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[9].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[10]"
        class="radio radio3-4"
        style="left:1.88rem;top:5.43rem"
        :class="[label.includes($store.state.label_pro[10].id)?'radio3-4cli':'']"
        @click="addLabel($store.state.label_pro[10].id)"
      >
        <template v-if="$store.state.label_pro[10].labelName.length>=4">
          {{$store.state.label_pro[10].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[10].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[10].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[11]"
        class="radio radio3-5"
        style="left:3.22rem;top:6.48rem"
        :class="[label.includes($store.state.label_pro[11].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_pro[11].id)"
      >
        <template v-if="$store.state.label_pro[11].labelName.length>=4">
          {{$store.state.label_pro[11].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[11].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[11].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[12]"
        class="radio radio4-3"
        style="left:3.87rem;top:4.85rem"
        :class="[label.includes($store.state.label_pro[12].id)?'radio4-3cli':'']"
        @click="addLabel($store.state.label_pro[12].id)"
      >
        <template v-if="$store.state.label_pro[12].labelName.length>=4">
          {{$store.state.label_pro[12].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[12].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[12].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[13]"
        class="radio radio4-4"
        style="left:5.47rem;top:4.65rem"
        :class="[label.includes($store.state.label_pro[13].id)?'radio4-4cli':'']"
        @click="addLabel($store.state.label_pro[13].id)"
      >
        <template v-if="$store.state.label_pro[13].labelName.length>=4">
          {{$store.state.label_pro[13].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[13].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[13].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[14]"
        class="radio radio3-6"
        style="left:5.05rem;top:6.2rem"
        :class="[label.includes($store.state.label_pro[14].id)?'radio3-6cli':'']"
        @click="addLabel($store.state.label_pro[14].id)"
      >
        <template v-if="$store.state.label_pro[14].labelName.length>=4">
          {{$store.state.label_pro[14].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[14].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[14].labelName}}</template>
      </div>
    </div>
    <!-- 3-6 -->
    <div v-if="$store.state.age>36" class="label-all">
      <div
        v-if="$store.state.label_pro[0]"
        class="radio radio1-1"
        style="left:0.82rem;top:0"
        :class="[label.includes($store.state.label_pro[0].id)?'radio1-1cli':'']"
        @click="addLabel($store.state.label_pro[0].id)"
      >
        <template v-if="$store.state.label_pro[0].labelName.length>=4">
          {{$store.state.label_pro[0].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[0].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[0].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[1]"
        class="radio radio2-1"
        style="left:4.58rem;top:0.95rem"
        :class="[label.includes($store.state.label_pro[1].id)?'radio2-1cli':'']"
        @click="addLabel($store.state.label_pro[1].id)"
      >
        <template v-if="$store.state.label_pro[1].labelName.length>=4">
          {{$store.state.label_pro[1].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[1].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[1].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[2]"
        class="radio radio2-3"
        style="left:4.31rem;top:2.95rem"
        :class="[label.includes($store.state.label_pro[2].id)?'radio2-3cli':'']"
        @click="addLabel($store.state.label_pro[2].id)"
      >
        <template v-if="$store.state.label_pro[2].labelName.length>=4">
          {{$store.state.label_pro[2].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[2].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[2].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[3]"
        class="radio radio2-2"
        style="left:2.32rem;top:3.45rem"
        :class="[label.includes($store.state.label_pro[3].id)?'radio2-2cli':'']"
        @click="addLabel($store.state.label_pro[3].id)"
      >
        <template v-if="$store.state.label_pro[3].labelName.length>=4">
          {{$store.state.label_pro[3].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[3].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[3].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[4]"
        class="radio radio3-4"
        style="left:3.17rem;top:0.15rem"
        :class="[label.includes($store.state.label_pro[4].id)?'radio3-4cli':'']"
        @click="addLabel($store.state.label_pro[4].id)"
      >
        <template v-if="$store.state.label_pro[4].labelName.length>=4">
          {{$store.state.label_pro[4].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[4].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[4].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[5]"
        class="radio radio3-1"
        style="left:3.02rem;top:1.82rem"
        :class="[label.includes($store.state.label_pro[5].id)?'radio3-1cli':'']"
        @click="addLabel($store.state.label_pro[5].id)"
      >
        <template v-if="$store.state.label_pro[5].labelName.length>=4">
          {{$store.state.label_pro[5].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[5].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[5].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[6]"
        class="radio radio3-2"
        style="left:0;top:2.74rem"
        :class="[label.includes($store.state.label_pro[6].id)?'radio3-2cli':'']"
        @click="addLabel($store.state.label_pro[6].id)"
      >
        <template v-if="$store.state.label_pro[6].labelName.length>=4">
          {{$store.state.label_pro[6].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[6].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[6].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[7]"
        class="radio radio4-1"
        style="left:1.46rem;top:2.22rem"
        :class="[label.includes($store.state.label_pro[7].id)?'radio4-1cli':'']"
        @click="addLabel($store.state.label_pro[7].id)"
      >
        <template v-if="$store.state.label_pro[7].labelName.length>=4">
          {{$store.state.label_pro[7].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[7].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[7].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[8]"
        class="radio radio4-2"
        style="left:0.84rem;top:4.01rem"
        :class="[label.includes($store.state.label_pro[8].id)?'radio4-2cli':'']"
        @click="addLabel($store.state.label_pro[8].id)"
      >
        <template v-if="$store.state.label_pro[8].labelName.length>=4">
          {{$store.state.label_pro[8].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[8].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[8].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[9]"
        class="radio radio3-5"
        style="left:0.33rem;top:5.46rem"
        :class="[label.includes($store.state.label_pro[9].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_pro[9].id)"
      >
        <template v-if="$store.state.label_pro[9].labelName.length>=4">
          {{$store.state.label_pro[9].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[9].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[9].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[10]"
        class="radio radio3-4"
        style="left:1.88rem;top:5.43rem"
        :class="[label.includes($store.state.label_pro[10].id)?'radio3-4cli':'']"
        @click="addLabel($store.state.label_pro[10].id)"
      >
        <template v-if="$store.state.label_pro[10].labelName.length>=4">
          {{$store.state.label_pro[10].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[10].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[10].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[11]"
        class="radio radio3-5"
        style="left:3.42rem;top:6.31rem"
        :class="[label.includes($store.state.label_pro[11].id)?'radio3-5cli':'']"
        @click="addLabel($store.state.label_pro[11].id)"
      >
        <template v-if="$store.state.label_pro[11].labelName.length>=4">
          {{$store.state.label_pro[11].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[11].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[11].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[12]"
        class="radio radio4-3"
        style="left:3.87rem;top:4.85rem"
        :class="[label.includes($store.state.label_pro[12].id)?'radio4-3cli':'']"
        @click="addLabel($store.state.label_pro[12].id)"
      >
        <template v-if="$store.state.label_pro[12].labelName.length>=4">
          {{$store.state.label_pro[12].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[12].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[12].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[13]"
        class="radio radio4-4"
        style="left:5.47rem;top:4.65rem"
        :class="[label.includes($store.state.label_pro[13].id)?'radio4-4cli':'']"
        @click="addLabel($store.state.label_pro[13].id)"
      >
        <template v-if="$store.state.label_pro[13].labelName.length>=4">
          {{$store.state.label_pro[13].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[13].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[13].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[14]"
        class="radio radio3-6"
        style="left:5.05rem;top:6.2rem"
        :class="[label.includes($store.state.label_pro[14].id)?'radio3-6cli':'']"
        @click="addLabel($store.state.label_pro[14].id)"
      >
        <template v-if="$store.state.label_pro[14].labelName.length>=4">
          {{$store.state.label_pro[14].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[14].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[14].labelName}}</template>
      </div>
      <div
        v-if="$store.state.label_pro[15]"
        class="radio radio5-3"
        style="left:2.01rem;top:7.02rem"
        :class="[label.includes($store.state.label_pro[15].id)?'radio5-3cli':'']"
        @click="addLabel($store.state.label_pro[15].id)"
      >
        <template v-if="$store.state.label_pro[15].labelName.length>=4">
          {{$store.state.label_pro[15].labelName.slice(0,2)}}
          <br />
          {{$store.state.label_pro[15].labelName.slice(2,4)}}
        </template>
        <template v-else>{{$store.state.label_pro[15].labelName}}</template>
      </div>
    </div>
    <div class="btn" @click="next">下一步</div>
    <div style="font-size:0.32rem">
    </div>
  </div>
</template>
<script>
// import { Toast } from "vux";
export default {
  data() {
    return {
      circles: [], //实际要使用到的圆
      circleCenter: [], //存放临时圆心
      circleR: [1.06, 1.79, 1.4, 1.05], //存放固定半径
      times: 15,
      hide: false,
      label: [],
      toastShow: false, //提示框
      toastText: ""
    };
  },
  components: {
    // Toast
  },
  computed: {
    vuxLabel_pro() {
      return this.$store.state.label_pro;
    },
    hasvuxLabel_pro() {
      return this.vuxLabel_pro.length > 0 ? true : false;
    }
  },
  mounted() {
    this.createRadio();
  },
  methods: {
    createRadio() {
      if (this.times <= 0) {
        return;
      }
      let circleR = this.circleR[Math.round(Math.random() * (3 - 0)) + 0]; //圆的半径
      // let styleX = Math.random() * (6.36-circleR/2 - circleR/2 +1)+circleR/2;
      let styleX = this.randomNum(6.36 - circleR / 2, circleR / 2, 2);
      // styleX = styleX.toFixed(2); //圆的left
      // let styleY = Math.random() * (7.57-circleR/2 - circleR/2 +1)+circleR/2;
      let styleY = this.randomNum(7.57 - circleR / 2, circleR / 2, 2);
      // styleY = styleY.toFixed(2); //圆的top值
      let chonghe = false;
      for (let i = 0; i < this.circles.length; i++) {
        //  判断多个圆是否重合
        let circle = this.circles[i];
        if (
          Math.pow(circle.styleX - styleX, 2) +
            Math.pow(circle.styleY - styleY, 2) >
          Math.pow(circleR / 2 + circle.circleR / 2, 2)
        ) {
          continue;
        } else {
          chonghe = true;
          break;
        }
      }
      if (!chonghe) {
        // 都不重合
        this.circles.push({ styleX, styleY, circleR });
        this.times = this.times - 1;
        this.createRadio();
      } else {
        this.createRadio();
      }
    },
    // 随机数
    randomNum(maxNum, minNum, decimalNum) {
      // 获取指定范围内的随机数, decimalNum指小数保留多少位
      var max = 0,
        min = 0;
      minNum <= maxNum
        ? ((min = minNum), (max = maxNum))
        : ((min = maxNum), (max = minNum));
      switch (arguments.length) {
        case 1:
          return Math.floor(Math.random() * (max + 1));
          break;
        case 2:
          return Math.floor(Math.random() * (max - min + 1) + min);
          break;
        case 3:
          return (Math.random() * (max - min) + min).toFixed(decimalNum);
          break;
        default:
          return Math.random();
          break;
      }
    },
    // 下一步
    next() {
      if (this.label.length != 4) {
        this.$toast('请选择四个标签！')
        return;
      }
      this.hide = true;
      this.$store.commit("uploadLabel", { label: this.label, id: 0 }); //0代表问题,1代表标签
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
  z-index: 998;
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
.radio1-1 {
  width: 2.12rem;
  height: 2.12rem;
  background: rgba(129, 185, 247, 1);
  border: 0.12rem solid rgba(129, 185, 247, 1);
  font-size: 0.34rem;
  left: 1.01rem;
  top: 0;
}

.radio1-1cli {
  background: rgba(129, 185, 247, 0.2);
  color: rgba(129, 185, 247, 1);
}
.radio2-1 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(231, 187, 251, 1);
  border: 0.1rem solid rgba(231, 187, 251, 1);
  font-size: 0.34rem;
  left: 4.42rem;
  top: 0.45rem;
}
.radio2-1cli {
  background: rgba(231, 187, 251, 0.2);
  color: rgba(231, 187, 251, 1);
}
.radio2-2 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(252, 177, 47, 1);
  border: 0.1rem solid rgba(252, 177, 47, 1);
  font-size: 0.34rem;
  left: 2.19rem;
  top: 2.88rem;
}
.radio2-2cli {
  background: rgba(252, 177, 47, 0.2);
  color: rgba(252, 177, 47, 1);
}
.radio2-3 {
  width: 1.79rem;
  height: 1.79rem;
  background: rgba(77, 211, 250, 1);
  border: 0.1rem solid rgba(77, 211, 250, 1);
  font-size: 0.34rem;
  left: 4.15rem;
  top: 2.45rem;
}
.radio2-3cli {
  background: rgba(77, 211, 250, 0.2);
  color: rgba(77, 211, 249, 1);
}
.radio3-1 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 76, 100, 1);
  border: 0.08rem solid rgba(255, 76, 100, 1);
  font-size: 0.3rem;
  left: 3.09rem;
  top: 1.47rem;
}
.radio3-1cli {
  background: rgba(255, 76, 100, 0.2);
  color: rgba(255, 76, 100, 1);
}
.radio3-2 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(254, 163, 163, 1);
  border: 0.08rem solid rgba(254, 163, 163, 1);
  font-size: 0.3rem;
  left: 0;
  top: 2.15rem;
}
.radio3-2cli {
  background: rgba(254, 163, 163, 0.2);
  color: rgba(254, 163, 163, 1);
}
.radio3-3 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 209, 0, 1);
  border: 0.08rem solid rgba(255, 209, 0, 1);
  font-size: 0.3rem;
  left: 0.17rem;
  top: 4.96rem;
}
.radio3-3cli {
  background: rgba(255, 209, 0, 0.2);
  color: rgba(250, 207, 0, 1);
}
.radio3-4 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(170, 219, 52, 1);
  border: 0.08rem solid rgba(170, 219, 52, 1);
  font-size: 0.3rem;
  left: 1.72rem;
  top: 4.96rem;
}
.radio3-4cli {
  background: rgba(170, 219, 52, 0.2);
  color: rgba(170, 219, 52, 1);
}
.radio3-5 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 209, 0, 1);
  border: 0.08rem solid rgba(255, 209, 0, 1);
  font-size: 0.3rem;
  left: 3.47rem;
  top: 5.4rem;
}
.radio3-5cli {
  background: rgba(255, 209, 0, 0.2);
  color: rgba(255, 209, 0, 1);
}
.radio3-6 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(255, 76, 100, 1);
  border: 0.08rem solid rgba(255, 76, 100, 1);
  font-size: 0.3rem;
  left: 4.88rem;
  top: 5.82rem;
}
.radio3-6cli {
  background: rgba(255, 76, 100, 0.2);
  color: rgba(255, 76, 100, 1);
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
  background: rgba(129, 185, 247, 1);
  border: 0.08rem solid rgba(129, 185, 247, 1);
  font-size: 0.28rem;
  left: 0.76rem;
  top: 3.77rem;
  line-height: 0.385rem;
}
.radio4-2cli {
  background: rgba(129, 185, 247, 0.2);
  color: rgba(129, 185, 247, 1);
}
.radio4-3 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(254, 163, 163, 1);
  border: 0.08rem solid rgba(254, 163, 163, 1);
  font-size: 0.28rem;
  left: 3.84rem;
  top: 4.24rem;
  line-height: 0.385rem;
}
.radio4-3cli {
  background: rgba(254, 163, 163, 0.2);
  color: rgba(254, 163, 163, 1);
}
.radio4-4 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(252, 177, 47, 1);
  border: 0.08rem solid rgba(252, 177, 47, 1);
  font-size: 0.28rem;
  left: 5.35rem;
  top: 4.05rem;
  line-height: 0.385rem;
}
.radio4-4cli {
  background: rgba(252, 177, 47, 0.2);
  color: rgba(252, 177, 47, 1);
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
/* 新增 */
.radio5-1 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(254, 163, 163, 1);
  border: 0.08rem solid rgba(254, 163, 163, 1);
  font-size: 0.28rem;
  left: 0;
  top: 2.65rem;
  line-height: 0.385rem;
}
.radio5-1cli {
  background: rgba(254, 163, 163, 0.2);
  color: rgba(254, 163, 163, 1);
}
.radio5-2 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(129, 185, 247, 1);
  border: 0.08rem solid rgba(129, 185, 247, 1);
  font-size: 0.28rem;
  left: 0;
  top: 2.65rem;
  line-height: 0.385rem;
}
.radio5-2cli {
  background: rgba(129, 185, 247, 0.2);
  color: rgba(129, 185, 247, 1);
}
.radio5-3 {
  width: 1.4rem;
  height: 1.4rem;
  background: rgba(77, 211, 250, 1);
  border: 0.08rem solid rgba(77, 211, 250, 1);
  font-size: 0.28rem;
  line-height: 0.385rem;
}
.radio5-3cli {
  background: rgba(77, 211, 250, 0.2);
  color: rgba(77, 211, 250, 1);
}
</style>