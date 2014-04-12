(function(win) {
  
  win.Brodo = Brodo;
  var Brodo = {
    ajax: ajax,
    get: get,
    getJSON: getJSON,
    post: post    
  };

  /* 
    params = {
      url: 'http://anyValidUrl.com'
      method: POST,                        // possible values: GET, POST, PUT, DELETE, PATCH. Default: GET
      body: {},                            // body must be an object, if defined
      headers: {},                         // headers must be an object with valid header key and values
      callback: function() {}              // callback is a function that will be called once the state of the request is DONE
    }                                      // callback will have 2 params (error, response), if no error occur it will be called
                                           // with (null, response) else (error, null), in Node style

  */

  /* ### PUBLIC METHODS ### */

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

})(window)