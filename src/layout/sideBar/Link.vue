<template>
  <!-- 用于将http等链接开头的路径转变为a标签 路由开头的转变为routerlink -->
  <div v-bind="getLink(to)">
    <slot />
  </div>
</template>

<script>
import { isAbsolutePath } from "@/utils/validate";
export default {
  props: {
    to: {
      type: String,
      default: "",
    },
  },
  methods: {
    getLink(path) {
      if (isAbsolutePath(path)) {
        return {
          is: "a",
          target: "_blank",
          href: path,
        };
      } else {
        return {
          is: "router-link",
          to: path,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>