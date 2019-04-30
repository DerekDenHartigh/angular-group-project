"use strict";

function MovieAppService($http) {

    // Below is code from the reddit lab that we can modify for our own API usage
    const service = this;
    service.newThread = "";

    service.callRedditApi = (newThread) => {
        service.newThread = newThread;
        console.log(`thread changed to `+service.newThread);
        return $http.get(`https://www.reddit.com/r/${service.newThread}.json`)
    };
}

angular
    .module("MovieApp")
    .service("MovieAppService", ["$http", MovieAppService]);