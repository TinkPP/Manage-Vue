<template>
  <div class="user">
    <el-dialog
      :title="operateType == 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser" style="height: 40px"
        >+新增用户</el-button
      >
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @edit="editUser"
      @delete="deleteUser"
      @changePage="getList"
    ></common-table>
  </div>
</template>
<script>
import { getUser, deleteUser } from "@/api/data";
import commonForm from "@/components/commonForm.vue";
import commonTable from "@/components/commonTable.vue";
export default {
  name: "user",
  components: {
    commonForm,
    commonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        { model: "name", label: "姓名", type: "input" },
        { model: "age", label: "年龄", type: "input" },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            { label: "男", value: "1" },
            { label: "女", value: 0 },
          ],
        },
        { model: "birth", label: "出生日期", type: "date" },
        { model: "addr", label: "地址", type: "input" },
      ],
      operateForm: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: {},
      tableLabel: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "sex", label: "性别" },
        { prop: "birth", label: "生日", width: 200 },
        { prop: "addr", label: "地址", width: 320 },
      ],
      config: {
        loading: false,
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType == "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      };
    },
    getList(name = "") {
      console.log(this.config.page);
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then((res) => {
        // console.log(res);
        this.tableData = res.data.list.map((item) => {
          item.sex = item.sex == 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      });
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    deleteUser(row) {
      this.$confirm("此操作将永久删除组件,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        // this.$http.post("/user/del", { id })
        deleteUser({ id }).then((res) => {
          // console.log(res);
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
}
</style>