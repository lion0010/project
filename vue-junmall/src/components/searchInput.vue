<template>
  <div class="search-part" :class="isCenter ? 'center' : ''" :style="{ right: rightPos + 'px', bottom: bottomPos + 'px'}">
    <el-autocomplete
      v-if="searchAuto"
      v-model="searchKey"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      :size="'medium'"
    >
      <el-button slot="append">搜索</el-button>
    </el-autocomplete>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingData: [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      ],
      searchKey: ''
    }
  },
  props: {
    searchAuto: {
      type: Boolean,
      default: false
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    rightPos: {
      type: Number
    },
    bottomPos: {
      type: Number
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      let _this = self
      setTimeout(() => {
        cb(self.loadingData)
      }, 300000)
    },
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style>
  .search-part .el-autocomplete {
    width: 100%;
  }
  .search-part .el-input-group__append {
    cursor: pointer
  }
  .search-part .el-input-group__append:hover {
    color: #198dd4;
  }
</style>
<style scoped>
.search-part {
  max-width: 500px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.center {
  left: 50%;
  transform: translateX(-50%);
}
</style>
