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
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);