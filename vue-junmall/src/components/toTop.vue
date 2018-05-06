<template>
  <div class="backToTop" v-if="showToTop" id="backToTop" @click="toTop">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showToTop: false
    }
  },
  created () {
    let _this = this
    window.onscroll = function (event) {
      if (window.scrollY >= 500 && !_this.showToTop) {
        _this.showToTop = true
      } else if (window.scrollY < 500 && _this.showToTop) {
        _this.showToTop = false
      }
    }
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }
}
</script>

<style scoped>
.backToTop {
  position: fixed;
  right: 30px;
  bottom: 60px;
  z-index: 999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  color: #409eff;
  line-height: 40px;
  text-align: center;
  background: #fff;
  cursor: pointer;
  font-size: 22px;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
}
</style>
