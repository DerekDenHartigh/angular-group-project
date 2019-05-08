"use strict";

angular.module("MovieApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/home", {
        template: "<search></search><movie-list></movie-list>"  // we'll need to put our search and movie-list templates w/in home template?
    })
    .when("/watchList", {
        template: "<watch-list></watch-list>"
    })
    .when("/moreInfo", {
        template: "<more-info></more-info>"
        //template: "<more-info>Hi I'm more-info</more-info>" // this template is routed, correctly
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);