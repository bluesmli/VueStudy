<template>
	<div class="apicontainer">
		<div class="headtop">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>测试用例管理</el-breadcrumb-item>
				<el-breadcrumb-item>用例列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="tablecontaier">
			<el-card>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-input placeholder="请输入内容" v-model="queryinfo.query">
							<el-button slot="append" icon="el-icon-search" @click="getcases()"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="dialogFormVisible = true">添加用例</el-button>
					</el-col>
				</el-row>
				<!-- 表格数据区域 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="id" label="序号 " width="180"></el-table-column>
					<el-table-column prop="case_name" label="用例名称 " width="180"></el-table-column>
					<el-table-column prop="case_desc" label="用例描述 " width="180"></el-table-column>
					<el-table-column prop="create_time" label="创建时间"></el-table-column>
					<el-table-column prop="update_time" label="更新时间"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="primary" @click="editShowDialog(scope.row.id)">编辑</el-button>
							<el-button type="primary" @click="stepShowDialog(scope.row.id)">步骤</el-button>
							<el-button type="danger" @click="delcaseByid(scope.row.id)">删除</el-button>
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

			<!-- 添加dialog -->
			<el-dialog width="60%" :title="dialogTitle" :visible.sync="dialogFormVisible" @close="addDialogClosed">
				<el-form :model="caseform" ref="caseformRef">
					<el-form-item label="用例名称" :label-width="formLabelWidth" prop="case_name">
						<el-input v-model="caseform.case_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用例描述" :label-width="formLabelWidth" prop="case_desc">
						<el-input v-model="caseform.case_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<div>
						<el-button @click="dialogFormVisible=false">取 消</el-button>
						<el-button type="primary" @click="addcase()">确定</el-button>
					</div>
				</div>
			</el-dialog>


			<!--编辑框dialog -->
			<el-dialog width="60%" :title="eidtTitle" :visible.sync="editdialogFormVisible">
				<el-form :model="editform" ref="editform">
					<el-form-item label="用例名称" :label-width="formLabelWidth">
						<el-input v-model="editform.case_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用例描述" :label-width="formLabelWidth">
						<el-input v-model="editform.case_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<div>
						<el-button @click="editdialogFormVisible=false">取 消</el-button>
						<el-button type="primary" @click="savecase()">确定</el-button>
					</div>
				</div>
			</el-dialog>


			<!-- 添加步骤 -->
			<el-dialog width="80%" :title="stepDialogTitle" :visible.sync="stepFormVisible">
				<el-form :model="stepform" ref="stepformRef" :inline="true">
					<el-button type="primary" @click="addStep()">新增步骤</el-button>
					<div style="padding-top: 20px;" v-for="(item, index) in stepform.apicollections" :key="index">
						<el-form-item :prop="'apicollections.' + index + '.id'">
							<el-input v-model="item.id" autocomplete="off" placeholder="编号"></el-input>
						</el-form-item>

						<el-form-item>
							<el-select v-model="item.belongpro" placeholder="所属项目" @change="getapiBypro($event)" :prop="'apicollections.' + index + '.belongpro'">
								<el-option v-for="item in stepform.projects" :key="item.project_name" :label="item.project_name" :value="item.project_name" />
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-select v-model="item.api" placeholder="选择接口" :prop="'apicollections.' + index + '.api'">
								<el-option v-for="item in stepform.apis" :key="item.apiname" :label="item.apiname" :value="item.apiname" />
							</el-select>
						</el-form-item>
						<el-form-item :prop="'apicollections.' + index + '.code'">
							<el-input v-model="item.code" autocomplete="off" placeholder="code校验,如200"></el-input>
						</el-form-item>

						<el-form-item :prop="'apicollections.' + index + '.message'">
							<el-input v-model="item.message" autocomplete="off" placeholder="message校验,如SUCCESS"></el-input>
						</el-form-item>

						<el-form-item :prop="'apicollections.' + index + '.data'">
							<el-input v-model="item.data" autocomplete="off" placeholder="data校验"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button @click.prevent="removeStep(item)" type="danger">删除</el-button>
						</el-form-item>

					</div>
					<div v-show="caseResultarea">
						<el-form-item>
							<el-input class="resultarea" :rows="7" style="width: 82.1875rem;background-color: aquamarine;" v-model="stepform.debugresult"
							 type="textarea" autocomplete="off"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<div>
						<el-button @click="quit()">取 消</el-button>
						<el-button type="success" @click="debugCase(stepform.caseid)">运行</el-button>
						<el-button type="primary" @click="saveSteps()">保存</el-button>
					</div>
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
					query: "",
					pagenum: 1,
					pagesize: 20
				},
				total: 0,
				dialogTitle: null,
				eidtTitle: null,
				tableData: null,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				stepFormVisible: false,
				stepDialogTitle: null,
				editdialogFormVisible: null,
				caseResultarea: false,
				caseform: {
					case_name: null,
					case_desc: null
				},
				editform: {
					id: null,
					case_name: null,
					case_desc: null
				},
				stepform: {
					caseid: null,
					projects: [],
					belongpro: null,
					api: null,
					apis: [],
					apicollections: [],
					debugresult: null
				},
			}
		},
		created: function() {
			this.getcases()
		},
		methods: {
			async getapiBypro(e) {
				var val = e;
				//console.log(val);
				const {
					data: res
				} = await this.$http.post("getapiBypro", {
					"project_name": e
				});
				if (res.code != 200) {
					return this.$message.error("获取项目数据失败")
				};
				console.log(res.data.apis)
				this.stepform.apis = res.data.apis
			},

			//添加步骤
			async stepShowDialog(id) {
				this.caseResultarea = false
				this.stepform.debugresult = null
				this.stepFormVisible = true
				this.stepDialogTitle = "步骤编辑"
				this.stepform.caseid = id
				//获取项目数据
				const {
					data: res
				} = await this.$http.get("allprojects");
				if (res.code != 200) {
					return this.$message.error("获取项目数据失败")
				};
				this.stepform.projects = res.data.projects

				//获取步骤数据
				const {
					data: response
				} = await this.$http.post("getSteps", {
					"id": id
				});
				if (response.code != 200) {
					return this.$message.error("获取用例步骤数据失败")
				};
				this.stepform.apicollections = response.data
			},
			async getcases() {
				const {
					data: res
				} = await this.$http.get('cases', {
					params: this.queryinfo
				})
				if (res.code != 200) {
					return this.$message.error("获取接口列表失败")
				}
				this.tableData = res.data.cases;
				this.total = res.data.total
			},
			handleSizeChange(newsize) {
				this.queryinfo.pagesize = newsize
				this.getapis()
			},
			handleCurrentChange(newsize) {
				this.queryinfo.pagenum = newsize
				this.getapis()
			},

			removeStep(item) {
				var index = this.stepform.apicollections.indexOf(item)
				if (index !== -1) {
					this.stepform.apicollections.splice(index, 1)
				}
			},

			addStep() {
				this.stepform.apicollections.push({
					id: '',
					belongpro: '',
					api: '',
					code: '',
					message: '',
					data: ''
				});
				console.log(this.stepform)
			},
			async saveSteps() {
				const {
					data: res
				} = await this.$http.post("saveSteps", {
					"steps": this.stepform.apicollections,
					"id": this.stepform.caseid
				});
				if (res.code != 200) {
					return this.$message.error("保存数据失败")
				};

			},
			async debugCase() {
				this.caseResultarea = true
				const {
					data: res
				} = await this.$http.post("debugCase", {
					"id": this.stepform.caseid
				});
				if (res.code != 200) {
					return this.$message.error("运行数据失败")
				};
				this.stepform.debugresult = res.data.toString()
			},
			quit() {
				this.stepform.debugresult = null,
					this.stepFormVisible = false
			},
			async editShowDialog(id) {
				this.editform.id = id
				this.eidtTitle = "编辑",
					this.editdialogFormVisible = true
				const {
					data: res
				} = await this.$http.post("getcaseByid", {
					"id": id
				})
				if (res.code != 200) {
					return this.$message.error("查询项目失败")
				}
				this.editform = res.data.cases
			},
			// 监听 添加用户对话框的关闭事件,item 一定要加prop属性 和model 绑定的一致
			addDialogClosed() {
				this.$refs.caseformRef.resetFields()
			},
			async addcase() {
				console.log(this.caseform)
				const {
					data: res
				} = await this.$http.post("addcase", {
					"case_name": this.caseform.case_name,
					"case_desc": this.caseform.case_desc

				})
				if (res.code != 200) {
					return this.$message.error("添加用例失败")
				}
				this.dialogFormVisible = false
				this.getcases()
			},
			async savecase() {
				const {
					data: res
				} = await this.$http.post("savecase", {
					"id": this.editform.id,
					"case_name": this.editform.case_name,
					"case_desc": this.editform.case_desc

				})
				if (res.code != 200) {
					return this.$message.error("保存用例失败")
				}
				this.editdialogFormVisible = false
				this.getcases()
			},
			async delcaseByid(id) {
				const confirmResult = await this.$confirm(
					'此操作将永久删除该用例, 是否继续?',
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
				} = await this.$http.post("delcaseByid", {
					"id": id
				})
				if (res.code != 200) {
					return this.$message.error("删除用例失败")
				}
				this.getcases()
			}

		}
	}
</script>
<style>
	.resultarea>.el-textarea__inner {
		background-color: rgba(255, 255, 255, 0.8);
	}

	.el-button--success {
		color: #fff;
		background-color: #13ce66;
		border-color: #13ce66;
	}
</style>
