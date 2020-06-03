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
						<el-button type="primary">添加项目</el-button>
					</el-col>
				</el-row>
				<!-- 表格数据区域 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="name" label="项目名称 " width="180"></el-table-column>
					<el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
					<el-table-column prop="updatetime" label="更新时间"></el-table-column>
				</el-table>
				<!-- 分页区域 -->
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryinfo.pagenum"
					 :page-sizes="[20, 40, 60, 80]" :page-size="queryinfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
					 :total="total">
					</el-pagination>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryinfo: {
					query: '',
					pagenum: 1,
					pagesize: 10
				},
				tableData: [],
				total: 0
			}
		},
		created: function() {
			this.getprojects()
		},
		methods: {
			async getprojects() {
				const {
					data: res
				} = await this.$http.get('projects', {
					params: this.queryinfo
				})
				if (res.code != 200) {
					return this.$message.error("获取项目列表失败")
				}
				this.tableData = res.data.projects;
				this.total = res.data.total
			},

			handleSizeChange(newsize) {
				this.queryinfo.pagesize = newsize
				this.getprojects()
			},
			handleCurrentChange(newsize) {
				this.queryinfo.pagenum = newsize
				this.getprojects()
			}
		}

	}
</script>

<style>
	.tablecontaier {
		margin-top: 0.9375rem;
	}
</style>
