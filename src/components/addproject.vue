<template>
	<div class="procontainer">
		<div class="headtop">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>项目管理</el-breadcrumb-item>
				<el-breadcrumb-item>添加项目</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="projectform" style="margin-top: 1.875rem;">
			<el-form label-width="10%">
				<el-form-item prop="proname" label="项目名称">
					<el-input v-model="projectform.proname" placeholder="项目名称" style="width: 50%;"></el-input>
				</el-form-item>
				<el-form-item class="">
					<el-button type="primary">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				projectform: {
					proname: ''
				}
			}
		}

	}
</script>

<style>
</style>
