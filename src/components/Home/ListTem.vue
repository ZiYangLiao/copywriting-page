<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <ul class="cardList">
          <li
            class="cardItem"
            v-for="(item,index) in list"
            :key="index"
          >
            <img src="https://zt.msstatic.com/zt/img/20/02/04/158078263814850075485.jpg" alt />
            <div class="cardBox">
              <div class="cardText">{{item.text}}</div>
              <div class="cardTickBox" :style="{'color':item.tick.color}">
                <span v-for="tick in item.tick.text" :key="tick">#{{tick}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 弹窗容器 -->
    <div class="shadow-cont" @click="closeCreateCardFun" v-show="isShowShadowCont">
      <div class="shadowBox" @click.stop :class="{'rubberBand':isShowShadowCont}">
        <img src="https://zt.msstatic.com/zt/img/20/02/04/158078263814850075485.jpg" alt />
        <div class="cardBox">
          <div class="cardText">{{currentItem.text}}</div>
          <div class="cardTickBox" :style="{'color':currentItem.tick.color}">
            <span v-for="tick in currentItem.tick.text" :key="tick">#{{tick}}</span>
          </div>
        </div>
      </div>
      <div class="handleBtnBox"></div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"; //better scroll
export default {
  props: {
    isShowShadowCont: {
      //是否展示弹窗
      type: Boolean,
      default: false
    },
    closeCreateCardFun: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      pageNum: 1,
      isGetState: false, //是否加载数据中
      //   isShowShadowCont: false, //是否展示弹窗
      currentItem: {
        id: 1,
        text: "",
        tick: { text: [], color: "#F7B500" }
      },
      list: [
        {
          id: 1,
          text: "你自己觉得有，别人感觉不到你有，你就是没有",
          tick: { text: ["爱好"], color: "#F7B500" }
        },
        {
          id: 1,
          text: "心要大，脚要实",
          tick: { text: ["心里话"], color: "#44D7B6" }
        },
        {
          id: 1,
          text: "改变别人之前，先改变自己",
          tick: { text: ["奋斗"], color: "#0091FF" }
        },
        {
          id: 1,
          text:
            "你刚来可以抱怨你的手下是一群混蛋，但是如果过了一年你还在抱怨，那么你才是一个真正的混蛋",
          tick: { text: ["职场"], color: "#6DD400" }
        },
        {
          id: 1,
          text: "把你手头的工作当作吃饭来对待，你一定可以做好",
          tick: { text: ["认真"], color: "#32C5FF" }
        },
        {
          id: 1,
          text: "快乐工作，认真生活",
          tick: { text: ["态度"], color: "#FA6400" }
        },
        {
          id: 1,
          text: "你自己觉得有，别人感觉不到你有，你就是没有",
          tick: { text: ["爱好"], color: "#F7B500" }
        },
        {
          id: 1,
          text: "心要大，脚要实",
          tick: { text: ["心里话"], color: "#44D7B6" }
        },
        {
          id: 1,
          text: "改变别人之前，先改变自己",
          tick: { text: ["奋斗"], color: "#0091FF" }
        },
        {
          id: 1,
          text:
            "你刚来可以抱怨你的手下是一群混蛋，但是如果过了一年你还在抱怨，那么你才是一个真正的混蛋",
          tick: { text: ["职场"], color: "#6DD400" }
        },
        {
          id: 1,
          text: "把你手头的工作当作吃饭来对待，你一定可以做好",
          tick: { text: ["认真"], color: "#32C5FF" }
        },
        {
          id: 1,
          text: "快乐工作，认真生活",
          tick: { text: ["态度"], color: "#FA6400" }
        }
      ]
    };
  },
  mounted() {
    this.dataList = this.list.concat();
    this.list = this.list.concat(this.dataList);
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 2,
          tap: true,
          click: true,
          scrollX: false,
          mouseWheel: true
        });
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            // console.log(this.scroll.y);
            this.getListDataFun();
          }
        });
        this.scroll.on("touchend", pos => {
          // 下拉动作
          if (pos.y > 50) {
            // console.log(pos.y);
            this.getListDataFun();
          }
        });
        setTimeout(() => {
          //   console.log(this.scroll);
          this.scroll.refresh();
        }, 10);
      } else if (!this.$refs.wrapper) {
        return;
      } else {
        this.scroll.refresh();
      }
    });
  },
  methods: {
    //请求数据
    getListDataFun() {
      if (this.isGetState) return;
      this.isGetState = true;
      setTimeout(() => {
        if (this.pageNum >= 10) {
          return alert("没有更多了");
        }
        this.list = this.list.concat(this.dataList);
        this.pageNum += 1;
        this.isGetState = false;
      }, 500);
    },
    //卡片点击事件
    cardItemClickFun(i) {
      console.log(i);
      this.currentItem = this.list[i];
      //   this.showShadowContFun();
    },
    showShadowContFun() {
      this.isShowShadowCont = true;
    }
    // closeShadowContFun() {
    //   this.isShowShadowCont = false;
    // }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 1240px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: 1;
  .cardList {
    width: 100%;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .cardItem {
      width: 5rem;
      height: 3.6rem;
      border-radius: 0.16rem;
      background: chartreuse;
      margin-top: 0.48rem;
      margin-bottom: 0.48rem;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .cardBox {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 0.16rem;
        left: 0;
        top: 0;
        background: rgba(17, 15, 36, 0.69);
        display: flex;
        justify-content: space-between;
        // align-items: center;
        text-align: left;
        flex-direction: column;
        padding: 0.48rem;
        box-sizing: border-box;
        color: white;
        font-size: 0.32rem;
      }
    }
  }
}
.shadow-cont {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  .shadowBox {
    width: 17.46rem;
    height: 11.76rem;
    border-radius: 0.48rem;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .cardBox {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0.48rem;
      left: 0;
      top: 0;
      background: rgba(17, 15, 36, 0.69);
      display: flex;
      justify-content: space-between;
      // align-items: center;
      text-align: left;
      padding: 1.44rem;
      flex-direction: column;
      box-sizing: border-box;
      color: white;
      font-size: 0.96rem;
    }
  }
}
.rubberBand {
  animation: rubberBand 0.3s ease-in-out forwards;
}
@keyframes rubberBand {
  0% {
    -webkit-transform: scale3d(0, 0, 0);
    transform: scale3d(0.5, 0.5, 0.5);
    opacity: 0;
  }
  50% {
    -webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 1;
  }
}
</style>