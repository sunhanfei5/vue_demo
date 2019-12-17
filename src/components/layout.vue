<template>
  <div id="layout">
    <div id="app-header">
      <div class="app-header-inner">
        <span @click="offEvent"> <router-link :to="{path : '/'}"><img class="header-logo" src="../assets/logo.png" alt=""></router-link>
       </span>
        <div class="header-nav">
          <ul class="nav-list" >
            <li v-show="userInfo.name" class="userName">{{userInfo.name}}</li>
            <li v-show="userInfo.name" @click="logOut" class="logOut">退出</li>
            <li v-show="!userInfo.name" @click="openLogInDialog">登录</li>
            <li v-show="!userInfo.name" @click="openSignInDialog">注册</li>
            <li @click="changePage"><router-link to="/about">关于</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div id="app-content">
  <!--<div class="app-content-inner">-->
<!--        <keep-alive>-->
          <router-view></router-view>
<!--        </keep-alive>-->
  <!--</div>-->
    </div>
    <div id="app-footer">
      <p>
        <span>&copy; 2019制作</span>
        <a href="" target="_blank">沪ICP备12345678</a>
        <a href="" target="_blank">沪公网安备31011311311211</a>
      </p>
    </div>
    <my-dialog :is-show-dialog="isShowLogInDialog" :dialog-width = "dialogWidth" @close-dialog = "closeDialog('isShowLogInDialog')">
      <log-in @log-in-submit="logInSubmit"></log-in>
    </my-dialog>
    <my-dialog :is-show-dialog="isShowSignInDialog" :dialog-width = "dialogWidth" @close-dialog = "closeDialog('isShowSignInDialog')">
      <sign-in></sign-in>
    </my-dialog>
    <!--<my-dialog :is-show-dialog="isShowAboutDialog" @close-dialog = "closeDialog('isShowAboutDialog')" ref="myDialog">
      <div class="scrollbarWrap">
        <div style="padding: 40px 40px 30px 40px; line-height: 1.8; font-size: 14px;text-indent: 2em;text-align: justify">
        <p>所谓广告文案，它是广告内容的文字化表现。它的写作要求有较强的应用写作能力。广义的广告文案是指广告作品的全部，它不仅包括语言文字部分，还包括图画等部分。狭义的广告文案仅指广告作品的语言文字部分。一言以蔽之，文案是要用在广告中的，它只有一个目的——打动消费者。
          文案的类型有很多种。</p>
        <p>其一，直接阐述型，这种文案的特点是开门见山、直抒胸臆，很直白地向消费者介绍品牌的产品或产品的各项功能。比如格力的口号“好空调，格力造”，很直白地告诉消费者格力是造空调的行家；再比如六味地黄丸的广告词“治肾亏，不含糖”，很直接地指出了产品治肾亏的功能以及它不含糖的特点。
        </p>
        <p>其二，情感占位型，这种文案并不见得多么明显地体现产品特质，甚至根本不提自己的产品，但是能深刻地体现品牌的内涵，能从情感上打动消费者的内心。比如阿迪达斯的标语“Impossible is nothing”，单从标语根本看不出阿迪达斯生产的是什么产品，但却能感受到阿迪达斯不懈追求的内在品质。此外，锤子科技拍过一个名叫《天生骄傲》的系列广告，分别讲的是司机和菜农的生活小故事，跟锤子的产品丝毫没有关系，但看完之后却不由得让人对广告中的人物心生敬佩，相应的，对拍摄它的锤子公司，也是刮目相看。
        </p>
        <p>其三，情景交融型，通过一个场景的塑造，给人一种引人入胜的感觉，可以是小故事、生活场景再现等，在这些场景中插入和产品有关的镜头。比如大鹏为斯柯达昕动拍摄的系列搞笑广告《绝不逗你玩》，再比如新百伦的《伤心料理》广告都是如此。
        </p>
      </div>
      </div>
    </my-dialog>-->
  </div>
</template>

