<template>
  <h1>Classroom</h1>
  <date-selector></date-selector>
  <div class="TableHead">
    <div class="TableHeadItem">教室</div>
    <div class="TableHeadItem">1</div>
    <div class="TableHeadItem">2</div>
    <div class="TableHeadItem">3</div>
    <div class="TableHeadItem">4</div>
    <div class="TableHeadItem">5</div>
  </div>

  <div class="TableBody" v-for="classroom in store.apiData.Classroom" :key="classroom.room_id">
    <div class="TableBodyItem">{{ classroom.name }}</div>

    <div class="TableBodyItem" v-for="whichLesson in 5" :key="whichLesson"
         @click="showInfoDialog(data.courseFilter(classroom.room_id, whichLesson), classroom, whichLesson)">
      <van-icon name="close" color="#FF5555" v-if="data.courseFilter(classroom.room_id, whichLesson).length"/>
      <van-icon name="passed" color="#009900" v-else/>
    </div>
  </div>

</template>

<script setup>
import {computed, reactive} from "vue";

import {Dialog} from "vant";

import DateSelector from "../Course/DateSelector.vue";

import Util from "../../assets/Util";
import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const data = reactive({
  isPopupShow: false,
  courseByWhichLesson: computed(() => {
    let courseByWhichLesson = {};
    let coursesThisDay = store.filterCourseByDate(store.date);
    courseByWhichLesson[1] = coursesThisDay.filter(course => course.which_lesson === 1);
    courseByWhichLesson[2] = coursesThisDay.filter(course => course.which_lesson === 2);
    courseByWhichLesson[3] = coursesThisDay.filter(course => course.which_lesson === 3);
    courseByWhichLesson[4] = coursesThisDay.filter(course => course.which_lesson === 4);
    courseByWhichLesson[5] = coursesThisDay.filter(course => course.which_lesson === 5);
    return courseByWhichLesson;
  }),
  courseFilter(roomId, whichLesson) {
    return data.courseByWhichLesson[whichLesson].filter(course => course.room === roomId);
  },
});

const showInfoDialog = (courses, classroom, whichLesson) => {
  let message = "";
  if (courses.length) {
    for (const course of courses) {
      message += `${course.ch_name ? course.ch_name + "\n" : ""}`;
      message += `${course.en_name ? course.en_name + "\n" : ""}`;
      message += `${course.fr_name ? course.fr_name + "\n" : ""}`;
      message += `${course.date}` + "\n";
      message += `${course.method}` + "\n";
      message += Util.getGroupsName(store.apiData.Group.filter(group => JSON.parse(course.group_ids).indexOf(group.group_id) > -1)) + "\n";
      message += `${course.teacher_name ? course.teacher_name + "\n" : ""}`;
      message += `${course.room_name ? course.room_name + "\n" : ""}`;
      message += `${course.note ? course.note + "\n" : ""}`;
    }
    Dialog.alert({
      title: `${classroom.name}的第${whichLesson}节课`,
      message,
    }).then(() => {
      // on close
    });
  }
};
</script>

<style scoped>
.TableHead {
  margin-top: 1.5rem;
}

.TableHead,
.TableBody {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 50px;
  /*padding-top: 30px;*/
  border-bottom: white 1px solid;
}

.TableHeadItem,
.TableBodyItem {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
