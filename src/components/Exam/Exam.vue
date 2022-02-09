<template>
	<h1>Exam</h1>
	<GroupsSelector></GroupsSelector>
	<div class="TableHead">
		<div class="TableHeadItem">Date</div>
		<div class="TableHeadItem">Remark</div>
		<div class="TableHeadItem">Subject</div>
	</div>
	<div class="TableBody" v-for="count in 5" :key="count">
		<div class="TableBodyItem">2022.06.0{{count*2-1}}</div>
		<div class="TableBodyItem">10:00-12:00</div>
		<div class="TableBodyItem">某个学科</div>
	</div>

</template>

<script setup>
	import {
		reactive
	} from "vue"

	import {
		Dialog
	} from 'vant';

	import GroupsSelector from "../Course/GroupsSelector.vue"

	// const data = reactive({
	// 		isPopupShow: false,
	// })

	// const showInfoDialog = (context) => {
	// 	Dialog.alert({
	// 		message: `${context.room}教室的第${context.which_lesson}节课`,
	// 	}).then(() => {
	// 		// on close
	// 	});
	// }
</script>

<style scoped>
	.TableHead {
		margin-top: 1.5rem;
	}

	.TableHead,
	.TableBody {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
		width: 100%;
		height: auto;
		font-size: 10px;
	}

	.TableHeadItem,
	.TableBodyItem {
		flex: 1;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
		border: black solid 1px;
	}
</style>
