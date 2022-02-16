<template>
  <grade-selector></grade-selector>
  <!-- ------------------ -->
  <div class="GroupSection">
    <van-field v-model="groupData.groupText" is-link readonly label="分组" :placeholder="`选择分组`"
               v-show="groupData.groupsFiltered && groupData.groupsFiltered.length"
               @click="groupData.showGroupPicker = !!store.semester" :center="true"/>
    <van-popup class="GradeSelectDialog" v-model:show="groupData.showGroupPicker" round position="center"
               :closeable="true">
      <van-checkbox-group v-model="store.groups">
        <van-checkbox v-for="group in groupData.groupsFiltered" class="GroupOption"
                      :key="group.group_id" :name="group">{{ group.name ? group.name : "ALL" }}
        </van-checkbox>
      </van-checkbox-group>
    </van-popup>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
} from "vue";

import GradeSelector from "./GradeSelector";

import {useCounterStore} from "../../store/counter";
import Util from "../../assets/Util";

const store = useCounterStore();

const groupData = reactive({
  groupsFiltered: computed(() => {
    return store.apiData.Group.filter(_group => (_group.semester === store.semester) || !store.semester);
  }),
  showGroupPicker: false,
});

groupData.groupText = computed(() => {
  if (store.groups) {
    return Util.getGroupsName(store.groups);
  } else {
    return "选择分组";
  }
});

watch(() => groupData.checkedGroups, () => {
  // 用户选择了分组，将数据加入到store中
  store.groups = [];
  for (const checkedGroup of groupData.checkedGroups) {
    for (const apiGroup of store.apiData.Group) {
      if (apiGroup.name === checkedGroup) {
        store.groups.push(apiGroup.group_id);
      }
    }
  }
}, {deep: true});

watch(() => groupData.showGroupPicker, () => {
  // 用户关闭对话框时，将groups数据存入localstorage
  if (!groupData.showGroupPicker) {
    localStorage.setItem("groups", JSON.stringify(store.groups));
  }
});

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
