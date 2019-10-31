<template>
    <div id="index-wrap">
        <div class="index-left">
            <div class="index-left-block">
                <h2>全部产品</h2>
                <div class="index-left-box" v-for=" product in productList ">
                    <h3>{{ product.title }}</h3>
                    <ul>
                        <li v-for="(item , index) in product.list" v-bind:class="'item-'+index">
                            <a v-bind:href="item.url">{{item.title}}</a>
                            <span class="hot-icon" v-if="item.hot">HOT</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="index-left-block lastest-news">
                <h2>最新消息</h2>
                <div class="index-left-box">
                    <ul>
                        <li v-for=" newItem in newList ">
                            <a :href="newItem.url">{{newItem.title}}</a>
                            <span class="hot-icon" v-if="newItem.hot">HOT</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="index-right">
            <div class="index-right-board">
                <div class="index-right-item" v-for="item in boardList">
                    <div class="index-right-item-inner">
                        <div class="img"><img :src="item.imgUrl" :alt="item.title"></div>
                        <div class="text">
                            <h2>{{item.title}}</h2>
                            <p>{{item.description}}</p>
                            <div class="index-right-item-button">
                                <a class="button" href="">立即购买</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*
    npm的方式： $ npm install axios -S
    <div id="app">
        <button @click="send">发送ajax请求</button>
    </div>
    <script>
        new Vue({
            el:"#app",
            methods:{
                send(){
                    axios({
                       method:'get',
                        url:'user.json'
                    }).then(function(res){
                        console.log(res.data.name);
                    });
                }
            }
        });
    <script>
     */
    export default {
        name: "index",
        data () {
            return {
                productList : '',
                newList: '',
                boardList: ''
                /*productList: {
                    pc: {
                        title : 'PC产品',
                        list: [
                            {
                                title: '数据统计',
                                url: 'http://baidu.com',
                                hot: true
                            },
                            {
                                title: '数据预测',
                                url: 'http://baidu.com'
                            },
                            {
                                title: '流量分析',
                                url: 'http://baidu.com'
                            },
                            {
                                title: '广告发布',
                                url: 'http://baidu.com'
                            },
                        ]

                    },
                    app: {
                        title : '应用类产品',
                        list: [
                            {
                                title: '91助手',
                                url: 'http://baidu.com',
                                hot: true
                            },
                            {
                                title: '产品助手',
                                url: 'http://baidu.com'
                            },
                            {
                                title: '智能地图',
                                url: 'https://map.baidu.com/'
                            },
                            {
                                title: '团队语音',
                                url: 'http://baidu.com'
                            },
                        ]
                    }
                },
                newList: [
                    {
                        title: '澎湃动力，从自变油&火花塞养护之道说起。',
                        url: 'http://baidu.com',
                        hot: true
                    },
                    {
                        title: '夏日减肥指南，请查收。',
                        url: 'http://baidu.com'
                    },
                    {
                        title: '后顾无忧，尽享安心与愉悦。',
                        url: 'http://baidu.com'
                    },
                    {
                        title: '佳节团圆聚福利，无忧出行享关怀。',
                        url: 'http://baidu.com'
                    }
                ],
                boardList: [
                    {
                        title: '开放产品',
                        description: '开放产品是一款开放产品',
                        //imgUrl: require('../assets/images/img_idea01.png'),//这如果直接写静态路径需要路径放入static里,如果卸载assets中需要加require
                        imgUrl: '/static/images/img_idea01.png',
                        saleOut: false
                    },
                    {
                        title: '品牌营销',
                        description: '品牌营销能帮助你的产品更好的找到定位',
                        imgUrl: '/static/images/img_idea02.png',
                        saleOut: false
                    },
                    {
                        title: '使命必达',
                        description: '使命必达快速迭代永远保护最前端的速度',
                        imgUrl: '/static/images/img_idea03.png',
                        saleOut: true
                    },
                    {
                        title: '永攀高峰',
                        description: '帮你勇闯高峰，达到失业高峰',
                        imgUrl: '/static/images/img_idea04.png',
                        saleOut: false
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

            /*用axios 静态地址*/
            /*this.$axios
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
            this.$axios
                .post('api/top',{})
                .then(
                    (dataList)=>{
                        this.productList = dataList.data.productList;
                        this.newList = dataList.data.newList;
                        this.boardList = dataList.data.boardList;
                        // console.log(this)
                        /*console.log(this.productList)
                        console.log(dataList)
                        console.log(dataList.data)*/
                    },
                    /*(err)=>{
                        console.log(err)
                    }*/
                    )
                    .catch((err) => {
                            console.error(err)
                        })
        },
        mounted(){
            (()=>{
                console.log(this)
            })()

        }
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
                        padding: 10px 0;
                        font-weight: bold;
                    }
                    ul{
                        /*@for $i from 1 through 3 {
                            .item-#{$i} { width: 2em * $i; }
                        }*/
                        li {
                            a{
                                display: inline-block;
                                max-width: calc(100% - 46px);
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow:hidden;
                            }
                            padding: 8px 0;
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
                                    padding: 10px 0;
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
        }
    }

</style>