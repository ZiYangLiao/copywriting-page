<template>
  <div :class="homeClass">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <v-head :theme="theme" />
    <div class="list-cont">
        <ListTem />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Head from "@/components/Home/Head.vue";
import ListTem from "@/components/Home/ListTem.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    "v-head": Head,
    ListTem
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      theme: "theme"
    }),
    homeClass() {
      return this.theme === "light"
        ? "theme-light home-cont"
        : "theme-dark home-cont";
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.home-cont {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  &.theme-light {
    background:rgba(246,246,248,1);
  }
  &.theme-dark {
    background:rgba(26,26,26,1);
  }
  .list-cont{
      width: 100%;
      position: relative;
      flex: 1;
      
  }
}
</style>