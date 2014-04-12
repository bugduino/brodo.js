(function(win) {
  
  win.Brodo = Brodo;
  var Brodo = {
    ajax: ajax,
    get: get,
    getJSON: getJSON,
    post: post    
  };

/* ### PUBLIC METHODS ### */
  function get(url, params) {};
  function getJSON(url, params) {};
  function post(url, params) {};

  function ajax(url, params) {
    assert(url || (params && params.url), 'url must be defined');
    
    var xhr = new XMLHttpRequest();
    var method, url, body, headers, callback;

    if (params) {
      method   = params.method   || 'GET';
      url      = params.url      || url  ;
      body     = params.body     || null ;
      headers  = params.headers  || {}   ;
      callback = params.callback || null ;
    }

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4){ // if state == DONE
        if (xhr.status == 200 || xhr.status == 304){ // status OK or UNMODIFIED
          //do something on success
          if (isFunction(callback)) return callback(null, xhr.responseText);
        } else {
          //do something on error
          if (isFunction(callback)) return callback(xhr.responseText, null);
        } 
      }
    };

    xhr.open(method, url, true); // true for async behavior
    for(var header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }
    return (body) ? xhr.send(body) : xhr.send();
  }

/* ### AUX METHODS ### */

  // Throw an exception if the condition is false
  function assert(condition, msg){
    if (!condition) throw 'Assertion failed: ' + msg;
  }

  // check if callback is a function
  function isFunction(callback) {
    return Function.prototype.isPrototypeOf(callback);
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

})(window)