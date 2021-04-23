<template>
  <div class="user-center">
    <el-card>
      <el-button type="primary" @click="handleDialog">添加权限</el-button>

      <!-- 角色列表 -->
      <el-table :data="tableData" class="mtop30" border style="width: 100%">
        <el-table-column label="角色" prop="characterName"></el-table-column>
        <el-table-column label="说明" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
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
      <!-- 角色列表 -->

      <!-- 设置角色 -->
      <el-dialog title="角色设置" :visible.sync="dialogVisible" class="diaForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
        >
          <el-form-item label="角色名称" prop="characterName">
            <el-input
              type="text"
              v-model="ruleForm.characterName"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="角色代码" prop="characterCode">
            <el-input
              type="text"
              v-model="ruleForm.characterCode"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="菜单">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="name"
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
        </el-form>

        <!-- 底部操作栏 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 设置角色 -->
    </el-card>
  </div>
</template>

<script>
import { getRoles } from "@/api/permission";
import { mapGetters } from 'vuex';
export default {
  name: "userCenter",
  data() {
    return {
      tableData: [],
      dialogVisible: false, // 弹出框
      ruleForm: {
        characterName: "",
        characterCode: "",
      },
      rules: {
        characterName: [
          { required: true, message: "请输入角色名称", trigger: "blur", },
        ],
        characterCode: [
          { required: true, message: "请输入角色代码", trigger: "blur", },
        ],
      },
      defaultProps: {
          children: 'children',
          label: 'label'
      },
      treeData: []
    };
  },
  methods: {
    // 编辑
    handleEdit(index, data) {
      console.log(index, data);
    },
    // 删除
    handleDelete(index, data) {
      console.log(index, data);
    },
    // 获取所有角色
    async getRoles() {
      const data = await getRoles();
      if (data.code === 0) {
        this.tableData = data.data;
      }
    },
    // 弹出设置角色
    handleDialog() {
      this.dialogVisible = true;
    },
    getTreeDatas(routes) {
      const newData = routes.filter(item => !item.hidden);
      console.log(newData);
    },

  },
  computed: {
    ...mapGetters(['routes'])
  },
  mounted() {
    this.getRoles();
    this.getTreeDatas(this.routes)
  },
};
</script>

<style lang="scss" scoped>
</style>