<template>
	<div class="goods">
		<van-sidebar v-model="tabName" @change="tabChange">
			<van-sidebar-item title="标签名称" />
			<van-sidebar-item title="标签名称" />
			<van-sidebar-item title="标签名称" />
		</van-sidebar>
		<div class="goodsList">
			<div class="goodsItem">
				<img src="../../assets/logo.png" alt="">
				<div class="itemDetail">
					<div class="detailTop">
						<div class="foodName">挂逼面</div>
						<div class="description">这是一碗挂逼面</div>
					</div>
					<div class="detailBtm">
						<span class="price"><span style="font-size:.32rem">￥</span> 50</span>
						<div class="counter">
							<div class="drawer">
								<button class="decrease"></button>
								<span>1</span>
							</div>
							<button class="increase"></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getFoods } from '@/api/index'
export default {
	name: 'myGoods',
	components: {},
	data () {
		return {
			tabName: ''
		}
	},
	methods: {
		getAllGoods () {
			getFoods({}).then(res => {
				console.log(res)
			})
		},
		tabChange () {

		}
	},
	mounted () {
		this.getAllGoods()
	}
}
</script>

<style lang="less" scoped>
.goods {
	display: flex;
}
.goodsList {
	flex: 1;
	padding: 0.1rem;
}
.goodsItem {
	display: flex;
	width: 100%;
	margin-bottom: 0.4rem;
	img {
		width: 1.8rem;
		height: 1.8rem;
		margin-right: 0.2rem;
	}
	.itemDetail {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.foodName {
			font-weight: 600;
			font-size: 0.36rem;
		}
		.description {
			font-size: 0.24rem;
			color: #aaa;
		}
		.detailBtm {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price {
				color: red;
				font-size: 0.4rem;
			}
			.counter {
				margin-right: 10px;
				display: flex;
				align-items: center;
				overflow: hidden;
				.drawer{
					display: flex;
					align-items: center;
				}
				span {
					margin: 0 5px;
				}
				button {
					position: relative;
					border-radius: 50%;
					width: 28px;
					font-weight: 600;
					border: 2px solid #2ac26c;
					color: #2ac26c;
					height: 28px;
				}
				.increase{
					background-color: #2ac26c;
					color: #fff;
				}
				.decrease::before {
					position: absolute;
					top: 50%;
					left: 50%;
					background-color: #2ac26c;
					transform: translate(-50%, -50%);
					width: 50%;
					height: 1.5px;
					content: '';
				}
				.increase::before {
					position: absolute;
					top: 50%;
					left: 50%;
					background-color: currentColor;
					transform: translate(-50%, -50%);
					content: '';
					width: 50%;
					height: 1.5px;
				}
				.increase::after {
					position: absolute;
					top: 50%;
					left: 50%;
					background-color: currentColor;
					transform: translate(-50%, -50%);
					content: '';
					width: 1.5px;
					height: 50%;
				}
			}
		}
	}
}
.van-sidebar {
	height: 70vh;
	background-color: #f7f8fa;
}
.van-sidebar-item--select::before {
	background-color: unset;
	height: 100%;
}
</style>