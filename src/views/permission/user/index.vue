<template>
  <div class="user-edit">
    <el-card>
      <el-button type="primary" @click="addRoles('add')">新增用户</el-button>

      <!-- 用户列表 -->
      <el-table :data="userTable" class="mtop30" border style="width: 100%">
        <el-table-column label="用户名称" prop="userName"></el-table-column>
        <el-table-column label="用户编码" prop="userCode"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="addRoles('update', scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户列表 -->

      <!-- 新增或修改用户信息 -->
      <el-dialog title="用户设置" :visible.sync="userVisible" class="diaForm">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="userName">
            <el-input
              type="password"
              v-model="ruleForm.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="用户编码" prop="userCode">
            <el-input
              type="password"
              v-model="ruleForm.userCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="用户角色">
            <el-checkbox-group
              v-model="checkedRoles"
            >
              <el-checkbox v-for="roles in rolesData" :label="roles" :key="roles"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 新增或修改用户信息 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userEdit",
  data() {
    return {
      userTable: [],
      userVisible: false,
      ruleForm: {
        userCode: null,
        userName: null,
      },
      rules: { // 校验规则
        userName: [
          { required: true, trigger: "blur", message: "用户名称不能为空", },
        ],
        userCode: [
          {  required: true, trigger: "blur", message: "用户编码不能为空", },
        ],
      },
      checkedRoles: [], // 绑定角色
      rolesData: []
    };
  },
  methods: {
    addRoles(type, row) {
      console.log(type, row);
      this.userVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>