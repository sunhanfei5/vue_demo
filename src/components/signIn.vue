<template>
  <div class="content">
    <el-form :model="signInform" ref="signInform" :rules="rules" label-position="right" label-width="80px">
      <el-form-item prop="name" label="注册名" >
        <el-input v-model="signInform.name" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码"  autocomplete="off" >
        <el-input v-model="signInform.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label="确认密码"  autocomplete="off">
        <el-input v-model="signInform.checkPass" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="moveTel" label="移动电话">
        <el-input v-model="signInform.moveTel"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别" class="content-sex">
        <el-radio-group v-model="signInform.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="address" label="地址">
        <el-select v-model="signInform.address" placeholder="请选择">
          <el-option key="0" label="长沙" value="长沙"></el-option>
          <el-option key="1" label="永州" value="永州"></el-option>
          <el-option key="2" label="株洲" value="株洲"></el-option>
          <el-option key="3" label="湘潭" value="湘潭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="menu" label="备注">
        <el-input v-model="signInform.menu" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
      </el-form-item>
      <el-form-item prop="type" class="content-check">
        <el-checkbox label="1" name="type"  v-model="signInform.type">我已阅读并同意</el-checkbox>
        <!--<el-checkbox-group>
        </el-checkbox-group>-->
      </el-form-item>

    </el-form>
    <div class="content-button">
      <el-button type="primary" round @click="addPlan('signInform')">提&nbsp;&nbsp;&nbsp;交</el-button>
      <el-button round @click="resetForm('signInform')">重&nbsp;&nbsp;&nbsp;置</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "signIn",
        data: function() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    console.log(value)
                    callback(new Error('请输入密码'));
                } else {
                    if (this.signInform.checkPass !== '') {
                        this.$refs.signInform.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请再次输入密码'));
                } else if (value != this.signInform.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                signInform: {
                    name: '',
                    password: '',
                    checkPass: '',
                    // age: '',
                    sex: '男',
                    // hobby: [],
                    address: '',
                    // email: '',
                    // sfz: '',
                    // tel: '',
                    moveTel: '',
                    // webId: '',
                    menu: '',
                    type: [],
                    formLabelWidth: '80px',
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入用户昵称',
                        trigger: 'blur'
                    },
                        {
                            min: 5,
                            max: 10,
                            message: '请输入5~10个字符',
                            trigger: 'blur'
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入用户密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 30,
                            message: '请输入至少6字节的字母和数字混合密码',
                            trigger: 'blur'
                        },
                        {
                            pattern: /^(\w){6,20}$/,
                            message: '只能输入6-20个字母、数字、下划线',
                            trigger: 'blur'
                        },
                        {
                            validator: validatePass,required: true, trigger: 'blur' ,
                        },
                    ],
                    checkPass: [{
                        required: true ,
                        message: '请再次输入密码',
                    },
                        {
                            validator: validatePass2,trigger: 'blur',
                        },
                    ],
                    /*age: [{
                        required: true,
                        message: '请输入用户年龄',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^[1-9][0-9]{0,1}$/,
                            message: '只能输入1-120',
                            trigger: 'blur'
                        }
                    ],
                    hobby: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],*/
                    address: [{
                        required: false,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    /*email: [{
                        required: true,
                        message: '请输入电子邮箱',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
                            message: '请输入正确的电子邮箱',
                            trigger: 'blur'
                        }
                    ],
                    sfz: [{
                        required: true,
                        message: '请输入身份证号',
                        trigger: 'blur'
                    },
                        {
                            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                            message: '请输入正确的身份证号码',
                            trigger: 'blur'
                        }
                    ],
                    tel: [{
                        required: true,
                        message: '请输入座机号码',
                        trigger: 'blur'
                    },
                        {
                            pattern: /0\d{2}-\d{7,8}$/,
                            message: '请输入正确的固话（格式：区号+号码,如010-1234567）',
                            trigger: 'blur'
                        }
                    ],*/
                    moveTel: [{
                        required: true,
                        message: '请输入移动号码',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                            message: '请输入正确移动号码',
                            trigger: 'blur'
                        }
                    ],
                    /*webId: [{
                        required: true,
                        message: '请输入IP地址',
                        trigger: 'blur'
                    },
                        {
                            pattern: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
                            message: '请输入正确IP地址',
                            trigger: 'blur'
                        }
                    ],*/
                    menu: [{
                        required: false,
                        message: '请输入备注',
                        trigger: 'blur'
                    },
                        {
                            min: 6,
                            max: 30,
                            message: '请输入至少6字节的备注',
                            trigger: 'blur'
                        },
                    ],
                    type: [{
                        // 'is': true,
                        type: 'array',
                        required: true,
                        message: '请勾选后再提交',
                        trigger: 'change'
                    },
                    ]
                },
            }

        },
        methods: {
            addPlan: function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        console.log(this.signInform)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                if (this.$refs[formName]!==undefined) {
                    this.$refs[formName].resetFields();
                }
            }
        },
    }
</script>

<style  lang="scss">
  .content{
    padding: 40px 40px 30px 40px;
    max-height:100%;
    .el-select{
      width: 100%;
    }
    .el-textarea__inner{
      resize: none;
    }

    .content-sex{
      .el-form-item__label{
        line-height: 30px;
      }
      .el-form-item__content{
        line-height: 30px;
      }
    }
    .content-check{
      .el-form-item__error{
        margin-left: 0;
      }
      .el-form-item__content{
        line-height: 20px;
        /*margin-left: 0 !important;*/
      }
    }
    .content-button{
      text-align: center;
    }
  }
</style>
