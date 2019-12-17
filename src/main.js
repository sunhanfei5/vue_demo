// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios = axios;

/*vue-resource注册*/
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

/*clickoutside 注册*/
import clickoutside from "./assets/scripts/clickoutside";  //引入路径根据自己项目而定
Vue.directive("click-outside",clickoutside);//全局注册指令 v-click-outside

/*ElementUI 完整引入*/
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
// import 'element-ui/lib/theme-chalk/index.css' //样式必须引入

/*ElementUI 部分引入*/
import {
  Icon,
  Button,
  Input,
  InputNumber,
  Form,
  FormItem,
  Select,
  Option,
  OptionGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
} from 'element-ui';
Vue.prototype.$ELEMENT = { zIndex: 9998 };
Vue.use(Icon)
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)

/*修改组件主题颜色*/
import '@/assets/scss/element-variables.scss'
Vue.config.productionTip = false

/*引入js*/
import PropertyStore from './assets/scripts/store'


/* mix-in Global Methods */
Vue.mixin({
  methods: {
    // --------
    // PreLoad
    // --------
    handleProgress (event) {
      // 以0.0~1.0取得读入率
      var progress = event.progress
      //console.log(progress)
    },
    handleFileLoadComplete (event) {
      // 读入的文件
      var result = event.result
      //console.log(result)
    },
    loadComplete (event, prevendLoadingOut) {
      // console.log('LOAD COMPLETE'+ !prevendLoadingOut)

      let loader = event.target
      loader.removeAllEventListeners('progress')
      loader.removeAllEventListeners('fileload')
      loader.removeAllEventListeners('complete')

      if (!prevendLoadingOut) {
        // var _loader = document.getElementById('loaderCont')
        // _loader.style.display = 'none'
        $('#loaderCont').fadeOut('fast')
      }
    },
    // --------
    // SCROLL
    // --------
    handleScroll: function (e) {
      var supportPageOffset = window.pageXOffset !== undefined
      var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
      // var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft
      var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      this.scrollY = y
    },

    // --------
    // MOUSEMOVE
    // --------
    removePageButton: function () {
      if ($('.about .nextPage').css('bottom') === '-5px')
      {
        $('.about .nextPage').velocity({bottom: -50}, {duration: 300})
      }
      if ($('.about .prevPage').css('top') === (PropertyStore.navH-5)+'px')
      {
        $('.about .prevPage').velocity({top: -(50 - PropertyStore.navH)}, {duration: 300})
      }
    },
    mouseLeaveHandler: function (e) {
      if (((PropertyStore.mouseY > this.height - 100) && (PropertyStore.mouseY < (this.height-10)))
        ||
        ((PropertyStore.mouseY < 150) && (PropertyStore.mouseY > 0))) {
        // console.log('mouseLeaveHandler1:' + PropertyStore.mouseY)
        return
      }
      // console.log('mouseLeaveHandler2:' + PropertyStore.mouseY)
      this.removePageButton()
    },
    mouseHandler: function (e) {
      // var x = e.clientX
      var isNext= true;
      var isPrev= true;
      var y = PropertyStore.mouseY = e.clientY
      var x = PropertyStore.mouseX = e.clientX
      if(!this.isMouseXarea())
      {
        this.removePageButton()
        return;
      }
      if (y > this.height - 100  && isNext === true)
      {
        isNext=false;
        // console.log(isNext)
        if (this.id !== 4)
        {
          if ($('.about .nextPage').css('bottom') === '-50px')
          {
            if(this.isMouseXarea()) {
              $('.about .nextPage')
                .velocity({bottom: -5}, {
                  duration: 300,
                  complete: function () {
                    isNext = true
                    // console.log(isNext)
                  }
                })
            }
          }
        }
      }
      else
      {
        if ($('.about .nextPage').css('bottom') === '-5px')
        {
          $('.about .nextPage')
            .velocity({bottom: -50}, {
              duration: 300,
              complete: function () {
                isNext = true
              }
            })
        }
      }

      if (y < 150 && isPrev === true)
      {

        isPrev =false
        if (this.id !== 0)
        {
          if (
            $('.about .prevPage').css('top') === -(50 - PropertyStore.navH) + 'px'
          )
          {
            if(this.isMouseXarea()) {
              $('.about .prevPage')
                .velocity({top: PropertyStore.navH - 5}, {
                  duration: 300,
                  complete: function () {
                    isPrev = true
                  }
                })
            }
          }
        }
      }
      else
      {

        if ($('.about .prevPage').css('top') === (PropertyStore.navH-5)+'px')
        {
          $('.about .prevPage')
            .velocity({top: -(50 - PropertyStore.navH)}, {
              duration: 300,
              complete: function () {
                isPrev = true
              }
            })
        }
      }
    },
    isMouseXarea: function(){
      if (
        ( PropertyStore.mouseX > (this.width - 200) )
        ||
        ( PropertyStore.mouseX < 200 )
      )
      {
        return false;
      }
      return true;
    },
    // --------
    // RESIZE
    // --------
    reSize: function (el) {
      //console.log('reSize')
      this.wHeight = window.innerHeight || document.documentElement.clientHeight
      this.width = Math.max(window.innerWidth || document.documentElement.clientWidth, 1000)
      this.height = this.wHeight
      PropertyStore.headerH = $('header').height();
      $('#app').height(this.height - PropertyStore.headerH)
      /*if(this.height < 610)
      {
        $(".icon_event .cart ul").css('top',"-329px")
      }
      else
      {
        $(".icon_event .cart ul").css('top',"-424px")
      }*/
      if ($('nav').css('visibility') == 'visible')
      {
        $('nav').css('top',PropertyStore.headerH+'px');
      }
      if( (this.id !== 0) &&  ($('.about .prevPage').css('top') != '-48px') )
      {
        $('.about .prevPage').css({top: (PropertyStore.headerH + PropertyStore.navH -48)});
      }
    },
    // --------
    // EVENTS
    // --------
    setEvent (bool) {
      //console.log('setEvent : ' + bool)
      if (bool) {
        window.addEventListener('resize', this.handleResize)
        window.addEventListener('wheel', this.wheelScroll)
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('mousemove', this.mouseHandler)
        $(window).on('mouseleave', this.mouseLeaveHandler)
        $("#icon_event .cart").on("mouseover", function(){
          $("#icon_event .cart ul").stop().animate(
            {right:"0"},250
          ).on("mouseleave", function(){
            $("#icon_event .cart ul").stop().animate({right:"-100px"},250);
          });
        });
      }
      else
      {
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('wheel', this.wheelScroll)
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('mousemove', this.mouseHandler)
        $(window).off('mouseleave', this.mouseLeaveHandler)
        $("#icon_event .cart").off("mouseover");
        $("#icon_event .cart ul").off("mouseleave");

      }
      PropertyStore.state.property.eventAnable = bool
    },
  }
  })
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
