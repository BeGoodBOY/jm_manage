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
        <el-row>
          <el-form-item class="inline-block" label="匹配性质">
            <el-select v-model="form.nRegType" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="系统匹配" value="0"></el-option>
              <el-option label="人工干预" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="inline-block" size="midium">
            <el-button type="primary" @click="getClaimReviewList">查询</el-button>
            <el-button @click="clear">清除</el-button>
            <el-button type="warning" @click="beforeConfirmReview">确认审核</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <div class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="id" label="编号" width="100"></el-table-column>
        <el-table-column property="nJMUserID" label="认领人ID" width="200"></el-table-column>
        <el-table-column property="strRealName" label="认领人姓名" width="200"></el-table-column>
        <el-table-column property="strIdCard" label="认领人身份证号" width="200"></el-table-column>
        <el-table-column property="strMobil" label="认领人手机号" width="200"></el-table-column>
        <el-table-column property="decApplyAmount" label="申请认领金额" width="200"></el-table-column>
        <el-table-column property="dtCreateTime" label="申请认领时间" width="200"></el-table-column>
        <el-table-column property="nRegCount" label="匹配债权数" width="200"></el-table-column>
        <el-table-column property="decRegAmount" label="实际匹配债权总金额" width="200"></el-table-column>
        <el-table-column property="regType" label="匹配性质" width="200"></el-table-column>
        <el-table-column property="strUsername" label="最后操作人" width="200"></el-table-column>
        <el-table-column property="lastModifyTime" label="最后操作时间" width="200"></el-table-column>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认审核当前条目</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmReview">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getClaimReviewList, confirmReview} from "@/api/getData";
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
      dialogVisible: false 
    };
  },
  components: {
    headTop
  },
  created() {
    this.getClaimReviewList();
  },
  methods: {
    goDetailPage(row) {
      this.$router.push('/claimReviewDetail/' + row.id)
    },
    beforeConfirmReview() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "error",
          message: "您没有选择要审核的条目"
        });
        return;
      }

      this.dialogVisible = true
    },
    async confirmReview() {
      const arr = [];
      this.multipleSelection.forEach(item => {
        arr.push(item.id)
      })
      
       const res = (
        await confirmReview({
          arr: arr.join(',')
        })
      ).data;

      if (res.status == 200) {
            this.$message({
              type: "success",
              message: "审核成功"
            });
            this.dialogVisible = false;
            this.getClaimReviewList()
          } else {
            this.$message({
              type: "error",
              message: '审核失败，请重新审核'
            });
          }
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clear() {
      this.form = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getClaimReviewList();
    },
    async getClaimReviewList() {
      const res = (
        await getClaimReviewList({
          pageNum: this.currentPage,
          pageSize: this.limit,
          ...this.form
        })
      ).data;
      const list = res.list;
      this.count = res.total;
      this.tableData = res.list;
      // list.forEach(item => {
      //     const tableData = {};
      //     tableData.username = item.username;
      //     tableData.registe_time = item.registe_time;
      //     tableData.city = item.city;
      //     this.tableData.push(tableData);
      // })
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
