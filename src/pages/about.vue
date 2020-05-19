<template>
  <div class="about">
    <!--loading start-->
    <div id="loaderCont">
      <i class="el-icon-loading "></i>
    </div>
    <!--loading end-->

    <!--关于页面导航-->
    <v-about-nav></v-about-nav>
    <!--路由匹配到的组件将显示在这里-->
    <!--<keep-alive>-->
    <router-view></router-view>
    <!--</keep-alive>-->
    <!--路由匹配到的组件将显示在这里-->

    <!--链接 start-->
    <div id="icon_event">
      <div class="cart">
        <img class="icon" src="../../static/images/about/cart.png" alt="Icon"/>
        <ul>
          <li  @click="offEvent">
            <router-link to="/products/statistics">
              <i class="el-icon-data-line"></i>
              数据统计
            </router-link>
          </li>
          <li @click="offEvent">
            <router-link to="/products/forecast">
              <i class="el-icon-pie-chart"></i>
              数据预测
            </router-link>
          </li>
          <li @click="offEvent">
            <router-link to="/products/91Assistant">
              <i class="el-icon-suitcase"></i>
              91助手
            </router-link>
          </li>
          <li @click="offEvent">
            <router-link to="/products/productAssistant">
              <i class="el-icon-suitcase-1"></i>
              产品助手
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--链接 end-->

    <!--上下翻页按钮 start-->
    <span class="prevPage"><i class="el-icon-arrow-up"></i></span>
    <span class="nextPage"><i class="el-icon-arrow-down"></i></span>
    <!--上下翻页按钮 end-->


  </div>
</template>

<script>
    import vAboutNav from "../components/aboutNav";
    import PropertyStore from "../assets/scripts/store.js"
    export default {
        name: "about",
        components:{vAboutNav},
        data () {
            return {
                height: window.innerHeight || document.documentElement.clientHeight,
            }
        },
        methods: {
            // --------
            // RESIZE
            // --------

            handleResize: function (el) {
                // console.log('handleResize')
                //this.reSize(el)
                $('.about').height(this.height - PropertyStore.headerH - PropertyStore.footerH )

            },
            offEvent(){
                $('html, body').css({overflow: 'auto'})
                PropertyStore.state.property.currentId= 0;
                PropertyStore.state.property.prevId= -1;
                PropertyStore.state.property.eventAnable= false;
                this.setEvent(false)
                this.loadComplete(PropertyStore.e)
            },

        },
        mounted () {
            this.handleResize()
        }
    }

</script>

<style lang="scss">
  @import "../../static/style/param";
  .about{
    /* position: absolute;
     top: 0;
     left: 0;
     width: 100%;*/
    overflow: hidden;
    section{
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    #loaderCont{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.6em;
      height: 1.6em;
      margin: 0 0 0 -0.8em;
      font-size: 1.6em;
      display: none;
    }
    .about-title{
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      /*background-color: rgba(0,0,0,0.5);*/
      background-color: rgba(255,255,255,0.5);
      padding: 50px 80px;
      z-index: 10;
      border-radius: 6px;
      text-align: center;
      &.style02{
        position: initial;
        display: block;
        min-width: 1000px;
        margin: 0 auto;
        padding: 30px 0 30px;
        background-color: transparent;
        transform: translateX(0);
      }
      h2{
        position: relative;
        font-size: percentage(30 / $base_font_size);
        color: #a81a0b;
        /*color: #363636;*/
        font-weight: bold;
        padding-bottom: 16px;
        &:after{
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 30px;
          height: 3px;
          background-color: #41b883;
        }
      }
      span{
        display: block;
        padding-top: 9px;
      }
    }
    #icon_event{
      position: fixed;
      display: block;
      right: 0;
      bottom: 60px;
      z-index: 3000;
      .cart{
        position: relative;
        display: block;
        cursor: pointer;
        margin-right: 30px;
        img{
          width: 40px;
        }
        ul{
          position: absolute;
          right: -100px;
          bottom: -2px;
          width: 60px;
          border-radius: 3px;
          color: #ffffff;
          li{
            text-align: center;
            background-color: #35495e;
            padding: 9px 0;
            margin-bottom: 3px;
            border-radius: 3px;
            a{
              font-size: percentage(12/ $base_font_size);
              color: #ffffff;
              i{
                display: block;
                font-size: 2em;
                text-align: center;
                /*color: #a81a0b;*/
                color: #ffffff;
              }
            }
            &:hover{
              background-color: #a81a0b;
            }
          }
        }
      }
    }
    .nextPage,.prevPage{
      position: absolute;
      left: 50%;
      display: block;
      width: 100px;
      height: 50px;
      margin-left: -50px;
      background-color: #41b883;
      text-align: center;
      color: #ffffff;
      font-size: 2.4em;
      z-index: 900;
      &:hover{
        /*background-color: #349369;*/
        background-color: #a81a0b;
      }

    }
    .prevPage{
      border-radius: 0 0 50px 50px ;
      top: -50px;
      line-height: 42px;

    }
    .nextPage{
      border-radius: 50px 50px 0 0;
      bottom: -50px;
      line-height: 50px;

    }
  }
</style>
