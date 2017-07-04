# GrabJS

GrabJS is an extremely lightweight JavaScript DOM interaction  Library, inspired by JQuery. Using GrabJS users can:
* Traverse and manipulate DOM elements
* Select single or multiple DOM elements, based upon a users input parameters
* Handle DOM events
* Send AJAX requests

At the core of this library is user-friendliness, with GrabJS's extremely intuitive syntax allowing its users to gain mastery of the DOM within a matter of seconds.

## Getting started

In order to use GrabJS, download this library into your project and add ```grabjs.js``` in a script tag on the head of your root HTML page. An example of this is below:

```html
<head>
  <meta charset="utf-8">
  <script src="./grabjs.js" charset="utf-8"></script>
</head>
```

If you have installed GrabJS successfully, the following text will appear when you open up the console:

```Thank you for using GrabJS```

## GrabJS API

GrabJS functions return ```DOMNodeCollection```s. This is a custom class, which has a number of functions defined on it (which will be discussed briefly), and contain a number of HTML elements based on the parameters provided to the $g wrapper(again, more in a second).

### $g(arg)

The $g wrapper is, at its core, used to return an instance of a DOMNodeCollection, upon which GrabJS functions can be executed. If the arguments passed in to this wrapper is a string, $g will return a new ```DOMNodeCollection``` containing all of the HTML elements on the page that have the same class/id/type as the content specified in the string. If the argument is a function, or there are multiple functions, these will be stored in a ```functionqueue```, and then executed in order once the document has fully loaded. If the page is already loaded, these will be executed immediately.

The code used to attain this functionality is as follows.

```javascript
for (var i = 0; i < args.length; i++) {
  if (typeof args[i] === 'function') {
    if (docready === false) functionqueue.push(args[i]);
    else args[i].call(this);
  }
  else selector = args[i];
}
```

## Selection with $g

The most common use of the $g wrapper is to select elements from the DOM. Selection in GrabJS works in the following manner:

### Selecting types of HTML elements

In order to select all elements of a certain type, simply pass the element as a string into the $g wrapper.
For example, to select all li's, we can simply type ```$g("li")``` into the console.

### Selecting elements with a particular className

In order to select all elements that belong to a certain class, prefix your search criteria with a full-stop.
For example, one can type in ```$g(".hello")``` to select all HTML elements with that belong to the class "hello"

### Selecting elements with a particular ID

In order to select all elements that have a certain ID, prefix your search criteria with a hash.
For example, one can type in ```$g("#exampleID")``` to select all HTML elements with that have the ID "exampleID"

## $g functions

There are a number of functions that can be called on any instance of the DOMNodeCollection class, which will then serve to modify the collection of HTML elements gathered by the initial selection, traverse elements, or perform certain functions. These functions are as follows:

### DOM Manipulation

These functions can be used to modify or view DOM elements

#### ```html(str)```
If provided no argument, this function returns the ```innerHTML``` of the first element in the DOMNodeCollection that it is called on. If an argument is provided, this function will change the ```innerHTML``` of all the elements in the DOMNodeCollection to the string provided.

#### ```empty```

This will clear out the ```innerHTML``` of all the elements in the DOMNodeCollection

#### ```each(callback)```

This function will apply the supplied callback to all the elements in the DOMNodeCollection

#### ```append(element)```

This function can take a HTMLElement, a string, or a DOMNodeCollection. The element will be appended on to  all of the elements in the DOMNodeCollection it is called on.


#### ```attr(attributeName, value)```

This function can work provided either only an ```attributeName```, or both an ```attributeName``` and a ```value```. If only provided with one argument, this function will operate only on the first element of the DOMNodeCollection, and return the value for the corresponding attribute. If provided with a ```value```, this function will iterate through the elements of the DOMNodeCollection and set an attribute, with the attribute name being the ```attributeName``` provided, and the ```value``` being the value provided.


#### ```addClass(newClass)```

This will add the ```newClass``` to all the elements in the DOMNodeCollection


#### ```removeClass(className)```

This will remove the class with the name of ```className``` from all the elements in the DOMNodeCollection

### DOM Traversal

These functions can be used to navigate DOM elements.

#### ```parent```

This function will return a DOMNodeCollection containing the parent of all the elements in the initial DOMNodeCollection.

#### ```children```

This function will return a DOMNodeCollection containing the children of all the elements in the initial DOMNodeCollection.

#### ```find(arg)```

This function will look through the children of all of the elements in the initial DOMNodeCollection for HTMLElements that match the criteria in the ```arg``` supplied.

eg: In order to find all elements with the className "h" that are nested under all unordered lists, we can input the following into the console:

```javascript
  $g("ul").find(".h")
```

### Event Listeners


#### ```on(action, callback)```

This function adds an event listener to each element in the DOMNodeCollection based on the specified ```action``` transpiring, at which point the ```callback``` will be executed.


#### ```off(action, callback)```

For each of the elements in the DOMNodeCollection, this function will remove the specified event listener.


## Non DOMNodeCollection methods

### ```$g.ready(callback)```

This function fires the callback when the DOM content has been loaded

### ```$g.keydown(callback)```

This function fires the callback when a key is pressed.

### ```$g.extend```

A simple function that merges JavaScript objects

### ```$g.ajax(options)```

This function sends an AJAX request, and returns a ```Promise```. This function accepts a hash, with the following keys (and defaults):

| Keys        | Defaults           |
| ------------- |:-------------:|
| contentType    | 'application/x-www-form-urlencoded; charset=UTF-8' |
| method     | "GET"     |   
|  url | ""    |
|  dataType | "JSON"     |
| success -- This is the success callback | (s) => console.log("No success Callback")      |
| error -- This is the error callback| (e) => console.log("No Error Callback")      |

The code for this AJAX function is as follows:

```javascript
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
```

## Demo

In order to show off some of the functionality of the GrabJS library, I have made a simple Snake game using GrabJS incorporating GrabJS functions. This is a [link](https://github.com/pumzy/Snake-GrabJS-Demo) to the demo repo.

If you would like to test the library more organically, open up test.html in this repo (on your browser), and play around with some GrabJS commands!
