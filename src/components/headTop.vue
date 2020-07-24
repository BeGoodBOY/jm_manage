<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header-rt">
      <span>当前用户：{{ username }}</span>
      <i @click="loginOut" class="iconfont">&#xe62f;</i>
    </div>
  </div>
</template>

<script>
import { signout } from "@/api/getData";
import { mapActions, mapState } from "vuex";
import { getStore, setStore } from '@/config/mUtils';

export default {
  data() {
    return {
      username: getStore('jm_username')
    };
  },
  created() {
    // if (!this.adminInfo.id) {
    //   this.getAdminData();
    // }
  },
  computed: {
    // ...mapState(["adminInfo"])
  },
  methods: {
    loginOut() {
      setStore('jm_token', '')
      setStore('jm_username', '')
      setStore('jm_time', '')
      this.$message({
              type: "success",
              message: "退出登录"
            });
      this.$router.push("/");
    }
    // ...mapActions(["getAdminData"]),
    // async handleCommand(command) {
    //   if (command == "home") {
    //     this.$router.push("/manage");
    //   } else if (command == "signout") {
    //     const res = await signout('jm_token', '');
    //     if (res.status == 1) {
    //       this.$message({
    //         type: "success",
    //         message: "退出成功"
    //       });
    //       this.$router.push("/");
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: res.message
    //       });
    //     }
    //   }
    // }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}

.header-rt {
  padding-right: 20px;
  font-size: 14px;
  color: #606266;
  span {
    display: inline-block;
    padding-right: 12px;
  }
  .iconfont {
    cursor: pointer;
  }
}
</style>
