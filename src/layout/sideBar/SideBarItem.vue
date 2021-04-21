<template>
  <div class="sideItem" v-if="!item.hidden">
    <!-- 没有子集的 -->
    <template
      v-if="
        hasOnlyChild(item.children, item) && (!childItem.children || childItem.noChild)
      "
    >
      <page-link v-if="childItem.meta" :to="resolvePath(childItem.path)">
        <el-menu-item :index="resolvePath(childItem.path)">
          <i :class="childItem.meta.icon ? childItem.meta.icon : ''"></i>
          <span slot="title">{{ childItem.meta.title }}</span>
        </el-menu-item>
      </page-link>
    </template>
    <!-- 没有子集的 -->

    <!-- 有子集的 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i :class="item.meta.icon ? item.meta.icon : ''"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <side-bar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :basePath="resolvePath(child.path)"
      >
      </side-bar-item>
    </el-submenu>
    <!-- 有子集的 -->

  </div>
</template>

<script>
import PageLink from "./Link";
import { isAbsolutePath } from "@/utils/validate";
import path from "path";
export default {
  name: "SideBarItem",
  data() {
    return {
      childItem: null, // 本次需渲染的菜单
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  methods: {
    // child 子集  item 父级
    hasOnlyChild(child = [], item) {
      // 过滤需渲染的子路由
      const newChild = child.filter((ele) => !ele.hidden);

      // 只有一个子路由需要渲染的情况
      if (newChild.length === 1 && !item.meta) {
        this.childItem = newChild[0];
        return true;
      }

      // 没有子路由需要渲染
      if (newChild.length === 0) {
        this.childItem = { ...item, path: "", noChild: true };
        return true;
      }

      return false;
    },
    // 检查是否是网络路径
    resolvePath(router) {
      if (isAbsolutePath(router)) {
        // 网络路径
        return router;
      }
      if (isAbsolutePath(this.basePath)) {
        // 父路由为网络路径
        return this.basePath;
      }
      return path.join(this.basePath, router); // 返回需要渲染的路径
    },
  },
  components: {
    PageLink,
  },
};
</script>

<style lang="scss" scoped>
</style>