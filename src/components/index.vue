<template>
	<el-row :gutter="12">
		<el-col :span="7">
			<el-card shadow="always" style="height:100px">
				<div>
					<div style="float:right">
						<span>项目数</span>
					</div>
					<div>
						<i style="font-size:60px" class="el-icon-s-management"></i>
					</div>
					<div class="prodiv">
						<span>2</span>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="7">
			<el-card shadow="always" style="height:100px">
				<div>
					<div style="float:right">
						<span>接口数</span>
					</div>
					<div>
						<i style="font-size:60px" class="el-icon-platform-eleme"></i>
					</div>
					<div class="prodiv">
						<span>2</span>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="7">
			<el-card shadow="always" style="height:100px">
				<div>
					<div style="float:right">
						<span>用例数</span>
					</div>
					<div>
						<i style="font-size:60px" class="el-icon-s-promotion"></i>
					</div>
					<div class="prodiv">
						<span>2</span>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
</script>

<style lang='less' scoped>
	.prodiv {
		span {
			float: right;
		}

	}


</style>
