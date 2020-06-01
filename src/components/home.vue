<template>
	<el-container>
		<el-header>
			<div>接口测试系统</div>
			<el-button>退出</el-button>
		</el-header>
		<el-container>
			<el-aside style="width: 12.5rem;">
				<el-row class="tac">
					<el-col :span="24">
						<el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#ffff"
						 active-text-color="#ffd04b" router>
							<el-menu-item index="projectList">
								<i class="el-icon-document"></i>
								<span slot="title">项目管理</span>
							</el-menu-item>
							<el-menu-item index="2">
								<i class="el-icon-menu"></i>
								<span slot="title">接口管理</span>
							</el-menu-item>
							<el-menu-item index="3" x>
								<i class="el-icon-document"></i>
								<span slot="title">测试用例</span>
							</el-menu-item>
							<el-menu-item index="4">
								<i class="el-icon-setting"></i>
								<span slot="title">报告统计</span>
							</el-menu-item>
							<el-submenu index="7">
								<template slot="title"><i class="el-icon-warning"></i>说明</template>
								<el-menu-item index="explain">说明</el-menu-item>
							</el-submenu>



						</el-menu>
					</el-col>
				</el-row>
			</el-aside>
			<el-main>
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {

	}
</script>

<style>
	.el-header {
		display: flex;
		background-color: #545C64;
		color: #ffff;
		justify-content: space-between;
		padding-left: 20px;
		align-items: center;

		div {
			text-color: "#fff";
		}

	}

	.el-aside {
		background-color: #324057;

		.el-menu {

			width: 12.5rem;
		}
	}

	.el-main {
		background-color: #F2F6FC;
		border: 0.0625rem;

	}

	.el-container {
		height: 100%;
	}
</style>
