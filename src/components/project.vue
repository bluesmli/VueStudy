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
						<el-input placeholder="请输入内容" v-model="queryinfo.query">
							<el-button slot="append" icon="el-icon-search" @click="getprojects"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="projectadd">添加项目</el-button>
					</el-col>
				</el-row>
				<!-- 表格数据区域 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="id" label="序号 " width="180"></el-table-column>
					<el-table-column prop="project_name" label="项目名称 " width="180"></el-table-column>
					<el-table-column prop="project_desc" label="项目描述 " width="180"></el-table-column>
					<el-table-column prop="create_time" label="创建时间" width="300"></el-table-column>
					<el-table-column prop="update_time" label="更新时间"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="success" @click="showEditDialog(scope.row.id)">编辑</el-button>
							<el-button type="danger" @click="delproByid(scope.row.id)">删除</el-button>
						</template>

					</el-table-column>
				</el-table>
				<!-- 分页区域 -->
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryinfo.pagenum"
					 :page-sizes="[20, 40, 60, 80]" :page-size="queryinfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
					 :total="total">
					</el-pagination>
				</div>
			</el-card>


			<el-dialog title="编辑" :visible.sync="dialogFormVisible">
				<el-form :model="proeditFrom">
					<el-form-item label="项目名称" :label-width="formLabelWidth">
						<el-input v-model="proeditFrom.project_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="项目描述" :label-width="formLabelWidth">
						<el-input v-model="proeditFrom.project_desc" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="editProject">确 定</el-button>
				</div>
			</el-dialog>

		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				queryinfo: {
					query: null,
					pagenum: 1,
					pagesize: 20
				},
				tableData: [],
				total: 0,
				delinfo: {
					id: null
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				proeditFrom: {}
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
			},
			projectadd() {
				this.$router.push("/projectadd")
			},
			async delproByid(id) {
				console.log(id)
				const confirmResult = await this.$confirm(
					'此操作将永久删除该项目, 是否继续?',
					'提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
				).catch(err => err)
				if (confirmResult !== 'confirm') {
					return this.$message.info('已取消删除！')
				}

				const {
					data: res
				} = await this.$http.post("delproByid", {
					"id": id
				})
				if (res.code != 200) {
					return this.$message.error("删除项目失败")
				}
				this.$message.success("删除成功")
				this.getprojects()
			},
			async showEditDialog(id) {

				const {
					data: res
				} = await this.$http.post("getproByid", {
					"id": id
				})
				if (res.code != 200) {
					return this.$message.error("查询项目失败")
				}
				this.proeditFrom = res.data.projects
				this.dialogFormVisible = true
			},
			async editProject() {
				const {
					data: res
				} = await this.$http.post("editProject", {
					"id": this.proeditFrom.id,
					"project_name": this.proeditFrom.project_name,
					"project_desc": this.proeditFrom.project_desc,
				})
				if (res.code != 200) {
					return this.$message.error("修改项目失败")
				}
				this.$message.success("修改项目成功")
				this.getprojects()
				this.dialogFormVisible = false


			}


		}

	}
</script>

<style>
	.tablecontaier {
		margin-top: 0;
	}
</style>
