// 用户认领管理-用户认领查询
<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="认领人ID">
              <el-input v-model="form.nJMUserID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="申请认领时间" label-width="100px">
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
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item class="inline-block" label="匹配性质">
              <el-select v-model="form.nRegType" placeholder="全部">
                <el-option label="全部" value></el-option>
                <el-option label="系统匹配" value="0"></el-option>
                <el-option label="人工干预" value="5"></el-option>
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
        </el-row>
        <el-row>
          <el-form-item class="inline-block" label="认领确认状态">
            <el-select v-model="form.nState" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="待确认" value="1"></el-option>
              <el-option label="已确认" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="inline-block" size="midium">
            <el-button type="primary" @click="getClaimSearchList">查询</el-button>
            <el-button @click="clear">清除</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column property="id" label="编号" width="100"></el-table-column>
        <el-table-column property="strRealName" label="认领人姓名" width="200"></el-table-column>
        <el-table-column property="strIdCard" label="认领人身份证号" width="200"></el-table-column>
        <el-table-column property="strMobil" label="认领人手机号" width="200"></el-table-column>
        <el-table-column property="decApplyAmount" label="申请认领金额" width="200"></el-table-column>
        <el-table-column property="dtCreateTime" label="申请认领时间" width="200"></el-table-column>
        <el-table-column property="nRegCount" label="匹配债权数" width="200"></el-table-column>
        <el-table-column property="decRegAmount" label="实际匹配债权总金额" width="200"></el-table-column>
        <el-table-column property="regType" label="匹配性质" width="200"></el-table-column>
        <el-table-column property="dtUserConfirmTime" label="认领确认时间" width="200"></el-table-column>
        <el-table-column property="strConfirmState" label="认领确认状态" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goDetailPage(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
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
import {  getClaimSearchList, getClaimSearchDetail } from "@/api/getData";
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
    this.getClaimSearchList();
  },
  methods: {
    clear() {
      this.form = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getDebtList();
    },
    async getClaimSearchList() {
      const res = (
        await getClaimSearchList({
          pageNum: this.currentPage,
          pageSize: this.limit,
          ...this.form
        })
      ).data;
      if(res.status === 200) {
        const list = res.result.list;
        this.count = res.result.total;
        this.tableData = list;
        return;
      }
      this.$message({
          type: "error",
          message: res.message
      });
    },
    goDetailPage(row) {
      this.$router.push('claimSearchDetail/' + row.id)
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
