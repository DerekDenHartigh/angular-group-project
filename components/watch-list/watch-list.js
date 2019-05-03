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
        <label class="genre-option">{{genre.name}}</label>
        <div class="checkbox-box">
            <label class="checkbox-container genre-inclusion-checkbox-container">
                Include: <input class="genre-inclusion-checkbox checkbox" type="checkbox" checked name="genre-inclusion[]" ng-click="$ctrl.checkboxIncludeFunction(genre)" />
            </label>
        </div>
    </div>
        `,
    controller: WatchListController
});