<template>
  <div class="order">
    <nav-header></nav-header>
    <nav-bread>
      <span>订单页面</span>
    </nav-bread>
    <div class="order-Page-content">
      <div class="table-header">
        <el-table>
          <el-table-column
            label="宝贝"
            align="center">
          </el-table-column>
          <el-table-column
            label="单价"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="数量"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="实付款"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="交易状态"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="交易操作"
            width="120"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="table-data" v-for="(item, index) in orderData" :key="index">
        <el-table
          :data="item.tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            :label="'日期:' + item.time"
            width="180"
            align="center">
            <template slot-scope="scope">
              <img class="product-img" :src="scope.row.img" alt="这是一张图片">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :label="'订单号:' + item.orderId">
            <template slot-scope="scope">
              <p>{{ scope.row.detail.productName }}</p>
              <p style="font-size: 12px">{{ scope.row.detail.desc }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="signal"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="number"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productOpe"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="realPayment"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="comment"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="commentProduct(scope.row.detail.productId)">
                {{ scope.row.comment }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import axios from 'axios'
export default {
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  data() {
    return {
      orderData: [
        {
          time: '2018-03-20',
          orderId: 666666666666666666,
          tableData: [{
            img: '2016-05-04',
            detail: {
              productName: '这是一件商品',
              desc: '这是对商品的描述',
              productId: '666'
            },
            signal: '8',
            number: 1,
            productOpe: '',
            realPayment: '8',
            status: '交易成功',
            comment: '评论'
          }]
        }
      ]
    }
  },
  methods: {
    // 获取订单列表
    getOrder() {
      this.axios.get('/users/order').then((res) => {
        console.log(res)
        if (res.status === 200) {
          let data = res.data.result
          this.orderData = data
        }
      }) 
    },
    // 评论的方法
    commentProduct(productId) {
      console.log(productId)
    }
  },
  created() {
    this.getOrder()
  }
}
</script>

<style scoped>
.order-Page-content {
  min-width: 1266px;
  width: 1266px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px
}
.table-header {
  border: 1px solid #ebeef5;
  border-bottom: none;
  margin-bottom: 20px
}
.product-img {
  width: 100px;
  height: 100px;
}
.table-data {
  margin-bottom: 20px
}
</style>

<style>
.table-header .el-table__empty-block {
  display: none;
}
</style>

