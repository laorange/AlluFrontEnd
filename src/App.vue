<template>
  <router-view></router-view>
  <!-- <div class="tabbarAssistant"></div> -->
  <tabbar></tabbar>
  <loading-mask></loading-mask>
</template>

<script setup>
// import AlluHeader from "./components/AlluHeader.vue"
import Tabbar from "./components/Tabbar.vue";
import LoadingMask from "./components/LoadingMask";
import {onMounted, watch} from "vue";
import {useCounterStore} from "./store/counter";

const store = useCounterStore();

watch(() => store.semester, (newSemester) => {
  store.groups = [];
  parseInt(localStorage.getItem("semester"));
  store.axiosGetDataFromApi("Group", {period: store.period, semester: newSemester});
});



onMounted(() => {
  store.onMountedHook();
});

</script>

<style>
#app {
  background-color: #efefef;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* .tabbarAssistant {
  opacity: 0;
  height: 8vh;
} */
</style>
