let data = {
  // url为请求的地址

  // get请求Api
  get: {
    top: '/api/top.json',
    slides: '/api/slides.json'
  },

  // post请求Api
  post: {
    top: '/api/top',
    slides: '/api/slides',
    logIn: '/api/logIn',
    logInError: '/api/logInError',
    products: '/api/products',
    getPrice: '/api/getPrice',
    jobList: '/api/jobList'
  }
};

module.exports = data;
