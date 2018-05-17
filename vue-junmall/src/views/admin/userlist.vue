<template>
  <div>
  <el-table
    ref="multipleTable"
    :data="userlists"
    tooltip-effect="dark"
    style="width: 100%"
     v-loading="loading"
 >
   <el-table-column
      type="index"
      width="200">
    </el-table-column>
     <el-table-column
      prop="userName"
      label="用户名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="userEmail"
      label="邮箱"
      width="200">
    </el-table-column>
    <el-table-column
       prop="createTime"
      label="注册时间"
      width="200"
      sortable>
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="showDetail(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--   <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
  <el-dialog
    title="用户详情"
    :visible.sync="showUserdetailDialog"
    width="40%">
    <ul>
      <li><span class="detial-lable">用户ID:</span>{{ userInfo.userId }}</li>
      <li><span class="detial-lable">用户名称:</span>{{ userInfo.userName }}</li>
      <li><span class="detial-lable">用户邮箱:</span>{{ userInfo.userEmail }}</li>
      <li><span class="detial-lable">创建时间:</span>{{ userInfo.createTime }}</li>
      <li><span class="detial-lable">购物车商品数量:</span>{{ userInfo.cartList.length }}</li>
      <li><span class="detial-lable">订单总数:</span>{{ userInfo.orderList.length }}</li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showUserdetailDialog = false">取 消</el-button>
      <el-button type="primary" @click="showUserdetailDialog = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<style type="text/css">
.cell {
  text-align: center;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      loading: true,
      userlists: [],
      multipleSelection: [],
      showUserdetailDialog: false,
      userInfo: {
        userId: '',
        userName: '',
        userEmail: '',
        createTime: '',
        cartList: [],
        orderList: [],
      }
    };
  },
  mounted() {
    this.userlist(); //调用商品列表
  },
  methods: {
    showDetail(index, row) {
      console.log(row)
      let userName = row.userName
      let param = {
        userName
      }
      axios.get('/admin/userInfo', { params: param }).then((res => {
        let data = res.data
        if (data.status === '0') {
          this.showUserdetailDialog = true
          this.userInfo = data.data[0]
        }
      }))
    },
    handleDelete(index, row) {
      let userName = row.userName
      this.loading = true
      axios.post('/admin/delUser', {userName}).then(res => {
        if (res.data.status === '0') {
          this.$message({
            type: 'success',
            message: '删除用户成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除用户失败'
          })
        }
        this.userlist()
      })
    },
    userlist(flag) {
      var param = {
        pageSize: 10,
        page: this.page
      };
      //params传参
      this.loading = true;
      axios.get("/admin/userlist", { params: param }).then(result => {
        this.loading = false;
        let res = result.data;
        if (res.status == "0") {
          this.userlists = res.result.list;
        } else {
          this.$alert("登录超时,请重新登录", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({
                path: "/"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.detial-lable {
  display: inline-block;
  width: 120px;
  text-align: left
}
</style>

