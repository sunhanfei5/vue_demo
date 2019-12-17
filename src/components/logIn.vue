<template>
  <div class="content">
    <el-form  label-position="right" label-width="60px">
      <el-form-item prop="logInName" label="用户名" :class="{'errorBorder': showBorder.name}">
        <el-input v-model="logInForm.name" clearable></el-input>
        <span class="logInNameError">{{showFront?logInNameError.errorText : errorText.name }}</span>
      </el-form-item>
      <el-form-item prop="logInPassword" label="密码"  autocomplete="off" :class="{'errorBorder': showBorder.password}" >
        <el-input v-model="logInForm.password" type="password" show-password></el-input>
        <span class="logInPasswordError">{{showFront?logInPasswordError.errorText: errorText.password}}</span>
      </el-form-item>
    </el-form>
    <p class="content-button">
      <el-button
        type="primary"
        round
        @click.prevent="onLogIn"
        :disabled="showDisabled.name||showDisabled.password">
        登&nbsp;&nbsp;&nbsp;录
      </el-button>
    </p>
  </div>
</template>

<script>

    export default {
        name: "logIn",
        data() {
            return {
                showFront:true,
                logInForm:{
                    name: '',
                    password: ''
                },
                showBorder: {
                    name : false,
                    password : false
                },
                showDisabled:{
                    name : true,
                    password : true
                },
                errorText: {
                    name : "true",
                    password : "true"
                }
            }
        },
        computed:{
            logInNameError () {
                let errorText,status;
                if(!/@/g.test(this.logInForm.name)){
                    this.showBorder.name = true
                    this.showDisabled.name = true
                    status = false;
                    errorText = '登录名需包含@'
                }
                else{
                    this.showBorder.name = false
                    this.showDisabled.name = false
                    status = true;
                    errorText = ''
                }
                if(!this.userFlag ||this.logInForm.name===""){
                    this.showBorder.name = false
                    errorText = ''
                    this.userFlag = true
                }
                // console.log(this.showDisabled)
                return{errorText,status}
            },
            logInPasswordError () {
                let errorText,status;
                if(!/^(?![^a-zA-Z]+$)(?!\D+$)(?![a-zA-Z0-9]+$).{8,}$/g.test(this.logInForm.password)){
                    this.showBorder.password = true
                    this.showDisabled.password = true
                    status = false;
                    errorText = '密码至少为8位的字母、数字和特殊符号的组合'
                }
                else{
                    this.showBorder.password = false
                    this.showDisabled.password = false
                    status = true;
                    errorText = ''
                }
                if(!this.passwordFlag || this.logInForm.password===""){
                    this.showBorder.password = false
                    errorText = ''
                    this.passwordFlag = true
                }
                return{errorText,status}
            }
        },
        methods:{
            onLogIn () {
                // alert('用户名 :'+this.logInForm.name+'；密码 :'+this.logInForm.password+";")
                this.$axios
                    .post('api/logIn',{name: this.logInForm.name,password: this.logInForm.password})
                    .then(
                        (data)=>{
                            if(data.data.code===1){
                                this.logInForm.name="";
                                this.logInForm.password=""

                                /*this.errorText.name=""
                                this.errorText.password=""
                                this.showFront=false;*/
                                this.$emit('log-in-submit',data.data.userName)
                            }else{
                                // console.log(2)
                                this.showBorder.name = true
                                this.showDisabled.name = true
                                this.showBorder.password = true
                                this.showDisabled.password = true
                                this.errorText.name="用户名或密码错误请重新输入"
                                this.errorText.password="用户名或密码错误请重新输入"
                                this.showFront=false;
                                console.log(this.showFront)
                            }

                        }
                    )
                    .catch((err) => {
                        console.error(err)
                    })
            }
        },
        watch: {
            'logInForm.name' : function(){
                if(!this.showFront){
                    this.showFront=true
                }
          }
        }
    }
</script>

<style lang="scss">
  @import "../../static/style/param";
  .content{
    padding: 40px 40px 30px 40px;
    .el-form-item{
      position: relative;
    }
    .logInNameError,
    .logInPasswordError{
      position: absolute;
      bottom: -30px;
      display: block;
      font-size: percentage(14 / $base_font_size);
      color: #F56C6C;
    }
    .errorBorder{
      .el-input__inner{
        border: 1px solid #F56C6C;
      }
    }
    .content-button{
      text-align: center;
    }
  }
</style>
