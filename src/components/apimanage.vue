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
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" @click="showEditDialog()">添加接口</el-button>
					</el-col>
				</el-row>
				<!-- 表格数据区域 -->
				<el-table stripe style="width: 100%">
					<el-table-column prop="id" label="序号 " width="180"></el-table-column>
					<el-table-column prop="project_name" label="接口名称 " width="180"></el-table-column>
					<el-table-column prop="project_desc" label="所属项目 " width="180"></el-table-column>
					<el-table-column prop="create_time" label="请求方式" width="300"></el-table-column>
					<el-table-column prop="create_time" label="接口地址" width="300"></el-table-column>

					<el-table-column prop="update_time" label="更新时间"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="success">编辑</el-button>
							<el-button type="danger">删除</el-button>
						</template>

					</el-table-column>
				</el-table>
				<!-- 分页区域 -->
				<!-- <div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryinfo.pagenum"
					 :page-sizes="[20, 40, 60, 80]" :page-size="queryinfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
					 :total="total">
					</el-pagination>
				</div> -->
			</el-card>


			<!-- 添加dialog -->
			<el-dialog width="60%" title="添加" :visible.sync="dialogFormVisible">
				<el-form :model="addapiform">
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
							<el-option v-for="item in addapiform.options" :key="item.value" :label="item.value" :value="item.value" />
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
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary">确 定</el-button>
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
				dialogFormVisible: false,
				formLabelWidth: '120px',
				addapiform: {
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
		methods: {
			showEditDialog() {
				this.dialogFormVisible = true
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
				//console.log(this.addapiform)
			}

		}

	}
</script>

<style>
</style>
