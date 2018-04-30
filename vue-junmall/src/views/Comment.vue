<template>
  <div class="comment">
    <nav-header></nav-header>
    <nav-bread>
      <span>
        评论页
      </span>
    </nav-bread>
    <div class="comment-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="评论" name="comment">
          <div class="comment-area">
            <div style="width: 160px">
              <img class="product-img" :src="productImg" alt="这是一张图片">
              <p class="product-name" :title="productName">
                {{ productName }}
              </p>
            </div>
            <div style="width: 100%; position: relative; padding-left: 20px">
              <el-tabs type="border-card">
                <el-tab-pane>
                  <span slot="label">评论</span>
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    :debounce="0"
                    v-model="contentArea">
                  </el-input>
                </el-tab-pane>
              </el-tabs>
              <span class="left-count">{{ leftCount }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="submit">
        <el-button type="primary" @click="subnitCommentData">发表评论</el-button>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
export default {
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  data() {
    return {
      activeName: 'comment',
      contentArea: '',
      leftCount: 500,
      productName: '商品名称',
      productImg: '',
    }
  },
  watch: {
    contentArea(newVal, oldVal) {
      this.leftCount = 500 - newVal.length
      if (this.leftCount <= 0) {
        this.leftCount = 0
        this.$message({
          type: 'warning',
          message: '您输入的字数已经超过500字, 别再输入了, 反正我只会读前500个'
        })
      }
    }
  },
  methods: {
    // 提交用户评论
    subnitCommentData() {
      let self = this
      let params = {
        productId: self.$route.query.id,
        content: self.contentArea,
      }
      this.axios.post('/comment/saveComment', params).then((res) => {
        if (res.status === 200) {
          let data = res.data
          if (data.status === '0') {
            this.$message({
              type: 'success',
              message: '评论成功,感谢您的评价',
              onClose: () => {
                this.$router.push('/order')
              }
            })
          }
        }
      }) 
    },
    // 获取商品数据
    getProductData() {
      let id = this.$route.query.id
      let params = {
        id: id
      }
      this.axios.get('/goods/getProductDetail', { params }).then((res) => {
        if (res.status === 200) {
          let data = res.data
          if (data.status === '0') {
            this.productName = data['result']['productName']
            this.productImg = data['result']['productImage']
          }
        }
      })
    },
    // inputValueChange(value) {
    //   console.log(value)
    //   this.leftCount = 500 - value.length
    //   if (this.leftCount <= 0) {
    //     this.leftCount = 0
    //     this.$message({
    //       type: 'warning',
    //       message: '您输入的字数已经超过500字, 别再输入了, 反正我只会读前500个'
    //     })
    //   }
    // }
  },
  created () {
    this.getProductData()
  }
}
</script>

<style scoped>
.comment-content {
  width: 1100px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.comment-area {
  padding: 30px 80px 50px;
  display: flex;
}
.product-img {
  float: left;
  width: 160px;
  height: 160px;
}
.left-count {
  position: absolute;
  right: 25px;
  bottom: 25px;
  color: #a3a3a3
}
.product-name {
  font-weight: bold;
  height: 24px;
  line-height: 30px;
  width: 160px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.submit {
  text-align: center;
  margin: 20px 0;
}
</style>
<style>
.comment #tab-comment {
  padding: 0 30px;
  color: #d1434a;
}
.comment .el-tabs__active-bar {
  background-color: #d1434a;
}
.comment #pane-comment {
  border: 1px solid #ccc;
  border-top: none
}
.comment .el-tabs__header {
  margin-bottom: 0;
}
.comment .el-tabs--border-card {
  box-shadow: none;
}
.comment #tab-0 {
  color: #999;
}
</style>

