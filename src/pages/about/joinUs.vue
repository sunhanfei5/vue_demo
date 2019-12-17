<template>
  <transition
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-bind:css="false">
    <section class="join-us">
      <div class="about-title style02">
        <h2>加入我们</h2>
        <span>JOIN US</span>
      </div>
      <ul class="job-list">
        <li v-for="(jobVal,index) in jobList" @click="openDialog(index)">
          <p class="job"><i class="el-icon-suitcase"></i><span>{{jobVal.job}}</span></p>
          <p class="position"><i class="el-icon-location-outline"></i><span>{{jobVal.position}}</span></p>
        </li>
      </ul>

      <my-dialog
                 :is-show-dialog="isShowDialog"
                 :dialog-width = "dialogWidth"
                 @close-dialog = "closeDialog"
      ><!--v-if="isShow"-->
        <ul class="detail-list">
          <li v-for="(val ,index) in jobList" v-if="nowClickIndex === index">
            <dl>
              <dt><i class="el-icon-news"></i>{{val.detail.duty.title}}</dt>
              <dd>
                <ul>
                  <li v-for="(dutyVal , dutyIndex) in val.detail.duty.list">
                    <span>{{dutyIndex + 1}}.</span>{{dutyVal}}
                  </li>
                </ul>
              </dd>
            </dl>
            <dl>
              <dt><i class="el-icon-news"></i>{{val.detail.require.title}}</dt>
              <dd>
                <ul>
                  <li v-for="(requireVal , requireIndex) in val.detail.require.list">
                    <span>{{requireIndex +1}}.</span>{{requireVal}}
                  </li>
                </ul>
              </dd>
            </dl>
          </li>
        </ul>
      </my-dialog>
    </section>
  </transition>
</template>

