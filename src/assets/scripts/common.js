/* eslint-disable */

var Common = {
  createObject:function(o){
    var f = function(){}, i, len, n, prop;
    f.prototype = o;
    n = new f;
    for (i=1, len=arguments.length; i<len; ++i)
      for (prop in arguments[i])
        n[prop] = arguments[i][prop];
    return n;    
  }
  ,loadScript:function(src, callback) {
    var done = false;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
        if ( !done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "Complete") ) {
            done = true;
            callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
  }
  ,isIE9:function(){
   var browser = Common.getBrowser(); 
   if(browser.indexOf("ie")!=-1)
   {
     if(browser.indexOf("9")!=-1)
     {
       return true;
     }
   }
   return false;
  }
  ,isIE10:function(){
    var browser = Common.getBrowser(); 
    if(browser.indexOf("ie")!=-1)
    {
      if(browser.indexOf("10")!=-1)
      {
        return true;
      }
    }
    return false;
   }
   ,isIE9_10:function(){
    var browser = Common.getBrowser(); 
    if(browser.indexOf("ie")!=-1)
    {
      if(browser.indexOf("9")!=-1)
      {
        return true;
      }
      if(browser.indexOf("10")!=-1)
      {
        return true;
      }
    }
    return false; 
  }
  ,getBrowser:function(){
    // ブラウザのUAを小文字で取得
    var userAgent = window.navigator.userAgent.toLowerCase();
    
    // IEの判定
    var isIE = (userAgent.indexOf('msie') >= 0
                  || userAgent.indexOf('trident') >= 0);
    
    // IEのバージョンを取得
    if (isIE) 
    {
      // 正規表現によりUA文字列を配列に分割
      var arr = /(msie|rv:?)\s?([\d\.]+)/.exec(userAgent);
      version = (arr) ? arr[2] : '';
      
      return 'ie'+version;
    }
    else 
    {
    
      // IE以外のブラウザ判定
      if (userAgent.indexOf('chrome') != -1) 
      {
        /* Google Chrome. */
        return 'chrome';
      }
      else if (userAgent.indexOf('firefox') != -1) 
      {
        /* FireFox. */
        return 'firefox';
      }
      else if (userAgent.indexOf('safari') != -1) 
      {
        /* Safari. */
        return 'safari';
      }
      else if (userAgent.indexOf('opera') != -1) 
      {
        /* Opera. */
        return 'opera';
      }
      else if (userAgent.indexOf('edge') != -1) 
      {
        /* Edge. */
        return 'edge';
      }
      else if (userAgent.indexOf('gecko') != -1) 
      {
        /* Gecko. */
        return 'gecko';
      }
      else 
      {
        return false;
      }
    }    
  }
};
module.exports = Common;