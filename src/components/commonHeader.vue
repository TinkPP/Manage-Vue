<template>
  <header>
    <div class="left-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="medium"
        @click="handleMenu"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="hover" szie="medium">
        <div>
          <img :src="userImg" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "commonHeader",
  data() {
    return {
      userImg: require("@/assets/user.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>


<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.left-content {
  display: flex;
  align-items: center;
  h3 {
    font-weight: normal;
  }
  .el-button {
    margin-right: 20px;
  }
}

.right-content img {
  height: 36px;
  width: 36px;
  border-radius: 50%;
}
</style>