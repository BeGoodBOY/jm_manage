<template>
  <div style="position:relative;height: 100%;overflow: auto;">
    <head-top></head-top>
		<div class="full-screen">
				<div class="home-main">
					<img src="../assets/img/jmLogo.png" alt="">
					<p>欢迎进入认领系统</p>
				</div>
		</div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
  components: {
    headTop
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.full-screen {
	position: absolute;
	top: 60px;
	left: -1px;
	right: 0;
	height: 100%;
	background-image: url(../assets/img/main_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;

}
.home-main {
	padding-top: 228px;
	text-align: center;
	img {
		width: 174px;
	}
	p {
		font-size: 22px;
		color: #0268b8;
	}
}
</style>
