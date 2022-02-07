<template>
	<router-view></router-view>
	<tabbar></tabbar>
</template>

<script setup>
	// import AlluHeader from "./components/AlluHeader.vue"
	import Tabbar from "./components/Tabbar.vue";
	
</script>

<style>
	#app {
		background-color: #efefef;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
