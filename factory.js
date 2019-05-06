"use strict"
//angularjs debounce
angular
.module("MovieApp")
.factory('debounce', function($timeout) {
    // var args = Array.prototype.slice.call(arguments);
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function () { 
                callback.apply(this, arguments); 
            }, interval);
        };
    }; 
});

// borrowed from: https://tristanclaridge.com/angularjs-watch-with-debounce/