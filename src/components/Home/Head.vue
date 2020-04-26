<template>
    <div :class="headClass">
        <div class="headerBox">
            <div class="logoBox">
                <div class="logo"></div>
            </div>
            <div class="handleBox">
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
                <span class="searchBtn" @click="showSearchInputFun">
                    <span class="iconfont iconSearch"></span>
                </span>
                <button class="btn createBtn" @click.stop="createCardFun">新建</button>

                <button class="btn changeThemeBtn" @click="changeTheme">
                    <span class="iconfont iconDark" v-if="theme === 'light'"></span>
                    <span class="iconfont iconLight" v-else></span>
                </button>
            </div>
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
        },
        createCardFun: {
            type: Function,
            required: true
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
            searchVal: ""
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
	min-height: 50px;
	max-height: 100px;
    transition: background-color 0.3s;

    &.theme-light {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
        .iconfont {
            color: #110f24;
        }
        .changeThemeBtn {
            .iconfont {
                color: #a5a5ad;
            }
        }
    }
    &.theme-dark {
        background: rgba(30, 30, 30, 0.85);
        box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
        .iconfont {
            color: #a5a5ad;
        }
        .changeThemeBtn {
            .iconfont {
                color: #a5a5ad;
            }
        }
    }
    .headerBox {
        margin: 0 auto;
        max-width: 1240px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .changeThemeBtn {
			width: 1rem;
			margin-left: 10px;
            background-color: transparent;
            border: 1px solid #e1e1e1;
        }
        .logoBox {
            width: 4.48rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .handleBox {
            width: auto;
			height: 100%;
			box-sizing: center;
			padding-right: 0.3rem;
            min-width: 3.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .searchBtn {
                width: 0.8rem;
                height: 0.76rem;
				display: flex;
				margin-left: 5px;
                align-items: center;
                cursor: pointer;
                justify-content: center;
                .iconfont {
                    font-size: 0.44rem;
                }
            }
            .searchInput {
                width: 0;
                visibility: hidden;
                padding: 0rem;
                transition: width 0.2s;
                min-height: 30px;
                &.isShowInput {
                    visibility: inherit;
					width: 3rem;
					min-width: 110px;
                    padding: 0.2rem;
                }
            }

            .createBtn {
                width: 2.1rem;
                color: white;
                background: rgba(229, 95, 47, 1);
                box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(0, 0, 0, 0.1);
                margin-left: 0.2rem;
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .searchBtn{
		.iconfont{
			font-size: 1rem !important;
		}
	}
	.createBtn,.changeThemeBtn{
		border-radius: 4px;
		height: 30px !important;
		min-height: 30px !important;
		margin-left: 5px !important;
	}
}

</style>