<template>
  <div class="GradeSection">
    <van-field v-model="gradeData.grade" is-link readonly label="年级" placeholder="选择年级"
               @click="gradeData.showGradePicker = true" :center="true"/>
    <van-popup v-model:show="gradeData.showGradePicker" round position="bottom">
      <van-picker :columns="gradeData.columns" @cancel="gradeData.showGradePicker = false"
                  @confirm="onGradeConfirm"/>
    </van-popup>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
} from "vue";

import {useCounterStore} from "../../store/counter";

const store = useCounterStore();

const gradeData = reactive({
  columns: ["大一", "大二", "大三", "大四", "研一", "研二", "研三", "不限"],
  grade: computed(() => gradeData.columns[parseInt((store.semester + 1) / 2) - 1]),
  showGradePicker: false,
});

const onGradeConfirm = (value) => {
  // gradeData.grade = value;
  store.semester = 2 - (store.semesterConfig.current_period % 2) + 2 * gradeData.columns.indexOf(value);
  store.groups = [];
  gradeData.showGradePicker = false;
};

watch(() => store.semester, (newSemester) => {
  // semester变更，将数据存入localstorage
  localStorage.setItem("semester", `${newSemester}`);
});
</script>

<style scoped>

</style>