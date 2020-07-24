<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "./style/common";
@font-face {
  font-family: "iconfont"; /* project id 1954617 */
  src: url("//at.alicdn.com/t/font_1954617_cx2aj90ud3b.eot");
  src: url("//at.alicdn.com/t/font_1954617_cx2aj90ud3b.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1954617_cx2aj90ud3b.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1954617_cx2aj90ud3b.woff") format("woff"),
    url("//at.alicdn.com/t/font_1954617_cx2aj90ud3b.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1954617_cx2aj90ud3b.svg#iconfont") format("svg");
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
