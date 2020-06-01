<template>
	<div class="procontainer">
		<div class="headtop">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>项目管理</el-breadcrumb-item>
				<el-breadcrumb-item>项目列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="tablecontaier">
			<el-card>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-input placeholder="请输入内容">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary">添加商品</el-button>
					</el-col>
				</el-row>
				<!-- 表格数据区域 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="name" label="项目名称 " width="180"></el-table-column>
					<el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
					<el-table-column prop="updatetime" label="更新时间"></el-table-column>
				</el-table>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
						createtime: '2016-05-02 16:09:14',
						name: 'RCBP-TSM',
						updatetime: '2016-05-02 16:09:14'
					},
					{
						createtime: '2016-05-02 16:09:14',
						name: 'RCBP-TSM',
						updatetime: '2016-05-02 16:09:14'
					}
				]
			}
		}
	}
</script>

<style>
	.tablecontaier {
		margin-top: 0.9375rem;
	}
</style>
