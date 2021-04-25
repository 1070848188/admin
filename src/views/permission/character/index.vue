<template>
  <div class="user-center">
    <el-card>
      <el-button type="primary" @click="addRoles('add')">添加权限</el-button>

      <!-- 角色列表 -->
      <el-table :data="tableData" class="mtop30" border style="width: 100%">
        <el-table-column label="角色" prop="characterName"></el-table-column>
        <el-table-column label="说明" prop="description"></el-table-column>
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
      <!-- 角色列表 -->

      <!-- 设置角色 -->
      <el-dialog title="角色设置" :visible.sync="dialogVisible" class="diaForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          lock-scroll
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

          <el-form-item label="说明">
            <el-input
              type="textarea"
              v-model="ruleForm.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="菜单">
            <el-tree
              :data="treeData"
              show-checkbox
              ref="tree"
              node-key="name"
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
        </el-form>

        <!-- 底部操作栏 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 设置角色 -->
    </el-card>
  </div>
</template>

<script>
import { getRoles, setRoles } from "@/api/permission";
import { mapGetters } from "vuex";
export default {
  name: "userCenter",
  data() {
    return {
      tableData: [],
      dialogVisible: false, // 弹出框
      ruleForm: {
        characterName: "",
        characterCode: "",
        description: ""
      },
      rules: {
        characterName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        characterCode: [
          { required: true, message: "请输入角色代码", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeData: [],
      roleType: null,
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
    addRoles(type, row) {
      this.dialogVisible = true;
      this.roleType = type;
      // 初始化name和code
      this.ruleForm =
        type === "add"
          ? {}
          : Object.assign({}, this.ruleForm, {
              characterName: row.characterName,
              characterCode: row.characterCode,
              id: row.id,
              description: row.description
            });
      // 获取权限
      const roles = type === "add" ? [] : [...row.roles];
      // 重置表单和树结构
      this.$nextTick(() => {
        // 清空选中项
        this.$refs.tree.setCheckedKeys(roles);
        this.$refs.ruleForm.clearValidate();
      });
    },
    // 获取树结构
    getTreeDatas(routes) {
      let arr = [];
      for (let ele of routes) {
        if (ele.hidden) continue; // 路由不显示
        // 筛选 -- 父路由不需要且只有一个子路由 -- 没有子路由 -- 父子路由都有用
        const onlyChild = this.hasOnlyChild(ele.children, ele);

        // 只有一个路由需要展示或者没有子路由的
        if (onlyChild && !onlyChild.children) {
          ele = onlyChild;
        }
        // 树组件需要的数据
        let data = {
          label: ele.meta.title,
          name: ele.name,
        };
        // 子路由改变格式递归
        if (ele.children) {
          data.children = this.getTreeDatas(ele.children);
        }
        // 储存到树结构中
        arr.push(data);
      }
      return arr;
    },
    // 过滤子集
    hasOnlyChild(children = [], item) {
      // 此项目下是否只有一个可看路由
      const newChild = children.filter((ele) => !ele.hidden);
      if (newChild.length === 1 && !item.meta) {
        return newChild[0];
      } else if (newChild.length === 0) {
        return item;
      }
      return false;
    },
    // 提交
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.ruleForm,
            roles: this.$refs.tree.getCheckedKeys(),
            type: this.roleType
          }
          const res = await setRoles(params)
          if (res.code === 0) {
            this.dialogVisible = false;
            this.$message.success(res.message)
            this.getRoles()
          } else {
            this.$message.error(res.message)
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["routes"]),
  },
  mounted() {
    this.getRoles();
    console.log(this.routes);
    this.treeData = this.getTreeDatas(this.routes);
  },
};
</script>

<style lang="scss" scoped>
</style>