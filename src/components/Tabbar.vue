<template>
	<van-tabbar v-model="tabbar_active" route>
		<van-tabbar-item to="/" icon="bookmark-o">课表</van-tabbar-item>
		<van-tabbar-item to="/pdc" icon="todo-list-o">PDC</van-tabbar-item>
		<van-tabbar-item to="/classroom" icon="wap-home-o">教室</van-tabbar-item>
		<van-tabbar-item to="/exam" icon="edit">考试</van-tabbar-item>
		<van-tabbar-item to="/news" icon="comment-o">消息</van-tabbar-item>
	</van-tabbar>
</template>

<script setup>
	import {
		Tabbar,
	} from 'vant';
	import 'vant/es/tabbar/style';
	import {
		ref
	} from "vue";

	let tabbar_active = ref(0);
</script>

<style>
</style>
