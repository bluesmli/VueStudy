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
			<el-form label-width="10%" :model="projectform">
				<el-form-item prop="project_name" label="项目名称">
					<el-input v-model="projectform.project_name" placeholder="项目名称" style="width: 50%;"></el-input>
				</el-form-item>

				<el-form-item prop="project_desc" label="项目描述">
					<el-input v-model="projectform.project_desc" placeholder="项目描述" style="width: 50%;"></el-input>
				</el-form-item>


				<el-form-item class="">
					<el-button type="primary" @click="addpro">保存</el-button>
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
					project_name: null,
					project_desc: null
				}
			}
		},
		methods: {
			async addpro() {
				const {
					data: res
				} = await this.$http.post("addproject", this.projectform)
				if (res.code !== 200) return this.$message.error('添加项目失败！')
				this.$message.success('添加项目成功!')

			}
		}
	}
</script>

<style>
</style>
