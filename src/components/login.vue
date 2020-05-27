<template>
	<div class="loginfill">
		<el-form :model="loginForm" :rules="rules" ref="loginForm">
			<div class="formcontainer">
				<p style=""> 接口测试系统</p>
				<el-form-item prop="username">
					<el-input  v-model="loginForm.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input  v-model="loginForm.password" placeholder="请输入密码"  show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="loginsubmit('loginForm')" class="submit_btn">登陆</el-button>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default {
		
		data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		methods: {
		      loginsubmit(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		              this.$message.success("校验成功")
		          } else {
		            this.$message.error("校验失败")
		            return false;
		          }
		        });
		      },
		}
		
		
	}
</script>


<style lang="less" scoped>

.fillcontain{

	text-align: center;
	margin-top: 100px;
	margin-left: 800px;
}

.formcontainer{
	margin-top: 20%;
	width: 20%;
	margin-left: 40%;
}


</style>
