<template>
    <div class="container">
        <div class="cardList">
            <div class="cardItem" v-for="item in list" :key="item.id">
                <!-- <img
                        src="https://i0.hdslb.com/bfs/sycp/creative_img/202004/acb95870369277e2f11e9635581793de.jpg"
                        alt
                />-->
                <div class="cardName">{{item.name}}</div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "aboutPage",
    data() {
        return {
            list: [
                { name: "aa1", id: "qweqweqweq11cfdaa1" },
                { name: "aa2", id: "qweqweqweq11cfdaa2" },
                { name: "aa3", id: "qweqweqweq11cfdaa3" },
                { name: "aa4", id: "qweqweqweq11cfdaa4" },
                { name: "aa5", id: "qweqweqweq11cfdaa5" },
                { name: "aa6", id: "qweqweqweq11cfdaa6" },
                { name: "aa7", id: "qweqweqweq11cfdaa7" },
                { name: "aa8", id: "qweqweqweq11cfdaa8" },
                { name: "aa9", id: "qweqweqweq11cfdaa9" },
                { name: "aa10", id: "qweqweqweq11cfdaa10" },
                { name: "aa11", id: "qweqweqweq11cfdaa11" },
                { name: "aa12", id: "qweqweqweq11cfdaa12" }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.cardList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .cardItem {
        width: 20%;
        height: 10rem;
        margin: 10px;
        background: rgba($color: #0073ff, $alpha: 1);
        border-radius: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        img {
            width: auto;
            height: 100%;
        }
        .cardName {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #ffffff;
			background-color: transparent;
			transform: translateY(100%);
			z-index: 2;
        }
        &:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            pointer-events: none;
            background: -webkit-gradient(
                linear,
                left top,
                left bottom,
                color-stop(62%, transparent),
                color-stop(63.94%, rgba(0, 0, 0, 0.00345888)),
                color-stop(65.89%, rgba(0, 0, 0, 0.014204)),
                color-stop(67.83%, rgba(0, 0, 0, 0.0326639)),
                color-stop(69.78%, rgba(0, 0, 0, 0.0589645)),
                color-stop(71.72%, rgba(0, 0, 0, 0.0927099)),
                color-stop(73.67%, rgba(0, 0, 0, 0.132754)),
                color-stop(75.61%, rgba(0, 0, 0, 0.177076)),
                color-stop(77.56%, rgba(0, 0, 0, 0.222924)),
                color-stop(79.5%, rgba(0, 0, 0, 0.267246)),
                color-stop(81.44%, rgba(0, 0, 0, 0.30729)),
                color-stop(83.39%, rgba(0, 0, 0, 0.341035)),
                color-stop(85.33%, rgba(0, 0, 0, 0.367336)),
                color-stop(87.28%, rgba(0, 0, 0, 0.385796)),
                color-stop(89.22%, rgba(0, 0, 0, 0.396541)),
                color-stop(91.17%, rgba(0, 0, 0, 0.4))
            );
            background: linear-gradient(
                180deg,
                transparent 62%,
                rgba(0, 0, 0, 0.00345888) 63.94%,
                rgba(0, 0, 0, 0.014204) 65.89%,
                rgba(0, 0, 0, 0.0326639) 67.83%,
                rgba(0, 0, 0, 0.0589645) 69.78%,
                rgba(0, 0, 0, 0.0927099) 71.72%,
                rgba(0, 0, 0, 0.132754) 73.67%,
                rgba(0, 0, 0, 0.177076) 75.61%,
                rgba(0, 0, 0, 0.222924) 77.56%,
                rgba(0, 0, 0, 0.267246) 79.5%,
                rgba(0, 0, 0, 0.30729) 81.44%,
                rgba(0, 0, 0, 0.341035) 83.39%,
                rgba(0, 0, 0, 0.367336) 85.33%,
                rgba(0, 0, 0, 0.385796) 87.28%,
                rgba(0, 0, 0, 0.396541) 89.22%,
                rgba(0, 0, 0, 0.4) 91.17%
            );
            opacity: 0;
            transform: translateY(100%);
        }
        &:hover:after, &:hover .cardName{
            animation: shadow 0.3s ease-in forwards;
        }
    }
}
@keyframes shadow {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0%);
    }
}
</style>
