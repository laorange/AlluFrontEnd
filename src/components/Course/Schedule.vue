<template>
  <template v-for="(courses, _index) in data.courseDivided" :key="_index">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
      <template v-if="!courses.length">
        <van-swipe-item>
          <van-empty image="error"/>
        </van-swipe-item>
      </template>

      <template v-if="courses.length">
        <van-swipe-item class="ScheduleCard" v-for="course in courses" :key="course.course_id"
                        :style="{'background-color': '#'+course.color}">
          <div v-if="course.ch_name">{{ course.ch_name }}</div>
          <div v-if="course.en_name">{{ course.en_name }}</div>
          <div v-if="course.fr_name">{{ course.fr_name }}</div>
          <div v-if="course.date">{{ course.date }}</div>
          <div v-if="course.method">{{ course.method }}</div>
          <div>{{ course.groups }}</div>
          <div v-if="course.teacher_name">{{ course.teacher_name }}</div>
          <div v-if="course.room_name">{{ course.room_name }}</div>
          <div v-if="course.note">{{ course.note }}</div>
        </van-swipe-item>
      </template>
    </van-swipe>
  </template>
</template>

<script setup>
import {computed, defineProps, reactive} from "vue";
import Util from "../../assets/Util";
import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const props = defineProps({
  courses: {
    type: Array,
    default: [],
  },
});

const data = reactive({
  courseDivided: computed(() => {
    let _courseDivided = [[], [], [], [], []];
    for (const course of props.courses) {
      _courseDivided[course.which_lesson - 1].push({
        ...course,
        groups: Util.getGroupsName(store.apiData.Group.filter(group => JSON.parse(course.group_ids).indexOf(group.group_id) > -1)),
      });
    }
    return _courseDivided;
  }),
});
</script>

<style>
.my-swipe .van-swipe-item {
  margin-top: 1vh;
  color: #000;
  font-size: 20px;
  /*line-height: 200px;*/
  height: 40vh;
  text-align: center;
  background-color: white;
}

.ScheduleCard {
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: auto;
  flex-wrap: wrap;
  font-size: 1px;
}

.ScheduleCard div {
  /*height: 30px;*/
  padding: 2px;
}
</style>
