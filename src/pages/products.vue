<template>
  <div class="products-wrap app-content-inner">
    <div class="products-left">
      <div class="products-left-inner">
        <p class="products-left-img"><img :src="productList[slideNowIndex].imgUrl" alt=""></p>
        <ul class="products-left-list">
          <li v-for="(item,index) in productList"
              @click="changeImage(index)">
            <router-link
              class="products-left-list-item"
              :to="item.pageUrl"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </div>

    </div>
    <div class="products-right">
<!--      <keep-alive>-->
        <router-view></router-view>
<!--      </keep-alive>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "products",
        data () {
            return {
                slideNowIndex: 0,
                productList: [
                    {
                        title: '数据统计',
                        pageUrl: 'statistics',
                        imgUrl: './static/images/top/img_idea01.png',
                    },
                    {
                        title: '数据预测',
                        pageUrl: 'forecast',
                        imgUrl: './static/images/top/img_idea02.png',
                    },
                    {
                        title: '91助手',
                        pageUrl: '91Assistant',
                        imgUrl: './static/images/top/img_idea03.png',
                    },
                    {
                        title: '产品助手',
                        pageUrl: 'productAssistant',
                        imgUrl: './static/images/top/img_idea04.png',
                    },
                ]

            }
        },
        methods : {
            changeImage (index) {
                //console.log(this.slideNowIndex)
                this.slideNowIndex = index;
            }
        },
        mounted() {
        }
    }
</script>

<style  lang="scss">
  @import "../../static/style/param";
  .products-wrap{
    width: 1200px;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -moz-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    .products-left{
      width: 250px;

      .products-left-inner{
        background-color: #ffffff;
        padding: 25px;
        box-sizing: border-box;
        .products-left-img{
          text-align: center;
          margin-bottom: 20px;
          img{
            height: 90px;
          }
        }
      }
      .products-left-list{
        li{
          margin-bottom: 1px;
          .products-left-list-item{
            display: block;
            padding: 10px 0;
            text-align: center;
            transition: all 0.3s;
            &:hover{
              background-color: #41b883;
              color: #ffffff;
            }
            &.router-link-active{
              background-color: #41b883;
              color: #ffffff;
            }
          }
        }
      }
    }
    .products-right{
      width: calc(100% - 280px);
      line-height: 1.8;
      .product-wrap{
        .product-detail-title{
          margin-bottom: 20px;
          padding-left: 15px;
          font-weight: bold;
          font-size: percentage(20/$base_font_size);
          border-left: 3px solid #41b883;

        }
        .product-up-detail-text{
          margin-bottom: 30px;
        }
        .product-up-inner{
          padding: 25px;
          background-color: #ffffff;
          margin-bottom: 30px;
          .product-up-detail{
            margin-bottom: 20px;

          }
          .product-up-buys{
            .product-up-buys-list{
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              display: -moz-flex;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
              -ms-flex-direction: row;
              flex-direction: row;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              margin-bottom: 30px;
              .product-up-buys-list-name{
                width: 5em;
                text-align: right;
                margin-right: 20px;
                /*font-weight: bold;*/
              }
            }
          }
        }
        .product-down-inner{
          padding: 25px;
          background-color: #ffffff;
        }
      }

    }
  }
</style>
