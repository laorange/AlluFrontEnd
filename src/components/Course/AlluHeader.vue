<template>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
			text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
			<el-sub-menu index="1">
				<template #title>课表</template>
				<el-menu-item index="1-1">大一</el-menu-item>
				<el-menu-item index="1-2">大二</el-menu-item>
				<el-menu-item index="1-3">大三</el-menu-item>
				<el-menu-item index="1-4">大四</el-menu-item>
				<el-menu-item index="1-5">研一</el-menu-item>
				<el-menu-item index="1-6">研二</el-menu-item>
			</el-sub-menu>
			<el-sub-menu index="2">
				<template #title>PDC</template>
				<el-menu-item index="2-1">大一</el-menu-item>
				<el-menu-item index="2-2">大二</el-menu-item>
				<el-menu-item index="2-3">大三</el-menu-item>
				<el-menu-item index="2-4">大四</el-menu-item>
				<el-menu-item index="2-5">研一</el-menu-item>
				<el-menu-item index="2-6">研二</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="3">教室</el-menu-item>
			<el-menu-item index="4">考试</el-menu-item>
		</el-menu>
</template>

<script setup>
	import {
		ElMenu,
		ElMenuItem,
		ElAffix
	} from "element-plus";
	import {
		ref
	} from 'vue'

	const activeIndex = ref('1')
	const handleSelect = (key, keyPath) => {
		console.log(key, keyPath)
	}
</script>

<style scoped>
	.el-menu-demo {
		justify-content: center;
	}
</style>
