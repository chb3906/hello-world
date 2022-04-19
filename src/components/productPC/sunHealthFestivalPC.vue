<template>
  <div class="infor-wrap">
    <div class="infor">
      <img src="../../assets/sunHealthFestivalPC/images/double12_01.png" alt="阳光健康节12.12特惠来袭">
      <img src="../../assets/sunHealthFestivalPC/images/double12_02.png" alt="阳光健康节12.12特惠来袭">
      <img src="../../assets/sunHealthFestivalPC/images/double12_03.png" alt="阳光健康节12.12特惠来袭">
    </div>
  </div>
</template>
<script>
export default {
  name: "sunHealthFestivalPC",

}
</script>
<style scoped>
@charset "utf-8";
/*reset*/
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td,
iframe {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5 Microsoft YaHei, tahoma, arial, simsun, sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: courier new, courier, monospace;
}
small {
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
sup {
  /*vertical-align:text-top;*/
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #333;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
}
button {
  cursor: pointer;
  outline: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
caption,
th {
  text-align: left;
}
/*float*/
.left {
  float: left;
}
.right {
  float: right;
}
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.clearfix {
  zoom: 1;
}

/*layout*/
.w1200-center {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.mod {
  margin-bottom: 15px;
}

/* page public*/
body {
  background: #ff9732;
}
.infor-wrap {
  width: 100%;
  height: auto;
  background: -webkit-linear-gradient(top, #FF9201, #FF9201);
}
.infor {
  width: 1018px;
  margin: 0 auto;
  position: relative;
}
.infor img {
  display: block;
  width: 100%;
}
.ewm {
  position: absolute;
  bottom: 140px;
  left: 50%;
  margin-left: -169px;
}
.ewm img {
  width: 338px;
  height: 338px;
}
</style>