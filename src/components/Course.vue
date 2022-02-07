<template>
	<div class="Course">
		<h1>课表</h1>
		<van-cell title="您想要查看哪天的课表" :value="date" @click="show = true" />
		<van-calendar v-model:show="show" @confirm="onConfirm" :show-confirm="false" />
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue"

	import {
		Calendar,
		Cell,
	} from 'vant';

	const formatDate = (date) => `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const date = ref(formatDate(new Date()));
	const show = ref(false);

	const onConfirm = (value) => {
		show.value = false;
		date.value = formatDate(value);
	};

	onMounted(() => {
		console.log('---onMounted---')
	})
</script>

<style>
	.van-cell__value {
		text-align: center;
	}

	.Course>* {
		display: flex;
		justify-content: center;
		border-radius: 5vh;
	}
</style>
