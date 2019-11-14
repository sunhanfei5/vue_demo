/*var data ={
//    url为请求地址，key为检查数据的入口
    "get" : [
        {
            "url": "api/top.json",
            "key": "top"
        }
    ],
    "post" : [
        {
            "url": "api/top.json",
            "key": "top"
        }
    ]
}
module.exports= data ;*/

var data = {
  // url为请求的地址

  // get请求Api
  get: {
    top: '/api/top',
    slides: '/api/slides'
    /*goods: '/api/goods',
    tableList: '/api/tableList',
    strategyDetail: '/miscourse/shelfstrategy/shelfstrategydetail'*/
  },

  // post请求Api
  post: {
    top: '/api/top',
    slides: '/api/slides'
    /*strategyEdit: '/miscourse/shelfstrategy/shelfstrategyupdate',
    strategyAdd: '/miscourse/shelfstrategy/shelfstrategycreate',
    uploadfileimg: '/course/api/uploadfileimg'*/
  }
};

module.exports = data;
