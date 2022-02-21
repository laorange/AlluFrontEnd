<template>
  <h1>News</h1>
  <GroupsSelector></GroupsSelector>
  <NoticeBar></NoticeBar>

  <template v-if="!data.logList.length">
    <h3>No change in the last three days</h3>
  </template>
  <template v-else>
    <template v-for="log in data.logList" :key="log.log_id">
      <van-cell :title="Util.formatDate(log.update_time)" :icon="getLogIconName(log)"
                :center="true" class="ExamCard" :style="{'background-color': '#' + log.color, 'padding-left': '5px'}"
      >
        <template #label>
          <div style="color: black">{{ Util.formatTime(log.update_time) }}</div>
        </template>

        <template #value>
          <div style="color: black"> {{ log.description }}</div>
        </template>
      </van-cell>
    </template>
  </template>

</template>


<script setup>
import {
  computed,
  reactive,
} from "vue";

import GroupsSelector from "../Course/GroupsSelector.vue";
import Util from "../../assets/Util";
import NoticeBar from "../NoticeBar";
import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const getLogIconName = (logInstance) => {
  switch (logInstance.action) {
    case "Update":
      return "edit";
    case "Create":
      return "add-o";
    case "Delete":
      return "delete-o";
  }
};

const data = reactive({
  noticeList: computed(() => {
    let _noticeList = store.apiData.Notice;
    _noticeList.sort((a, b) => b.priority - a.priority);
    return _noticeList;
  }),
  logList: computed(() => {
    let _logs = store.filterCourseByGroups(undefined, store.filterCourseBySemester(undefined, store.apiData.CourseChangeLog));
    _logs.reverse();
    return _logs;
  }),
});
</script>

<style scoped>

</style>
