// 债权待分配成功列表
<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="借款人ID">
              <el-input v-model="form.nBorrowerUserID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="分配成功时间" label-width="100px">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="form.strStartTime"
                class="inline-block"
              ></el-date-picker>
              <span>-</span>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="form.strEndTime"
                class="inline-block"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="inline-block" label="回款状态">
            <el-select v-model="form.nRepayState" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="回款中" value="0"></el-option>
              <el-option label="已完成" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="inline-block" size="midium">
            <el-button type="primary" @click="getDebtList">查询</el-button>
            <el-button @click="clear">清除</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column property="nProjectID" label="编号" width="100"></el-table-column>
        <el-table-column property="strProjectName" label="项目名称" width="200"></el-table-column>
        <el-table-column property="nBorrowerUserID" label="借款人ID" width="200"></el-table-column>
        <el-table-column property="strBorrowerUserRealName" label="借款人姓名" width="200"></el-table-column>
        <el-table-column property="strBorrowerIdCard" label="身份证号" width="200"></el-table-column>
        <el-table-column property="strBorrowerUserMobile" label="手机号" width="200"></el-table-column>
        <el-table-column property="decAmount" label="借款本金" width="200"></el-table-column>
        <el-table-column property="decRemainPrincipal" label="剩余本金" width="200"></el-table-column>
        <el-table-column property="decRemainInterest" label="剩余利息" width="200"></el-table-column>
        <el-table-column property="remainAmount" label="可认领金额" width="200"></el-table-column>
        <el-table-column property="repayAmount" label="已回款金额" width="200"></el-table-column>
        <el-table-column property="strDealDate" label="借款时间" width="200"></el-table-column>
        <el-table-column property="strRepaymentCalcType" label="还款方式" width="200"></el-table-column>
        <el-table-column property="nMaxoverDueDays" label="逾期天数" width="200"></el-table-column>
        <el-table-column property="remainAmount" label="实际认领金额" width="200"></el-table-column>
        <el-table-column property="strRepayState" label="回款状态" width="200"></el-table-column>
        <el-table-column property="dtSuccessTime" label="分配成功时间" width="200"></el-table-column>
        <el-table-column property="strDebtState" label="分配状态" width="200"></el-table-column>
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
import { getDebtList } from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      offset: 1,
      limit: 20,
      count: 0,
      currentPage: 1,
      form: {
        isSuccessList: 1, //1:为成功列表 , 其他:不是成功列表(其他列表时无需传递)
        nDebtState: 10
      }
    };
  },
  components: {
    headTop
  },
  created() {
    this.getDebtList();
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
    async getDebtList() {
      const res = (
        await getDebtList({
          pageNum: this.currentPage,
          pageSize: this.limit,
          ...this.form,
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
