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

GrabJS methods return ```DOMNodeCollection```s. This is a custom class, which has a number of methods defined on it (which will be discussed briefly), and contain a number of HTML elements based on the parameters provided to the $g wrapper(again, more in a second).

### $g(arg)

The $g wrapper is, at its core, used to return an instance of a DOMNodeCollection, upon which GrabJS methods can be executed. If the arguments passed in to this wrapper is a string, $g will return a new ```DOMNodeCollection``` containing all of the HTML elements on the page that have the same class/id/type as the content specified in the string. If the argument is a function, or there are multiple functions, these will be stored in a ```functionqueue```, and then executed in order once the document has fully loaded. If the page is already loaded, these will be executed immediately.

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

### Selection with $g

The most common use of the $g wrapper is to select elements from the DOM. Selection in GrabJS works in the following manner:

#### Selecting types of HTML elements

In order to select all elements of a certain type, simply pass the element as a string into the $g wrapper.
For example, to select all li's, we can simply type ```$g("li")``` into the console.

#### Selecting elements with a particular className

In order to select all elements that belong to a certain class, prefix your search criteria with a full-stop.
For example, one can type in ```$g(".hello")``` to select all HTML elements with that belong to the class "hello"

#### Selecting elements with a particular ID

In order to select all elements that have a certain ID, prefix your search criteria with a hash.
For example, one can type in ```$g("#exampleID")``` to select all HTML elements with that have the ID "exampleID"











The most common use of the $g wrapper is to select an element, or a number of elements.
