<template>
  <!-- 用户下拉菜单 -->
  <el-dropdown class="userDd">
    <div class="userDrop">
      <span class="userDrop_text"
        >{{ userName }}<i class="el-icon-caret-bottom"></i
      ></span>
      <img src="./user01.jpg" alt="user" />
    </div>
    <el-dropdown-menu solt="dropdown">
      <el-dropdown-item>
        <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <router-link to="/"
          ><i class="el-icon-s-custom"></i>我的主页</router-link
        >
      </el-dropdown-item>
      <el-dropdown-item divided>
        <a @click="$store.dispatch('user/layout')"><i class="el-icon-switch-button"></i>登出</a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userName"]),
  },
  methods: {
    _loginOut() {
      this.$store.dispatch("user/loginOut");
    },
  },
};
</script>
