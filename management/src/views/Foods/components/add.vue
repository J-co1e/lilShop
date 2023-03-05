<template>
  <div class="add">
    <el-dialog title="添加菜品" :visible.sync="dialogVisible" width="40%">
      <div class="dialogContainer">
        <el-form :model="form" ref="form" label-width="120px" :rules="rules">
          <el-form-item label="菜品名称" prop="foodName">
            <el-input
              v-model.trim="form.foodName"
              placeholder="请输入菜品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片" class="pic" prop="imgUrl">
            <div class="upload">
              <el-upload
                action="#"
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
          <el-form-item label="价格" prop="price" class="pic">
            <el-input-number
              v-model="form.price"
              :min="1"
              :precision="2"
              :step="0.1"
              :max="9999"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <el-select v-model="form.type" placeholder="请选择类别">
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.type"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description" class="description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入描述"
              v-model="form.description"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
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
import { getTypes } from '@/api/type'
export default {
  data() {
    return {
      picVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        foodName: '',
        price: '',
        imgUrl: '',
        type: '',
        description: '',
      },
      rules: {
        foodName: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur',
          },
        ],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类别', trigger: 'change' }],
        imgUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
      },
      typeOptions: [],
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
      getTypes({}).then(({ data: res }) => {
        this.typeOptions = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
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
.el-select {
  width: 40%;
  position: absolute;
  left: 0;
}
.upload > div {
  position: relative;
}
.pic {
  display: flex;
}
::v-deep .pic .el-form-item__content {
  margin-left: 0 !important;
}
</style>
