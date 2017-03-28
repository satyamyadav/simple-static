'use strict';

// defining
window.app = window.app === undefined ? {} : window.app;

// setting up commonly used vars
app.vent = $({});
app.$document = $(document);
app.$window = $(window);
app.$body = $('body');

// ovverriding navigator for cross browser stuff
navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia;

// defining BEHAVIORS
app.behaviors = app.behaviors === undefined ? {} :  app.behaviors;

// defining COMPONENTS
app.components = app.components === undefined ? {} : app.components;

// defining UTILITIES
app.utils = app.utils === undefined ? {} : app.utils;

// app in memory cache
app.cache = {};

app.requestArgs = {};

app.components.site = function (body) {
  console.log($(body));
};
