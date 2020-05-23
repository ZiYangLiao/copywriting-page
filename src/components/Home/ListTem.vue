<template>
    <div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul class="cardList">
                    <li class="cardItem" v-for="(item,index) in homeList" :key="index">
                        <img
                            :src="item.imageUrl"
                            alt
                        />
                        <div class="cardBox">
                            <div class="cardText">{{item.content}}</div>
                            <div class="cardTickBox" :style="{'color':item.color}">
                                <span v-for="tick in item.labelBeanList" :key="tick.labelName">#{{tick.labelName}} </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="spinner-box" v-if="isGetState">
                <div class="pulse-container">
                    <div class="pulse-bubble pulse-bubble-1"></div>
                    <div class="pulse-bubble pulse-bubble-2"></div>
                    <div class="pulse-bubble pulse-bubble-3"></div>
                </div>
            </div>
        </div>

        <!-- 弹窗容器 -->
        <div class="shadow-cont" @click="closeCardFun" v-show="isShowShadowCont">
            <div class="shadowBox" @click.stop :class="{'rubberBand':isShowShadowCont}">
                <img :src="currentItem.imageUrl" alt />
                <div class="cardBox">
                    <div class="cardText">
                        <textarea
                            type="text"
                            v-model.trim="currentItem.content"
                            placeholder="在这里分享你的想法"
                            maxlength="80"
                        ></textarea>
                    </div>
                    <div class="cardTickBox" :style="{'color':currentItem.color}">
                        <input
                            type="text"
                            v-model.trim="currentItem.label"
                            maxlength="20"
                            placeholder="想法标签(多个用 '#' 分隔)"
                        />
                    </div>
                </div>
            </div>
            <div class="handleBtnBox">
				<el-button class="popBtn" @click.stop="closeCardFun" plain>取消</el-button>
				<el-button class="popBtn" type="primary"  @click.stop="createCardFun" plain>确认</el-button>
                <!-- <button class="btn popBtn" @click.stop="closeCardFun">取消</button> -->
                <!-- <button class="btn popBtn" @click.stop="createCardFun">确认</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"; //better scroll

