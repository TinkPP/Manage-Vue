<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      type="success"
      style="margin-right: 10px"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "commonTag",
  data() {
    return {};
  },
  methods: {
    handleClose(item, index) {
      const length = this.tags.length - 1;
      this.tags.splice(this.tags.indexOf(item), 1);
      if (item.name !== this.$route.name) {
        return;
      }
      if (index == length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
    changeMenu(item) {
      this.$router.push(item.path);
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
.tabs {
  margin: 20px 0;
}
</style>