<template>
  <div style="position:relative;height: 100%;overflow: auto;">
    <head-top></head-top>
		<div class="full-screen">
			<div class="white-filter"></div>
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
	background-image: url(../assets/img/login_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
	.white-filter {
		position:absolute;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.6);
	}
}

</style>
