<template>
	<h1>News</h1>
	<GroupsSelector></GroupsSelector>
	<div class="TableHead">
		<div class="TableHeadItem">Time</div>
		<div class="TableHeadItem">News</div>
	</div>
	<div class="TableBody" v-for="(item, index) in data.changeLogs" :key="index">
		<div class="TableBodyItem">{{item.update_time}}</div>
		<div class="TableBodyItem">{{item.description}}</div>
	</div>

</template>

<script setup>
	import {
		reactive
	} from "vue"

	import DateSelector from "../Course/DateSelector.vue"
	import GroupsSelector from "../Course/GroupsSelector.vue"

	const data = reactive({
		changeLogs: [{
				"log_id": 1,
				"plan": {
					"plan_id": 1,
					"teacher": {
						"teacher_id": 6,
						"name": "关静",
						"slug": "guan-jing",
						"validity": true
					},
					"info": {
						"info_id": 12,
						"period": 30,
						"semester": 2,
						"code": "60411121",
						"ch_name": "高等数学（2）",
						"en_name": "Advanced Mathematics II",
						"fr_name": null,
						"type": 2
					},
					"groups": [{
						"group_id": 25,
						"period": 30,
						"semester": 2,
						"name": "AB班"
					}],
					"method": "Course"
				},
				"action": "Create",
				"description": "新增：2022-01-27第1,2节课的高等数学（2）_理论课_关静",
				"update_time": "2022-01-27 11:37:49"
			},
			{
				"log_id": 2,
				"plan": {
					"plan_id": 1,
					"teacher": {
						"teacher_id": 6,
						"name": "关静",
						"slug": "guan-jing",
						"validity": true
					},
					"info": {
						"info_id": 12,
						"period": 30,
						"semester": 2,
						"code": "60411121",
						"ch_name": "高等数学（2）",
						"en_name": "Advanced Mathematics II",
						"fr_name": null,
						"type": 2
					},
					"groups": [{
						"group_id": 25,
						"period": 30,
						"semester": 2,
						"name": "AB班"
					}],
					"method": "Course"
				},
				"action": "Create",
				"description": "新增：2022-03-01第7,8节课的高等数学（2）_理论课_关静",
				"update_time": "2022-01-27 11:38:09"
			},
			{
				"log_id": 3,
				"plan": {
					"plan_id": 1,
					"teacher": {
						"teacher_id": 6,
						"name": "关静",
						"slug": "guan-jing",
						"validity": true
					},
					"info": {
						"info_id": 12,
						"period": 30,
						"semester": 2,
						"code": "60411121",
						"ch_name": "高等数学（2）",
						"en_name": "Advanced Mathematics II",
						"fr_name": null,
						"type": 2
					},
					"groups": [{
						"group_id": 25,
						"period": 30,
						"semester": 2,
						"name": "AB班"
					}],
					"method": "Course"
				},
				"action": "Create",
				"description": "新增：2022-02-15第1,2节课的高等数学（2）_理论课_关静",
				"update_time": "2022-02-06 15:31:19"
			},
			{
				"log_id": 4,
				"plan": {
					"plan_id": 2,
					"teacher": {
						"teacher_id": 9,
						"name": "刘成盼",
						"slug": "liu-cheng-pan",
						"validity": true
					},
					"info": {
						"info_id": 15,
						"period": 30,
						"semester": 2,
						"code": "60411324",
						"ch_name": "大学英语（2）",
						"en_name": "College English 2",
						"fr_name": null,
						"type": 5
					},
					"groups": [{
							"group_id": 31,
							"period": 30,
							"semester": 2,
							"name": "PA"
						},
						{
							"group_id": 33,
							"period": 30,
							"semester": 2,
							"name": "PB"
						}
					],
					"method": "Course"
				},
				"action": "Create",
				"description": "新增：2022-02-08第3,4节课的大学英语（2）_理论课_刘成盼",
				"update_time": "2022-02-08 11:54:35"
			},
			{
				"log_id": 5,
				"plan": {
					"plan_id": 3,
					"teacher": {
						"teacher_id": 8,
						"name": "刘东亮",
						"slug": "liu-dong-liang",
						"validity": true
					},
					"info": {
						"info_id": 15,
						"period": 30,
						"semester": 2,
						"code": "60411324",
						"ch_name": "大学英语（2）",
						"en_name": "College English 2",
						"fr_name": null,
						"type": 5
					},
					"groups": [{
							"group_id": 35,
							"period": 30,
							"semester": 2,
							"name": "PC"
						},
						{
							"group_id": 37,
							"period": 30,
							"semester": 2,
							"name": "PD"
						}
					],
					"method": "Course"
				},
				"action": "Create",
				"description": "新增：2022-02-08第9,10节课的大学英语（2）_理论课_刘东亮",
				"update_time": "2022-02-08 11:55:43"
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
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 10px;
	}

	.TableHeadItem,
	.TableBodyItem {
		flex: 1;
		text-align: center;
		flex-wrap: wrap;
	}
</style>
