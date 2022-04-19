<template>
  <div class="traceback-top" v-show="showTraceback">
    <div class="traceback-main">
      <h1>您即将进入阳光财险投保页面</h1>
      <div class="traceback-content">
        <h2>为了保障您的权益，请仔细阅读保险条款；</h2>
        <p>同时应银保监要求，投保流程会记录存档。请您放心，我们会保障您的所有隐私信息安全。</p>
        <input type="button" value="我已知晓" id="closeTrace" @click="showTraceback = !showTraceback">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tracebackPC',
  data() {
    return {
      showTraceback: true,
    }
  }
}
</script>

<style scoped>
.traceback-top {
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.traceback-main {
  width: 380px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.traceback-main > h1 {
  font-size: 18px;
  color: #ff7f50;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
}
.traceback-content {
  width: 300px;
  margin: 0 auto;
  padding: 30px 0 40px;
}
.traceback-content > h2 {
  font-size: 14px;
  color: #444;
  margin-bottom: 20px;
}
.traceback-content > p {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}
.traceback-content > input {
  display: block;
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  color: #fff;
  background: #ff7f50;
  border-radius: 24px;
  font-size: 18px;
  border: none;
  cursor: pointer;
}
</style>