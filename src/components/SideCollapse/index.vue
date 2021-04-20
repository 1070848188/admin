<template>
    <div class="sideCollapse" id="domColapse">
    <i
    @click="opened = !opened"
      :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }"
    ></i>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                opened: false
            }
        },
    }
</script>

<style lang="scss" scoped>
.sideCollapse i {
  font-size: 18px;
  color: #363f44;
  cursor: pointer;
}
.sideCollapse i:hover {
    color: #409EFF;
}
</style>