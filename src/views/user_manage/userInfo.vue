<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="认领人ID">
              <el-input v-model="form.nJMUserID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="认领申请时间" label-width="100px">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="form.applyStartTime"
                class="inline-block"
              ></el-date-picker>
              <span>-</span>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="form.applyEndTime"
                class="inline-block"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="inline-block" label="认领状态">
              <el-select v-model="form.nState" placeholder="全部">
                <el-option label="全部" value></el-option>
                <el-option label="已申请" value="0"></el-option>
                <el-option label="待审核" value="5"></el-option>
                <el-option label="待确认" value="10"></el-option>
                <el-option label="回款中" value="15"></el-option>
                <el-option label="已完成" value="20"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="认领确认时间" label-width="100px">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="form.strConfirmStartTime"
                class="inline-block"
              ></el-date-picker>
              <span>-</span>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="form.strConfirmEndTime"
                class="inline-block"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <div class="center" style="text-align: center;" size="midium">
            <el-button type="primary" @click="getUserList">查询</el-button>
            <el-button @click="clear">清除</el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column property="nJMUserID" label="编号" width="100"></el-table-column>
        <el-table-column property="id" label="认领人ID" width="200"></el-table-column>
        <el-table-column property="strRealName" label="认领人姓名" width="200"></el-table-column>
        <el-table-column property="strMobil" label="认领人手机号" width="200"></el-table-column>
        <el-table-column property="strIdCard" label="认领人身份证号" width="200"></el-table-column>
        <el-table-column property="dtCreateTime" label="认领申请时间" width="200"></el-table-column>
        <el-table-column property="dtUserConfirmTime" label="认领确认时间" width="200"></el-table-column>
        <el-table-column property="strState" label="认领状态" width="200"></el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getUserList } from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      offset: 1,
      limit: 20,
      count: 0,
      currentPage: 1,
      form: {}
    };
  },
  components: {
    headTop
  },
  created() {
    this.getUserList();
  },
  methods: {
    clear() {
      this.form = {}
    },
    async getUserList() {
      const res = (
        await getUserList({
          pageNum: this.currentPage,
          pageSize: this.limit,
          ...this.form
        })
      ).data;
      const list = res.list;
      this.count = res.total;
      this.tableData = res.list;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
    },
    async getUsers() {
      const Users = await getUserList({
        offset: this.offset,
        limit: this.limit
      });
      this.tableData = [];
      Users.forEach(item => {
        const tableData = {};
        tableData.username = item.username;
        tableData.registe_time = item.registe_time;
        tableData.city = item.city;
        this.tableData.push(tableData);
      });
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.table_container {
  padding: 20px;
}
</style>
