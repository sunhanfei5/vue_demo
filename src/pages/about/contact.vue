<template>
  <transition
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-bind:css="false">
    <section class="contact">
      <div class="about-title style02">
        <h2>联系我们</h2>
        <span>CONTACT</span>
      </div>
      <ul class="city">
        <li>
          <img src="../../../static/images/about/contact/beijing.svg">
          <p class="h3">北京 <em>|</em> 总部</p>
          <p class="h4 detail">北京市海淀区知春路 27 号量子芯座大厦 11 层</p>
          <p class="h4 detail">电话：13723432556</p>
        </li>
        <li>
          <img src="../../../static/images/about/contact/shanghai.svg">
          <p class="h3">上海</p>
          <p class="h4 detail">上海市静安区新疆路 518 号 06-118 室</p>
          <p class="h4 detail">电话：13723432556</p>
        </li>
        <li>
          <img src="../../../static/images/about/contact/shenzhen.svg">
          <p class="h3">深圳</p>
          <p class="h4 detail">深圳市南山区粤兴三道 8 号中国地质大学产学研基地 2 楼 A207-A209，科技寺</p>
          <p class="h4 detail">电话：13723432556</p>
        </li>
        <li>
          <img src="../../../static/images/about/contact/hefei.svg">
          <p class="h3">合肥 <em>|</em> 研发及创新中心</p>
          <p class="h4 detail">安徽省合肥市高新区望江西路 800 号合肥创新产业园 B2 楼 404 室</p>
          <p class="h4 detail">电话：13723432556</p>
        </li>
        <li>
          <img src="../../../static/images/about/contact/wuhan.svg">
          <p class="h3">武汉 <em>|</em> 研发及创新中心</p>
          <p class="h4 detail">湖北省武汉市洪山区关山大道 473 号光谷新发展国际中心 05-119 室</p>
          <p class="h4 detail">电话：13723432556</p>
        </li>
        <li>
          <img src="../../../static/images/about/contact/chengdu.svg">
          <p class="h3">成都 <em>|</em> 研发及创新中心</p>
          <p class="h4 detail">四川省成都市高新南区天府五街 200 号菁蓉国际广场 6 栋 5 层</p>
          <p class="h4 detail">电话：13723432556</p>
        </li>
      </ul>
    </section>
  </transition>
</template>

<script>
    import PropertyStore from '../../assets/scripts/store.js'
    let com = require( '../../assets/scripts/common');
    // import com  from  '../../assets/scripts/common'
    export default {
        name: "contact",
        data () {
            return {
                class: 'contact',
                loadQueue: null,
                contentTop: 33,
                scrollY: 0,
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight,
                wHeight: window.innerHeight || document.documentElement.clientHeight,
                store: PropertyStore,
                id: 4,
                cameraSelectedIndex:0,
                current: null
            }
        },
        methods: {
            // --------
            // LEAVING
            // --------
            beforeLeave: function (el) {
                //  //console.log('beforeLeave contact')
                this.setEvents(false)
                this.removePageButton()
                PropertyStore.state.property.prevId = this.id
            },
            leave: function (el, done) {
                //    //console.log('leave contact')
                $(el).velocity({ top: this.height }, {duration: 1000, complete: done})

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
                                this.$router.push({name: 'joinUsPage'})
                            }
                        } else if (e.deltaY > 0) {
                            /*if (this.height - this.wHeight - 10 <= this.scrollY) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'joinUs'})
                                this.$router.push({name: 'joinUsPage'})
                            }*/
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
                    /*$('.about  .nextPage').on('click', function (e) {
                        e.preventDefault()
                        PropertyStore.state.property.prevId = this.id
                        _this.$router.push({name: 'partnerPage'})
                    })*/
                    $('.about .prevPage').on('click', function (e) {
                        e.preventDefault()
                        PropertyStore.state.property.prevId = this.id
                        _this.$router.push({name: 'joinUsPage'})
                    })
                }
                else
                {
                    // $('#app > .nextPage').off('click')
                    $('.about  .prevPage').off('click')
                }
                this.setEvent(bool)
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
                }
                $('section').height(this.height - PropertyStore.headerH - PropertyStore.footerH - PropertyStore.navH )
                _this.setEvents(true)

            }

        },
        beforeMount () {
            // console.log('beforeMount news')
            //console.log(this.id +','+ PropertyStore.state.property.currentId  )
            PropertyStore.state.property.currentId = this.id
        },
        mounted () {
            $('html, body').css({overflow: 'hidden'})
            $('#loaderCont').show()
            /*需要预加载的图片名称*/
            this.imgNameArr = ['beijing.svg','chengdu.svg','email.svg','hefei.svg','mobile.svg','shanghai.svg','shenzhen.svg','wuhan.svg' ]

            const _imageBasePath = './static/images/about/contact/'
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
.contact{
  text-align: center;
.city {
  /*position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);*/
  max-width: 1200px;
  min-width: 1000px;
  display: inline-block;
  text-align: center;
  margin: auto ;
  li {
    box-sizing: border-box;
    vertical-align: top;
    width: 33%;
    padding: 0 15px;
    display: inline-block;
    margin-bottom: 30px;
    font-size: percentage(14/$base_font_size);
    line-height: 1.8;
    img{
      width: 80px;
    }
  }
}
}
</style>
