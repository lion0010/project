<template>
  <div>

<el-upload
 action="/admin/uploader"
  multiple
  name="fulAvatar"
   :show-file-list="false"
   :on-success="uploadersuc"
   :before-upload="beforeAvatarUpload">
  <el-button size="small" type="primary">上传图片</el-button>
  <div slot="tip" class="el-upload__tip">分辨率:1600*600  只能上传jpg文件，且不超过1024KB!</div>
</el-upload>
  <el-table
    ref="multipleTable"
    :data="imglist"
    tooltip-effect="dark"
    style="width: 100%"
     v-loading="loading"
 >
   <el-table-column
      type="index"
      width="200">
    </el-table-column>
     <el-table-column
      label="轮播图片"
      >
          <template slot-scope="scope">
        <img :src="scope.row.imgLink" width="50%" /></template>
    </el-table-column>
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
  </div>
</template>
<style type="text/css">
  .cell{
    text-align: center;
  }
.el-upload{
  float: left;
      margin-bottom: 25px;
}
.el-upload__tip{
  padding:8px 10px 0px 100px;
}
</style>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
          loading: true,
        imglist:[],
        multipleSelection: []
      }
    },
    mounted() {
          this.userlist();//调用商品列表
        },
    methods: {
      beforeAvatarUpload(file) {
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 500 / 500 < 1;
        console.log(file.size)
        if (!isJPG) {
          this.$message.error('只支持JPG格式!');
        }
        if (!isLt2M) {
          this.$message.error('轮播图片大小不能超过1024KB!');
        }
        return isJPG ;
      },
    uploadersuc(fulAvatar){
        console.log('上传成功')
          this.userlist();
        console.log(fulAvatar.imgLink)
      },
        handleEdit(index, row) {
       this.$message.error('编辑功能暂未开放');
      },
      handleDelete(index, row) {
              axios.post('/admin/delimg',{imgId:row.imgId}).then((respone)=>{
                let res =respone.data;
                if(res.status=='0'){
                  this.userlist();
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                }else{
                   this.$message.error('您没有权限删除');
                }
              })
      },
      userlist(){
            this.loading=true;
            axios.get("/admin/imglist").then((result)=>{
              this.loading=false;
              let res =result.data;
              if(res.status=="0"){
                this.imglist=res.result.list
              }              
            })
          },
    }
  }
</script>