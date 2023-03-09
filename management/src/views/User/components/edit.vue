<template>
  <div class="add">
    <el-dialog
      title="人员修改"
      :visible.sync="dialogVisible"
      width="40%"
      @close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="dialogContainer">
        <el-form :model="form" ref="form" label-width="120px" :rules="rules">
          <el-form-item label="姓名" prop="username">
            <el-input
              v-model.trim="form.username"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="管理员权限" prop="isAdmin">
            <el-select v-model="form.isAdmin" placeholder="请选择权限">
              <el-option
                v-for="(item, index) in adminOptions"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像" class="pic" prop="imgUrl">
            <div class="upload">
              <el-upload
                action="#"
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePreview"
                accept=".jpg,.png"
                :limit="1"
                :file-list="fileList"
                :on-exceed="handleExceed"
                :on-change="handleUpload"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button @click="dialogVisible = false" plain>取消</el-button>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="picVisible" width="30%">
      <div class="dialog" style="height: 30%">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadAvatar, updateUser } from '@/api/users'
export default {
  data() {
    return {
      picVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      form: {
        username: '',
        password: '',
        isAdmin: '',
        imgUrl: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur',
          },
        ],
        isAdmin: [{ required: true, message: '请选择权限', trigger: 'change' }],
        imgUrl: [{ required: true, message: '请上传头像', trigger: 'change' }],
      },
      adminOptions: [
        {
          name: '是',
          value: 1,
        },
        {
          name: '否',
          value: 0,
        },
      ],
      obj: {},
    }
  },
  methods: {
    openDialog(obj) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
      this.obj = obj
      this.form.username = obj.username
      this.form.password = obj.password
      this.form.isAdmin = obj.status
      this.form.imgUrl = obj.imgUrl
      this.fileList.push({ url: obj.imgUrl })
    },
    submitForm(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateUserInfo()
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.form.username = ''
      this.form.password = ''
      this.form.isAdmin = ''
      this.fileList = []
    },
    updateUserInfo() {
      // 添加用户
      const fd = new FormData()
      fd.append('username', this.form.username)
      fd.append('password', this.form.password)
      fd.append('status', this.form.isAdmin)
      fd.append('userId', this.obj.userId)
      updateUser(fd).then(({ data: res }) => {
        if (res.code === '200') {
          this.dialogVisible = false
          this.$message.success('添加成功')
          this.$parent.$parent.getAllUsers()
        }
      })
    },
    handleUpload(e) {
      // 图片上传
      this.fileList = [e]
      this.form.imgUrl = e.url
      const fd = new FormData()
      fd.append('img', e.raw)
      uploadAvatar(fd)
    },
    handleRemove() {
      this.form.imgUrl = ''
    },
    handleSuccess(e) {
      console.log(e)
    },
    handlePreview(file) {
      // 图片预览
      this.dialogImageUrl = file.url
      this.picVisible = true
    },
    handleExceed() {
      this.$message.warning('只能选择一张图片')
    },
  },
}
</script>

<style lang="less" scoped>
.dialogContainer {
  height: 330px;
}
.el-select {
  width: 40%;
  position: absolute;
  left: 0;
}
.upload > div {
  position: relative;
}
::v-deep .pic .el-form-item__content {
  margin-left: 0 !important;
}
.pic {
  display: flex;
}
</style>
