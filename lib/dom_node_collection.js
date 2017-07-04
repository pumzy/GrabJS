class DOMNodeCollection{
  constructor(elements){
    debugger
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
      return this.elements
    }
  }

  empty(){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = '';
    }
    return this.elements
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
    return this.elements
  }

  addClass(newClass){
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].className.length !== 0) this.elements[i].className += " ";
      this.elements[i].className += newClass;
    }
    return this.elements
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
    return this.elements
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
