<template>
  <div class="header">
    <!-- logo -->
    <div class="header_l">
      <a href="javascript:;" class="logoLink"
        ><img src="./logo.png" alt="logo" />Vue Project</a
      >
    </div>
    <!-- logo -->

    <!-- 右侧功能栏 -->
    <div class="header_r">
      <div class="headr_d1">
        <!-- 左侧菜单伸缩 -->
        <side-collapse class="sidecoll"></side-collapse>
        <!-- 面包屑导航 -->
        <bread-crumb class="bread"></bread-crumb>
      </div>

      <!-- 用户中心 -->
      <div class="headr_d2"> 
        <ul class="headrUl clearFixed">
          <li id="domMessage">
            <el-badge is-dot >
              <i class="el-icon-message-solid iconFont"></i>
            </el-badge>
          </li>
          <li id="domFullScreen">
            <full-screen></full-screen>
          </li>
          <li id="domPersonal">
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div> 
    <!-- 右侧功能栏 -->
  </div>
</template>

<script>
// 是否全屏
import FullScreen from '@/components/FullScreen'
// 用户下拉
import userDropdown from '@/components/userDropdown'
// 用于左侧菜单栏收起弹出的
import SideCollapse from '@/components/SideCollapse'
// 面包屑导航
import BreadCrumb from '@/components/BreadCrumb'

export default {
  components: {
    FullScreen,
    userDropdown,
    SideCollapse,
    BreadCrumb
  },
};
</script>

<style lang="scss" scoped>
</style>