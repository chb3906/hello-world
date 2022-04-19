<template>
  <div>
    <div v-if="adItem != '' && adItem.previewImg != ''">
      <img :src="adItem.previewImg" alt="">
    </div>
    <div v-else-if="adItem != '' && adItem.content != ''" v-html="adItem.content">
    </div>
  </div>
</template>

<script>
	export default {
		name: "AdPage",
    data () {
		  return {
		    adItem:'',
      }
    },
    created () {
		  this.adItem = JSON.parse(window.sessionStorage.getItem('adItem'))
    },
    methods:{

    }
	}
</script>

<style scoped>
  div {
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }
  >>> img {
    width: 100%;
  }
  >>> div {
    overflow-y: auto;
    width: 100%;
  }
</style>
