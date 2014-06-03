(function (win) {
  var Brodo = {
    ajax: ajax,
    get: get,
    getJSON: getJSON,
    post: post    
  };
  win.Brodo = Brodo;

/* ### PUBLIC METHODS ### */
  function ajax(params) {

    assert(params || (isObj(params) && params.url), 'params must be an URL or a js object containing a \'url\' key');

    var url, body, headers, callback, method = 'GET';
    var xhr = newXhr();

    if (isObj(params)) {
      url      = params.url;
      method   = params.method   || method;
      body     = params.body     || null ;
      headers  = params.headers  || {}   ;
      callback = params.callback || null ;
    } else url = params;

    if (body && method == 'GET') { 
      url += "?" + serialize(body);
      body = null;
    }

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4){ // if state == DONE
        var res;
        try
        {
          res = JSON.parse(xhr.responseText);
        }
        catch(e)
        {
           res = xhr.responseText;
        }
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ // status OK or UNMODIFIED
          //do something on success
          if (isFunction(callback)) return callback(null, res);
        } else {
          //do something on error
          if (isFunction(callback)) return callback(xhr, null);
        } 
      }
    };

    xhr.open(method, url, true); // true for async behavior
    for(var header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }
    return (body) ? xhr.send(body) : xhr.send();
  }

  // this is a dummy method, the default behaviour of ajax is a get request
  function get(params) {

    ajax(params);
  }
  
  function getJSON(params) {

    params.headers ? 
      params.headers.Accept = "application/json" :
      params.headers = {"Accept": "application/json"};
    ajax(params);
  }
  
  function post(params) {

    params.method = "POST";
    ajax(params);
  }

/* ### AUX METHODS ### */

  //check for xhr support
  function newXhr() {

    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xhr;
  }

  // Throw an exception if the condition is false
  function assert(condition, msg){

    if (!condition) throw 'Assertion failed: ' + msg;
  }

  // check if callback is a function
  function isFunction(x) { 
   return Object.prototype.toString.call(x) === "[object Function]";
  }
  
  function isObj(x) { 
   return Object.prototype.toString.call(x) === "[object Object]";
  }

  // encode params in obj as query string parameters
  // used in GET requests with url parameter
  function serialize(obj, prefix) {
    var str = [];
    for(var p in obj) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
  }

})(window);
