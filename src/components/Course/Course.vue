<template>
	<div class="Course">
		<h1>课表</h1>
	</div>
	<date-selector></date-selector>
	<group-selector></group-selector>

	<van-cell center title="周视图" value="在大屏幕设备上建议开启">
		<template #right-icon>
			<van-switch v-model="data.isWeekMode" size="24" inactive-color="#dcdee0" />
		</template>
	</van-cell>
	<div class="Schedule">
		<template v-if="!data.isWeekMode">
			<div class="DaySchedule" v-for="(count, index) in 2" :key="index" :style="{'width': '50%'}">
				<van-cell value="xxxx.xx.xx" :style="{'border-radius': '4vh'}" />
				<schedule></schedule>
				<schedule></schedule>
				<schedule></schedule>
				<schedule></schedule>
				<schedule></schedule>
			</div>
		</template>
		<template v-if="data.isWeekMode">
			<div class="DaySchedule" v-for="(count, index) in 7" :key="index" :style="{'width': '14%'}">
				<van-cell value="xxxx.xx.xx" :style="{'border-radius': '4vh'}" />
				<schedule></schedule>
				<schedule></schedule>
				<schedule></schedule>
				<schedule></schedule>
				<schedule></schedule>
			</div>
		</template>

	</div>


</template>

<script setup>
	import {
		reactive,
		computed
	} from "vue"

	import DateSelector from "./DateSelector.vue"
	import GroupSelector from "./GroupsSelector.vue"
	import Schedule from "./Schedule.vue"

	const data = reactive({
		isWeekMode: document.documentElement.clientWidth > 800,
	})
</script>

<style scoped>
	.Schedule {
		display: flex;
		flex-direction: row;
	}

	.DaySchedule {
		flex: 1;

		border: #000000 1px solid;
		/* padding-right: 10px; */
		flex-direction: column;
	}
</style>
