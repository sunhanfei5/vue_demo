<template>
    <div class="selection-wrap" v-click-outside="handleClose">
      <div class="selection-show">
          <input type="text" v-model="selections[nowIndex].label" @click="toggleDrop()"/>
        <div class="selection-arrow"><i class="el-icon-arrow-up" :class="{'is-reverse':isDrop}"></i></div>
      </div>
      <transition name="el-zoom-in-top">
      <div class="selection-list-box" v-show="isDrop">
          <div class="scroll-bar-content">
            <ul class="selection-list" >
              <li class="selection-list-item"
                  :class="{'selected': nowIndex===index}"
                  v-for="(item,index) in selections"
                  @click="acquireIndex(index)"
              >{{item.label}}</li>
            </ul>
          </div>
          <div class="popper-arrow"></div>
      </div>

      </transition>
    </div>
</template>

<script>
    export default {
        name: "selection",
        props:{
          selections:{
              type:Array,
              default:[
                  {
                      label:'test',
                      value: 0
                  }
              ]
          }
        },
        data(){
            return{
                scrollBar: null,
                isDrop: false,
                nowIndex: 0

            }
        },
        /*directives: {//注册全局事件
            'click-outside': {
                bind: function (el, binding, vnode) {
                    function documentHandler(e) {
                        if (el.contains(e.target)) {
                            return false;
                        }
                        if (binding.expression) {
                            binding.value(e)
                        }
                    }
                    el._vueClickOutside_ = documentHandler;
                    document.addEventListener('click', documentHandler);
                },
                unbind: function (el, binding) {
                    document.removeEventListener('click', el._vueClickOutside_);
                    delete el._vueClickOutside_;
                }
            }
        },*/
        methods:{
            parentHandleClick () {
                this.scrollBar = $('.scroll-bar-content')
                this.scrollBar.mCustomScrollbar({
                        theme : "dark",
                    // autoHideScrollbar:true,
                    // autoDraggerLength:false
                });
            },
            toggleDrop () {
                this.isDrop=!this.isDrop;
            },
            acquireIndex(index){
                this.nowIndex= index;
                this.isDrop=false;
                this.$emit('transmitInformation',this.nowIndex)
            },
            // 下拉菜单
            handleClose(){
                this.isDrop = false;
            }

        },
        computed:{
            /*selectionsValue () {
                return this.selections[this.nowIndex].label
            }*/
        },
        mounted() {
            this.parentHandleClick();
        }
    }
</script>

<style lang="scss">
  @import "../../static/style/param";
  // 作用是取消数据绑定时出现的代码闪烁
  [v-cloak] {
    display: none;
  }
  $inputH: 40;
  $selectOptionH: 34;
  .selection-wrap{
    position: relative;
    width: 200px;
    font-size: percentage(14/$base_font_size);
    /*向下展开动画*/
    .el-zoom-in-top-enter-active,
    .el-zoom-in-top-leave-active{
      opacity:1;
      transform:scaleY(1);
      transition:transform .3s cubic-bezier(.23,1,.32,1), opacity .3s cubic-bezier(.23,1,.32,1);
      transform-origin:center top
    }
    .el-zoom-in-top-enter,
    .el-zoom-in-top-leave-active{
      opacity:0;
      transform:scaleY(0)
    }
    .selection-show{
      input{
        display: block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        outline: none;
        padding: 0 30px 0 15px;
        height: $inputH+px;
        line-height: $inputH+px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:focus{
          border: 1px solid #41b883;
        }
      }
      .selection-arrow{
        position: absolute;
        height: 100%;
        right: 5px;
        top: 0;
        text-align: center;
        color: #c0c4cc;
        transition: all .3s;
        pointer-events: none;
        .el-icon-arrow-up{
          display: block;
          width: 25px;
          line-height: 40px;
          color: #c0c4cc;
          font-size: 14px;
          transition: transform .3s;
          transform: rotate(180deg);
          cursor: pointer;
          &.is-reverse {
            transform: rotate(0deg);
          }
        }

      }
    }
    .selection-list-box{
      position: absolute;
      top: $inputH+12+px;
      left: 0;
      width: 100%;
      transform-origin: center top;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-sizing: border-box;
      z-index: 9999;
      .scroll-bar-content{
        padding: 6px 0;
        max-height: $selectOptionH*8+px;
        overflow-y :auto;
      }
      .selection-list{
        list-style: none;
        margin: 0;
        box-sizing: border-box;

        .selection-list-item{
          position: relative;
          padding: 0 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #606266;
          height: $selectOptionH + px;
          line-height: 34px;
          box-sizing: border-box;
          cursor: pointer;
          &:hover{
            background-color: #f5f7fa;
          }
          &.selected{
            color: #41b883;
          }
        }
      }
      .popper-arrow{
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        top: -6px;
        left: 35px;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #ebeef5;
        filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
        &:after {
          content: " ";
          position: absolute;
          display: block;
          top: 1px;
          margin-left: -6px;
          width: 0;
          height: 0;
          border-width: 6px;
          border-color: transparent;
          border-style: solid;
          border-top-width: 0;
          border-bottom-color: #fff;
        }
      }
    }
  }
</style>
