<!-- eslint-disable vue/no-v-model-argument -->
<template>
	<div class="header">
		<div class="headerContainer">
			<img src="@/assets/logo.png" alt="logo">
			<div class="info">
				<p>沙县大酒店</p>
				<div class="infoRight">
					<p>进店享优惠(满200减88)</p>
					<p>在线支付享更多优惠</p>
				</div>
			</div>
		</div>
		<div class="search" @click="toSearch">
			<van-icon name="search" />
			<span>请输入搜索关键词</span>
			<!-- <div class="searchBtn"><span>搜索</span></div> -->
		</div>
		<van-popup v-model:show="isPopupShow" position="right" :style="{ height: '100%',width:'100%' }"><mySearch></mySearch></van-popup>
	</div>
</template>

<script>
import mySearch from '@/views/Search/mySearch'
export default {
	name: 'VHeader',
	components: { mySearch },
	data () {
		return {
			isPopupShow: false
		}
	},
	methods: {
		toSearch () {
			this.isPopupShow = true
		}
	}
}
</script>

<style lang="less" scoped>
.header {
	height: 20vh;
	background-image: linear-gradient(#00933f, #adeac8);
	padding: 0.3rem;
	.headerContainer {
		height: 72%;
		display: flex;
		align-items: center;
		img {
			display: block;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 0.3rem;
		}
		.info {
			margin-left: 0.3rem;
			flex: 1;
			height: 90%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			> p:nth-child(1) {
				font-weight: bold;
				font-size: 0.4rem;
			}
			.infoRight {
				font-size: 0.26rem;
			}
		}
	}
	.search {
		width: 100%;
		height: 25%;
		margin-top: 0.2rem;
		border-radius: 0.3rem;
		background-color: #fff;
		position: relative;
		padding: 5px;
		i {
			padding-left: 0.1rem;
		}
		span {
			color: #aaa;
			padding-left: 0.1rem;
		}
		.searchBtn {
			position: absolute;
			right: 0;
			bottom: 0;
			border-radius: 0.5rem;
			background-color: #2ac26c;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			span {
				padding: 0 0.3rem;
				display: inline-block;
				color: #fff;
			}
		}
	}
}
.van-search {
	background-color: none;
	padding: 10px 0;
}
</style>