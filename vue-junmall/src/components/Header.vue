<template>
  <header class="header">
  <symbol id="icon-cart" viewBox="0 0 38 32">
    <title>cart</title>
    
    <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
    <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
    <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
  </symbol>
  <div class="navbar">
    <div class="navbar-left-container">
      <a href="/junmall">
        <img class="navbar-brand-logo" src="static/logo.png"></a>
    </div>
    <div class="navbar-right-container" style="display: flex;">
      <div class="navbar-menu-container">
        <!--<a href="/" class="navbar-link">我的账户</a>-->
        <span v-if="nikeName">{{nikeName}}</span>
        <a href="javascript:void(0)" class="navbar-link" @click="btnLogin('ruleForm')" v-if="!nikeName">登录</a>
           <a href="javascript:void(0)" class="navbar-link" @click="btnSign('ruleForm')" v-if="!nikeName">注册</a>
        <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-if="nikeName">退出</a>
        <div class="navbar-cart-container">
          <span class="navbar-cart-count" v-if="carCount>0">{{carCount}}</span>
          <a class="navbar-link navbar-cart-link"  @click="cart">
            <svg class="navbar-cart-logo">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':logindiv}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">用户登录</div>
              <button class="md-close" @click="logindiv=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                 <el-form   :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                   <el-form-item label="用户名"  >
                    <el-input type="text" v-model="ruleForm.userName" :maxlength=namesize placeholder='请输入用户名'  auto-complete="off"></el-input>
                  </el-form-item>  
                  <el-form-item label="密码" >
                    <el-input type="password" v-model="ruleForm.userPwd"  placeholder='请输入密码'   auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
             <div class="md-overlay" v-if="logindiv" @click="logindiv=false"></div>
           <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':Signdiv}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">用户注册</div>
              <button class="md-close" @click="Signdiv=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <el-form   :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                   <el-form-item label="用户名" prop="name" >
                    <el-input type="text" v-model="ruleForm.name" :maxlength=namesize placeholder='请输入用户名'  auto-complete="off"></el-input>
                  </el-form-item>  
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass"  placeholder='请输入密码'   auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" placeholder='请确认密码'  auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item  label="邮箱" prop="email" >
                      <el-input type='email' placeholder='请输入邮箱' v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="login-wrap">

                <a href="javascript:;" class="btn-login" @click="Signup('ruleForm')">注册</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="Signdiv" @click="Signdiv=false" ></div>
</header>
</template>
<style>