<script>
    import myDialog from '../../components/myDialog'
    import PropertyStore from '../../assets/scripts/store.js'
    let com = require( '../../assets/scripts/common');
    // import com  from  '../../assets/scripts/common'
    export default {
        name: "joinUs",
        components:{myDialog},
        data () {
            return {
                class: 'join-us',
                contentTop: 33,
                scrollY: 0,
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight,
                wHeight: window.innerHeight || document.documentElement.clientHeight,
                store: PropertyStore,
                id: 3,
                current: null,
                isShow : false,
                jobList: [
                    {
                        "job": "后端研发工程师",
                        "position": "北京、武汉",
                        "detail": {
                            "duty" :{
                                "title" : "工作职责：",
                                "list" : [
                                    "负责大数据产品的后端研发工作；",
                                    "负责存储、查询、导入等相关模块的具体开发与维护；",
                                    "提升产品整体的运行效率与稳定性。"
                                ]
                            },
                            "require" : {
                                "title" : "岗位要求：",
                                "list" : [
                                    "专科及以上学历，计算机相关专业；",
                                    "对大数据方向感兴趣，乐于帮助客户实现数据驱动；",
                                    "计算机基础知识扎实，熟悉主流开发语言及操作系统原理，对分布式系统具有浓厚兴趣；",
                                    "对接触各种互联网产品感兴趣，乐于培养自身的产品意识；",
                                    "快速学习能力；主动性强。"
                                ]
                            }
                        }
                    },
                    {
                        "job": "前端工程师",
                        "position": "北京",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责数据分析产品的 Web 前端的开发；",
                                        "负责 Web 前端数据接入相关 SDK 和工具的开发；",
                                        "参与项目数据采集方案的评审，依据客户需求给出合理的数据采集方案；",
                                        "与产品设计师一起，优化整个产品的使用流程，并为使用者提供更好的数据可视化展现效果。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科或本科以上学历，计算机相关专业者优先；",
                                        "熟悉 HTML/CSS/JavaScript 等前端相关技术，有一定面向对象编程思想；",
                                        "熟悉 W3C 标准，对表现与数据分离、Web 语义化等有深刻理解；",
                                        "无线 HTML5 研发经验者优先，有大数据相关产品研发经验者优先；",
                                        "良好的沟通与表达能力、思路清晰，较强的协作能力；"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "Android SDK 研发工程师",
                        "position": "北京",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "分负责神策 Android SDK 的设计、开发、优化；",
                                        "准确地将客户需求传达给产品研发团队，并进行必要的整理和归纳。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科及以上学历，计算机或相关专业；",
                                        "有扎实的 Java 语言基础、精通 Android 体系结构，熟悉 Framework 层；",
                                        "精通多线程和网络编程，对高性能程序设计、架构有较多的工程经验；",
                                        "有完整的 Android 项目经验；",
                                        "熟悉各种主流手机特性，深刻理解手机客户端开发特点；",
                                        "具备良好的团队协作能力、沟通能力和学习能力，有责任感。"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "iOS SDK 研发工程师",
                        "position": "上海、合肥",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责神策 iOS SDK 的设计、开发、优化；",
                                        "准确地将客户需求传达给产品研发团队，并进行必要的整理和归纳。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科及以上学历，计算机或相关专业；",
                                        "精通 Object-C、RunTime 等 iOS 主流开发技术；",
                                        "熟悉各个不同版本 iOS 的特点；",
                                        "精通多线程和网络编程，对高性能程序设计、架构有较多的工程经验；",
                                        "具备良好的团队协作能力、沟通能力和学习能力，有责任感。"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "数据分析师",
                        "position": "上海",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责神策 iOS SDK 的设计、开发、优化；",
                                        "准确地将客户需求传达给产品研发团队，并进行必要的整理和归纳。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科及以上学历，计算机或相关专业；",
                                        "精通 Object-C、RunTime 等 iOS 主流开发技术；",
                                        "熟悉各个不同版本 iOS 的特点；",
                                        "精通多线程和网络编程，对高性能程序设计、架构有较多的工程经验；",
                                        "具备良好的团队协作能力、沟通能力和学习能力，有责任感。"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "技术顾问（iOS / Android / JS）",
                        "position": "成都",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责神策 iOS SDK 的设计、开发、优化；",
                                        "准确地将客户需求传达给产品研发团队，并进行必要的整理和归纳。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科及以上学历，计算机或相关专业；",
                                        "精通 Object-C、RunTime 等 iOS 主流开发技术；",
                                        "熟悉各个不同版本 iOS 的特点；",
                                        "精通多线程和网络编程，对高性能程序设计、架构有较多的工程经验；",
                                        "具备良好的团队协作能力、沟通能力和学习能力，有责任感。"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "实施工程师",
                        "position": "上海",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责神策 iOS SDK 的设计、开发、优化；",
                                        "准确地将客户需求传达给产品研发团队，并进行必要的整理和归纳。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科及以上学历，计算机或相关专业；",
                                        "精通 Object-C、RunTime 等 iOS 主流开发技术；",
                                        "熟悉各个不同版本 iOS 的特点；",
                                        "精通多线程和网络编程，对高性能程序设计、架构有较多的工程经验；",
                                        "具备良好的团队协作能力、沟通能力和学习能力，有责任感。"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "销售顾问",
                        "position": "成都",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责神策 iOS SDK 的设计、开发、优化；",
                                        "准确地将客户需求传达给产品研发团队，并进行必要的整理和归纳。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科及以上学历，计算机或相关专业；",
                                        "精通 Object-C、RunTime 等 iOS 主流开发技术；",
                                        "熟悉各个不同版本 iOS 的特点；",
                                        "精通多线程和网络编程，对高性能程序设计、架构有较多的工程经验；",
                                        "具备良好的团队协作能力、沟通能力和学习能力，有责任感。"
                                    ]
                                }
                            }
                    },
                    {
                        "job": "机器学习算法工程师",
                        "position": "北京、武汉",
                        "detail": {
                            "duty" :{
                                "title" : "工作职责：",
                                "list" : [
                                    "负责大数据产品的后端研发工作；",
                                    "负责存储、查询、导入等相关模块的具体开发与维护；",
                                    "提升产品整体的运行效率与稳定性。"
                                ]
                            },
                            "require" : {
                                "title" : "岗位要求：",
                                "list" : [
                                    "专科及以上学历，计算机相关专业；",
                                    "对大数据方向感兴趣，乐于帮助客户实现数据驱动；",
                                    "计算机基础知识扎实，熟悉主流开发语言及操作系统原理，对分布式系统具有浓厚兴趣；",
                                    "对接触各种互联网产品感兴趣，乐于培养自身的产品意识；",
                                    "快速学习能力；主动性强。"
                                ]
                            }
                        }
                    },
                    {
                        "job": "全栈工程师",
                        "position": "北京",
                        "detail":
                            {
                                "duty" :{
                                    "title" : "工作职责：",
                                    "list" : [
                                        "负责数据分析产品的 Web 前端的开发；",
                                        "负责 Web 前端数据接入相关 SDK 和工具的开发；",
                                        "参与项目数据采集方案的评审，依据客户需求给出合理的数据采集方案；",
                                        "与产品设计师一起，优化整个产品的使用流程，并为使用者提供更好的数据可视化展现效果。"
                                    ]
                                },
                                "require" : {
                                    "title" : "岗位要求：",
                                    "list" : [
                                        "专科或本科以上学历，计算机相关专业者优先；",
                                        "熟悉 HTML/CSS/JavaScript 等前端相关技术，有一定面向对象编程思想；",
                                        "熟悉 W3C 标准，对表现与数据分离、Web 语义化等有深刻理解；",
                                        "无线 HTML5 研发经验者优先，有大数据相关产品研发经验者优先；",
                                        "良好的沟通与表达能力、思路清晰，较强的协作能力；"
                                    ]
                                }
                            }
                    }
                ],
                nowClickIndex : Number,
                isShowDialog : false,
                dialogWidth : "700px"
            }
        },
        created() {
            /*this.$axios
                .post('/api/jobList',{})
                .then(
                    (dataList)=>{
                        this.jobList = dataList.data;
                        this.isShow = true;
                    }
                )
                .catch((err) => {
                    console.error(err)
                })*/
        },
        methods: {
            // --------
            // LEAVING
            // --------
            beforeLeave: function (el) {
                //  //console.log('beforeLeave about')
                this.setEvents(false)
                this.removePageButton()
                PropertyStore.state.property.prevId = this.id
            },
            leave: function (el, done) {
                //    //console.log('leave about')
                if (PropertyStore.state.property.currentId > this.id) {
                    $(el).velocity({ top: this.height * -1 + 115 }, {duration: 1000, complete: done})
                } else {
                    $(el).velocity({ top: this.height }, {duration: 1000, complete: done})
                }
            },

            // --------
            // RESIZE
            // --------
            handleResize: function (el) {
                //console.log('handleResize')
            },

            // --------
            // SCROLL
            // --------
            wheelScroll: function (e) {
                // e.preventDefault()
                if (PropertyStore.state.property.eventAnable) {
                    if (PropertyStore.state.property.prevId !== PropertyStore.state.property.currentId) {
                        if (e.deltaY < 0) {
                            if (this.scrollY <= 10) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'news'})
                                this.$router.push({name: 'partnerPage'})
                            }
                        } else if (e.deltaY > 0) {
                            if (this.height - this.wHeight - 10 <= this.scrollY) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'joinUs'})
                                this.$router.push({name: 'contactPage'})
                            }
                        }
                    }
                }
                return false
            },
            // --------
            // EVENT
            // --------
            setEvents: function (bool) {
                var _this = this
                if (bool)
                {
                    $('.about .nextPage').on('click', function (e) {
                        e.preventDefault()
                        PropertyStore.state.property.prevId = this.id
                        _this.$router.push({name: 'contactPage'})
                    })
                    $('.about .prevPage').on('click', function (e) {
                        e.preventDefault()
                        PropertyStore.state.property.prevId = this.id
                        _this.$router.push({name: 'partnerPage'})
                    })
                }
                else
                {
                    $('.about .nextPage').off('click')
                    $('.about .prevPage').off('click')
                }
                this.setEvent(bool)
            },
            openDialog : function(i){
                var _this = this;
                _this.nowClickIndex = i
                _this.isShowDialog = true;
            },
            closeDialog : function(){
                var _this = this;
                _this.isShowDialog = false;
            },

            // --------
            // PreLoad
            // --------
            handleComplete (event) {
                //console.log('handleComplete')

                PropertyStore.e=event
                this.loadComplete(event)
                this.handleResize()

                PropertyStore.state.property.eventAnable = true

                var _el = document.getElementsByClassName(this.class)
                var _this = this
                var _def

                if (PropertyStore.state.property.prevId <= this.id) {
                    _def = this.height
                } else {
                    _def = this.height * -1 + 115
                }
                $(_el[0])
                    .velocity({top: _def}, {duration: 0})
                    .velocity({top: this.contentTop, opacity: 1}, {
                        duration: 1000,
                        complete: function () {
                            _this.animateInit()
                        }
                    })
            },

            // --------
            // ANIMATE
            // --------
            animateInit () {
                var _this = this;
                if ($('nav').css('visibility') !== 'visible') {
                    $('nav').css({'visibility': 'visible'}).velocity({top: PropertyStore.headerH}, {duration: 300})
                    $('.about .prevPage').velocity({top: -(50 - PropertyStore.navH)}, {duration: 1000})
                }
                $('section').height(this.height - PropertyStore.headerH - PropertyStore.footerH - PropertyStore.navH )
                _this.setEvents(true)

            }

        },
        beforeMount () {
            // console.log('beforeMount joinUs')
            // console.log(this.id +','+ PropertyStore.state.property.currentId  )
            PropertyStore.state.property.currentId = this.id
        },
        mounted () {
            $('html, body').css({overflow: 'hidden'})
            $('#loaderCont').show()
            /*需要预加载的图片名称*/
            this.imgNameArr = ['btn_close.png', 'btn_plus.png', 'camera.png', 'camera2.png', 'camera_rp.png',
                'camera2_rp.png', 'detail01.png', 'detail02.png', 'detail03.png', 'detail04.png', 'detail05.png',
                'detail06.png', 'photo1_l.png', 'photo1_m.png', 'photo1_s.png', 'photo2_l.png', 'photo2_m.png',
                'photo2_s.png', 'photo3_l.png', 'photo3_m.png', 'photo3_s.png', 't1.png', 't2.png', 't3.png',
                't4.png', 't1_rp.png', 't2_rp.png', 't3_rp.png', 't4_rp.png']

            const _imageBasePath = './static/images/about/aboutUs/'
            var manifest = []
            for (var i = 0; i < this.imgNameArr.length; i++) {
                manifest.push({src: _imageBasePath + this.imgNameArr[i], id: this.imgNameArr[i]})
            }
            /*manifest.push({src: './static/img/common/btn_eos_r.png', id: 'common_btn_eos_r.png'})
            manifest.push({src: './static/img/common/btn_eos_rp.png', id: 'common_btn_eos_rp.png'})*/


            // LoadQueue类
            if(com.isIE9())
                this.loadQueue = new createjs.LoadQueue(false)
            else
                this.loadQueue = new createjs.LoadQueue(true)
            // 设定并行读取数
            this.loadQueue.setMaxConnections(6)
            this.loadQueue.addEventListener('progress', this.handleProgress)
            this.loadQueue.addEventListener('fileload', this.handleFileLoadComplete)
            this.loadQueue.addEventListener('complete', this.handleComplete)
            // 开始读取
            this.loadQueue.loadManifest(manifest)
        },

        watch: {
            '$route' (to, from) {
                // go方式   再跳转后的路由观察路由变化，进行页面刷新。 全局作用
                //this.$router.go(0);
                // $('html, body').css({overflow: 'auto'})
            }
        }
    }
</script>
<style scoped lang="scss">
  @import "../../../static/style/param";

  .join-us{
  .job-list{
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    min-width: 1000px;
    margin: 0 auto;
    li{
      box-sizing: border-box;
      width: 48%;
      padding: 15px 20px;
      display: -webkit-flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background-color: #ffffff;
      margin-bottom: 20px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover{
        background-color: #35495e;
        color: #ffffff;
      }
      p{
        i{
          margin-right: 8px;
          /*font-size: 1.2em;*/
          /*vertical-align: middle;*/
        }
        span{
          /*vertical-align: middle;*/
        }
      }
    }
  }
  .detail-list{
    padding: 30px 25px 0;
    dl{
      margin-bottom: 30px;
      dt{
        font-size: percentage(20/$base_font_size);
        color: #41b883;
        margin-bottom: 15px;
        i{
          display: inline-block;
          width: 20px;
          text-align: right;
          /*font-size: 1.2em;*/
          margin-right: 8px;
        }
      }
      dd{
        color: #444;
        ul{
          li{
            margin-bottom: 10px;
            padding-left: 28px;
            text-indent: -28px;
            line-height: 1.6;
            span{
              display: inline-block;
              width: 20px;
              text-align: right;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
