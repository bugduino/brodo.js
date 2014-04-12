Brodo.js
=========
Brodo.js a minimal, lightweight and fast ajax library written in vanilla js 

##Getting Started

Just include the `` brodo.js `` file in you project:

```
<script src="lib/brodo.js"></script>
```

There are 4 methods available, each of them can take two parameteres ``url`` and ``params``.

####Params
can contains the following keys:

``url``: a valid string URL,

``method``: any valid HTTP method. Default: ``GET``,

``body``: if defined must be a js object,

``headers``: headers, if defined, must be a js object with valid header key and values,

``callback``: callback is a function that will be called once the state of the request is DONE.

Example: 

    params = {
        url: 'http://api.example.com',
        method: 'POST',
        body: {key1: value, key2: value ... }
        headers: {'Authorization ': 'OAuth ' + access_token, 'Content-Type': 'application/json'},
        callback: function(error, response) {
            console.log(arguments)
        }
    }


Version
----

0.1

License
----

MIT
    