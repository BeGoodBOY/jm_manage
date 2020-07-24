<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-card class="box-card">
      <table class="claimReview-detail">
        <tr>
          <td><span class="gray">认领人姓名：</span> {{ detailOb.strRealName }}</td>
          <td><span class="gray">实际匹配债权数：</span> {{ detailOb.nRegCount }}</td>
        </tr>
        <tr>
          <td><span class="gray">认领人身份证：</span> {{ detailOb.strIdCard }}</td>
          <td><span class="gray">实际匹配总金额：</span> {{ detailOb.decRegAmount }}</td>
        </tr>
        <tr>
          <td><span class="gray">认领人手机号：</span> {{ detailOb.strMobil }}</td>
          <td><span class="gray">匹配性质：</span> {{ detailOb.regType }}</td>
        </tr>
        <tr>
          <td><span class="gray">申请认领金额：</span> {{ detailOb.decApplyAmount }}</td>
          <td><span class="gray">最后操作人：</span> {{ detailOb.strUsername }}</td>
        </tr>
        <tr>
          <td><span class="gray">申请认领时间：</span>{{ detailOb.dtCreateTime }}</td>
          <td><span class="gray">最后操作时间：</span> {{ detailOb.lastModifyTime }}</td>
        </tr>
      </table>
    </el-card>
    <div class="table_container">
      <h3>匹配债权列表</h3>
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
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
        <el-table-column property="strRepayState" label="回款状态" width="200"></el-table-column>
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
import { getMatchClaimList, getConfirmReviewDetail} from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      offset: 1,
      limit: 20,
      count: 0,
      currentPage: 1,
      form: {},
      multipleSelection: [],
      dialogVisible: false,
      detailOb: {}
    };
  },
  components: {
    headTop
  },
  created() {
    this.getMatchClaimList();
    this.getConfirmReviewDetail();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getMatchClaimList();
    },
    async getMatchClaimList() {
      const res = (
        await getMatchClaimList({
          pageNum: this.currentPage,
          pageSize: this.limit,
          id: this.$route.params.id
        })
      ).data;
      const list = res.list;
      this.count = res.total;
      this.tableData = res.list;
    },
    async getConfirmReviewDetail() {
      const res = (await getConfirmReviewDetail({
        id: this.$route.params.id
        })
       ).data
       this.detailOb = res;
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.table_container {
  padding: 20px;
}

h3 {
  font-weight: normal;
  color: #333;
  margin-bottom: 20px;
}

.claimReview-detail {
  font-size: 14px;
  tr {
    line-height: 2em;
    td {
      padding-right: 60px;
      .gray {
        color: #696969;
      }
    }
  }
}
</style>