<script>
    import PropertyStore from '../assets/scripts/store.js'
  import MyDialog from './myDialog'
  import LogIn from "./logIn";
  import SignIn from "./signIn";
    export default {
        name: "layout",
        components : {SignIn, LogIn, MyDialog},
        data () {
            return {
                dialogWidth:"400px",
                isShowLogInDialog : false,
                isShowSignInDialog : false,
                isShowAboutDialog : false,
                userInfo : {
                    name:""
                },
                scrollbarEle: ""
            }
        },
        methods : {
            openLogInDialog () {
                this.isShowLogInDialog = true
            },
            openSignInDialog () {
                this.isShowSignInDialog = true
            },
            openAboutDialog () {
                this.isShowAboutDialog = true
                this.$refs.myDialog.parentHandleClick();
            },
            closeDialog (attr) {
                this[attr] = false
            },
            logInSubmit (data) {
                this.userInfo.name= data
                this.closeDialog('isShowLogInDialog')
                // console.log(data)
            },
            logOut(){
                this.userInfo.name=""
            },
            offEvent(){
                $('html, body').css({overflow: 'auto'})
                PropertyStore.state.property.currentId= 0;
                PropertyStore.state.property.prevId= -1;
                PropertyStore.state.property.eventAnable= false;
                this.setEvent(false)
                this.loadComplete(PropertyStore.e)
            },
            changePage(){
                this.$router.go(0);
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
  @import "../../static/style/param";
  @import "../../static/style/jquery.mCustomScrollbar.css";
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    color: #363636;
    font-size: $base_font_size;
    background-color: #f2f2f2;
    overflow-x: hidden;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote {
    &:before, &:after {
      content: '';
      content: none;
    }
  }
  q {
    &:before, &:after {
      content: '';
      content: none;
    }
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a{
    color: inherit;
    text-decoration: none;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  a:hover{
    color: #41b883;
  }
  /*layout*/
  #app-header{
    position: relative;
    background-color: #363636;
    color: #b2b2b2;
    height: 80px;
    line-height: 80px;
    width: 100%;
    z-index: 2000;
    /*margin-bottom: 30px;*/
    .app-header-inner{
      width: 80%;
      min-width: 1000px;
      height: 100%;
      margin: 0 auto;
      clear: both;
      overflow: hidden;
      a{
        .header-logo{
          padding-top: 18px;
          display: inline-block;
          height: 46px;
          width: auto;
        }
      }

      .header-nav{
        float: right;
        .nav-list{
          clear: both;
          overflow: hidden;
          li{
            &.userName{
              cursor: default;
              color: #ffffff;
            }
            position: relative;
            float: left;
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            &:last-child{
              /*padding-right: 0;*/
            }
            &:hover,
            &:hover a{
              color: #ffffff;
            }
            &:after{
              position: absolute;
              content: "";
              width: 1px;
              height: 14px;
              background-color: #b2b2b2;
              right: 0;
              top: 50%;
              margin-top: -6px;
              /*bottom: 0;*/
              /*margin: auto;*/
              overflow: hidden;
            }
            &:last-child:after{
              content: normal;
            }
            &.logOut:after{
              content: normal;
            }
          }
          /*.nav-pile{
              margin: 0 10px;
          }*/
        }

      }
    }
  }
  #app-footer{
    position: relative;
    width: 100%;
    padding: 18px 0;
    text-align: center;
    background-color: #e3e4e8;
    clear: both;
    /*margin-top: 30px;*/
    font-size: percentage(14/$base_font_size);
    z-index: 1000;
    p{
      min-width: 1000px;
    }
    a{
      display: inline-block;
      margin-left: 15px;
    }
  }
  #app-content{
    position: relative;
    width: 100%;
    /*background-color: #f1f1f1;*/
    .app-content-inner{
      width: 1200px;
      padding: 30px 0;
      margin: 0 auto;
    }
  }
  /*公用样式*/
  .hot-icon{
    display: inline-block;
    font-size: percentage(12/$base_font_size);
    width: 36px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 100%;
    background-color: #a81a0b;
    color: #ffffff;
    margin-left: 5px;
  }
</style>
