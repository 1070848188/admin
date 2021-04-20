<template>
  <div>
    <!-- 引入全屏组件 可以实现页面全屏 -->
    <i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    toggleFull() {
      if (!screenfull.enabled) {
        this.$message({
          type: 'warning',
          message: '您的浏览器暂不支持此功能！'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>
