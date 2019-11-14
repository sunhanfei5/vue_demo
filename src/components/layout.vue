<template>
  <div id="layout">
    <div id="app-header">
      <div class="app-header-inner">
        <img class="header-logo" src="../assets/logo.png" alt="">
        <div class="header-nav">
          <ul class="nav-list" >
            <li @click="openLogInDialog">登录</li>
<!--            <li class="nav-pile">|</li>-->
            <li @click="openSignInDialog">注册</li>
<!--            <li class="nav-pile">|</li>-->
            <li @click="openAboutDialog">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="app-content">
      <div class="app-content-inner">
        <keep-alive><!--缓存，访问过后被缓存起来-->
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div id="app-footer">
      <p>
        <span>&copy; 2019制作</span>
        <a href="" target="_blank">沪ICP备12345678</a>
        <a href="" target="_blank">沪公网安备31011311311211</a>
      </p>
    </div>
    <my-dialog :is-show-dialog="isShowLogInDialog" @close-dialog = "closeDialog('isShowLogInDialog')">
      <log-in></log-in>
    </my-dialog>
    <my-dialog :is-show-dialog="isShowSignInDialog" @close-dialog = "closeDialog('isShowSignInDialog')">
      <sign-in></sign-in>
    </my-dialog>
    <my-dialog :is-show-dialog="isShowAboutDialog" @close-dialog = "closeDialog('isShowAboutDialog')">
      <p>About</p>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from './myDialog'
  import LogIn from "./logIn";
  import SignIn from "./signIn";
    export default {
        name: "layout",
        components : {SignIn, LogIn, MyDialog},
        data () {
            return {
                isShowLogInDialog : false,
                isShowSignInDialog : false,
                isShowAboutDialog : false,
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
            },
            closeDialog (attr) {
                this[attr] = false
            }
        }
    }
</script>

<style lang="scss">
  @import "../../static/style/param";
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
    background-color: #363636;
    color: #b2b2b2;
    height: 80px;
    line-height: 80px;
    width: 100%;
    margin-bottom: 30px;
    .app-header-inner{
      width: 80%;
      margin: 0 auto;
      clear: both;
      overflow: hidden;
      .header-logo{
        display: inline-block;
        height: 46px;
        width: auto;
        margin-top: 18px;
      }
      .header-nav{
        float: right;
        .nav-list{
          clear: both;
          overflow: hidden;
          li{
            position: relative;
            float: left;
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            &:last-child{
              padding-right: 0;
            }
            &:hover{
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
          }
          /*.nav-pile{
              margin: 0 10px;
          }*/
        }

      }
    }
  }
  #app-footer{
    width: 100%;
    padding: 18px 0;
    text-align: center;
    background-color: #e3e4e8;
    clear: both;
    margin-top: 30px;
    font-size: percentage(14/$base_font_size);
    a{
      display: inline-block;
      margin-left: 15px;
    }
  }
  #app-content{
    width: 100%;
    /*background-color: #f1f1f1;*/
    .app-content-inner{
      width: 1200px;
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
