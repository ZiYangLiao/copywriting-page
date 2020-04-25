<template>
  <div :class="headClass">
    <div class="headerBox">
      <div class="logoBox">
        <div class="logo"></div>
      </div>
      <div class="handleBox">
        <span class="searchBtn" @click="showSearchInputFun">
          <span class="iconfont iconSearch"></span>
        </span>
        <input
          type="text"
          class="input searchInput"
          ref="searchInput"
          @focus="searchInputFocusFun"
          @blur="searchInputBlurFun"
          @keydown.enter="searchInputSubmitFun"
          v-model.trim="searchVal"
          :class="{'isShowInput':isShowInput}"
          maxlength="16"
          placeholder="请输入搜索内容"
        />
        <button class="btn createBtn">新建</button>
      </div>
      <!-- <button class="btn changeThemeBtn" @click="changeTheme">
			<template v-if="theme === 'light'">切换到暗黑模式</template>
			<template v-else>切换到明亮模式</template>
      </button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  props: {
    theme: {
      type: String,
      default: "light"
    }
  },
  computed: {
    headClass() {
      return this.theme === "light"
        ? "theme-light head-cont"
        : "theme-dark head-cont";
    }
  },
  data() {
    return {
      isShowInput: false, //搜索框是否展示
      searchVal: "asdasd"
    };
  },
  methods: {
    //修改主题
    changeTheme() {
      let theme = this.theme;
      if (theme === "light") theme = "dark";
      else theme = "light";
      this.$store.commit("baseConfig/SET_THEME", theme);
    },
    //点击搜索图标展开搜索框
    showSearchInputFun() {
      this.isShowInput = true;
      setTimeout(() => {
        this.$refs.searchInput.focus();
      }, 50);
    },
    //获取焦点显示搜索框
    searchInputFocusFun() {
      this.searchInput = "";
      this.isShowInput = true;
    },
    //失去焦点隐藏搜索框
    searchInputBlurFun() {
      this.searchInput = "";
      this.isShowInput = false;
    },
    //搜索框回车事件
    searchInputSubmitFun() {
      let val = this.searchVal;
      if (val.length > 0) {
        alert(this.searchVal);
      } else {
        alert("请输入内容");
        // this.$refs.searchInput.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.head-cont {
  position: relative;
  width: 100%;
  height: 2rem;
  transition: background-color 0.3s;

  &.theme-light {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
  }
  &.theme-dark {
    background: rgba(30, 30, 30, 0.85);
    box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
  }
  .headerBox {
    margin-left: 2rem;
    margin-right: 2rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .changeThemeBtn {
      position: absolute;
      right: 0;
      transform: translateX(100%);
    }
    .logoBox {
      width: 4.48rem;
      height: 100%;
      background: coral;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .handleBox {
      width: auto;
      height: 100%;
      min-width: 3.5rem;
      background: coral;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .searchBtn {
        width: 0.8rem;
        height: 0.76rem;
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 0.44rem;
        }
      }
      .searchInput {
        width: 0;
        visibility: hidden;
        padding: 0rem;
        transition: width 0.2s;
        &.isShowInput {
          visibility: inherit;
          width: 3rem;
          padding: 0.2rem;
        }
      }

      .createBtn {
        color: white;
        background: rgba(229, 95, 47, 1);
        box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
        margin-left: 0.2rem;
      }
    }
  }
}
</style>