<template>
  <div
    class="main"
    v-show="show"
    @touchstart="start($event)"
    @touchmove="move($event)"
    @touchend="end($event)"
  >
    <div v-if="bountylist.length>0||brokList.length>0" class="top">
      <!-- <div class="move"></div> -->
      <div class="top-left" @click="changeActive(true)" :class="[active?'active':'']">
        <span v-bind="top1">奖励金</span>
      </div>
      <div class="top-right" @click="changeActive(false)" :class="[active?'':'active']">
        <span>佣金</span>
      </div>
    </div>
    <div v-show="active" v-for="(item, index) in bountylist" :key="index" class="item">
      <div class="left">
        <p class="applyMoney">{{item.applyMoney.toFixed(2)}}元</p>
        <p class="item-data">{{item.createdTime}} • {{item.bonusType==0?'VIP招募':'初级合伙人招募'}}</p>
        <p v-if="item.remark" class="item-remark">备注：{{item.remark}}</p>
      </div>
      <div v-if="item.status==0 || item.status==3" class="right">审核中</div>
      <div v-if="item.status==1" class="right success">已发放</div>
      <div v-if="item.status==2" class="right error">已驳回</div>
    </div>
    <div v-show="!active" v-for="(item, index) in brokList" :key="2-index" class="item">
      <div class="left">
        <p>{{item.applyMoney.toFixed(2)}}元</p>
        <p class="item-data">{{item.createdTime}}</p>
        <p v-if="item.remark" class="item-remark">备注：{{item.remark}}</p>
      </div>
      <div v-if="item.status==0 || item.status==3" class="right">审核中</div>
      <div v-if="item.status==1" class="right success">已发放</div>
      <div v-if="item.status==2" class="right error">已驳回</div>
    </div>
    <div v-if="bountylist.length<=0&&brokList.length<=0" class="null-data">
      <img src="../../../assets/images/yongjin-null.png" class="nulldata" />
      <div class="nulltext">暂时没有提取记录~</div>
      <div class="to-see" @click="back">去招募</div>
    </div>
    <div v-if="active&&bountylist.length<=0&&brokList.length>0" class="null-data">
      <img src="../../../assets/images/yongjin-null.png" class="nulldata" />
      <div class="nulltext">暂时没有提取记录~</div>
      <div class="to-see" @click="back">去招募</div>
    </div>
    <div v-if="!active&&brokList.length<=0&&bountylist.length>0" class="null-data">
      <img src="../../../assets/images/yongjin-null.png" class="nulldata" />
      <div class="nulltext">暂时没有提取记录~</div>
      <div class="to-see" @click="back">去招募</div>
    </div>
  </div>
</template>
<script>
import serviceApi from "../../../service/AExtension/serviceConfig";

