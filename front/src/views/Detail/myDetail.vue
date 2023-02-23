<template>
	<div class="goods">
		detail
	</div>
</template>

<script>
import { getShopInfo } from '@/api/index'
export default {
	name: 'myDetail',
	components: {},
	data () {
		return {
			isTabShow: true
		}
	},
	methods: {
		getShopInfo () {
			getShopInfo().then(({ data: res }) => {
				console.log(res)
			})
		}
	},
	mounted () {
		this.getShopInfo()
	}

}
</script>

<style>
</style>
