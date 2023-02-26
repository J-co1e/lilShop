<template>
  <div class="add">
    <el-dialog title="添加员工" :visible.sync="dialogVisible" width="40%">
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
          <el-form-item label="头像" class="pic">
            <div class="upload">
              <el-upload
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePreview"
                accept=".jpg,.png"
                :limit="1"
                :on-exceed="handleExceed"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
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
export default {
  data() {
    return {
      picVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        username: '',
        password: '',
        isAdmin: '',
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
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    handlePreview(file) {
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
