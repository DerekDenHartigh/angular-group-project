"use strict"
//angularjs debounce
MovieApp.factory('debounce', function($timeout) {
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function () { 
                callback.apply(this, args); 
            }, interval);
        };
    }; 
});

// borrowed from: https://tristanclaridge.com/angularjs-watch-with-debounce/