</style>
<script type="text/javascript">
  import './../assets/css/login.css'
  // import verify from "vue-verify-plugin";
  import axios from 'axios'
  import {mapState} from 'vuex'//多个vuex引入简写
  // Vue.use(verify,{
  //     blur:true
  // });
  export default{
    data(){
      var validatename = (rule, value, callback) => {
        let reg=/^[0-9a-zA-Z]+$/
        if (value.trim() === '') {
          callback(new Error('请输入用户名'));
        }else if(!reg.test(value)){
          callback(new Error('用户名不能使用中文'));
        }else if(value.length<6){
           callback(new Error('用户名不能少于6位'));
        }else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入密码'));
        }else if(value.length<6){
           callback(new Error('密码不能少于6位'));
        }else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateemail = (rule, value, callback) => {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
        if (!value) {
          return callback(new Error('请输入邮件'));
        }else if(!reg.test(value)){
          return callback(new Error('请输入正确的邮箱'));
        }else{
           callback();
        }
      };
      return{
        mdshow:false,
        namesize:15,
        errorTip:false,
        logindiv:false,
        Signdiv:false,
        nikeName:"",
        time:true,
        ruleForm: {
          //登录
          userName:'',
          userPwd:'',
          //注册
          name:'',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules2: {
          //注册
          name: [
            { validator: validatename,trigger: 'blur,change' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur,change' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: validateemail, trigger: 'blur,change' }
          ],
        }
      };
    },
    mounted(){
          this.checklogin();
        },
    computed:{
      ...mapState(['carCount','mdShow'])//简写
      // carCount(){
         // return this.$store.state.carCount;
      // },
    },
    methods:{
      checklogin(){
          axios.get("/users/checklogin").then((res)=>{
              if(res.data.status=='0'){
                  //接口直接赋值
                this.nikeName= res.data.result;
                  this.getCart();
                   this.$store.commit("btnmdShow",false)
                 }
          })
        },
        btnLogin(formName){
          this.logindiv=true;

           this.$refs[formName].resetFields();
        },
        btnSign(formName){
           this.Signdiv=true;
            //   console.log(this.$refs[formName].resetFields());
           this.$refs[formName].resetFields();
        },
      login(){
        //防止重复点击
        if(!this.time){
           return false;
        }
        var _this=this
        this.time=false;            
        var time=setTimeout(function(){
           _this.time=true;
           clearInterval(time);  
        },1000);
          axios.post('/users/login',{
            userName:this.ruleForm.userName,
            userPwd:this.ruleForm.userPwd
          }).then((renponse)=>{
            let res=renponse.data;
                  
            if(res.status=='0'){
              console.log("登录成功")
              this.logindiv=false;
              this.rorTip=false;
              this.nikeName=res.result.userName;
              this.$notify({
                title: '小俊提示',
                message: '登录成功',
                type: 'success',
                duration: 2000
            });
                    this.$store.commit("btnmdShow",false)
              this.getCart();
            }else{
              // this.errorTip=true;
                this.$notify.error({
                  title: '错误提示',
                  message: '您的输入的帐号密码不正确',
                  duration: 3000
                });
            }
          })
      },
      logOut(){
        this.$store.commit("initCar",0)
        axios.post("/users/logout").then((renponse)=>{
            let res=renponse.data;
            if(res.status=='0'){
              this.nikeName = ''
                    this.$store.commit("btnmdShow",true)
            }
        })
      },
      Signup(formName){
        if(!this.time){
           return false;
        }
        var _this=this
        this.time=false;            
        var time=setTimeout(function(){
           _this.time=true;
           clearInterval(time);  
        },2000);
      this.$refs[formName].validate((valid) => {
          if (valid) {
        axios.post('/users/Signup',{
            userName:this.ruleForm.name,
            userPwd:this.ruleForm.checkPass,
            userEmail:this.ruleForm.email
          }).then((renponse)=>{
            let res=renponse.data;
            if(res.status=='0'){
              this.Signdiv=false;
              //接口直接赋值
              this.$notify({
                title: '小俊提示',
                message: '注册成功',
                type: 'success',
                duration: 2000
            });
              //注册成功后自动登录
              axios.post('/users/login',{
            userName:this.ruleForm.name,
            userPwd:this.ruleForm.checkPass
          }).then((renponse)=>{
            let res=renponse.data;      
              this.nikeName=res.result.userName;
          })     
            }else{
                this.$notify.error({
                  title: '错误提示',
                  message: '用户名已经存在',
                  duration: 2000
                });
            }
          })
          } else {
               this.$notify.error({
                  title: '错误提示',
                  message: '您的输入有误请重新输入',
                  duration: 2000
                });
            return false;
          }
        });
    },
    cart(){
        if(!this.time){
           return false;
        }
        var _this=this
        this.time=false;            
        var time=setTimeout(function(){
           _this.time=true;
           clearInterval(time);  
        },2000);
      if(this.nikeName){
          this.$router.push({
              path:'/cart'
          })
      }else{
          this.$notify.error({
                title: '错误提示',
                message: '未登录，无法进去购物车',
                duration: 2000
          });
      }
    },
      getCart(){
        axios.get('/users/getCart').then((renponse)=>{
            let res=renponse.data;
            this.$store.commit("initCar",res.result)
        })
      }
    },
  }
</script>