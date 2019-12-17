<template>
  <div class="dialog-wrap" v-show="isShowDialog">
      <div class="dialog-cover" v-show="isShowDialog" @click="closeDialog"></div>
      <transition name="fade">
        <div class="dialog-content" v-show="isShowDialog"  :style="{width : dialogWidth}">
          <p class="dialog-close" @click="closeDialog"><i class="el-icon-switch-button"></i></p>
          <slot>empty</slot>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "myDialog",
        props: {
            isShowDialog : {
                type: Boolean,
                default : false
            },
            dialogWidth :{
                type: String,
                default : "400px"
            }
        },
        data () {
            return {
                loadQueue: null,
            }
        },
        methods : {
            closeDialog () {
                this.$emit('close-dialog')
            },
            parentHandleClick () {
                this.scrollbarEle = $('.scrollbarWrap')
                this.scrollbarEle.mCustomScrollbar();
            }
        },
        mounted () {

        },
        watch : {
            isShowDialog () {

            }
        }
    }
</script>

<style scoped  lang="scss">
  @import "../../static/style/param";
  .dialog-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9998;

    /*渐变动画*/
    .fade-enter-active {
      transition: all .5s;
    }
    .fade-leave-active {
      transition: all .3s;
    }
    .fade-enter{
      opacity: 0;
    }
    .fade-enter-to {
      opacity: 1;
    }
    .fade-leave  {
      opacity: 0;
    }
    .fade-leave-to  {
      opacity: 0;
    }

    .dialog-cover{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /*position: absolute;
      width: 100%;
      height: 100%;*/
      background-color: rgba(0,0,0,.6);
    }
    .dialog-content{
      position: absolute;
      top: 50%;
      left: 50%;
      /*width: 400px;*/
      max-height:92%;
      transform: translateX(-50%) translateY(-50%);
      background-color: #ffffff;
      border-top: 5px solid #41b883;
      z-index: 9999;
      .dialog-close{
        position: absolute;
        top: 10px;
        right: 12px;
        transition: all 0.3s;
        font-size: percentage(12 / $base_font_size);
        cursor: pointer;
        &:hover{
          color: #a81a0b;
        }
        i{
          font-size: 1.5em
        }
      }
    }
  }
</style>
