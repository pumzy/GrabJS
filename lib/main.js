const DOMNodeCollection = require('./dom_node_collection.js');


window.$g = function(){
  args = Array.from(arguments);
  var functionqueue = [];
  let selector;
  var docready;


  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === 'function') {
      if (docready === false) functionqueue.push(args[i]);
      else args[i].call(this);
    }
    else selector = args[i];
  }


  let length = functionqueue.length;

  document.addEventListener("DOMContentLoaded", () => {
      docready = true;

      for (var i = 0; i < length; i++) {
        functionqueue.shift().call(this);
      }
  });

  this.nodeList = Array.from(document.querySelectorAll(selector));
  this.DomCollection = new DOMNodeCollection(this.nodeList);



  return this.DomCollection;


};


window.$g(()=> console.log('Thank you for using GrabJS!'));

$g.extend = function(...args){
  return Object.assign(...args);
};

$g.ready = (callback) => { 
  document.addEventListener("DOMContentLoaded", callback)
}

$g.ajax = function(options){
  return new Promise((resolve, reject) => {

  const xhr = new XMLHttpRequest();

  let defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: ``,
    dataType: "JSON",
    success: (s) => console.log("No success Callback"),
    error: (e) => console.log("No Error Callback"),
  };

  options = $g.extend(defaults, options);

  xhr.open( options.method, options.url);
  xhr.onload = () => {
    if(xhr.status === 200){
       options.success(xhr.response);
       resolve(xhr.response);
    } else {
      options.error(xhr.response);
      reject(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
});
}
