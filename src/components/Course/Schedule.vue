<template>
	<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		<van-swipe-item>Card 1</van-swipe-item>
		<van-swipe-item>Card 2</van-swipe-item>
		<van-swipe-item>Card 3</van-swipe-item>
		<van-swipe-item>Card 4</van-swipe-item>
	</van-swipe>
</template>

<script>
	// import {defineProps} from "vue"

	// props = defineProps({

	// })
</script>

<style>
	.my-swipe .van-swipe-item {
		margin-top: 1vh;
		color: #fff;
		font-size: 20px;
		line-height: 200px;
		text-align: center;
		background-color: #39a9ed;
	}
</style>
