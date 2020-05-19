<template>
    <div class="foot-content">
        <div class="inner">
            <p class="footerDetail">反馈邮箱：{{email}}</p>
            <p class="footerDetail" @click="cpClick">{{cpNumber}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Foot",
    data() {
        return {
            email: "408467434@qq.com",
            cpNumber: "蜀ICP备20012813号"
        };
    },
    methods:{
        cpClick(){
            window.open('http://beian.miit.gov.cn')
        }
    }
};
</script>

<style lang="scss" scoped>
.foot-content {
    position: relative;
    width: 100%;
    height: auto;
    padding: 0.3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(51, 51, 51, 0.98);
    line-height: 0.6rem;
    font-size: 0.3rem;
    color: #999999;
    .footerDetail{
        cursor: pointer;
    }
}
</style>