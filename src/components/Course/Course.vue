<template>
  <div class="Course">
    <h1>课表</h1>
  </div>
  <date-selector></date-selector>
  <group-selector></group-selector>

  <van-cell center title="周视图" value="在大屏幕设备上建议开启">
    <template #right-icon>
      <van-switch v-model="data.isWeekMode" size="24" inactive-color="#dcdee0"/>
    </template>
  </van-cell>

  <div class="Schedule">
    <template v-if="!data.isWeekMode">
      <div class="DaySchedule" v-for="date in data.dateList" :key="date.valueOf()" :style="data.CardWidth">
        <van-cell :value="Util.formatDate(date)" :style="{'border-radius': '4vh'}"/>
        <schedule></schedule>
        <schedule></schedule>
        <schedule></schedule>
        <schedule></schedule>
        <schedule></schedule>
      </div>
    </template>
    <template v-if="data.isWeekMode">
      <div class="DaySchedule" v-for="date in data.dateList" :key="date.valueOf()" :style="data.CardWidth">
        <van-cell :value="Util.formatDate(date)" :style="{'border-radius': '4vh'}"/>
        <schedule></schedule>
        <schedule></schedule>
        <schedule></schedule>
        <schedule></schedule>
        <schedule></schedule>
      </div>
    </template>

  </div>

</template>

<script setup>
import {
  reactive, onMounted, computed,
} from "vue";

import dayjs from "dayjs";
import DateSelector from "./DateSelector.vue";
import GroupSelector from "./GroupsSelector.vue";
import Schedule from "./Schedule.vue";
import Util from "../../assets/Util";
import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const data = reactive({
  isWeekMode: document.documentElement.clientWidth > 800,
  dateList: computed(() => {
    let _dateList = [];
    if (data.isWeekMode) {
      for (let count = 0; count < 7; count++) {
        _dateList.push(dayjs(store.date).add(count - dayjs(store.date).day() + 2, "day"));
      }
    } else {
      for (let count = 0; count < 2; count++) {
        _dateList.push(dayjs(store.date).add(count, "day"));
      }
    }
    return _dateList;
  }),
  CardWidth: computed(() => data.isWeekMode ? {width: "calc(14% - 14px)"} : {width: "calc(50% - 4px)"}),
});

onMounted(() => {
  // store.axiosGetDataFromApi("Course");
});
</script>

<style scoped>
.Schedule {
  display: flex;
  flex-direction: row;
}

.DaySchedule {
  flex: 1;

  border: #efefef 1px solid;
  /* padding-right: 10px; */
  flex-direction: column;
}
</style>
