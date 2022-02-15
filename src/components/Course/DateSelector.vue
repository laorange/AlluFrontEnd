<template>
  <div class="DateSelector">
    <van-cell title="选择日期" is-link :value="dateTxt" @click="show = true"/>
    <van-calendar v-model:show="show" @confirm="onConfirm" :show-confirm="false" :min-date="new Date(2022,1,1)"/>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  // onMounted
  // defineProps
} from "vue";

import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

import {
  Calendar,
  Cell,
} from "vant";

const formatDate = (date) => {
  let _month = date.getMonth() + 1;
  let _day = date.getDate();
  return `${date.getUTCFullYear()}-${_month <= 9 ? "0" + _month : _month}-${_day <= 9 ? "0" + _day : _day}`;
};
const dateTxt = computed(() => formatDate(store.date));
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
