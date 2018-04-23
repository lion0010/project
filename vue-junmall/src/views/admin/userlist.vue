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
      width="200">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
  </div>
</template>
<style type="text/css">
  .cell{
    text-align: center;
  }
</style>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        page:1,
          loading: true,
        userlists:[],
        multipleSelection: []
      }
    },
    mounted() {
          this.userlist();//调用商品列表
        },
    methods: {
        handleEdit(index, row) {
       this.$message.error('您没有权限编辑');
      },
      handleDelete(index, row) {
         this.$message.error('您没有权限删除');
      },userlist(flag){
            var param={
                pageSize:10,
                page:this.page,
            }
            //params传参
            this.loading=true;
            axios.get("/admin/userlist",{params:param}).then((result)=>{
              this.loading=false;
              let res =result.data;
              if(res.status=="0"){
                this.userlists=res.result.list
              }else{
                this.$alert('登录超时,请重新登录', '小俊提示', {
          confirmButtonText: '确定',
          callback: action => {
                this.$router.push({
                    path:'/junmall/#/admin'
                   })
          }
        });
                
              }              
            })
          },
    }
  }
</script>