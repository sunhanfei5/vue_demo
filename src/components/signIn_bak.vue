<template>
  <div class="content">
    <p class="content-input">
      <span>用户名：</span><el-input placeholder="请设置用户名" v-model="logInName" clearable></el-input>
    </p>
    <p class="content-input">
      <span>密码：</span><el-input placeholder="请设置登录密码" v-model="logInPassword" show-password></el-input>
    </p>
    <p class="content-button">
      <el-button type="primary" round @click.prevent="alertValue">注&nbsp;&nbsp;&nbsp;册</el-button>
    </p>
  </div>
</template>

<script>
    export default {
        name: "signIn",
        data() {
            return {
                signInName: '',
                signPassword: ''
            }
        },
        methods:{
            alertValue () {
                let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;//4到16位（字母，数字，下划线，减号）
                if(uPattern.test(this.logInName)){
                    alert('请填写内容')
                }else{
                    alert('用户名 :'+this.logInName+'；密码 :'+this.logInPassword+";")
                }

            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
  .content{
    padding: 20px 40px 25px;
    p.content-input{
      margin: 20px 0;
      span{
        display: inline-block;
        width: 65px;
        text-align: right;
        margin-right: 15px;
      }
      .el-input{
        width: calc(100% - 80px);
      }
    }

    .content-button{
      text-align: center;
    }
  }
</style>
