<template>
  <div class="shop">
    <div class="topBtn">
      <el-button
        type="primary"
        @click="isShow = !isShow"
        icon="el-icon-edit"
        v-if="!isShow"
        >修改</el-button
      >
      <el-button type="primary" v-else @click="updateInfo" icon="el-icon-check"
        >确定</el-button
      >
    </div>
    <div class="info">
      <div class="infoItem">
        <span class="itemTitle">店铺名称：</span>
        <el-input
          v-model="shopName"
          v-if="isShow"
          placeholder="请输入店铺名称"
        ></el-input>
        <span v-else class="t1">{{ shopName }}</span>
      </div>
      <div class="infoItem">
        <span class="itemTitle">店铺图片：</span>
        <el-upload
          v-if="isShow"
          action="#"
          :auto-upload="false"
          list-type="picture-card"
          accept=".jpg,.png"
          :limit="1"
          :file-list="fileList"
          :on-exceed="handleExceed"
          :on-change="handleUpload"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <img v-else :src="imgUrl" alt="" />
      </div>
      <div class="infoItem">
        <span class="itemTitle">店铺描述：</span>
        <el-input
          v-if="isShow"
          type="textarea"
          autosize
          v-model="shopDetail"
          placeholder="请输入店铺描述"
        ></el-input>
        <span v-else>{{ shopDetail }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreInfo, updateStoreInfo, uploadShopPic } from '@/api/shop'
export default {
  data() {
    return {
      imgUrl: '',
      shopName: '',
      shopDetail: '',
      isShow: false,
      fileList: [],
    }
  },
  methods: {
    getInfo() {
      getStoreInfo().then(({ data: res }) => {
        this.imgUrl = res.data[0].shopPic
        this.shopName = res.data[0].shopName
        this.shopDetail = res.data[0].shopDetail
        this.fileList = []
        this.fileList.push({
          url: this.imgUrl,
        })
      })
    },
    updateInfo() {
      this.isShow = !this.isShow
      const params = {
        shopName: this.shopName,
        shopDetail: this.shopDetail,
      }
      updateStoreInfo(params)
        .then(({ data: res }) => {
          if (res.code === '200') {
            this.$message.success('修改成功')
            this.getInfo()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleUpload(e) {
      // 图片上传
      this.fileList = [e]
      this.imgUrl = e.url
      const fd = new FormData()
      fd.append('img', e.raw)
      uploadShopPic(fd)
    },
    handleRemove() {
      this.imgUrl = ''
    },
    handleExceed() {
      this.$message.warning('只能选择一张图片')
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped>
.shop {
  width: 100%;
  height: 98%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
.topBtn {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
img {
  border-radius: 3px;
}
.info {
  width: 100%;
  padding: 10px 0;
  .infoItem {
    display: flex;
    width: 100%;
    margin: 20px 0;
    position: relative;
    align-items: center;
    img {
      width: 150px;
      height: 150px;
    }
    .itemTitle {
      margin-right: 30px;
      white-space: nowrap;
    }
  }
}
.t1 {
  padding: 10px;
}
</style>
