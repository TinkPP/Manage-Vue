<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <common-tag></common-tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import commonAside from "@/components/commonAside.vue";
import commonHeader from "@/components/commonHeader.vue";
import commonTag from "@/components/commonTag.vue";
export default {
  name: "main",
  components: {
    commonAside,
    commonHeader,
    commonTag,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: black;
}

.el-main {
  padding-top: 0;
}
.el-aside {
  min-height: 100vh;
}
</style>