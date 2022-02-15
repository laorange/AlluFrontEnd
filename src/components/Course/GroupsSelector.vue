<template>
  <grade-selector></grade-selector>
  <!-- ------------------ -->
  <div class="GroupSection">
    <van-field v-model="groupData.groupText" is-link readonly label="分组" :placeholder="store.semester?`选择分组`:`请先选择年级`"
               @click="groupData.showGroupPicker = !!store.semester" :center="true"/>
    <van-popup v-model:show="groupData.showGroupPicker" round position="bottom" :closeable="true">
      <van-checkbox-group v-model="groupData.checkedGroups">
        <van-cell-group inset>
          <van-cell class="GroupOption" v-for="(item, index) in groupData.groupList" clickable :key="item"
                    :title="`${item}`" @click="toggle(index)">
            <template #right-icon>
              <van-checkbox :name="item" :ref="el => groupData.checkboxRefs[index] = el" @click.stop/>
            </template>
          </van-cell>
        </van-cell-group>
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

const store = useCounterStore();

const groupData = reactive({
  groupList: computed(() => {
    let _groups = [];
    for (const _group of store.apiData.Group) {
      _groups.push(_group.name);
    }
    return _groups;
  }),
  checkedGroups: function () {
    let _checkedGroups = [];
    for (const group of store.groups) {
      for (const groupElement of store.api.Group) {
        if (group === groupElement.group_id) {
          _checkedGroups.push(groupElement.name);
        }
      }
    }
    return _checkedGroups;
  }(),
  showGroupPicker: false,
  checkboxRefs: [],
});

groupData.groupText = computed(() => {
  return groupData.checkedGroups.length > 0 ? groupData.checkedGroups.join("|") : "";
});

const toggle = (index) => {
  groupData.checkboxRefs[index].toggle();
};

onBeforeUpdate(() => {
  groupData.checkboxRefs.value = [];
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

watch(() => groupData.showGroupPicker, (showGroupPicker) => {
  if (!showGroupPicker) {
    localStorage.setItem("groups", JSON.stringify(store.groups));
    store.axiosGetDataFromApi("Course", {period: store.period, plan__groups: store.groups});
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

.GroupOption {
  width: 95%;
}

/*
.GradeSection, .GroupSection{
  display: flex;
  align-items: inherit;
  justify-content: space-between;
  text-align: center;
} */
</style>
