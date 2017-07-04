/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection{
  constructor(elements){
    this.elements = elements;
  }

  each(callback){
    this.elements.forEach(callback)
  }

  html(str){
    if(!str){
      return this.elements[0].innerHTML;
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = str;
      }
      return new DOMNodeCollection(this.elements)
    }
  }

  empty(){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = '';
    }
    return new DOMNodeCollection(this.elements)
  }

  append(arg){
    if (arg instanceof HTMLElement){
      arg = $g(arg)
    }

    if (typeof arg === "string"){
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = this.elements[i].innerHTML + arg;
      }
      return new DOMNodeCollection(this.elements)
    } else if (arg instanceof DOMNodeCollection){
      this.each((element) => {
        arg.each(argument => element.appendChild(argument.cloneNode(true)))
      })
    }
    return new DOMNodeCollection(this.elements)
  }

  attr(attributeName, value){
    if (value === undefined){
      return this.elements[0].getAttribute(attributeName);
    } else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attributeName, value);
      }
    }
    return new DOMNodeCollection(this.elements)
  }

  addClass(newClass){
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].className.length !== 0) this.elements[i].className += " ";
      this.elements[i].className += newClass;
    }
    return new DOMNodeCollection(this.elements)
  }

  removeClass(cName){
    if (cName === undefined){
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].className = "";
      }
    } else {
      for (var i = 0; i < this.elements.length; i++) {
        let current = this.elements[i].className.split(' ');
        this.elements[i].className = current.filter((el) => cName !== el ).join(' ');
      }
    }
    return new DOMNodeCollection(this.elements)
  }

  children(){
    var newarray = [];
    for (var i = 0; i < this.elements.length; i++) {
      var childs = Array.from(this.elements[i].children);
      newarray = newarray.concat(childs);
    }
    return new DOMNodeCollection(newarray);
  }

  parent(){
    var newarray = [];
    for (var i = 0; i < this.elements.length; i++) {
      if(newarray.includes(this.elements[i].parentNode)) continue;
        newarray.push(this.elements[i].parentNode);
    }
    return new DOMNodeCollection(newarray);
  }

  find(element){
  var newarray = [];

  for (var i = 0; i < this.elements.length; i++) {
    let arrayfied = Array.from(this.elements[i].querySelectorAll(element));
    newarray = newarray.concat(arrayfied);
  }
    return new DOMNodeCollection(newarray);
  }

  remove(){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].remove();
    }
    this.elements = [];
  }

  on(action, callback){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(action, callback);
    }
    return this;
  }

  off(action, callback){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(action, callback);
    }
    return this;
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);


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

/***/ })
/******/ ]);
//# sourceMappingURL=grabjs.js.map
