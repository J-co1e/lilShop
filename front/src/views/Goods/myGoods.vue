<template>
	<div class="goods">
		<van-sidebar v-model="tabName" @change="tabChange">
			<van-sidebar-item title="标签名称" />
			<van-sidebar-item title="标签名称" />
			<van-sidebar-item title="标签名称" />
		</van-sidebar>
	</div>
</template>

<script>
import { getFoods } from '@/api/index'
export default {
	name: 'myGoods',
	components: {  },
	data () {
		return {
			tabName: ''
		}
	},
	methods:{
		getAllGoods(){
			getFoods({}).then(res=>{
				console.log(res)
			})
		},
		tabChange() {
			
		}
	},
	mounted () {
		this.getAllGoods()
	}
}
</script>

<style lang="less" scoped>
.van-sidebar {
	height: 70vh;
	background-color: #f7f8fa;
}
.van-sidebar-item--select::before {
	background-color: unset;
	height: 100%;
}
</style>