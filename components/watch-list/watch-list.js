"use strict";

function WatchListController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.watchlistArray = service.watchlistArray;
    
}

angular
.module('MovieApp')  
.component('watchList', {
    template: `
    <!--Watchlist-->
    <div id="watchlist-container">
        <div class="movie-post" ng-repeat="movie in $ctrl.watchlistArray">
        <div class="title-container">
            <h1 class="movie-title title" ng-click="show=!show">{{movie.title}}</h1>
            <div class="spacer"></div>
            <div class="star-container">
                <i class="material-icons star" ng-hide="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star_border</i>
                <i class="material-icons star" ng-show="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star</i>
            </div>
        </div>
        <img class="movie-poster image" alt="movie poster" ng-src="{{movie.poster}}" ng-click="show=!show"></img>
        <p class ="movie-description description" ng-hide="!show">Synopsis:\n{{movie.description}}</p>
        </div>
    </div>
        `,
    controller: WatchListController
});