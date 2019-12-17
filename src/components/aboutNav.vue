<template>
    <nav class="about-nav">
      <div class="about-nav-wrap">
        <ul>
          <li><router-link to="aboutUs"><span>公司介绍</span></router-link></li>
          <li><router-link to="news"><span>公司动态</span></router-link></li>
          <li><router-link to="partner"><span>合作伙伴</span></router-link></li>
          <li><router-link to="joinUs"><span>加入我们</span></router-link></li>
          <li><router-link to="contact"><span>联系我们</span></router-link></li>
        </ul>
      </div>
    </nav>
</template>

<script>
    export default {
        name: "aboutNav"
    }
</script>

<style scoped lang="scss">
  @import "../../static/style/param";
.about-nav{
  position: fixed;
  left: 0;
  top: 0;
  visibility: hidden;
  width: 100%;
  /*background-color: #35495e;*/
  background-color: #41b883;
  /*border-top: 2px solid #41b883;*/
  z-index: 1000;
  .about-nav-wrap{
    width: 60%;
    min-width: 1000px;
    margin: 0 auto;
    ul{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      text-align: center;
      color: #ffffff;
      li{
        display: block;
        border-right: 1px;
        flex: 1;
        a{
          display: block;
          /*height: 32px;
          line-height: 32px;*/
          padding: 10px 0;
          font-size: percentage(14 / $base_font_size);
          &.router-link-active{
            background-color: rgba(0,0,0,.2);
            /*background-color: #41b883;*/
          }
          span{
            display: block;
            line-height: 1;
            border-right: 1px solid #349369;
          }
        }
        &:hover a{
          background-color: rgba(0,0,0,.1);
          color: #ffffff;
          &.router-link-active{
            background-color: rgba(0,0,0,.2);
          }
        }
        &:last-child a span{
          border: none;
        }
      }
    }

  }
}
</style>
