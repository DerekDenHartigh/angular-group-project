"use strict";

function MovieListController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;

    ctrl.pageNumber = service.pageNumber;  // binding pageNumber between ctrl and service?



/* page forward/back functions */
    ctrl.pageBack = function(){
        if (service.pageNumber>1){
        service.pageNumber -= 1;
        console.log(service.pageNumber)
        }
        else if (service.pageNumber<=1){
            console.error("1 is the lowest possible page number")
        }
    }

    ctrl.pageForward = function(){
        if(service.pageNumber<service.responseData.total_pages){
            service.pageNumber += 1;
            console.log(service.pageNumber);
        }
        else if(service.pageNumber>=service.response.total_pages){
            console.error("There aren't that many pages!")
        }
    }

/* watchlist button */

    ctrl.watchlistEditor = function(movie){
        if(ctrl.starred === true){ // if star is filled out, add movie to watchlist array
            movie.starred = false;
            // console.log(`watchlistArray before movie addition: ${service.watchlistArray}`)
            service.addToWatchlistArray(movie);
            // console.log(`watchlistArray after movie addition: ${service.watchlistArray}`)
        }
        else if (ctrl.starred === false){ // if star is empty, remove from watchlist array
            movie.starred = true;
            // console.log(`watchlistArray before movie deletion: ${service.watchlistArray}`)
            service.removeFromWatchlistArray(movie);
            // console.log(`watchlistArray after movie deletion: ${service.watchlistArray}`)
        }
    }

}


angular
.module('MovieApp')  
.component('movieList', {
    template: `
    <!--Movie Display (title, poster, rating, description)-->
    <div id="movie-list-container">
        <div class="movie-post" ng-repeat="movie in $ctrl.service.responseData.data.results">
            <div class="title-container">
                <div id="star-container">
                    <i class="material-icons star" ng-hide="movie.starred" ng-click="watchlistEditor(movie)">star_border</i>
                    <i class="material-icons star" ng-show="movie.starred" ng-click="watchlistEditor(movie)">star</i>
                </div>
                <h1 class="movie-title">{{movie.original_title}}</h1>
            </div>
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500{{poster_path}}" alt="movie poster">
            <p class ="movie-description">Synopsis:\n{{movie.overview}}</p>
        </div>
    </div>

    <!--Page Number Selector-->
    <div id="page-number-container">
        <i class="material-icons arrows" ng-click="$ctrl.pageBack()">arrow_back</i>
        <input id="page-selection-input" type="number" min="1" step="1" ng-model="$ctrl.pageNumber" value="$ctrl.pageNumber">
        <i class="material-icons arrows" ng-click="$ctrl.pageForward()">arrow_forward</i>
    </div>
        `,
    controller: MovieListController
});