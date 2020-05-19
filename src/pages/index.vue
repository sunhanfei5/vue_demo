<template>
  <div id="index-wrap" class="app-content-inner" ref="ele">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <div class="index-left-box" v-for=" product in productList ">
          <h3>{{ product.title }}</h3>
          <ul>
            <li v-for="(item , index) in product.list" v-bind:class="'item-'+index">
              <a v-bind:href="item.pageUrl">{{item.title}}</a>
              <span class="hot-icon" v-if="item.hot">HOT</span>
            </li>

          </ul>
        </div>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <div class="index-left-box">
          <ul>
            <li v-for="newItem in newList ">
              <a :href="newItem.pageUrl">{{newItem.title}}</a>
              <span class="hot-icon" v-if="newItem.hot">HOT</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="index-right">
      <slide :slides="slides" :inv-time="invTime" @on-change="doSomethingFromSlide"></slide>
      <div class="index-right-board">
        <div class="index-right-item" v-for="item in boardList">
          <div class="index-right-item-inner">
            <div class="img"><img :src="item.imgUrl" :alt="item.title"></div>
            <div class="text">
              <h2>{{item.title}}</h2>
              <p>{{item.description}}</p>
              <div class="index-right-item-button">
                <router-link :to="item.pageUrl" class="button" >立即购买
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="charts"></div>
    </div>
  </div>
</template>

<script>
    import Slide from "../components/slide";
    export default {
        name: "index",
        components: {Slide},
        data () {
            return {
                flag: false,//让父组件异步获取数据完成后再加载子组件
                invTime:4000,
                myChart:Object,
                productList:null,
                newList:null,
                boardList:null,
                slides:null,
               /* productList : {
                    "pc": {
                        "title" : "PC产品",
                        "list": [
                            {
                                "title": "数据统计",
                                "pageUrl": "/products/statistics",
                                "hot": true
                            },
                            {
                                "title": "数据预测",
                                "pageUrl": "/products/forecast"
                            },
                            {
                                "title": "流量分析",
                                "pageUrl": "http://baidu.com"
                            },
                            {
                                "title": "广告发布",
                                "pageUrl": "http://baidu.com"
                            }
                        ]

                    },
                    "app": {
                        "title" : "应用类产品",
                        "list": [
                            {
                                "title": "91助手",
                                "pageUrl": "/products/91Assistant",
                                "hot": true
                            },
                            {
                                "title": "产品助手",
                                "pageUrl": "/products/productAssistant"
                            },
                            {
                                "title": "智能地图",
                                "pageUrl": "https://map.baidu.com/"
                            },
                            {
                                "title": "团队语音",
                                "pageUrl": "http://baidu.com"
                            }
                        ]
                    }
                },
                newList: [
                    {
                        "title": "澎湃动力，从自变油&火花塞养护之道说起。",
                        "pageUrl": "http://baidu.com",
                        "hot": true
                    },
                    {
                        "title": "夏日减肥指南，请查收。",
                        "pageUrl": "http://baidu.com"
                    },
                    {
                        "title": "后顾无忧，尽享安心与愉悦。",
                        "pageUrl": "http://baidu.com"
                    },
                    {
                        "title": "佳节团圆聚福利，无忧出行享关怀。",
                        "pageUrl": "http://baidu.com"
                    }
                ],
                boardList: [
                    {
                        "title": "数据统计",
                        "description": "开放产品是一款开放产品",
                        "imgUrl": "./static/images/top/img_idea01.png",
                        "pageUrl": "/products/statistics",
                        "saleOut": false
                    },
                    {
                        "title": "数据预测",
                        "description": "品牌营销能帮助你的产品更好的找到定位",
                        "imgUrl": "./static/images/top/img_idea02.png",
                        "pageUrl": "/products/forecast",
                        "saleOut": false
                    },
                    {
                        "title": "91助手",
                        "description": "使命必达快速迭代永远保护最前端的速度",
                        "imgUrl": "./static/images/top/img_idea03.png",
                        "pageUrl": "/products/91Assistant",
                        "saleOut": true
                    },
                    {
                        "title": "产品助手",
                        "description": "帮你勇闯高峰，达到失业高峰",
                        "imgUrl": "./static/images/top/img_idea04.png",
                        "pageUrl": "/products/productAssistant",
                        "saleOut": false
                    }

                ],
                slides: [
                    {
                        "src": "static/images/slides/img01.jpg",
                        "title": "标题1",
                        "href": "detail/demo1"
                    },
                    {
                        "src": "static/images/slides/img02.jpg",
                        "title": "标题2——如果标题真的真的真的很长，我们可以隐藏掉。",
                        "href": "detail/demo2"
                    },
                    {
                        "src": "static/images/slides/img03.jpg",
                        "title": "标题3",
                        "href": "detail/demo3"
                    },
                    {
                        "src": "static/images/slides/img04.jpg",
                        "title": "标题4",
                        "href": "detail/demo4"
                    }
                ]*/
            }
        },
        created () {
            /*用vue-resource 静态地址*/
            /*this.$http
                .get('/static/json/index.json')
                .then(
                    (dataList)=>{
                        this.productList = dataList.data.productList;
                        this.newList = dataList.data.newList;
                        this.boardList = dataList.data.boardList;
                        console.log(this.productList)
                        console.log(dataList.data.productList)
                    },
                    (err)=>{
                        console.log(err)
                    })*/
            /*用axios 模拟服务器*/
            /* this.$axios
               .post('api/top',{})
               .then(
                   (dataList)=>{
                       this.productList = dataList.data.productList;
                       this.newList = dataList.data.newList;
                       this.boardList = dataList.data.boardList;
                   },
                   /!*(err)=>{
                       console.log(err)
                   }*!/
               )
               .catch((err) => {
                   console.error(err)
               }) */


            /*多次请求*/
            this.$axios
                .all([
                        this.$axios.post('api/top'),//首页
                        this.$axios.post('api/slides',{first: this.invTime})//侧边栏
                    ])
                .then(this.$axios.spread((topDataList, slideDataList)=> {
                    // 两个请求现在都执行完成
                    //top
                    this.productList = topDataList.data.productList;
                    this.newList = topDataList.data.newList;
                    this.boardList = topDataList.data.boardList;
                    //slide
                    this.slides = slideDataList.data;
                    this.flag = true;

                }))
                .catch((err) => {
                    console.error(err)
                });
        },
        computed: {//计算属性

        },
        methods: {
            doSomethingFromSlide (data) {/*从slide子组件传来的数据*/
                // console.log(data +'doSomethingFromSlide run!')
            }
        },
        mounted(){

            // 基于准备好的dom，初始化echarts图表
            this.myChart = echarts.init(document.getElementById('charts'));
            let option = {
                title: {
                    text: '销售统计'
                },
                tooltip: {

                },
                legend: {
                    data:['成交量(次)']
                },
                xAxis: {
                    data: ["2019/12/01","2019/12/02","2019/12/03","2019/12/04","2019/12/05","2019/12/06","2019/12/07"]
                },
                yAxis: {},
                series: [{
                    name: '成交量(次)',
                    type: 'bar',
                    data: [490, 200, 360, 100, 100, 200,360]
                }]
            };

            // 为echarts对象加载数据
            this.myChart.setOption(option);

        },

    }
