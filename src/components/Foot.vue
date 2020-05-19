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
    methods: {
        cpClick() {
            window.open("http://beian.miit.gov.cn");
        }
    }
};
</script>

<style lang="scss" scoped>
.foot-content {
    position: relative;
    width: 100%;
    height: auto;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(51, 51, 51, 0.98);
    font-size: 0;
    .footerDetail {
        cursor: pointer;
        line-height: 20px;
        font-size: 14px;
        color: #999999;
        margin: 0;
    }
}
</style>