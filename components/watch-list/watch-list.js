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
    <div class="watchlist-box" ng-repeat="movie in $ctrl.watchlistArray">
        <!--this will be a copy/paste job from movie-list but built from an alternate array-->
    </div>
        `,
    controller: WatchListController
});