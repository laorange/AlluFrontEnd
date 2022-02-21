<template>
  <div class="Course">
    <h1>第 {{ data.week }} 周</h1>
  </div>

  <NoticeBar :threshold="1000"></NoticeBar>

  <date-selector></date-selector>
  <group-selector></group-selector>

  <van-cell center title="周视图" value="在大屏幕设备上建议开启">
    <template #extra>
      <van-switch v-model="data.isWeekMode" size="24" inactive-color="#dcdee0"/>
    </template>
  </van-cell>

  <div class="Schedule">
    <div class="DaySchedule" v-for="schedule in data.scheduleList" :key="schedule.date.format() + data.isWeekMode" :style="data.CardWidth">
      <van-cell :value="Util.formatDate(schedule.date)" @click="store.date = schedule.date"
                :style="{'border-radius': '4vh', 'background-color': dayjs(store.date).isSame(dayjs(schedule.date), 'day')?'skyblue':'white'}"/>
      <schedule :courses="schedule.courses"></schedule>
    </div>
  </div>
</template>

<script setup>
import {
  reactive, computed,
} from "vue";

import dayjs from "dayjs";
import DateSelector from "./DateSelector.vue";
import GroupSelector from "./GroupsSelector.vue";
import Schedule from "./Schedule.vue";
import Util from "../../assets/Util";
import NoticeBar from "../NoticeBar";

import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const data = reactive({
  isWeekMode: document.documentElement.clientWidth > 800,
  scheduleList: computed(() => {
    let _dateList = [];
    if (data.isWeekMode) {
      for (let count = 1; count <= 7; count++) {
        _dateList.push(dayjs(store.date).add(count - Util.getIsoWeekDay(store.date), "day"));
      }
    } else {
      for (let count = 0; count < 2; count++) {
        _dateList.push(dayjs(store.date).add(count, "day"));
      }
    }
    let _infoList = [];
    for (const _date of _dateList) {
      _infoList.push({
            date: _date,
            courses: store.filterCourseByDateSemesterGroups(_date),
          },
      );
    }
    return _infoList;
  }),
  CardWidth: computed(() => data.isWeekMode ? {width: "calc(14% - 14px)"} : {width: "calc(50% - 4px)"}),
  week: computed(() => Math.floor((dayjs(store.date) - dayjs(store.semesterConfig.week1_monday_date)) / 604800000) + 1),
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
  flex-direction: column;
}
</style>
