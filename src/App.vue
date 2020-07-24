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
  font-family: 'iconfont';  /* project id 1954617 */
  src: url('//at.alicdn.com/t/font_1954617_7dym90770e.eot');
  src: url('//at.alicdn.com/t/font_1954617_7dym90770e.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1954617_7dym90770e.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1954617_7dym90770e.woff') format('woff'),
  url('//at.alicdn.com/t/font_1954617_7dym90770e.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1954617_7dym90770e.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
