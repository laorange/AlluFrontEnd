<template>
  <h1>Exam</h1>
  <date-selector></date-selector>
  <GroupsSelector></GroupsSelector>

  <template v-if="!data.examList.length">
    <h1>暂无考试安排</h1>
  </template>
  <template v-else>
    <template v-for="exam in data.examList" :key="exam.course_id">
      <van-cell :title="exam.date"
                :center="true" class="ExamCard" :style="{'background-color': '#' + exam.color}">
        <template #label>
          <div style="color: black">{{ exam.note }}</div>
        </template>
        <template #value>
          <div style="color: black">
            <div>{{ exam.ch_name }}</div>
            <div>{{ store.getGroupsTextOfCourse(exam) }}</div>
          </div>
        </template>
        <template #extra>
          <van-count-down :time="dayjs(exam.date) - dayjs(store.date)" v-if="dayjs(store.date).isBefore(dayjs(exam.date))">
            <template #default="timeData">
              <van-tag type="primary">{{ timeData.days + 1 }}天</van-tag>
            </template>
          </van-count-down>
          <van-tag type="success" v-if="dayjs(store.date).isAfter(dayjs(exam.date))">结束</van-tag>
          <van-tag type="danger" v-if="dayjs(store.date).isSame(dayjs(exam.date), 'day')">今天</van-tag>
        </template>
      </van-cell>
    </template>
  </template>

</template>

<script setup>
import {computed, reactive} from "vue";

import GroupsSelector from "../Course/GroupsSelector.vue";
import DateSelector from "../Course/DateSelector.vue";

import {useCounterStore} from "../../store/counter";
import dayjs from "dayjs";

const store = useCounterStore();
const data = reactive({
  examList: computed(() => store.filterCourseByGroups(undefined, store.filterCourseBySemester()).filter(course => course.method === "DS")),
});

</script>

<style>
.ExamCard {
  color: black;
}
</style>
