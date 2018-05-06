<template>
  <div class="search-part" :class="isCenter ? 'center' : ''" :style="{ right: rightPos + 'px', bottom: bottomPos + 'px'}">
    <el-autocomplete
      v-if="searchAuto"
      v-model="searchKey"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      :size="'medium'"
      @keydown.native.13="handleSelect"
    >
      <el-button slot="append" @click="handleSelect('clickSearch')">搜索</el-button>
    </el-autocomplete>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingData: [],
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
      if (!queryString) {
        this.loadingData = []
        cb(this.loadingData)
        return 
      }
      let _this = this
      let options = {
        params: {
          searchKey: queryString
        }
      }
      this.axios.get('/goods/searchGoods', options).then((res) => {
        if (res.status === 200) {
          let data = res.data
          if (data.status === '0') {
            this.loadingData = data.result
            cb(this.loadingData)
          }
        } 
      })
    },
    handleSelect (item) {
      console.log(item)
      let searchName = ''
      if (item.keyCode === 13 || item === 'clickSearch') {
        searchName = this.searchKey
      } else {
        searchName = item.value
      }
      if (searchName) {
        this.$router.push({
          path: '/GoodsList',
          query: {
            shopName: searchName
          }
        })
      }
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
  min-width: 500px;
  max-width: 600;
  position: absolute;
  right: 0;
  bottom: 0;
}
.center {
  left: 100%;
  transform: translateX(-50%);
}
</style>
