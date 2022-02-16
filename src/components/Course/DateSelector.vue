<template>
  <div class="DateSelector">
    <van-cell title="选择日期" is-link :value="dateTxt" @click="show = true"/>
    <van-calendar v-model:show="show" @confirm="onConfirm" :show-confirm="false" :min-date="new Date(2022,1,1)"/>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import Util from "../../assets/Util";
import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const dateTxt = computed(() => Util.formatDate(store.date));
const show = ref(false);

const onConfirm = (value) => {
  show.value = false;
  store.date = value;
};

// onMounted(() => {
// 	console.log('---onMounted---')
// })
</script>

<style>
.van-cell__value {
  text-align: center;
  flex: 3;
}

.DateSelector > * {
  border-radius: 4vh;
  margin-top: 1vh;
}
</style>
