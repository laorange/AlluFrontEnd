<template>
  <div style="display: none">LoadingMask Inserted</div>
  <van-notify v-model:show="data.isLoading" type="success" duration="0">
    正在拉取数据
  </van-notify>
</template>

<script setup>
// import {ref, watch} from "vue";
import {useCounterStore} from "../store/counter";
import {reactive, ref, watch} from "vue";
// import {Notify} from "vant";

const store = useCounterStore();

// const isLoading = ref(store.isLoading);
//
// watch(isLoading, (newStatus)=>{
//   if (newStatus) {
//     ({ type: 'primary', message: '通知内容' });
//   }
// })

let data = reactive({
  isLoading: false,
});

let timer = null;

watch(() => store.isLoading, (newStatus) => {
  if (!data.isLoading && newStatus) {
    data.isLoading = newStatus;
  } else if (data.isLoading && !newStatus) {
    setTimeout(() => {
      if (timer) {
        clearTimeout(timer); //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
      }
      timer = setTimeout(() => {
        data.isLoading = newStatus;
      }, 500);
    });
  }

});

</script>


<style scoped>

</style>