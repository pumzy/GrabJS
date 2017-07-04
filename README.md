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

GrabJS methods return ```DOMNodeCollection```s. This is a custom class, which has a number of methods defined on it (which will be discussed briefly), and contain a number of HTML elements based on the parameters provided to the $g method(again, more in a second)
