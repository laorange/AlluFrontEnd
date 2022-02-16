<template>
  <grade-selector></grade-selector>
  <!-- ------------------ -->
  <div class="GroupSection">
    <van-field v-model="groupData.groupText" is-link readonly label="分组" :placeholder="store.semester?`选择分组`:`请先选择年级`"
               @click="groupData.showGroupPicker = !!store.semester" :center="true"/>
    <van-popup class="GradeSelectDialog" v-model:show="groupData.showGroupPicker" round position="center" :closeable="true">
      <van-checkbox-group v-model="store.groups">
        <van-checkbox v-for="group in groupData.groupsFiltered" class="GroupOption"
                      :key="group.group_id" :name="group">{{ group.name }}
        </van-checkbox>
      </van-checkbox-group>
    </van-popup>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  onBeforeUpdate, watch, onMounted,
} from "vue";

import GradeSelector from "./GradeSelector";

import {useCounterStore} from "../../store/counter";
import Util from "../../assets/Util";

const store = useCounterStore();

const groupData = reactive({
  groupsFiltered: computed(() => {
    function groupFilter(_group) {
      return (_group.semester === store.semester) || !store.semester;
    }

    return store.apiData.Group.filter(groupFilter);
  }),
  showGroupPicker: false,
  checkboxRefs: [],
});

groupData.groupText = computed(() => {
  // return groupData.checkedGroups.length > 0 ? groupData.checkedGroups.join("|") : "";
  return Util.getGroupsName(store.groups);
});

watch(() => groupData.checkedGroups, () => {
  store.groups = [];
  for (const checkedGroup of groupData.checkedGroups) {
    for (const apiGroup of store.apiData.Group) {
      if (apiGroup.name === checkedGroup) {
        store.groups.push(apiGroup.group_id);
      }
    }
  }
}, {deep: true});

watch(() => groupData.checkedGroups, () => {
  if (!groupData.showGroupPicker) {
    localStorage.setItem("groups", JSON.stringify(store.groups));
    // store.axiosGetDataFromApi("Course", {period: store.period, plan__groups: store.groups});
    store.axiosOneStopGetData();
  }
}, {deep: true});
</script>

<style>
.van-cell {
  display: flex;
  text-align: center;
  border-radius: 4vh;
  margin-top: 1vh;
}

.van-field__control {
  text-align: center;
}

.van-cell__title {
  flex: 1;
  text-align: center;
}

.GradeSelectDialog {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.GroupOption {
  width: 95%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

van-checkbox-group {
  width: 300px;
}

/*
.GradeSection, .GroupSection{
  display: flex;
  align-items: inherit;
  justify-content: space-between;
  text-align: center;
} */
</style>
