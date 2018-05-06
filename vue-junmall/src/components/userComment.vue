<template>
  <div>
    <div class="no-comment" v-if="userCommentInfoArr.length === 0">
      暂无评论
    </div>
    <div class="user-comment" v-for="(userCommentInfo, index) in userCommentInfoArr" :key="index">
      <div class="user-avator">
        <img src="../../static/avator.jpg" alt="用户头像">
        <p>{{ userCommentInfo.userName }}</p>
      </div>
      <div class="user-com">
        <p class="user-con">
          {{ userCommentInfo.comment }}
        </p>
        <p class="time isUse clearfix">
          <span style="float: left">{{ userCommentInfo.time }}</span>
          <span class="use" style="float: right" @click="support(userCommentInfo)"><i style="color: #d1434a">有用</i>({{ userCommentInfo.isUse.length }})</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCommentInfoArr: [],
      // userCommentInfo: {
      //   name: 'sadahksjd',
      //   avatorLink: '../../static/avator.jpg',
      //   comment: '孩子给我打过好几次电话说看到别人玩滑板车自己也想要一个，这家店铺质量一如既往的喜欢，这也是我送给我家宝宝和姐姐家孩子的小礼物，价格非常实惠，还送的礼物也很喜欢，孩子昨天晚上给我开视频，玩的特别开心，虽然没有在家每天陪伴你，但是孩子小小的愿望我们大人都会尽力而为，只要孩子高兴就行，车子很酷，满意孩子给我打过好几次电话说看到别人玩滑板车自己也想要一个，这家店铺质量一如既往的喜欢，这也是我送给我家宝宝和姐姐家孩子的小礼物，价格非常实惠，还送的礼物也很喜欢，孩子昨天晚上给我开视频，玩的特别开心，虽然没有在家每天陪伴你，但是孩子小小的愿望我们大人都会尽力而为，只要孩子高兴就行，车子很酷，满意',
      //   time: '2017年5月6日 19:03',
      //   isUse: ['333']
      // }
    }
  },
  methods: {
    support(obj) {
      let userId = document.cookie.split(';')[0].split('=')[1]
      for (let i = 0, len = obj.isUse.length; i < len; i ++) {
        if (userId === obj.isUse[i]) {
          this.$message({
            type: 'warning',
            message: '亲,已经点过了'
          })
          return
        }
      }

      obj.isUse.push(userId)
      this.updateUse(obj)
    },
    // 获取用户评论
    getComment() {
      let self = this
      let params = {
        productId: self.$route.query.shopid
      }
      this.axios.get('/comment/getComment', { params }).then((res) => {
        if (res.status === 200) {
          let data = res.data;
          if (data.status === "0") {
            this.userCommentInfoArr = data.result
          }
        }
      })
    },
    // 更新点赞数的方法
    updateUse(obj) {
      // console.log(obj)
      let commentId = obj.commentId
      let params = {
        commentId,
        supportId: obj.isUse
      }
      this.axios.post('/comment/updateUse', params).then((res) => {
        // console.log(res)
      })
    }
  },
  created() {
    this.getComment()
  }
}
</script>

<style scoped>
.user-comment {
  margin: 20px 40px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.user-avator {
  text-align: center;
  width: 100px;
  min-height: 100px;
}
.user-avator > img {
  width: 40px;
  height: 40px;
}
.user-avator > p {
  width: 100%;
  overflow: hidden; 
  text-overflow:ellipsis; 
  white-space: nowrap;
}
.user-com {
  width: 100%;
  box-sizing: border-box;
}
.user-con {
  min-height: 60px;
  padding: 0 30px;
  box-sizing: border-box;
}
.time {
  line-height: 20px;
  font-size: 12px;
  color: #B0B0B0;
  padding: 6px 30px;
}
.use {
  cursor: pointer;
}
.no-comment {
  line-height: 40px;
  font-size: 24px;
  text-align: center;
}
</style>
