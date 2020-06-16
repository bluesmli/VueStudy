<template>
	<div class="apicontainer">
		<div class="headtop">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>接口管理</el-breadcrumb-item>
				<el-breadcrumb-item>接口列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="tablecontaier">
			<el-card>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-input placeholder="请输入内容" v-model="queryinfo.query">
							<el-button slot="append" icon="el-icon-search" @click="getapis()"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="showaddDialog('addapiform')">添加接口</el-button>
					</el-col>
				</el-row>
				<!-- 表格数据区域 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="id" label="序号 " width="180"></el-table-column>
					<el-table-column prop="interface_name" label="接口名称 " width="180"></el-table-column>
					<el-table-column prop="belong_project" label="所属项目 " width="180"></el-table-column>
					<el-table-column prop="interface_url" label="接口地址" width="180"></el-table-column>
					<el-table-column prop="method" label="请求方式" width="180">
						<template slot-scope="scope">
							<el-tag :type="scope.row.method === 'get' ? 'primary' : 'success'" disable-transitions>{{ scope.row.method }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间"></el-table-column>
					<el-table-column prop="update_time" label="更新时间"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="success" @click="apieditDialog(scope.row.id)">编辑</el-button>
							<el-button type="danger" @click="delapi(scope.row.id)">删除</el-button>
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
			<el-dialog width="60%" :title="dialogTitle" :visible.sync="dialogFormVisible">
				<el-form :model="addapiform" ref="addapiform">
					<el-form-item label="接口名称" :label-width="formLabelWidth">
						<el-input v-model="addapiform.apiname" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="接口描述" :label-width="formLabelWidth">
						<el-input v-model="addapiform.apidesc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" autocomplete="off"></el-input>
					</el-form-item>

					<el-form-item label="接口地址" :label-width="formLabelWidth">
						<el-input v-model="addapiform.apiurl" autocomplete="off"></el-input>
					</el-form-item>

					<el-form-item label="所属项目" :label-width="formLabelWidth">
						<el-select v-model="addapiform.belongpro" placeholder="所属项目">
							<el-option v-for="item in addapiform.options" :key="item.project_name" :label="item.project_name" :value="item.project_name" />
						</el-select>
					</el-form-item>
					<el-form-item label="请求方式" :label-width="formLabelWidth">
						<el-select v-model="addapiform.requestway" placeholder="请选择请求方式">
							<el-option label="get" value="get"></el-option>
							<el-option label="post" value="post"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="请求信息" :label-width="formLabelWidth">
						<el-tabs type="border-card">
							<el-tab-pane label="Headers">
								<el-form :inline="true">
									<div style="margin-bottom:1rem;" v-for="(item, index) in addapiform.headerinfo" :key="index">
										<el-form-item label="key" :prop="'headerinfo.' + index + '.key'">
											<el-input v-model="item.key"></el-input>
										</el-form-item>
										<el-form-item label="value" :prop="'headerinfo.' + index + '.value'">
											<el-input v-model="item.value"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button @click="removeHeader(item)" type="danger">删除</el-button>
										</el-form-item>
									</div>
									<el-button type="primary" @click="addHeader()">新增Header</el-button>
								</el-form>
							</el-tab-pane>
							<!-- json 请求体 -->
							<el-tab-pane label="Body">
								<el-alert type="success" :closable="false"> 说明：JSON格式使用此类纯文本方式</el-alert>
								<el-form-item>
									<el-input type="textarea" :autosize="{ minRows:10, maxRows:10}" v-model="addapiform.body" autocomplete="off"></el-input>
								</el-form-item>
							</el-tab-pane>
							<!-- 参数tab -->
							<el-tab-pane label="Parameters">
								<el-form :inline="true">
									<div style="margin-bottom:1rem;" v-for="(item, index) in addapiform.parameters" :key="index">
										<el-form-item label="key" :prop="'parameters.' + index + '.key'">
											<el-input v-model="item.key"></el-input>
										</el-form-item>
										<el-form-item label="value" :prop="'parameters.' + index + '.value'">
											<el-input v-model="item.value"></el-input>
										</el-form-item>

										<el-form-item label="type">
											<el-select placeholder="type" v-model="item.type">
												<el-option v-for="item in addapiform.type" :key="item" :label="item" :value="item" />
											</el-select>
										</el-form-item>

										<el-form-item>
											<el-button @click.prevent="removeParam(item)" type="danger">删除</el-button>
										</el-form-item>
									</div>
									<el-button type="primary" @click="addParam()">新增参数</el-button>
								</el-form>
							</el-tab-pane>

						</el-tabs>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<div v-if="dialogTitle === '增加'">
						<el-button @click="closeForm('addapiform') ">取 消</el-button>
						<el-button type="primary" @click="addApi('addapiform')">确定</el-button>
					</div>
					<div v-else>
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="editapi()">确定</el-button>
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
				tableData: [],
				total: 0,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				dialogTitle: null,
				addapiform: {
					id:null,
					apiname: '',
					apidesc: null,
					apiurl: null,
					belongpro: null,
					options: [],
					requestway: null,
					//请求头信息
					headerinfo: [],
					// 请求体信息
					body: null,
					// 参数
					parameters: [],
					//类型
					type: ['int', 'string', 'float', 'JSON', 'Boolean', 'list'],
					actualtype: null
				}

			}
		},
		created: function() {
			this.getapis()
		},
		methods: {
			//获取接口列表信息
			async getapis() {
				const {
					data: res
				} = await this.$http.get('apis', {
					params: this.queryinfo
				})
				if (res.code != 200) {
					return this.$message.error("获取接口列表失败")
				}
				this.tableData = res.data.apis;
				this.total = res.data.total
			},
			closeForm(formName) {
				this.$nextTick(() => {
					this.$refs[formName].resetFields();
				});
				this.dialogFormVisible = false;

			},
			async showaddDialog(formName) {
				this.dialogFormVisible = true;
				this.dialogTitle = "增加";
				// 绑定的数据对象为空
				this[formName] = {
					apiname: '',
					apidesc: null,
					apiurl: null,
					belongpro: null,
					options: [],
					requestway: null,
					//请求头信息
					headerinfo: [],
					// 请求体信息
					body: null,
					// 参数
					parameters: [],
					//类型
					type: ['int', 'string', 'float', 'JSON', 'Boolean', 'list'],
					actualtype: null
				};
				//获取项目数据
				const {
					data: res
				} = await this.$http.get("allprojects");
				if (res.code != 200) {
					return this.$message.error("获取项目数据失败")
				};
				this.addapiform.options = res.data.projects;
				
			},


			removeHeader(item) {
				var index = this.addapiform.headerinfo.indexOf(item)
				if (index !== -1) {
					this.addapiform.headerinfo.splice(index, 1)
				}
			},
			addHeader() {
				this.addapiform.headerinfo.push({
					value: '',
					key: ''
				});
			},
			removeParam(item) {
				var index = this.addapiform.parameters.indexOf(item)
				if (index !== -1) {
					this.addapiform.parameters.splice(index, 1)
				}
			},
			addParam() {
				this.addapiform.parameters.push({
					value: '',
					key: '',
					type: ''
				});
			},
			async addApi(formName) {
				const {
					data: res
				} = await this.$http.post("addapi", this.addapiform)
				if (res.code != 200) {
					return this.$message.error("添加失败")
				};
				this.dialogFormVisible=false
				this.getapis()
				
			},
			handleSizeChange(newsize) {
				this.queryinfo.pagesize = newsize
				this.getapis()
			},
			handleCurrentChange(newsize) {
				this.queryinfo.pagenum = newsize
				this.getapis()
			},

			async apieditDialog(id) {
				this.dialogTitle = "编辑"
				this.dialogFormVisible = true
				this.addapiform.id=id
				const {
					data: res
				} = await this.$http.post("getapiByid", {
					"id": id
				})
				if (res.code != 200) {
					return this.$message.error("查询失败")
				};
				this.addapiform.apiname = res.data.apis.interface_name;
				this.addapiform.apidesc = res.data.apis.interface_desc;
				this.addapiform.apiurl = res.data.apis.interface_url;
				this.addapiform.body = res.data.apis.interface_body;
				this.addapiform.requestway = res.data.apis.method;
				this.addapiform.headerinfo = res.data.apis.interface_header
				this.addapiform.parameters = res.data.apis.interface_param
				//获取项目数据
				const {
					data: response
				} = await this.$http.get("allprojects");
				if (response.code != 200) {
					return this.$message.error("获取项目数据失败")
				};
				this.addapiform.options = response.data.projects;
			},
			
			async editapi(){
				const {
					data: res
				} = await this.$http.post("editapi", {
					"id": this.addapiform.id,
					"apiname":this.addapiform.apiname,
					"apidesc": this.addapiform.apidesc,
					"apiurl": this.addapiform.apiurl,
					"belongpro": this.addapiform.belongpro,
					"requestway":  this.addapiform.requestway,
					//请求头信息
					"headerinfo":this.addapiform.headerinfo,
					// 请求体信息
					"body": this.addapiform.body,
					// 参数
					"parameters":this.addapiform.parameters
				})
				if (res.code != 200) {
					return this.$message.error("编辑失败")
				};
				this.$message.success("修改成功")
				this.dialogFormVisible=false
				this.getapis()
			},
			async delapi(id){
				
				const confirmResult = await this.$confirm(
					'此操作将永久删除该接口, 是否继续?',
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
				} = await this.$http.post("delapiByid", {
				"id":id
				})
				
				if (res.code != 200) {
					return this.$message.error("删除失败")
				};
				this.$message.success("删除成功")
				this.getapis()
				
			}
			


		}

	}
</script>

<style>
</style>
