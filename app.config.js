"use strict";

angular.module("catDogApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/home", {
        template: "<home></home>"  // we'll need to put our search and movie-list templates w/in home template?
    })
    .when("/watchList", {
        template: "<watch-list></watch-list>"
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);