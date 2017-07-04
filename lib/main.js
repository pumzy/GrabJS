const DOMNodeCollection = require('./dom_node_collection.js');

window.$g = function(){
  args = Array.from(arguments);
  var functionqueue = [];
  let selector;
  let self = this;
  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === 'function') functionqueue.push(args[i]);
    else selector = args[i];
  }
  let length = functionqueue.length;

  document.addEventListener("DOMContentLoaded", () => {
      for (var i = 0; i < length; i++) {
        functionqueue.shift().call(self);
      }
  });

  this.nodeList = Array.from(document.querySelectorAll(selector));
  this.DomCollection = new DOMNodeCollection(this.nodeList);

  return this.DomCollection;


};

window.$g(()=> console.log('WELCOME TO THE CONSOLE'));

$g.extend = function(...args){
  return Object.assign(...args);
};

$g.ajax = function(options){

  const xhr = new XMLHttpRequest();

  let defaults = {
    method: "GET",
    url: ``,
    dataType: "JSON",
    success: (s) => console.log("YOU DID NOT GIVE US A SUCCESS FUNCTION"),
    error: (e) => console.log("Error function does not exist"),
  };

  options = $g.extend(defaults, options);

  xhr.open( options.method, options.url);
  xhr.onload = () => {
    if(xhr.status === 200) options.success(xhr.response);
    else options.error(xhr.response);
  };

  xhr.send(JSON.stringify(options.data));
};
