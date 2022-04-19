<template>
  <div class="mask-wrap" v-if="loadingVisible">
    <div class="mask-content" v-show="loadingVisibleContent != '' && loadingVisibleContent != null && loadingVisibleContent != undefined">
      <span>{{loadingVisibleContent}}</span>
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  </div>
</template>

<script>
import { Spinner } from 'mint-ui'
export default {
  name: 'mymask',
  props: {
    loadingVisible: Boolean,
    loadingVisibleContent: String,
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.mask-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.mask-wrap .mask-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>