export default {
  data() {
    return {
      bountylist: [], //奖励金
      brokList: [], //佣金
      active: true,
      show: false,
      startPos:{},
      top1:''
    };
  },
  mounted() {
    document.title = "佣金提取记录";
    this.getOutCashLastRecord(3);
      
    //   let left =  document.getElementsByTagName('span')[0].offsetLeft
    // document.getElementsByClassName('move')[0] = left+'px'
    
  },
  methods: {
    getOutCashLastRecord: function(type) {
      const _this = this;
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      const params = {
        promoterId: userId,
        type: String(type)
      };
      const url = `${serviceApi.getOutCashLastRecord}`;
      this.$http({
        method: "get",
        url: url,
        params: params,
        // timeout: 1000
      })
        .then(function(response) {
          if (response.data.status == "00") {
            if (type == 3) {
              _this.bountylist = response.data.resultMap.recordList;
              _this.getOutCashLastRecord(1);
            } else {
              _this.brokList = response.data.resultMap.recordList;
            }
            _this.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.back();
    },
    changeActive(data) {
      this.active = data;
    },
    getAngle(angx, angy) {
      return (Math.atan2(angy, angx) * 180) / Math.PI;
    },
    getDirection(startx, starty, endx, endy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0; //默认标记没有滑动
      //如果滑动距离太短
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
      }
      var angle = this.getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
        result = 1; //向上
      } else if (angle > 45 && angle < 135) {
        result = 2; //向下
      } else if (
        (angle >= 135 && angle <= 180) ||
        (angle >= -180 && angle < -135)
      ) {
        result = 3; //向左
      } else if (angle >= -45 && angle <= 45) {
        result = 4; //向右
      }
      return result;
    },
    start(event) {
      let tabbarRef = this.$refs.tabbarRef;
      let touchS = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
      this.startPos = {
        x: touchS.pageX,
        y: touchS.pageY,
        time: new Date()
      }; //取第一个touch的坐标值
    },
    move(event) {
      //当屏幕有多个touch或者页面被缩放过，就不执行move操作
      if (event.targetTouches.length > 1 || (event.scale && event.scale !== 1))
        return;
    },
    end(event) {
      let touchE = event.changedTouches[0];
      this.endPos = {
        x: touchE.pageX,
        y: touchE.pageY,
        timeStemp: new Date()
      };
      let direction = this.getDirection(
        this.startPos.x,
        this.startPos.y,
        this.endPos.x,
        this.endPos.y
      );
      console.log(direction)
      if(direction==3){
        this.active = false
      }
      if(direction==4){
        this.active=true
      }
    }
  }
};
</script>
<style scoped>
.main {
     padding-top: 0.32rem;
     width: 100%;
     height: 100%;
     background: rgba(250, 250, 250, 1);
}
 .item {
     width: 90.4vw;
     background: rgba(255, 255, 255, 1);
     box-shadow: 0rem 0.06rem 0.16rem 0rem rgba(83, 83, 83, 0.08);
     border-radius: 0.2rem;
     margin: 0 auto;
     margin-bottom: 0.24rem;
     padding: 0.26rem 0.32rem;
     display: flex;
     justify-content: space-between;
}
 .right {
     width: 1.38rem;
     height: 0.5rem;
     background: rgba(245, 211, 28, 0.3);
     border-radius: 0.1rem;
     font-size: 0.28rem;
     ;
     font-weight: 500;
     color: rgba(244, 200, 0, 1);
     text-align: center;
     line-height: 0.5rem;
}
 .error {
     background: rgba(255, 147, 137, 0.3);
     color: rgba(255, 112, 99, 1);
}
 .success {
     background: rgba(151, 198, 39, 0.3);
     color: rgba(151, 198, 39, 1);
}
 .null-data {
     margin-left: 50%;
     margin-top: 50%;
     width: 61.33vw;
     height: 41.6vw;
     position: relative;
     left: -30.66vw;
     top: -20.8vw;
     text-align: center;
}
 .nulldata {
     width: 61.33vw;
     height: 41.6vw;
     margin: 0 auto;
}
 .to-see {
     width: 28vw;
     height: 10.6vw;
     margin: 0 auto;
     margin-top: 3.4vw;
     background: rgba(255, 209, 0, 1);
     border-radius: 0.4rem;
     line-height: 10.6vw;
     text-align: center;
     font-size: 0.32rem;
     ;
     font-weight: bold;
     color: rgba(255, 255, 255, 1);
}
 .nulltext {
     font-size: 0.28rem;
     margin-top: 10vw;
     text-align: center;
     color: #999999;
}
 .top {
     width: 100%;
     height: 1.1rem;
     display: flex;
     border-bottom: 0.02rem solid rgba(0, 0, 0, 0.05);
     margin-bottom: 0.32rem;
     margin-top: -0.32rem;
     position: relative;
}
 .top > div {
     flex-grow: 1;
     text-align: center;
     font-size: 0.34rem;
     ;
     font-weight: bold;
     color: rgba(11, 11, 11, 0.4);
     line-height: 1.08rem;
     position: relative;
}
 .top > .active {
     color: rgba(255, 209, 0, 1);
}
 .top>.active>span{
     position: relative;
     display: inline-block;
}
 .top>.active>span::after {
     content: '';
     width: 100%;
     height: 0.1rem;
     display: block;
     position: absolute;
     background-color: rgba(255, 209, 0, 1);
     bottom: 0;
     left: 0;
}
 .item-data {
     font-size: 0.24rem;
     ;
     font-weight: 500;
     color: rgba(89, 87, 87, 0.6);
     line-height: 0.4rem;
}
 .item-remark {
     font-size: 0.28rem;
     ;
     font-weight: 500;
     color: rgba(16, 16, 16, 1);
}
.applyMoney{
  font-size:0.34rem;
  color:rgba(12,12,12,1);
  font-weight:bold;
}
</style>