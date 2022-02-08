<template>
	<div class="Course">
		<h1>课表</h1>
	</div>
	<date-selector></date-selector>
	<group-selector></group-selector>
	<schedule></schedule>
	<schedule></schedule>
	<schedule></schedule>
	<schedule></schedule>
	<schedule></schedule>
</template>

<script setup>
	// import {
	// 	ref,
	// 	onMounted
	// } from "vue"

	import DateSelector from "./DateSelector.vue"
	import GroupSelector from "./GroupsSelector.vue"
	import Schedule from "./Schedule.vue"
</script>

<style>

</style>