</script>
<style scoped lang="scss">
  @import "../../static/style/param";
  #index-wrap{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .index-left{
      width: 300px;
      .index-left-block{
        background-color: #ffffff;
        margin-bottom: 30px;
        &:last-child{
          margin-bottom: 0;
        }
        h2{
          background-color: #41b883;
          font-size: percentage(18/$base_font_size);
          padding: 14px 25px;
          color: #ffffff;
        }
        .index-left-box{
          width: calc(100% - 50px);
          border-bottom: 1px solid #e3e4e8;
          padding: 20px 0;
          margin: 0 auto;
          &:last-child{
            border: none;
          }
          h3{
            padding: 11px 0;
            font-weight: bold;
          }
          ul{
            /*@for $i from 1 through 3 {
                .item-#{$i} { width: 2em * $i; }
            }*/
            li {
              padding: 9px 0;
              a{
                display: inline-block;
                max-width: calc(100% - 46px);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow:hidden;
              }
            }
          }
        }
      }
    }
    .index-right{
      width: calc(100% - 330px);
      .index-right-board{
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 30px;
        .index-right-item{
          width: calc(50% - 15px);
          background-color: #ffffff;
          margin-top: 30px;
          padding: 25px;
          box-sizing: border-box;
          &:first-child .img img{
            margin-left: -5px;
          }
          .index-right-item-inner{
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: center;
            .img{
              width: 110px;
              height: 110px;
              line-height: 110px;
              img{
                vertical-align: middle;
              }
            }
            .text{
              width: calc(100% - 110px);
              h2{
                font-weight: bold;
                font-size: percentage(18/$base_font_size);
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 20px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

              }
              .index-right-item-button{
                .button{
                  display: block;
                  width: 60%;
                  padding: 10px 0 11px;
                  line-height: 1em;
                  text-align: center;
                  color: #ffffff;
                  background-color: #41b883;
                  -webkit-transition: all 0.3s;
                  -moz-transition: all 0.3s;
                  -ms-transition: all 0.3s;
                  -o-transition: all 0.3s;
                  transition: all 0.3s;
                  &:hover{
                    border-radius: 50px;

                  }
                }
              }

            }
          }
        }
      }
      #charts{
        width: 100%;
        height: 400px;
        background-color: #ffffff;
        padding:  25px;
        box-sizing: border-box;
      }
    }
  }

</style>
