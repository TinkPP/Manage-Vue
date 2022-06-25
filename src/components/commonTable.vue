<template>
  <div class="common-table">
    <el-table :data="tableData">
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete", row);
    },
    changePage() {
      this.$emit("changePage");
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  position: relative;
  .el-table {
    height: 66vh;
    overflow: auto;
  }
  .bottom {
    position: absolute;
    bottom: -32px;
    display: flex;
    justify-content: right;
    width: 100%;
    background-color: #fff;
  }
}
</style>