<template>
	<div class="loginfill">
		<el-form :model="loginForm" :rules="rules" ref="loginForm">
			<div class="manage_tip">
				<p>elm后台管理系统</p>
			</div>
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input v-model="loginForm.password" placeholder="请输入密码"  show-password></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="loginsubmit('loginForm')" class="submit_btn">登陆</el-button>
			</el-form-item>
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
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
		}
		
		
	}
</script>

<style lang="less" scoped>
	
</style>
