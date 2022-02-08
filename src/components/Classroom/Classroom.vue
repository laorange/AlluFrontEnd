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
	<div class="TableBody" v-for="(item, index) in data.classrooms" clickable :key="item">
		<div class="TableBodyItem">{{item.name}}</div>

		<div class="TableBodyItem" v-for="count in 5" :key="count"
			@click="showInfoDialog({room:item.name,which_lesson:count})">
			<van-icon name="expand-o" v-if="(item.room_id + count * 8) % 5 > 3" />
			<van-icon name="passed" color="#009900" v-else />
		</div>
	</div>

</template>

<script setup>
	import {
		reactive
	} from "vue"

	import {
		Dialog
	} from 'vant';

	import DateSelector from "../Course/DateSelector.vue"

	const data = reactive({
		isPopupShow: false,
		classrooms: [{
				"room_id": 1,
				"name": "107"
			},
			{
				"room_id": 2,
				"name": "108"
			},
			{
				"room_id": 3,
				"name": "120"
			},
			{
				"room_id": 4,
				"name": "122"
			},
			{
				"room_id": 5,
				"name": "201"
			},
			{
				"room_id": 6,
				"name": "207"
			},
			{
				"room_id": 7,
				"name": "208"
			},
			{
				"room_id": 8,
				"name": "210"
			},
			{
				"room_id": 9,
				"name": "212"
			},
			{
				"room_id": 10,
				"name": "220"
			},
			{
				"room_id": 11,
				"name": "309"
			},
			{
				"room_id": 12,
				"name": "310"
			},
			{
				"room_id": 13,
				"name": "312"
			},
			{
				"room_id": 14,
				"name": "314"
			},
			{
				"room_id": 15,
				"name": "323"
			},
			{
				"room_id": 16,
				"name": "409"
			},
			{
				"room_id": 17,
				"name": "410"
			},
			{
				"room_id": 18,
				"name": "412"
			},
			{
				"room_id": 19,
				"name": "414"
			},
			{
				"room_id": 20,
				"name": "422"
			}
		],
	})

	const showInfoDialog = (context) => {
		Dialog.alert({
			message: `${context.room}教室的第${context.which_lesson}节课`,
		}).then(() => {
			// on close
		});
	}
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
		height: 30px;
		line-height: 30px;
	}

	.TableHeadItem,
	.TableBodyItem {
		flex: 1;
	}
</style>
