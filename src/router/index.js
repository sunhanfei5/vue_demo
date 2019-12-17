import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index'
import productsPage from '../pages/products'
import statisticsPage from '../pages/products/statistics'
import forecastPage from '../pages/products/forecast'
import nineOnePage from '../pages/products/nineOneAssistant'
import productAssistantPage from '../pages/products/productAssistant'
import aboutPage from '../pages/about'
import aboutUsPage from '../pages/about/aboutUs'
import newsPage from '../pages/about/news'
import partnerPage from '../pages/about/partner'
import joinUsPage from '../pages/about/joinUs'
import contactPage from '../pages/about/contact'

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {   return originalPush.call(this, location).catch(err => err) };
let _router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/products',
      name: 'IndexProduct',
      component: productsPage,
      redirect: '/products/statistics',
      children:[
        {
          path: '/products/statistics',
          name: 'statisticsPage',
          component: statisticsPage,
        },
        {
          path: '/products/forecast',
          name: 'forecastPage',
          component: forecastPage,
        },
        {
          path: '/products/91Assistant',
          name: 'nineOnePage',
          component: nineOnePage,
        },
        {
          path: '/products/productAssistant',
          name: 'productAssistantPage',
          component: productAssistantPage,
        },
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: aboutPage,
      redirect: '/about/aboutUs',
      children:[
        {
          path: '/about/aboutUs',
          name: 'aboutUsPage',
          component: aboutUsPage,
        },
        {
          path: '/about/news',
          name: 'newsPage',
          component: newsPage,
        },
        {
          path: '/about/partner',
          name: 'partnerPage',
          component: partnerPage,
        },
        {
          path: '/about/joinUs',
          name: 'joinUsPage',
          component: joinUsPage,
        },
        {
          path: '/about/contact',
          name: 'contactPage',
          component: contactPage,
        },
      ]
    }
  ],
})
_router.afterEach((to, from) => {
  // console.log('to=' + to.name)
  // console.log('from=' + from.name)

  // var menu = $('.nav li')
  // menu.removeClass('selected')

  var pos = String(to.name).substr(0, 3)
  var path = String(to.fullPath)
  // console.log(pos)
  // console.log(path)
  // console.log(to)


})
export default _router
