<template>
  <template v-for="notice in data.noticeList" :key="notice.notice_id">
    <template v-if="notice.link">
      <van-notice-bar left-icon="guide-o" :text="notice.content" speed="50" mode="link" @click="redirect(notice.link)"/>
    </template>
    <template v-else>
      <van-notice-bar left-icon="volume-o" :text="notice.content" speed="50"/>
    </template>
  </template>
</template>

<script setup>
import {computed, reactive, defineProps} from "vue";

import {useCounterStore} from "../store/counter";

const store = useCounterStore();

const props = defineProps({
  threshold: {
    type: Number,
    default: 0,
  },
});

const data = reactive({
  noticeList: computed(() => {
    let _noticeList = store.apiData.Notice.filter(notice => notice.priority >= props.threshold);
    _noticeList.sort((a, b) => b.priority - a.priority);
    return _noticeList;
  }),
});

const redirect = (url) => {
  window.location.href = url;
};
</script>

<style scoped>
.van-notice-bar {
  margin: 5px;
  border-radius: 4vh;
}
</style>