<template>
  <transition
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-bind:css="false">
    <section class="news">
      <div class="about-title">
        <h2>公司动态</h2>
        <span>NEWS</span>
      </div>
      <video id="video" muted autoplay loop>
        <source src="../../../static/images/about/news/demo.mp4" type="video/mp4">
      </video>
    </section>
  </transition>
</template>

<script>
    import PropertyStore from '../../assets/scripts/store.js'
    let com = require( '../../assets/scripts/common');
    // import com  from  '../../assets/scripts/common'
    export default {
        name: "news",
        data () {
            return {
                class: 'news',
                loadQueue: null,
                contentTop: 33,
                scrollY: 0,
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight,
                wHeight: window.innerHeight || document.documentElement.clientHeight,
                store: PropertyStore,
                id: 1,
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
                /*var videoEle =document.getElementById('video');
                videoEle.pause();*/
                // e.preventDefault()
                if (PropertyStore.state.property.eventAnable) {
                    if (PropertyStore.state.property.prevId !== PropertyStore.state.property.currentId) {
                        if (e.deltaY < 0) {
                            if (this.scrollY <= 10) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'aboutUs'})
                                this.$router.push({name: 'aboutUsPage'})
                            }
                        } else if (e.deltaY > 0) {
                            if (this.height - this.wHeight - 10 <= this.scrollY) {
                                PropertyStore.state.property.prevId = this.id
                                // this.$router.push({path: 'partner'})
                                this.$router.push({name: 'partnerPage'})
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
                        _this.$router.push({name: 'partnerPage'})
                    })
                    $('.about .prevPage').on('click', function (e) {
                        e.preventDefault()
                        PropertyStore.state.property.prevId = this.id
                        _this.$router.push({name: 'aboutUsPage'})
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
            // console.log('beforeMount news')
            // console.log(this.id +','+ PropertyStore.state.property.currentId  )
            PropertyStore.state.property.currentId = this.id
        },
        mounted () {
            $('html, body').css({overflow: 'hidden'})
            $('#loaderCont').show()
            /*需要预加载的图片名称*/
            this.imgNameArr = ['demo.mp4']

            const _imageBasePath = './static/images/about/news/'
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
.news{
  #video{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 170%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
