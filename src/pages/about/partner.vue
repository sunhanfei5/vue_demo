<template>
  <transition
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-bind:css="false">
    <section class="partner">
      <div class="about-title style02">
        <h2>合作伙伴</h2>
        <span>PARTNER</span>
      </div>
      <div class="swiper-container swPartner">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic01.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic02.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic03.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic04.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic05.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic06.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic01.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic02.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic03.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic04.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic05.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic06.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic01.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic02.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic03.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic04.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic05.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic06.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic01.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic02.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic03.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic04.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic05.jpg" alt=""></div>
          <div class="swiper-slide"><img src="../../../static/images/about/partner/pic06.jpg" alt=""></div>
        </div>
        <!-- 页面数量 -->
        <div class="swiper-pagination topPagination"></div>
        <!-- 前后滑动的导航按钮(箭头) -->
        <a href="#" class="swiper-button-prev gtm"><i class="el-icon-arrow-left"></i></a>
        <a href="#" class="swiper-button-next gtm"><i class="el-icon-arrow-right"></i></a>
      </div>
    </section>
  </transition>
</template>

<script>
    import PropertyStore from '../../assets/scripts/store.js'
    let com = require( '../../assets/scripts/common');
    // import com  from  '../../assets/scripts/common'
    export default {
        name: "partner",
        data () {
            return {
                class: 'partner',
                loadQueue: null,
                contentTop: 33,
                scrollY: 0,
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight,
                wHeight: window.innerHeight || document.documentElement.clientHeight,
                store: PropertyStore,
                id: 2,
                cameraSelectedIndex:0,
                current: null
            }
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
                                this.$router.push({name: 'newsPage'})
                            }
                        } else if (e.deltaY > 0) {
                            if (this.height - this.wHeight - 10 <= this.scrollY) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'joinUs'})
                                this.$router.push({name: 'joinUsPage'})
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
                        _this.$router.push({name: 'joinUsPage'})
                    })
                    $('.about .prevPage').on('click', function (e) {
                        e.preventDefault()
                        PropertyStore.state.property.prevId = this.id
                        _this.$router.push({name: 'newsPage'})
                    })
                }
                else
                {
                    $('.about .nextPage').off('click')
                    $('.about .prevPage').off('click')
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
                            _this.setCarousel()
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

            },
            setCarousel: function (_n) {
                // console.log("setCarousel:"+_n)

                var _this =this

                var slidesPerView=6
                var slidesPerGroup=6
                if(document.body.clientWidth<1400){
                    slidesPerView=4
                    slidesPerGroup=4
                }
                $('.swPartner').css({visibility: 'visible', opacity: 0, height: (450/330) *(_this.width/slidesPerView )}).velocity({opacity: 1}, {duration: 300})


                _this.mySwiper = new Swiper('.swPartner',{
                    loop: true,
                    speed:1000,
                    onlyExternal : true,
                    slidesPerView :  slidesPerView,
                    slidesPerGroup : slidesPerGroup,
                    loopedSlides :24,
                    loopAdditionalSlides : 24,
                    /*onSlideChangeEnd: function(swiper){
                        //alert(swiper.activeIndex);
                        if(swiper.activeIndex===24){
                            _this.mySwiper.swipeTo(0,0)
                        }
                    },*/

                });
                $('.swiper-button-prev').on('click', function(e){
                    e.preventDefault()
                    _this.mySwiper.swipePrev()
                });
                $('.swiper-button-next').on('click', function(e){
                    e.preventDefault()
                    _this.mySwiper.swipeNext()
                });
                $('a').on('click',function(e){
                    e.preventDefault()
                })


                window.onresize=function() {
                    if(document.body.clientWidth<1400){
                        _this.mySwiper.params.slidesPerView=_this.mySwiper.params.slidesPerGroup=4;
                        _this.mySwiper.reInit();
                        _this. mySwiper.swipeTo(0,0)
                    }else if(document.body.clientWidth<1660){
                        _this.mySwiper.params.slidesPerView=_this.mySwiper.params.slidesPerGroup=6;
                        _this.mySwiper.reInit();
                        _this.mySwiper.swipeTo(0,0)
                    }else{
                        _this.mySwiper.params.slidesPerView=_this.mySwiper.params.slidesPerGroup=6;
                        _this.mySwiper.reInit();
                        _this.mySwiper.swipeTo(0,0)
                    }
                }

            }

        },
        beforeMount () {
            // console.log('beforeMount partner')
            //console.log(this.id +','+ PropertyStore.state.property.currentId  )
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
  @import "../../../static/style/idangerous.swiper.css";
  .partner{
    .swiper-container{
      visibility: hidden;
      height: 450px;
      .swiper-wrapper{
        height: inherit;
        .swiper-slide{
          img{
            width: 100%;
          }
        }
      }
      .swiper-button-prev {
        display: block;
        width: 60px;
        height: 60px;
        left: 20px;
        position: absolute;
        top: 50%;
        margin-top: -30px;
        opacity:1;
        z-index: 2000;
        background-color: #41b883;
        border-radius: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 2em;
        color: #ffffff;
        &:hover {
          background-color: #a81a0b;
        }
      }
      .swiper-button-next {
        display: block;
        height: 60px;
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -30px;
        width: 60px;
        z-index: 2000;
        background-color: #41b883;
        border-radius: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 2em;
        color: #ffffff;
        &:hover {
          background-color: #a81a0b;
        }
      }
    }
  }
</style>
