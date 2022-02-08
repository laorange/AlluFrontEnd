<template>
	<div class="GradeSection">
		<van-field v-model="gradeData.grade" is-link readonly label="年级" placeholder="选择年级"
			@click="gradeData.showGradePicker = true" :center="true" />
		<van-popup v-model:show="gradeData.showGradePicker" round position="bottom">
			<van-picker :columns="gradeData.columns" @cancel="gradeData.showGradePicker = false"
				@confirm="onGradeConfirm" />
		</van-popup>
	</div>
	<!-- ------------------ -->
	<div class="GroupSection">
		<van-field v-model="groupData.groupText" is-link readonly label="分组" placeholder="选择分组"
			@click="groupData.showGroupPicker = true" :center="true" />
		<van-popup v-model:show="groupData.showGroupPicker" round position="bottom" :closeable="true">
			<van-checkbox-group v-model="groupData.checked">
				<van-cell-group inset>
					<van-cell class="GroupOption" v-for="(item, index) in groupData.groupList" clickable :key="item"
						:title="`复选框 ${item}`" @click="toggle(index)">
						<template #right-icon>
							<van-checkbox :name="item" :ref="el => groupData.checkboxRefs[index] = el" @click.stop />
						</template>
					</van-cell>
				</van-cell-group>
			</van-checkbox-group>
		</van-popup>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onBeforeUpdate
	} from 'vue';

	const gradeData = reactive({
		columns: ['大一', '大二', '大三', '大四', '研一', '研二'],
		grade: "",
		showGradePicker: false,
	})

	const onGradeConfirm = (value) => {
		gradeData.grade = value
		gradeData.showGradePicker = false
	}

	// ---------------
	const groupData = reactive({
		groupList: ["PA", "PB", "PC", "PD"],
		showGroupPicker: false,
		checked: [],
		checkboxRefs: [],
	})

	groupData.groupText = computed(() => {
		return groupData.checked.length > 0 ? groupData.checked.join(" | ") : "选择分组"
	})

	const toggle = (index) => {
		groupData.checkboxRefs[index].toggle();
	};

	onBeforeUpdate(() => {
		groupData.checkboxRefs.value = [];
	});
</script>

<style>
	.van-cell {
		display: flex;
		text-align: center;
		border-radius: 4vh;
		margin-top: 1vh;
	}
	
	.van-field__control{
		text-align: center;
	}
	
	.van-cell__title {
		flex: 1;
		text-align: center;
	}

	.GroupOption {
		width: 95%;
	}

	/* 
	.GradeSection, .GroupSection{
		display: flex;
		align-items: inherit;
		justify-content: space-between;
		text-align: center;
	} */
</style>
