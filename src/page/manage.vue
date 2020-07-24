<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #223345;">
        <el-menu :default-active="defaultActive" style="min-height: 100%; background: #223345;" theme="dark" router>
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont">&#xe602;</i>用户管理
            </template>
            <el-menu-item index="/userInfo">用户信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont">&#xe60d;</i>债权管理
            </template>
            <el-menu-item index="/debtList">债权列表（全量）</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont">&#xe626;</i>用户认领管理
            </template>
            <el-menu-item index="/claimReview">用户认领审核</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto; ">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>


<style lang="less">
@import "../style/mixin";
.iconfont {
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-submenu .iconfont {
    vertical-align: middle;
    margin-right: 5px;
		width: 24px;
		font-size: 20px;
		text-align: center;
		color: #fff;
}

.el-menu {
	background: #223345;
	overflow: hidden;
	border-right: none;
}

.el-menu-item {
	background: #1f3042;
	&:focus {
		background: #1f3042;
	}
}



.el-submenu__title, .el-menu-item {
	color: #fff !important;
}

.el-submenu__title:hover, .el-menu-item:hover {
	background: #293d52;
}
</style>
