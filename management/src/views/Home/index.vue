<template>
	<div class="home">
		<el-row :gutter="20">
			<el-col :span="8" style="margin-top: 10px">
				<el-card shadow="hover">
					<div class="user">
						<img :src="UserImg" alt="" />
						<div class="userInfo">
							<p class="name"><b>Admin</b></p>
							<p class="access" style="font-size: 13px">管理员</p>
						</div>
					</div>
				</el-card>
				<el-card style="margin-top: 10px; height: 390px">
					<el-table :data="tableData">
						<el-table-column
							v-for="(item, index) in tableLabel"
							:key="index"
							:prop="index"
							:label="item"
						>

						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
      <el-col :span="16">
        <el-card style="h eight:250px;margin-top:10px">
          <div style="height:250px" ref="echarts">

          </div>
        </el-card>
        <div class="graph">
          <el-card style="height:180px;width:50%;margin-top:10px;margin-right:10px"></el-card>
          <el-card style="height:180px;width:50%;margin-top:10px">
            <div style="height:150px" ref="videoEcharts"></div>
          </el-card>
        </div>
      </el-col>
		</el-row>
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: "home",
	data() {
		return {
			UserImg: require("@/assets/logo.png"),
			tableData: [
				{
					name: "oppo",
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800,
				},
				{
					name: "vivo",
					todayBuy: 120,
					monthBuy: 320,
					totalBuy: 820,
				},
				{
					name: "苹果",
					todayBuy: 180,
					monthBuy: 380,
					totalBuy: 880,
				},
				{
					name: "小米",
					todayBuy: 150,
					monthBuy: 350,
					totalBuy: 850,
				},
				{
					name: "华为",
					todayBuy: 160,
					monthBuy: 360,
					totalBuy: 860,
				},
				{
					name: "三星",
					todayBuy: 170,
					monthBuy: 370,
					totalBuy: 870,
				},
			],
			tableLabel: {
				name: "品牌",
				todayBuy: "今日购买",
				monthBuy: "本月购买",
				totalBuy: "总购买",
			},
      countData:[
        {
          name:'今日支付订单',
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:'今日收藏订单',
          value:1234,
          icon:"star-on",
          color:"#ffb980"
        },
        {
          name:'今日未支付订单',
          value:1234,
          icon:"s-goods",
          color:"#5ab1ef"
        },
        {
          name:'本月支付订单',
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:'本月收藏订单',
          value:1234,
          icon:"star-on",
          color:"#ffb980"
        },
        {
          name:'本月未支付订单',
          value:1234,
          icon:"s-goods",
          color:"#5ab1ef"
        },
      ]
		};
	},
  mounted(){
  }
};
</script>

<style lang="less" scoped>
.user {
	display: flex;
	img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 1px solid #ccc;
	}
	.userInfo {
		position: relative;
		left: 20px;
		p:nth-of-type(1) {
			font-size: 23px;
		}
	}
}
.login-info {
	font-size: 13px;
	span {
		margin-left: 20px;
	}
}
.num{
  display: flex;
  width:100%;
  flex-wrap: wrap;
  i{
    width: 78px;
    height: 78px;
    font-size: 30px;
    text-align: center;
    line-height: 78px;
    color: #fff;
  }
  p:nth-last-of-type(1){
    font-size: 10px;
    color: #ccc;
    margin-right: 30px;
    width: 140px;
  }
  p{
    margin-left: 20px;
  }
}
.graph{
  display: flex;
}
</style>