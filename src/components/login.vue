<template>
	<div class="loginfill">
		<el-form :model="loginForm" :rules="rules" ref="loginForm">
			<!-- 头像区 -->
			<div class="formcontainer">
				<div class="avatar_box">
					<img src="../assets/flower.jpg" alt="avatar" />
					<div class="img-tip">
						<p>接口测试系统</p>
					</div>
				</div>
				<el-form-item prop="username">
					<el-input style="float:right" v-model="loginForm.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="loginsubmit('loginForm')" style="width: 100%;" class="submit_btn">登录</el-button>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
				showLogin: false,
			}
		},
		methods: {
			loginsubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$message.success("校验成功");
						this.$router.push("/home");
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
	.loginfill {
		height: 100%;
	}

	.formcontainer {
		margin-top: 20%;
		width: 20%;
		margin-left: 40%;
	}

	.avatar_box {
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;

	}

	.img-tip {
		position: absolute;
		top: 31%;
		width: 100%;
		text-align: center;

		p {
			font-size: 34px;
			font-family: "monospace";
		}
	}
</style>
