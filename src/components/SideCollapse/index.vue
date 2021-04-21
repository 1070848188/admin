<template>
    <div class="sideCollapse" id="domColapse">
    <i
    @click="setOpend"
      :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }"
    ></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
      computed: {
        ...mapGetters(['opened'])
      },
      methods: {
        setOpend() {
          this.$store.commit('app/SET_OPEN')
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