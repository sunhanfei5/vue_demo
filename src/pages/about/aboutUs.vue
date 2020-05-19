<template>
  <transition
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-bind:css="false">
    <section class="about-us">
  <!--<div class="wout"></div>-->
      <div class="about-title">
        <h2>公司介绍</h2>
        <span>ABOUT US</span>
      </div>
      <div class="swiper-container swTop">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide01">slider1</div>
          <div class="swiper-slide slide02">slider2</div>
          <div class="swiper-slide slide03">slider3</div>
          <div class="swiper-slide slide04">slider4</div>
          <div class="swiper-slide slide05">slider5</div>
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
    // let com = require( '../../js/common');
    import com  from  '../../assets/scripts/common'
    export default {
        name: "aboutUs",
        data () {
            return {
                class: 'about-us',
                loadQueue: null,
                contentTop: 33,
                scrollY: 0,
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight,
                wHeight: window.innerHeight || document.documentElement.clientHeight,
                store: PropertyStore,
                id: 0,
                cameraSelectedIndex:0,
                current: null,
                swiper: null,
            }
        },
        methods: {
            // --------
            // LEAVING
            // --------

            beforeLeave: function (el) {
                //  //console.log('beforeLeave about')
                this.setEvent(false)
                this.removePageButton()
                $('.about .nextPage').off('click')
                PropertyStore.state.property.prevId = this.id
            },
            leave: function (el, done) {
                   //console.log('leave about')
                $(el).velocity({ top: this.height * -1 + 115 }, {duration: 1000, complete: done})
            },
            // --------
            // RESIZE
            // --------

            handleResize: function (el) {
                // console.log('handleResize')
                //this.reSize(el)
                //$('.about').height(this.height - PropertyStore.headerH - PropertyStore.footerH)
            },

            // --------
            // SCROLL
            // --------
            wheelScroll: function (e) {
                // e.preventDefault()
                if (PropertyStore.state.property.eventAnable) {
                    if (PropertyStore.state.property.prevId !== PropertyStore.state.property.currentId) {
                        if (e.deltaY < 0) {
                            // console.log('scroll up', e)
                        } else if (e.deltaY > 0) {
                            // console.log('scroll down', e)
                            if (this.height - this.wHeight - 10 <= this.scrollY) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'news'})
                                this.$router.push({name: 'newsPage'})
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
                        _this.$router.push({name: 'newsPage'})
                    })

                }
                else
                {
                    $('.about .nextPage').off('click')
                }
                this.setEvent(bool)
            },
            // --------
            // PreLoad
            // --------
            handleComplete (event) {
                // console.log('handleComplete')
                // console.log(PropertyStore.state.property.prevId)
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

                            // IE 9在开场跳过
                            if(com.isIE9())
                            {
                                _this.setCarousel(1);
                                return;
                            }
                            // 确认散列后分出
                            var urlHash = decodeURIComponent(location.hash)
                            if (urlHash.indexOf('#kv=') !== -1) {
                                var _str = urlHash.split('#kv=')
                                var _num = parseInt(_str[1].slice(0, 1))
                                //console.log('handleComplete : ' + _num)
                                if (_num > 0) {
                                    _this.setCarousel(_num)
                                } else {
                                    _this.setCarousel(1);
                                }
                            } else {
                                _this.setCarousel(1);
                            }
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
                if (typeof _n === 'number')
                {
                    $('.wout').remove()
                    $('.swTop').css({visibility: 'visible', opacity: 0}).velocity({opacity: 1}, {duration: 500})

                    var _wrapper = document.getElementsByClassName('swiper-wrapper')[0]
                    if (_wrapper.childElementCount < _n)
                    {
                        _n = 1
                    }
                    else
                    {
                        _n = _n
                    }
                }
                else
                {
                    _n = 1
                    // 白色闪光灯
                    $('.wout').velocity({opacity: 1},
                        {
                            duration: 100,
                            complete: this.removeCanvas})
                        .velocity({opacity: 0}, {
                            duration: 100,
                            complete: function () {
                                $('.wout').remove()
                            }})
                }
                // 第一屏幻灯片
                _this.swiper = new Swiper('.swTop', {
                    pagination: '.swiper-pagination',
                    loop:true,
                    autoplay:10000,
                    speed:1000,
                    autoplayDisableOnInteraction:false,
                    onSwiperCreated:function(swiper){
                    }
                    ,onSlideChangeStart:function(swiper){
                    }
                    ,onSlideChangeEnd:function(swiper){
                    }
                });
                $('.swiper-button-prev').on('click', function(e){
                    e.preventDefault()
                    _this.swiper.swipePrev()
                });
                $('.swiper-button-next').on('click', function(e){
                    e.preventDefault()
                    _this.swiper.swipeNext()
                });
                _this.swiper.addCallback('SlideChangeEnd', function(swiper)
                {

                });

                $('.video-kv a').on("click", function(e){
                    e.preventDefault();
                    var vid = $(this).data("video-id");
                    var title = $(this).data("video-title");
                    PropertyStore.float.open(vid, title);
                });
                // this.swiper.swipeTo((_n-1), 1000)
            }

        },
        beforeMount () {
            // console.log('beforeMount aboutUs')
            PropertyStore.state.property.currentId = this.id
        },
        mounted () {
            $('html, body').css({overflow: 'hidden'})
            $('#loaderCont').show()
            /*需要预加载的图片名称*/
            this.imgNameArr = ['kv01.jpg', 'kv02.jpg', 'kv03.jpg', 'kv04.jpg', 'kv05.jpg']

            const _imageBasePath = '../../../static/images/about/aboutUs/'
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

            }
        }
    }
</script>

<style lang="scss">
  @import "../../../static/style/idangerous.swiper.css";
  @import "../../../static/style/param";
.about-us{
  .wout {
    background-color: #fff;
    width: 100%;
    height: inherit;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 10;
  }

  .swiper-container{
    visibility: hidden;
    height: inherit;
    .swiper-wrapper{
      height: inherit;
      .swiper-slide{
        height: inherit;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        text-indent: -9999px;
        &.slide01{
          background-image: url('../../../static/images/about/aboutUs/kv01.jpg');
        }
        &.slide02{
          background-image: url('../../../static/images/about/aboutUs/kv02.jpg');
        }
        &.slide03{
          background-image: url('../../../static/images/about/aboutUs/kv03.jpg');
        }
        &.slide04{
          background-image: url('../../../static/images/about/aboutUs/kv04.jpg');
        }
        &.slide05{
          background-image: url('../../../static/images/about/aboutUs/kv05.jpg');
        }
      }
    }
    .swiper-button-prev {
      display: block;
      width: 60px;
      height: 60px;
      left: 20px;
      margin-top: -30px;
      position: absolute;
      top: 50%;
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
      margin-top: -30px;
      position: absolute;
      right: 20px;
      top: 50%;
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
