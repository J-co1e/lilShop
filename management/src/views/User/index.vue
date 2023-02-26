<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>
  </div>
</template>

<script>
import { getUser } from "@/api/users";
export default {
  name: "user",
  components: {},
  data() {
    return {};
  },
  methods: {
    addUser() {},
  },
  created() {},
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