import { Tuzki } from "@jsUrl/common.js";
import { Message, Loading } from "element-ui";
import { mapGetters } from 'vuex';

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
    computed:{
        ...mapGetters({
            pageNumber:'pageNumber',
            totalPage:'totalPage',
            searchVal:'searchVal',
            homeList:'homeList'
        }),
        randowImg(){
            let imgUrl = '';
            imgUrl = Tuzki.getImgUrl();
            return imgUrl;
        }
    },
    data() {
        return {
            pageNum: 1,
            isGetState: false, //是否加载数据中
            //   isShowShadowCont: false, //是否展示弹窗
            currentItem: {
                imageUrl:Tuzki.getImgUrl(),
                color:Tuzki.getColor(),
                content: "",
                label: "",
                labelBeanList: []
            },
        };
    },
    mounted() {
        //或去默认数据
        this.getListAjaxFun()
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
                        // this.getListDataFun();
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
            console.log(this.pageNumber,'pageNumber')
            console.log(this.totalPage,'totalPage')
            console.log(this.totalPage === this.pageNumber)
            let pageNumber = this.pageNumber;
            if (this.pageNumber >= this.totalPage) {
                pageNumber = this.totalPage;
                this.isGetState = false;
                return  Message({
                        message: "没有更多了",
                        type: "info"
                    });
            }
            pageNumber += 1;
            this.getListAjaxFun(this.searchVal, pageNumber);
            this.isGetState = false;
        },
        getListAjaxFun(val='', page=0){
            //获取历史消息
			this.$store.dispatch('homeFun/loadList',{content:val,pageNumber:page}).then(() => {
			})

        },
        //卡片点击事件
        cardItemClickFun(i) {
            this.currentItem = this.list[i];
            //   this.showShadowContFun();
		},
		//关闭
        closeCardFun() {
            this.currentItem.content = "";
			this.currentItem.label = "";
            this.currentItem.imageUrl = Tuzki.getImgUrl();
			this.currentItem.color = Tuzki.getColor();
            this.closeCreateCardFun();
		},
		//添加弹窗
        createCardFun() {
            if (this.currentItem.content.length === 0) {
                return Message({
                    message: "请输入想要分享的内容",
                    type: "error"
                });
            }
            if (this.currentItem.label.length === 0) {
                return Message({
                    message: "请输入想要分享的内容标签",
                    type: "error"
                });
            }
            let label = this.currentItem.label;
            let labelBeanList = [];
            if (this.currentItem.label.indexOf("#") === 0) {
                label = this.currentItem.label.slice(1);
            }else{
                this.currentItem.label = '#'+this.currentItem.label;
            }
            label.split("#").forEach(item=>{
                labelBeanList.push({
                    labelName:item
                })
            })

            let obj = {
                content: this.currentItem.content,
                label:this.currentItem.label,
                labelBeanList:labelBeanList,
                color:this.currentItem.color,
                imageUrl:this.currentItem.imageUrl
            };
            let loading = Loading.service({ fullscreen: true });

            this.$store.dispatch('homeFun/addItem', obj).then(()=>{
                loading.close();
                this.closeCardFun();
                Message({
                    message:'创建成功',
                    type: "success"
                });
            }).catch((err)=>{
                loading.close();
                this.closeCardFun();
                Message({
                    message: err || '创建失败',
                    type: "error"
                });
            })
            
        },
        // 获取随机色
        getColor() {
            let r = parseInt(Math.random() * 256);
            let g = parseInt(Math.random() * 256);
            let b = parseInt(Math.random() * 256);

            return  `rgba(${r},${g},${b},1)`;
        }
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
    .spinner-box {
        position: absolute;
        bottom: 0;
        left: 0;
        background: transparent;
        z-index: 99;
        width: 100%;
        height: 80px;
    }
    .cardList {
        width: 100%;
        padding: 0 0.3rem 80px;
        box-sizing: border-box;
        display: flex;
        justify-content: start;
        position: relative;
        flex-wrap: wrap;

        .cardItem {
            // width: 5rem;
            // height: 3.6rem;
            width: 290px;
            // max-width: 290px;
            height: 196px;
            border-radius: 8px;
            background: chartreuse;
			margin-top: 24px;
			margin-left: 12px;
            position: relative;
            overflow: hidden;
            animation: cardItemShow 0.3s ease-in-out forwards;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .handleBtnBox {
        margin-top: 40px;
        .popBtn {
            margin: 0 20px;
            width: 100px;
            letter-spacing: 2px;
            box-shadow: 0px 1px 2px rgba($color: #000000, $alpha: 0.2),
                2px 0px 2px rgba($color: #000000, $alpha: 0.2);
        }
    }
    .shadowBox {
        width: 17.46rem;
		height: 11.76rem;
		max-width: 600px;
		max-height: 405px;
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
            padding: 0.44rem;
            flex-direction: column;
            box-sizing: border-box;
            color: white;
            font-size: 0.96rem;
            .cardText {
                flex: 1;
                textarea {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    resize: none;
                    padding: 0.3rem;
                    box-sizing: border-box;
                    color: white;
                    font-size: 0.6rem;
                    &::placeholder {
                        color: white;
                    }
                }
            }
            .cardTickBox {
                height: 2rem;
                max-height: 80px;
                min-height: 40px;
                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    color: inherit;
                    box-sizing: border-box;
                    padding: 0.3rem;
                    font-size: 0.5rem;
                    background: transparent;
                    &::placeholder {
                        color: inherit;
                    }
                }
            }
        }
    }
}
.rubberBand {
    animation: rubberBand 0.3s ease-in-out forwards;
}
@media screen and (max-width: 1240px) {
	.cardList {
        padding: 0 20px !important;
        justify-content: space-around !important;
    }
}
@media screen and (max-width: 750px) {
    .cardList {
        padding: 0 20px !important;
        justify-content: start !important;
    }
    .cardItem {
		flex: 0 0 100%;
		margin-left: 0 !important;
        height: 11rem !important;
    }
    .cardBox {
		padding: 20px !important;
		font-size: 1rem !important;
    }
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
@keyframes cardItemShow {
    0% {
        transform: translateY(80%);
        opacity: 0.2;
    }
    // 50% {
    //     -webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    //     animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    // }
    100% {
        // -webkit-transform: scale3d(1, 1, 1);
        // transform: scale3d(1, 1, 1);
        // -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        // animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform: translateY(0%);
        opacity: 1;
    }
}
</style>